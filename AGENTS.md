# Portfolio — James Horrigan

Enterprise-meets-edgy single-page portfolio. Stack: Next.js 16.1.6 + React 19, Tailwind CSS v4, TypeScript strict, Neon Postgres + Drizzle ORM.
See `@planning/TECHSTACK.md` and `@planning/DATABASE_STRATEGY.md` for decisions and rationale.

## Commands

```bash
npm run dev                        # Turbopack dev server → http://localhost:3000
npm run build                      # production build (must exit 0)
npm run start                      # serve production build
npx drizzle-kit push               # push schema changes (requires DATABASE_URL)
npx tsx db/seed.ts --force         # truncate + re-seed all tables
```

## Structure

```
app/
  layout.tsx          # Geist fonts, OG/Twitter metadata
  page.tsx            # async RSC — all sections inline; fetches DB at build time
  globals.css         # @import "tailwindcss" + @theme inline + .glass utility
  api/chat/route.ts   # POST — rate limiting, GPT-4o-mini streaming
  components/
    NavMenu.tsx        # "use client" — burger/pill nav, Download CV dropdown
    DigitalTwin.tsx    # "use client" — messaging UI for digital twin
db/
  schema.ts            # tables: profile, skills, roles, roleSkills, portfolio, education, chatRateLimits
  index.ts             # Neon HTTP client + Drizzle instance
  queries.ts           # getProfile(), getRoles(), getSkillGroups(), getPortfolio()
  seed.ts              # truncate + re-seed (--force required)
public/
  cv.pdf / cv.docx     # ATS-optimised CVs (single-column, plain ASCII)
drizzle.config.ts      # postgresql dialect, points to db/schema.ts
next.config.ts         # reactCompiler: true
planning/
  PLAN.md              # phased plan + checklist
  DATABASE_STRATEGY.md # DB decision rationale
  TECHSTACK.md         # tech stack research
```

## Design System

| Token | Value |
|---|---|
| Background | `#020617` (slate-950) |
| Foreground | `#e2e8f0` (slate-200) |
| Accent | `cyan-300` / `cyan-400` |
| Cards | `.glass` — slate-900 gradient + `backdrop-blur(8px)` + slate border |
| Fonts | Geist Sans (body) + Geist Mono (mono) via `next/font/google` |

Skill category colours (`CATEGORY_COLORS` in `page.tsx`): Backend → cyan, Frontend → violet, AI/ML → emerald, Cloud & DevOps → amber, Delivery → rose.

## Database (Neon)

| Key | Value |
|---|---|
| Project | `ancient-feather-39071286` (eu-west-2) |
| DB | `neondb` |
| Tables | `profile` (1), `skills` (12), `roles` (7), `portfolio` (3), `education` (empty), `chat_rate_limits` (runtime) |
| Env var | `DATABASE_URL` in `.env.local` |

Update content: edit `db/seed.ts --force` or use Neon SQL editor directly.

## Digital Twin

- `app/api/chat/route.ts` — Node runtime, POST; rate limit 5/IP/24h via `chat_rate_limits`; IP stored as SHA-256(ip + IP_SALT); streams GPT-4o-mini (max 300 tokens); stateless; system prompt built from DB at request time
- `app/components/DigitalTwin.tsx` — JH + YOU avatars, suggestion chips, typing dots, streaming cursor, "New chat" button; rose label + status dot when exhausted

## CV Downloads

`public/cv.pdf` + `public/cv.docx` — ATS-optimised (single column, standard headings, action-verb bullets, plain ASCII). Download button in `NavMenu.tsx` (desktop dropdown / mobile burger). **Placeholders still to fill:** phone `+44 [PHONE]`, education, certifications.

## Deployment (Vercel)

- URL: https://jameshorrigan.com — Vercel project `portfolio` (team `james-horrigans-projects-9b275ab9`)
- GitHub `JHorrigan/portfolio` → push to `main` auto-deploys
- Required env vars: `DATABASE_URL`, `OPENAI_API_KEY`, `IP_SALT`
- DNS: IONOS A records → 76.76.21.21

## Conventions

- RSC-first — `"use client"` only in `NavMenu.tsx` and `DigitalTwin.tsx`
- All markup in `page.tsx`; interactive components in `app/components/`
- `.glass` for all section card surfaces
- Content editable via DB only — no code deploys for content changes
- `seed.ts` requires `--force` to prevent accidental truncation
- Tailwind slate/cyan utilities used directly — no custom token classes

## Current Date
Today's date is 2026-03-17.
