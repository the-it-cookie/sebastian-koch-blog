/**
 * DESIGN_august.md §2 signature move #1: exactly one word per headline is set
 * in display italic — the word carrying the twist. Posts name it in
 * frontmatter as `accentWord`; this splits the title around it so the
 * component can wrap it in <em> without ever injecting raw HTML.
 */

export interface AccentParts {
	before: string;
	word: string;
	after: string;
}

export function splitAccent(text: string, accent?: string): AccentParts {
	if (!accent) return { before: text, word: '', after: '' };

	const index = text.toLowerCase().indexOf(accent.toLowerCase());
	if (index === -1) return { before: text, word: '', after: '' };

	return {
		before: text.slice(0, index),
		word: text.slice(index, index + accent.length),
		after: text.slice(index + accent.length),
	};
}
