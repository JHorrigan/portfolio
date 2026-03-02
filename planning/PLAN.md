# Portfolio Project Plan (Current)

Last updated: 2026-03-02

## Objective

Maintain and incrementally improve a single-page portfolio for James Horrigan with a clear, modern, enterprise-meets-edgy presentation.

## Current Baseline (2026-03-02)

- Next.js 16.1.6 + React 19 + Tailwind CSS v4
- TypeScript strict mode
- Single-file page implementation in `app/page.tsx` (async RSC)
- Global tokens and utility in `app/globals.css`
- Neon Serverless Postgres + Drizzle ORM — all content DB-backed
- Local production build passing (`npm run build`)

## Source of Truth

- Primary implementation status: `CLAUDE.md`
- DB strategy and phase tracking: `planning/DATABASE_STRATEGY.md`
- Tech stack reference: `planning/TECHSTACK.md`

## Delivery Principles

- Keep implementation simple and incremental.
- Prefer small, verifiable changes.
- Maintain RSC-first approach unless interactivity requires otherwise.
- Keep docs synchronized with implementation.

## Completed Work

### Phase 1 — Scaffold & Design ✅
- [x] Next.js 16.1.6 + React 19 + Tailwind CSS v4 setup
- [x] Single-file `page.tsx` approach, glass morphism design
- [x] All sections: header, hero, about, skills, career journey, footer

### Phase 2 — Content & Polish ✅
- [x] 7-role career timeline from LinkedIn source
- [x] 12 skills grouped by category
- [x] Anchor navigation, footer metadata

### Phase 3 — Database (Neon + Drizzle) ✅
- [x] Neon project created, schema pushed, data seeded
- [x] `db/schema.ts`, `db/index.ts`, `db/queries.ts`, `db/seed.ts`
- [x] All hardcoded content replaced with DB queries in `page.tsx`
- [x] `portfolio` table created and seeded (section commented out pending real content)

### Phase 4 — UX & Meta ✅
- [x] Open Graph and Twitter metadata in `layout.tsx`
- [x] GitHub profile link in hero CTA row (from `profile.github_url`)
- [x] Mobile nav: About/Career/Skills hidden on small screens (`hidden md:flex`)
- [x] JSON-LD `Person` structured data in `page.tsx`

## Active / Future Work

### Phase 5 — Mobile Responsive Polish ✅

#### 5a — Burger menu (nav) ✅
- [x] `app/components/NavMenu.tsx` client component — hamburger on mobile, pill row on md+
- [x] Dropdown includes About, Career, Skills, Contact; closes on link tap
- [x] `page.tsx` imports NavMenu; header stays RSC

#### 5b — Reduce section padding on mobile ✅
- [x] Main wrapper: `gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-14`
- [x] Hero, About, Skills, Journey sections: `p-5 md:p-10/p-12`
- [x] Journey role cards: `p-4`, list spacing `space-y-4`

#### 5c — Tighten typography on mobile ✅
- [x] Hero h1: `text-3xl md:text-6xl`
- [x] Hero summary: `text-sm leading-7 md:text-lg md:leading-8`
- [x] About paragraphs: `leading-7 md:leading-8`
- [x] Journey role title: `<br className="sm:hidden" />` splits role/company on mobile
- [x] Journey role h3: `text-base sm:text-lg`

#### 5d — Additional mobile improvements ✅
- [x] Hero CTA buttons: `flex-col sm:flex-row` with `text-center` on each
- [x] Skills grid: `sm:grid-cols-2` (was `md:grid-cols-2`)
- [x] Header name tracking: `tracking-widest` (was `tracking-[0.18em]`)
- [x] Header `relative z-10` so burger dropdown renders above glass section cards

#### 5e — Consistent text sizing ✅
- [x] All long text blobs use `text-sm leading-7 md:text-lg md:leading-8`
- [x] Applies to: hero summary, about paragraphs, skills intro, career summary, journey role summaries

### Portfolio Section
- [ ] Add real project content to `portfolio` DB table
- [ ] Uncomment portfolio section in `page.tsx`

### Deployment ✅
- [x] Deploy to Vercel with `DATABASE_URL` environment variable
- [x] Custom domain: jameshorrigan.com (DNS via IONOS A records → 76.76.21.21)
- [x] GitHub connected — push to main auto-deploys

## Validation Checklist

1. `npm run build` exits 0.
2. No TypeScript diagnostics.
3. Key anchors navigate correctly (`about`, `skills`, `journey`).
4. No hardcoded content — all text sourced from DB.

## Commands

```bash
npm run dev
npm run build
npm run start
npx drizzle-kit push   # apply schema changes
npx tsx db/seed.ts     # re-seed (truncates first)
```
