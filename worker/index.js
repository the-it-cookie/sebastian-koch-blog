const MAX_NAME_LENGTH = 80;
const MAX_BODY_LENGTH = 2000;
const MAX_SLUG_LENGTH = 200;

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

	return json(
		{ status: 'pending', message: 'Thanks! Your comment will appear after a quick review.' },
		{ status: 201 },
	);
}

async function handleAdminList(request, env) {
	if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });

	const { results } = await env.DB.prepare(
		`SELECT id, post_slug as postSlug, parent_id as parentId, author_name as authorName,
		        body, status, created_at as createdAt
		 FROM comments WHERE status = 'pending' ORDER BY created_at ASC`,
	).all();

	return json({ comments: results });
}

async function handleAdminModerate(request, env, id, action) {
	if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });

	if (action === 'approve') {
		await env.DB.prepare(`UPDATE comments SET status = 'approved' WHERE id = ?1`).bind(id).run();
	} else if (action === 'reject') {
		await env.DB.prepare(`DELETE FROM comments WHERE id = ?1`).bind(id).run();
	} else {
		return badRequest('Unknown action');
	}

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
			if (pathname === '/api/admin/comments' && request.method === 'GET') {
				return await handleAdminList(request, env);
			}
			const moderateMatch = pathname.match(/^\/api\/admin\/comments\/(\d+)\/(approve|reject)$/);
			if (moderateMatch && request.method === 'POST') {
				return await handleAdminModerate(request, env, Number(moderateMatch[1]), moderateMatch[2]);
			}
		} catch (err) {
			return json({ error: 'Internal error', detail: String(err) }, { status: 500 });
		}

		return env.ASSETS.fetch(request);
	},
};
