// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://sebastian-koch-blog.sebastian-koch-e7e.workers.dev',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-sans',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Serif',
			cssVariable: '--font-serif',
			fallbacks: ['Georgia', 'serif'],
			weights: [500, 600, 700],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'monospace'],
			weights: [400, 500],
			styles: ['normal'],
		},
	],
});
