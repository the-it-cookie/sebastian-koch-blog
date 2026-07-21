const MAX_NAME_LENGTH = 80;
const MAX_BODY_LENGTH = 2000;
const MAX_SLUG_LENGTH = 200;
const MAX_EMAIL_LENGTH = 200;
const MAX_TOPIC_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, init = {}) {
	return new Response(JSON.stringify(data), {
		...init,
		headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
	});
}

function badRequest(message) {
	return json({ error: message }, { status: 400 });
}

async function verifyTurnstile(token, secret, remoteIp) {
	if (!token) return false;
	const body = new URLSearchParams();
	body.set('secret', secret);
	body.set('response', token);
	if (remoteIp) body.set('remoteip', remoteIp);

	const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body,
	});
	const outcome = await res.json();
	return outcome.success === true;
}

function isAuthorized(request, env) {
	const auth = request.headers.get('authorization') ?? '';
	const expected = `Bearer ${env.ADMIN_SECRET}`;
	return env.ADMIN_SECRET && auth === expected;
}

async function sendNotificationEmail(env, { subject, text }) {
	if (!env.RESEND_API_KEY || !env.CONTACT_NOTIFY_EMAIL) return;
	try {
		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${env.RESEND_API_KEY}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				from: 'sebastiancook.com <onboarding@resend.dev>',
				to: [env.CONTACT_NOTIFY_EMAIL],
				subject,
				text,
			}),
		});
	} catch {
		// Email is a best-effort notification; the message is already saved in D1.
	}
}

async function handleGetComments(request, env) {
	const url = new URL(request.url);
	const slug = url.searchParams.get('slug');
	if (!slug) return badRequest('Missing slug');

	const { results } = await env.DB.prepare(
		`SELECT id, parent_id as parentId, author_name as authorName, body, created_at as createdAt
		 FROM comments WHERE post_slug = ?1 AND status = 'approved'
		 ORDER BY created_at ASC`,
	)
		.bind(slug)
		.all();

	return json({ comments: results });
}

async function handlePostComment(request, env) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return badRequest('Invalid JSON body');
	}

	const { slug, parentId, authorName, body, turnstileToken } = payload ?? {};

	if (typeof slug !== 'string' || !slug.trim() || slug.length > MAX_SLUG_LENGTH) {
		return badRequest('Invalid slug');
	}
	if (typeof authorName !== 'string' || !authorName.trim() || authorName.length > MAX_NAME_LENGTH) {
		return badRequest('Please provide a name (max 80 characters).');
	}
	if (typeof body !== 'string' || !body.trim() || body.length > MAX_BODY_LENGTH) {
		return badRequest('Please provide a comment (max 2000 characters).');
	}
	if (parentId !== null && parentId !== undefined && !Number.isInteger(parentId)) {
		return badRequest('Invalid parentId');
	}

	const remoteIp = request.headers.get('cf-connecting-ip');
	const verified = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET, remoteIp);
	if (!verified) {
		return badRequest('Captcha verification failed. Please try again.');
	}

	if (parentId) {
		const parent = await env.DB.prepare(
			`SELECT id FROM comments WHERE id = ?1 AND post_slug = ?2 AND status = 'approved'`,
		)
			.bind(parentId, slug)
			.first();
		if (!parent) return badRequest('The comment you are replying to does not exist.');
	}

	await env.DB.prepare(
		`INSERT INTO comments (post_slug, parent_id, author_name, body, status)
		 VALUES (?1, ?2, ?3, ?4, 'pending')`,
	)
		.bind(slug, parentId ?? null, authorName.trim(), body.trim())
		.run();

	await sendNotificationEmail(env, {
		subject: `New comment awaiting approval (${slug.trim()})`,
		text: `${authorName.trim()} commented on "${slug.trim()}":\n\n${body.trim()}\n\nReview it at https://sebastiancook.com/admin/`,
	});

	return json(
		{ status: 'pending', message: 'Thanks! Your comment will appear after a quick review.' },
		{ status: 201 },
	);
}

async function handlePostContact(request, env) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return badRequest('Invalid JSON body');
	}

	const { name, email, topic, message, turnstileToken } = payload ?? {};

	if (typeof name !== 'string' || !name.trim() || name.length > MAX_NAME_LENGTH) {
		return badRequest('Please provide a name (max 80 characters).');
	}
	if (
		typeof email !== 'string' ||
		!EMAIL_RE.test(email.trim()) ||
		email.length > MAX_EMAIL_LENGTH
	) {
		return badRequest('Please provide a valid email address.');
	}
	if (typeof topic !== 'string' || !topic.trim() || topic.length > MAX_TOPIC_LENGTH) {
		return badRequest('Please provide a topic (max 120 characters).');
	}
	if (typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
		return badRequest('Please provide a message (max 5000 characters).');
	}

	const remoteIp = request.headers.get('cf-connecting-ip');
	const verified = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET, remoteIp);
	if (!verified) {
		return badRequest('Captcha verification failed. Please try again.');
	}

	await env.DB.prepare(
		`INSERT INTO contact_messages (name, email, topic, message) VALUES (?1, ?2, ?3, ?4)`,
	)
		.bind(name.trim(), email.trim(), topic.trim(), message.trim())
		.run();

	await sendNotificationEmail(env, {
		subject: `New contact message: ${topic.trim()}`,
		text: `From: ${name.trim()} <${email.trim()}>\nTopic: ${topic.trim()}\n\n${message.trim()}`,
	});

	return json({ status: 'ok', message: "Thanks — I'll get back to you soon." }, { status: 201 });
}

async function handleAdminListComments(request, env) {
	if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });

	const { results } = await env.DB.prepare(
		`SELECT id, post_slug as postSlug, parent_id as parentId, author_name as authorName,
		        body, status, created_at as createdAt
		 FROM comments ORDER BY created_at ASC`,
	).all();

	return json({ comments: results });
}

async function handleAdminModerateComment(request, env, id, action) {
	if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });

	if (action === 'approve') {
		await env.DB.prepare(`UPDATE comments SET status = 'approved' WHERE id = ?1`).bind(id).run();
	} else if (action === 'delete') {
		await env.DB.prepare(`DELETE FROM comments WHERE id = ?1`).bind(id).run();
	} else {
		return badRequest('Unknown action');
	}

	return json({ status: 'ok' });
}

async function handleAdminListContact(request, env) {
	if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });

	const { results } = await env.DB.prepare(
		`SELECT id, name, email, topic, message, created_at as createdAt
		 FROM contact_messages ORDER BY created_at DESC`,
	).all();

	return json({ messages: results });
}

async function handleAdminDeleteContact(request, env, id) {
	if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });

	await env.DB.prepare(`DELETE FROM contact_messages WHERE id = ?1`).bind(id).run();
	return json({ status: 'ok' });
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const { pathname } = url;

		try {
			if (pathname === '/api/comments' && request.method === 'GET') {
				return await handleGetComments(request, env);
			}
			if (pathname === '/api/comments' && request.method === 'POST') {
				return await handlePostComment(request, env);
			}
			if (pathname === '/api/contact' && request.method === 'POST') {
				return await handlePostContact(request, env);
			}
			if (pathname === '/api/admin/comments' && request.method === 'GET') {
				return await handleAdminListComments(request, env);
			}
			const moderateMatch = pathname.match(/^\/api\/admin\/comments\/(\d+)\/(approve|delete)$/);
			if (moderateMatch && request.method === 'POST') {
				return await handleAdminModerateComment(
					request,
					env,
					Number(moderateMatch[1]),
					moderateMatch[2],
				);
			}
			if (pathname === '/api/admin/contact' && request.method === 'GET') {
				return await handleAdminListContact(request, env);
			}
			const contactDeleteMatch = pathname.match(/^\/api\/admin\/contact\/(\d+)\/delete$/);
			if (contactDeleteMatch && request.method === 'POST') {
				return await handleAdminDeleteContact(request, env, Number(contactDeleteMatch[1]));
			}
		} catch (err) {
			return json({ error: 'Internal error', detail: String(err) }, { status: 500 });
		}

		return env.ASSETS.fetch(request);
	},
};
