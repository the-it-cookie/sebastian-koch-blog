/**
 * Wraps every Shiki-rendered <pre> in the terminal window frame from
 * DESIGN_august.md §6: three dots (the first one lime), the language label
 * centred, and a copy button on the right.
 *
 * This runs at build time rather than client-side on purpose — the frame is
 * part of the block, not an enhancement, so it must be in the first paint.
 * The copy button's behaviour is wired up by the one small script in
 * BaseLayout.
 *
 * No unist-util-visit dependency: the walk is six lines and avoids relying on
 * a transitive dep of Astro.
 */

const COPY_ICON = {
	type: 'element',
	tagName: 'svg',
	properties: {
		className: ['icon-copy'],
		width: 18,
		height: 18,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 1.75,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		ariaHidden: 'true',
	},
	children: [
		{
			type: 'element',
			tagName: 'rect',
			properties: { x: 9, y: 9, width: 12, height: 12, rx: 2 },
			children: [],
		},
		{
			type: 'element',
			tagName: 'path',
			properties: { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' },
			children: [],
		},
	],
};

const CHECK_ICON = {
	type: 'element',
	tagName: 'svg',
	properties: {
		className: ['icon-check'],
		width: 18,
		height: 18,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 1.75,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		ariaHidden: 'true',
	},
	children: [{ type: 'element', tagName: 'path', properties: { d: 'M20 6 9 17l-5-5' }, children: [] }],
};

function el(tagName, properties, children = []) {
	return { type: 'element', tagName, properties, children };
}

function isShikiPre(node) {
	if (node.type !== 'element' || node.tagName !== 'pre') return false;
	// Astro's rehype-shiki writes a raw `class` string rather than hast's
	// `className` array, so both spellings have to be accepted.
	const raw = node.properties?.className ?? node.properties?.class;
	const classes = Array.isArray(raw) ? raw : String(raw ?? '').split(/\s+/);
	return classes.includes('astro-code');
}

function frame(pre) {
	const language = pre.properties?.dataLanguage || pre.properties?.['data-language'] || 'code';

	return el('figure', { className: ['code-frame'] }, [
		el('figcaption', { className: ['code-frame__bar'] }, [
			el('span', { className: ['code-frame__dots'], ariaHidden: 'true' }, [
				el('i', {}),
				el('i', {}),
				el('i', {}),
			]),
			el('span', { className: ['code-frame__name'] }, [{ type: 'text', value: language }]),
			el(
				'button',
				{
					type: 'button',
					className: ['code-frame__copy'],
					'data-copy': '',
					ariaLabel: 'Copy code to clipboard',
				},
				[COPY_ICON, CHECK_ICON],
			),
		]),
		pre,
	]);
}

export function rehypeCodeFrame() {
	return (tree) => {
		const walk = (node) => {
			if (!Array.isArray(node.children)) return;
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (isShikiPre(child)) {
					node.children[i] = frame(child);
					continue; // do not descend into the pre we just wrapped
				}
				walk(child);
			}
		};
		walk(tree);
	};
}

export default rehypeCodeFrame;
