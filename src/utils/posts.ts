import { getCollection } from 'astro:content';

/**
 * The one place that decides what counts as published.
 *
 * Drafts are hidden everywhere, including the dev server — a half-written post
 * showing up in the grid while you are working on layout is noise, and it made
 * the dev site disagree with what actually ships. To preview a draft, flip
 * `draft: false` in its frontmatter.
 */
export function getPublishedPosts() {
	return getCollection('blog', ({ data }) => !data.draft);
}
