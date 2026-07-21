# Style Guide — sebastiancook.com

Living reference for the "Technical Cookbook" visual identity. Source values live in `src/styles/global.css` and `src/consts.ts` — this file documents the *why*, the CSS is the source of truth for exact numbers.

## Brand name

- Public name / wordmark: **Sebastian Cook**.
- Header shows a small line under the wordmark on every page: "Koch is German for 'cook' — hence the cookbook." (`AUTHOR_NAME_HINT` in `src/consts.ts`). This carries the name story permanently instead of only in the first article.
- Real surname (Koch) and professional identity (CONSOS GmbH, Wirtschaftsingenieur) are explained in full on the About page — the public name is a pen name, not a concealment.

## Color palette

Warm off-white base, teal as the one leading accent, terracotta reserved for sparse warm highlights (e.g. warning callouts). Never use terracotta as a second primary accent.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#faf8f4` | `#0e1116` | Page background |
| `--surface` | `#ffffff` | `#161a21` | Cards, header, dialogs |
| `--border` | `#e7e2d8` | `#262b36` | Hairlines, card borders |
| `--black` | `22,24,29` | `232,234,237` | Headings |
| `--gray-dark` | `42,46,55` | `214,218,225` | Body text |
| `--gray` | `106,110,119` | `148,157,173` | Meta text, muted labels |
| `--gray-light` | `241,237,229` | `34,39,50` | Subtle fills (code bg, tag chips) |
| `--accent` | `#0e7c7b` | `#2bb3b1` | Links, hover, primary actions |
| `--accent-dark` | `#0b5f5e` | `#56c9c7` | Link/button hover |
| `--accent-warm` | `#c8622d` | `#e0864a` | Warning callouts only |

Light/dark switches automatically via `prefers-color-scheme` — there is no manual toggle.

## Typography

IBM Plex family (self-hosted via Astro's Google font provider, no runtime request to Google):

- **Serif** (`--font-serif`) — all headings (h1–h6). Gives the "cookbook" warmth without going script/decorative.
- **Sans** (`--font-sans`) — body copy, UI text.
- **Mono** (`--font-mono`) — code blocks, meta lines (dates, reading time), small uppercase labels (e.g. tech-stack label, name-hint).

## Icons

No icon library. Inline SVG only, hand-picked per use (currently just the LinkedIn mark in Header/Footer). Keep icons monochrome (`currentColor`), thin/simple strokes, and sparse — the checklist explicitly flags icon-heavy hero sections as "too busy." If a hero icon is ever added, it must stay a single small mark, never a cluster.

## Imagery

- **Photos**: real, natural color, no filters/desaturation. Currently just the About-page portrait.
- **Diagrams**: clean, generic, flat vector style (see the consent-hierarchy diagram on the CIJ article) — no stock photography, no skeuomorphism. Product logos (Power Platform, Power Apps, Power Automate, Dataverse, Copilot Studio, CIJ) sit in small white rounded tiles regardless of light/dark mode, so their native backgrounds don't clash.
- Article hero images: not yet standardized — see Section B of `Blog_UIUX_Checklist_Combined.md` for the planned 16:9 per-article treatment.

## Voice for kitchen metaphors

Sparse and dry, never forced. "Recipe," "cookbook," "menu" are fair game; avoid stacking more than one per sentence or leaning on chef clichés. Bold the metaphor word itself only where it is being introduced as a concept (see `why-this-site-is-a-cookbook.md` for the calibration).
