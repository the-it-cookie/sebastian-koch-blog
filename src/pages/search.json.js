import { getPublishedPosts } from '../utils/posts';

/**
 * Static index behind the search overlay. Small enough (a handful of posts)
 * that filtering client-side beats shipping a search library.
 */
export async function GET() {
	const posts = await getPublishedPosts();

	const index = posts
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			tags: post.data.tags,
			url: `/blog/${post.id}/`,
			date: post.data.pubDate.toISOString().slice(0, 10),
		}));

	return new Response(JSON.stringify(index), {
		headers: { 'content-type': 'application/json' },
	});
}
