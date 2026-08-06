/**
 * Shiki theme built from the five terminal tokens in DESIGN_august.md §1.
 * Deliberately limited to those five: the code block is the only place on the
 * site where terminal colours appear, and inside it nothing else appears
 * either — no extra hues creeping in through a syntax scope.
 *
 *   fg    #E6E1EC  everything unclassified
 *   cyan  #6FD3E0  keywords, strings, tags, numbers
 *   lime  #8CE0A8  functions, attributes, prompt/output
 *   dim   #6B6478  comments, punctuation
 */

const BG = '#16131C';
const FG = '#E6E1EC';
const LIME = '#8CE0A8';
const CYAN = '#6FD3E0';
const DIM = '#6B6478';

/** @type {import('shiki').ThemeRegistration} */
export default {
	name: 'sebastian-cook-terminal',
	type: 'dark',
	colors: {
		'editor.background': BG,
		'editor.foreground': FG,
	},
	settings: [
		{ settings: { background: BG, foreground: FG } },
		{
			scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
			settings: { foreground: DIM, fontStyle: 'italic' },
		},
		{
			scope: [
				'keyword',
				'keyword.control',
				'keyword.operator',
				'storage',
				'storage.type',
				'storage.modifier',
				'string',
				'string.quoted',
				'constant.character.escape',
				'constant.numeric',
				'constant.language',
				'entity.name.tag',
				'support.type.property-name',
			],
			settings: { foreground: CYAN },
		},
		{
			scope: [
				'entity.name.function',
				'support.function',
				'variable.function',
				'meta.function-call',
				'entity.other.attribute-name',
				'markup.inserted',
			],
			settings: { foreground: LIME },
		},
		{
			scope: ['punctuation', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'],
			settings: { foreground: DIM },
		},
		{
			scope: [
				'variable',
				'variable.other',
				'entity.name.type',
				'support.type',
				'support.class',
				'entity.name.class',
			],
			settings: { foreground: FG },
		},
	],
};
