# sebastiankoch.dev — blog

Personal blog for Sebastian Koch: Power Platform, Dynamics 365, Customer
Insights - Journeys, AI/Copilot, and GDPR-compliant consent architecture.
Static site built with [Astro](https://astro.build), no backend, no database.

## Project structure

```text
├── public/                  static assets (favicon, robots.txt, ...)
├── src/
│   ├── assets/               images and fonts, processed by Astro
│   ├── components/            BaseHead, Header, Footer, ...
│   ├── content/blog/           articles (Markdown/MDX)
│   ├── layouts/BlogPost.astro  article page layout
│   ├── pages/                  routes: home, blog, tags, about, 404, rss.xml
│   ├── utils/                  reading-time and tag-slug helpers
│   ├── consts.ts               site title, description, tagline, author, links
│   └── content.config.ts       frontmatter schema for the blog collection
├── astro.config.mjs
└── package.json
```

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`        | Start local dev server at `localhost:4321`   |
| `npm run build`      | Build the production site to `./dist/`       |
| `npm run preview`    | Preview the production build locally         |

## Writing an article

Add a Markdown (or MDX) file under `src/content/blog/`. Frontmatter fields
(see `src/content.config.ts`):

```yaml
---
title: 'Article title'
description: 'One or two sentences for previews, meta description, and RSS.'
pubDate: 2026-08-01
updatedDate: 2026-08-15 # optional
tags: ['Customer Insights - Journeys', 'GDPR'] # optional, default []
draft: false # optional, default false
canonical: 'https://example.com/original' # optional, if cross-posted
heroImage: ../../assets/your-image.jpg # optional
---
```

- Set `draft: true` to keep a post out of the production build, the blog
  list, tag pages, and the RSS feed. Drafts still render in `npm run dev` so
  you can preview them.
- Reading time and the RSS feed are generated automatically from the post
  content and frontmatter — nothing else to wire up.
- **Anonymize before publishing**: no real client names, no real GUIDs, no
  internal field/plugin names (see `Blog_Build_Brief_Astro.md` §9 and
  `Blog_Themen_CIJ.md`).

## Before going live

Two placeholders need real values:

1. `site` in `astro.config.mjs` — currently `https://example.com`. This feeds
   canonical URLs, the sitemap, RSS, and Open Graph tags, so set it to your
   real Cloudflare Pages URL (or custom domain) before the first deploy that
   matters.
2. `LINKEDIN_URL` in `src/consts.ts` — currently `#`. Set it to your LinkedIn
   profile URL; it's used in the header and footer.

## Deploying to Cloudflare

Cloudflare now serves static sites through the unified Workers platform
(static assets), configured via `wrangler.jsonc` in the repo root:

```jsonc
{
	"name": "sebastian-koch-blog",
	"compatibility_date": "2026-07-17",
	"assets": {
		"directory": "./dist"
	}
}
```

No `main` entry is needed — this is a pure static-assets deployment, no
Worker script involved.

1. Push this repository to GitHub.
2. In the Cloudflare dashboard: **Compute (Workers) → Create application →
   Import a repository**, and select this repo.
3. Build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy` (default — reads `wrangler.jsonc`)
4. Deploy. Cloudflare gives you a free `*.workers.dev` subdomain immediately;
   attach your own domain later under the project's custom domains settings.
5. Update `site` in `astro.config.mjs` to match whichever URL is live and
   redeploy, so canonical URLs, sitemap, and RSS point at the real site.
