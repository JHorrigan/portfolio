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
npx tsx db/seed.ts     # re-seed all tables (truncates first)
```

## Project Structure

```
app/
  layout.tsx       # root layout: Geist Sans + Geist Mono fonts, metadata
  page.tsx         # single file — all sections inline (header, hero, about, skills, journey, footer)
  globals.css      # @import "tailwindcss" + @theme inline (Geist fonts) + .glass utility
  favicon.ico
db/
  schema.ts        # Drizzle table definitions: profile, skills, roles, portfolio, education
  index.ts         # Neon HTTP client + Drizzle instance
  queries.ts       # getProfile(), getRoles(), getSkillGroups(), getPortfolio()
  seed.ts          # truncates and re-seeds all tables
drizzle.config.ts  # points to db/schema.ts, postgresql dialect
.env.local         # DATABASE_URL (not committed)
public/            # empty
next.config.ts     # reactCompiler: true
planning/
  PLAN.md          # current implementation-aligned plan + checklist
  DATABASE_STRATEGY.md  # DB decision rationale and phase tracking
  TECHSTACK.md     # tech stack research notes
```

## Design System (globals.css)

- Background: `#020617` (slate-950 equivalent)
- Foreground: `#e2e8f0` (slate-200)
- `.glass` utility: gradient bg (slate-900 tones) + `backdrop-filter: blur(8px)` + slate border
- Accent: `cyan-300` / `cyan-400` used via Tailwind utilities directly
- Fonts: Geist Sans (body) + Geist Mono (mono) via `next/font/google`

## Current State (2026-03-02)

- All sections inline in `page.tsx` — no separate component files
- `page.tsx` is an async RSC — fetches all content from Neon DB via Drizzle at build time
- All previously hardcoded content (hero, about, career summary, contact, location) now comes from the `profile` DB table
- Career journey (7 roles) rendered from `roles` table
- Skills (12, grouped by category) rendered from `skills` table
- Portfolio section exists in DB (`portfolio` table, 3 rows) but section is commented out in `page.tsx` pending real content
- Build: clean, zero TypeScript errors

## Database (Neon)

- Project: `ancient-feather-39071286` (region: eu-west-2)
- Database: `neondb`
- Tables: `profile` (1 row), `skills` (12 rows), `roles` (7 rows), `portfolio` (3 rows), `education` (empty)
- Connection string in `.env.local` as `DATABASE_URL`
- To update content: edit `db/seed.ts` and re-run, or use Neon SQL editor directly

## Key Conventions

- Single-file page approach — all markup in `page.tsx`
- Tailwind slate/cyan utilities used directly (no custom token classes)
- `.glass` CSS class for card surfaces
- No `"use client"` — all RSC
- Content editable via DB, not code deploy

## Current Date
Today's date is 2026-03-02.
