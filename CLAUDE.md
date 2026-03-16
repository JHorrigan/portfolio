# Portfolio Project

A professional portfolio project for James Horrigan, a software engineer. The website style is stunning: enterprise meets edgy. It includes about me, career journey, and links to a portfolio (for future). The website runs locally. It is built using NextJS, Typescript, Tailwind.

## Tech

- **Next.js 16.1.6** with React 19 — App Router, RSC-first
- **Tailwind CSS v4** — CSS-first config via `@theme inline` in `globals.css`, no `tailwind.config.js`
- **TypeScript** strict mode
- No `src/` directory — `app/` at root
- **Neon (Serverless Postgres)** — content stored in DB, queried via Drizzle ORM in RSC
- **Drizzle ORM** — `drizzle-orm/neon-http`, schema in `db/schema.ts`

## Commands

```bash
npm run dev       # start local dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
npx drizzle-kit push   # push schema changes to Neon (requires DATABASE_URL)
npx tsx db/seed.ts --force   # re-seed all tables (truncates first — --force required)
```

## Project Structure

```
app/
  layout.tsx            # root layout: Geist Sans + Geist Mono fonts, metadata
  page.tsx              # single file — all sections inline (header, hero, about, skills, journey, ask, footer)
  globals.css           # @import "tailwindcss" + @theme inline (Geist fonts) + .glass utility
  favicon.ico
  api/
    chat/
      route.ts          # POST — digital twin chat: rate limiting, context building, GPT-4o-mini streaming
  components/
    NavMenu.tsx         # "use client" — burger menu on mobile, pill row on md+
    DigitalTwin.tsx     # "use client" — messaging-style chat UI for the digital twin
db/
  schema.ts        # Drizzle table definitions: profile, skills, roles, portfolio, education, chatRateLimits
  index.ts         # Neon HTTP client + Drizzle instance
  queries.ts       # getProfile(), getRoles(), getSkillGroups(), getPortfolio()
  seed.ts          # truncates and re-seeds all tables (requires --force flag)
drizzle.config.ts  # points to db/schema.ts, postgresql dialect
.env.local         # DATABASE_URL, OPENAI_API_KEY, IP_SALT (not committed)
public/            # empty
next.config.ts     # reactCompiler: true
planning/
  PLAN.md          # phased plan + checklist
  DATABASE_STRATEGY.md  # DB decision rationale and phase tracking
  TECHSTACK.md     # tech stack research notes
```

## Design System (globals.css)

- Background: `#020617` (slate-950 equivalent)
- Foreground: `#e2e8f0` (slate-200)
- `.glass` utility: gradient bg (slate-900 tones) + `backdrop-filter: blur(8px)` + slate border
- Accent: `cyan-300` / `cyan-400` used via Tailwind utilities directly
- Fonts: Geist Sans (body) + Geist Mono (mono) via `next/font/google`

## Current State (2026-03-16)

- All sections inline in `page.tsx` — two separate components: `NavMenu.tsx` and `DigitalTwin.tsx`
- `page.tsx` is an async RSC — fetches all content from Neon DB via Drizzle at build time
- All content (hero, about, career summary, contact, location, GitHub URL) sourced from `profile` DB table
- Career journey (7 roles) rendered from `roles` table
- Skills (12, grouped by category) rendered from `skills` table
- Portfolio section exists in DB (`portfolio` table, 3 rows) but commented out in `page.tsx` pending real content
- Hero CTA row: LinkedIn + GitHub buttons (both from DB); stack vertically on mobile
- Header nav: `NavMenu` client component — burger menu on mobile, pill row on md+; links: About, Career, Skills, Ask
- Skills grid: `sm:grid-cols-2 md:grid-cols-3`, compact cards (`p-3/p-4`, `rounded-xl`, `text-xs` pills)
- Skills colour-coded by category via `CATEGORY_COLORS` map at top of `page.tsx`
- All long text blobs: `text-sm leading-7 md:text-lg md:leading-8`
- Open Graph + Twitter metadata in `layout.tsx`
- JSON-LD `Person` schema in `page.tsx`
- **Digital Twin** ("Ask James") section: messaging-style chat UI powered by GPT-4o-mini
  - `app/api/chat/route.ts` — POST handler, IP-hash rate limiting (5/day), streams response
  - `app/components/DigitalTwin.tsx` — client component; JH + YOU avatars, suggestion chips, typing indicator, "New chat" button, limit exhaustion state (rose label + in-chat message)
  - `chat_rate_limits` Neon table tracks per-IP usage (SHA-256 hashed IP + salt, 24h window)
  - Requires `OPENAI_API_KEY` in `.env.local` and Vercel env vars
- `db/seed.ts` requires `--force` flag — aborts safely without it
- Build: clean, zero TypeScript errors

## Deployment (Vercel)

- Production URL: https://jameshorrigan.com
- Vercel project: `portfolio` (team: james-horrigans-projects-9b275ab9)
- Environment variables required: `DATABASE_URL`, `OPENAI_API_KEY`, `IP_SALT`
- GitHub (`JHorrigan/portfolio`) connected to Vercel — push to `main` auto-deploys
- Custom domain `jameshorrigan.com` + `www.jameshorrigan.com` configured (DNS via IONOS)
- Deploy command: `npx vercel --prod` (or push to main)

## Backlog

- Populate `portfolio` DB table with real projects and uncomment the section in `page.tsx`

## Database (Neon)

- Project: `ancient-feather-39071286` (region: eu-west-2)
- Database: `neondb`
- Tables: `profile` (1 row), `skills` (12 rows), `roles` (7 rows), `portfolio` (3 rows), `education` (empty), `chat_rate_limits` (runtime rows)
- Connection string in `.env.local` as `DATABASE_URL`
- To update content: edit `db/seed.ts` and re-run with `--force`, or use Neon SQL editor directly

## Key Conventions

- Single-file page approach — all markup in `page.tsx`; interactive components extracted to `app/components/`
- Tailwind slate/cyan utilities used directly (no custom token classes)
- `.glass` CSS class for card surfaces
- RSC-first — `NavMenu.tsx` and `DigitalTwin.tsx` use `"use client"`; everything else is RSC
- Content editable via DB, not code deploy
- `db/seed.ts` requires `--force` flag to prevent accidental truncation

## Digital Twin — Key Details

- API route: `app/api/chat/route.ts` — Node runtime, POST only
- Model: `gpt-4o-mini`, max 300 tokens per response, stateless (no conversation history passed)
- Rate limit: 5 requests per IP per 24-hour window, tracked in `chat_rate_limits` Neon table
- IP stored as SHA-256 hash of `ip + IP_SALT` env var — raw IPs never persisted
- Limit bypass note: IP-based limiting is bypassable via VPN; this is acceptable for a public portfolio
- System prompt built at request time from live DB data (profile + roles + skills)

## Current Date
Today's date is 2026-03-16.
