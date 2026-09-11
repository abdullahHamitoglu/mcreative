# M Creative

Marketing site for M Creative, built on the same stack as moumin-designer — Next.js 15 (App Router) + Payload CMS 3 + MongoDB — trimmed down to just what a marketing site needs (no courses, payments, auth-gated features, or i18n routing).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Payload CMS 3** with the MongoDB adapter — all homepage content (hero, services, offers, process, markets, about, footer) is editable from `/admin`
- **Tailwind CSS v4**
- **framer-motion** for scroll reveals and the mobile menu
- **MongoDB 7** via Docker Compose for local dev

## First-time setup

1. Start MongoDB:
   ```bash
   docker compose up -d
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env` if you don't already have one (a `.env` with a generated `PAYLOAD_SECRET` was created for you).
4. Generate Payload's build artifacts — these are gitignored (regenerated from `src/payload.config.ts` and the collections/globals, so they'd drift from source if committed), but the app won't build without them on a fresh clone:
   ```bash
   pnpm generate:importmap
   pnpm generate:types
   ```
5. Run the dev server:
   ```bash
   pnpm dev
   ```
6. Open [http://localhost:3000/admin](http://localhost:3000/admin) and create the first admin user (Payload prompts for this automatically on first visit).
7. Seed the homepage content:
   ```bash
   pnpm seed
   ```
8. Visit [http://localhost:3000](http://localhost:3000) and its subpages — everything renders from what's now in the database, editable any time from `/admin`.

Re-run step 4 any time you add a collection/global field or a custom admin component — Payload doesn't pick those up automatically.

## Site structure

This is a real multi-page site — the navbar links to separate routes, not scroll anchors on one page:

| Route | Source |
|---|---|
| `/` | Global: **Homepage** (hero + pricing statement) + short teasers pulling from each collection below |
| `/services` | Collection: **Services** |
| `/offers` | Collection: **Offers** |
| `/markets` | Collection: **Markets** |
| `/projects`, `/projects/[slug]` | Collection: **Projects** — each project can credit a team (name + role) and carries its own gallery |
| `/about` | Global: **About Page** — story, "منهجنا" (process), and founders with bio/photo |

## Content model

- **Global: Site Settings** — site name, contact email/WhatsApp, social links, nav links, footer copyright text.
- **Global: Homepage** — hero, pricing statement, footer "about" text.
- **Global: About Page** — hero title/subtitle/image, story, process steps ("منهجنا"), founders.
- **Collections: Services / Offers / Markets** — each a simple list with an `order` field for manual sorting.
- **Collection: Projects** — title, slug, client, category, summary/description, cover image, gallery, team credits, `featured` (shows on the homepage teaser). **Seeded empty on purpose** — no fabricated case studies; add real projects (with real client/team credit) from `/admin` → Projects.
- **Collection: Media** — uploads.
- **Collection: Users** — admin login only.

## What was intentionally left out

Per scope decision: no courses/marketplace, no Paddle payments, no learner auth/community/certificates, no Cloudflare Workers deployment tooling, no multi-locale routing. If any of that is needed later, moumin-designer's collections under `src/collections/courses/`, `src/collections/community/`, etc. are the reference implementation to port from.
