# sebastiankoch.dev — blog

Personal blog for Sebastian Koch: Power Platform, Dynamics 365, Customer
Insights - Journeys, AI/Copilot, and GDPR-compliant consent architecture.
Static site built with [Astro](https://astro.build). The site itself is
static; a small Cloudflare Worker + D1 database sits behind it only to
power comments (see below).

## Project structure

```text
├── migrations/                D1 schema migrations (comments table)
├── worker/index.js             Worker: /api/comments + /api/admin/comments,
│                                falls through to static assets otherwise
├── public/                  static assets (favicon, robots.txt, ...)
├── src/
│   ├── assets/               images and fonts, processed by Astro
│   ├── components/            BaseHead, Header, Footer, Comments, ...
│   ├── content/blog/           articles (Markdown/MDX)
│   ├── layouts/BlogPost.astro  article page layout
│   ├── pages/                  routes: home, blog, tags, about, 404, rss.xml,
│   │                           admin/comments (moderation queue)
│   ├── utils/                  reading-time and tag-slug helpers
│   ├── consts.ts               site title, description, tagline, author, links
│   └── content.config.ts       frontmatter schema for the blog collection
├── astro.config.mjs
├── wrangler.jsonc              Worker/assets/D1 config for Cloudflare
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
  internal field/plugin names (see `feedback/Blog_Build_Brief_Astro.md` §9 and
  `feedback/Blog_Themen_CIJ.md`).

## Comments

Comments are anonymous (readers pick their own display name, no account
needed) and support one level of threaded replies. No third-party widget —
it's a small Cloudflare Worker (`worker/index.js`) plus a D1 database
(`migrations/0001_create_comments.sql`), guarded by Cloudflare Turnstile and
a manual moderation queue: every new comment is stored as `pending` and only
appears publicly once approved.

- **Post/read comments**: handled automatically by the `Comments` component
  on each article page — nothing to configure per post.
- **Moderate**: open `/admin/comments/`, paste the admin secret once (stored
  in that browser's `localStorage`), then Approve or Reject each pending
  comment. The page is `noindex`ed and excluded from the sitemap, but it is
  not otherwise hidden — do not share the URL, and treat the admin secret
  like a password.
- **Secrets**: `TURNSTILE_SECRET` (Cloudflare Turnstile) and `ADMIN_SECRET`
  (moderation queue) are stored as Worker secrets via
  `npx wrangler secret put <NAME>`, not in the repo. For local development,
  put the same names in a git-ignored `.dev.vars` file; Cloudflare's
  documented "always passes" Turnstile test secret
  (`1x0000000000000000000000000000000AA`) works fine there so you don't need
  the real one locally.
- **Local end-to-end testing**: `npm run build && npx wrangler dev` runs the
  real Worker against a local D1 simulation (seeded via
  `npx wrangler d1 migrations apply sebastian-koch-blog-comments --local`).
  Plain `npm run dev` (Astro's dev server) does not run the Worker, so
  `/api/comments` calls will 404 there.
- **Schema changes**: add a new file under `migrations/`, then apply it with
  `npx wrangler d1 migrations apply sebastian-koch-blog-comments --remote`
  (and `--local` for your dev database).
- No IP addresses or other visitor metadata are stored — just name, comment
  body, timestamp, and the thread relationship.

## Before going live

Two placeholders need real values:

1. `site` in `astro.config.mjs` — currently `https://example.com`. This feeds
   canonical URLs, the sitemap, RSS, and Open Graph tags, so set it to your
   real Cloudflare Pages URL (or custom domain) before the first deploy that
   matters.
2. `LINKEDIN_URL` in `src/consts.ts` — currently `#`. Set it to your LinkedIn
   profile URL; it's used in the header and footer.

## Deploying to Cloudflare

Cloudflare serves the site through the unified Workers platform: static
assets plus the small comments Worker, configured via `wrangler.jsonc` in
the repo root (`main` is the Worker entry, `assets` is the static build
output, `d1_databases` binds the comments database).

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
