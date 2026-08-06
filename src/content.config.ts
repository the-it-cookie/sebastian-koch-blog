import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			canonical: z.string().url().optional(),
			heroImage: z.optional(image()),
			// --- cookbook fields (DESIGN_august.md §9) ---
			/** The one word in the title set in display italic. */
			accentWord: z.string().optional(),
			/** Chef's hats on the card and in the ingredients box. */
			difficulty: z.enum(['easy', 'medium', 'advanced']).optional(),
			/** Prerequisites. Wrap versions and licences in `backticks` for mono. */
			ingredients: z.array(z.string()).default([]),
		}),
});

export const collections = { blog };
