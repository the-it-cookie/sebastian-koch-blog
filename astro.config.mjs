// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import terminalTheme from './src/styles/shiki-terminal.js';
import { rehypeCodeFrame } from './src/utils/rehypeCodeFrame.js';

/**
 * Stamps the language onto the <pre> so rehypeCodeFrame can print it in the
 * window bar. Shiki knows the language; the rehype pass downstream does not.
 */
const languageAttribute = {
	name: 'language-attribute',
	pre(node) {
		node.properties['data-language'] = this.options.lang;
	},
};

// https://astro.build/config
export default defineConfig({
	site: 'https://sebastiancook.com',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/admin/'),
		}),
	],
	markdown: {
		shikiConfig: {
			theme: terminalTheme,
			transformers: [languageAttribute],
		},
		rehypePlugins: [rehypeCodeFrame],
	},
	// DESIGN_august.md §2. Self-hosted through Astro's font pipeline — the
	// browser never talks to Google at runtime (performance + GDPR).
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-display',
			fallbacks: ['Georgia', 'serif'],
			weights: [400, 500, 600],
			styles: ['normal', 'italic'],
		},
		{
			provider: fontProviders.google(),
			name: 'Work Sans',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'monospace'],
			weights: [400, 500],
			styles: ['normal'],
		},
	],
});
