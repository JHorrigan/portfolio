# Portfolio Project Plan

Last updated: 2026-03-17

## References
- DB strategy & rationale: `@planning/DATABASE_STRATEGY.md`
- Tech stack decisions: `@planning/TECHSTACK.md`
- Implementation status (source of truth): `@AGENTS.md`

## Objective

Maintain and incrementally improve a single-page portfolio for James Horrigan with a clear, modern, enterprise-meets-edgy presentation.

## Principles

- Simple and incremental. Small, verifiable changes.
- RSC-first unless interactivity requires `"use client"`.
- Content editable via DB, not code deploys.
- Docs stay synchronised with implementation.

---

## Completed Phases

### Phase 1 — Scaffold & Design ✅
- [x] Next.js 16.1.6 + React 19 + Tailwind CSS v4 setup
- [x] Single-file `page.tsx`, glass morphism design system
- [x] All sections: header, hero, about, skills, career journey, footer

### Phase 2 — Content & Polish ✅
- [x] 7-role career timeline
- [x] 12 skills grouped by category with `CATEGORY_COLORS`
- [x] Anchor navigation, footer metadata

### Phase 3 — Database (Neon + Drizzle) ✅
- [x] Neon project + schema pushed + data seeded
- [x] `db/schema.ts`, `db/index.ts`, `db/queries.ts`, `db/seed.ts`
- [x] All hardcoded content replaced with DB queries in `page.tsx`
- [x] `portfolio` table created and seeded (section commented out pending real content)

### Phase 4 — UX & Meta ✅
- [x] Open Graph + Twitter metadata in `layout.tsx`
- [x] GitHub profile link from `profile.github_url`
- [x] JSON-LD `Person` structured data in `page.tsx`

### Phase 5 — Mobile Responsive Polish ✅
- [x] `NavMenu.tsx` — hamburger on mobile, pill row on md+
- [x] Responsive padding: `gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-14`
- [x] Responsive typography: hero h1 `text-3xl md:text-6xl`, all long text `text-sm leading-7 md:text-lg md:leading-8`
- [x] Hero CTA: `flex-col sm:flex-row`
- [x] Skills grid: `sm:grid-cols-2 md:grid-cols-3`

### Phase 6 — Skills Section Redesign ✅
- [x] Cards compacted: `p-3/p-4`, `rounded-xl`, `text-xs` pills
- [x] Colour-coded by category via `CATEGORY_COLORS`

### Phase 7 — Digital Twin ✅
- [x] `chat_rate_limits` Neon table (ip_hash, count, window_start)
- [x] `app/api/chat/route.ts` — rate limiting, system prompt from DB, GPT-4o-mini streaming
- [x] `app/components/DigitalTwin.tsx` — messaging UI with avatars, chips, typing dots, streaming cursor
- [x] Rate limit: 5/IP/24h; rose state on exhaustion; in-chat message on limit hit
- [x] `db/seed.ts` guarded with `--force`
- [x] NavMenu "Ask" link added

### Phase 8 — CV Downloads ✅
- [x] `public/cv.pdf` + `public/cv.docx` — ATS-optimised (single column, action-verb bullets, plain ASCII)
- [x] Download CV dropdown in `NavMenu.tsx` (desktop + mobile)
- [ ] Fill placeholders: phone number, education, certifications

### Deployment ✅
- [x] Vercel deployment with all env vars (`DATABASE_URL`, `OPENAI_API_KEY`, `IP_SALT`)
- [x] Custom domain `jameshorrigan.com` (DNS via IONOS → 76.76.21.21)
- [x] GitHub auto-deploy on push to `main`

---

## Active / Future Work

### Phase 9 — Portfolio Section
- [ ] Add real project content to `portfolio` DB table
- [ ] Uncomment portfolio section in `page.tsx`
- [ ] Verify build passes and section renders correctly

### Phase 10 — Search
> **Awaiting scope confirmation.** Assumed: client-side search across skills/roles/content on the page.
- [ ] Define search scope (skills, roles, all sections?)
- [ ] Implement `SearchBar.tsx` client component
- [ ] Wire to DB-sourced content (already fetched in `page.tsx`)
- [ ] Add to `NavMenu.tsx` or inline above relevant section
- [ ] Verify no regression on build + mobile layout

### Phase 11 — Content Completion
- [ ] Populate `highlights` field in `db/seed.ts` for all 7 roles
- [ ] Render `highlights` bullet list in role cards in `page.tsx`
- [ ] Add `certifications` table to `db/schema.ts` (id, title, issuer, date, sort_order)
- [ ] Run `npx drizzle-kit push` to create certifications table
- [ ] Populate `education` and `certifications` rows in `db/seed.ts`
- [ ] Add `getEducation()` and `getCertifications()` queries to `db/queries.ts`
- [ ] Render education + certifications sections in `page.tsx`
- [ ] Update CV placeholders: phone number, education, certifications
- [ ] Ensure every skill category has a distinct entry in `CATEGORY_COLORS` in `page.tsx` (border, label, pill classes) — update if new categories are added
- [ ] Verify build passes

### Phase 12 — Company Logos on Roles
- [ ] Add `logo_url` field to `roles` table in `db/schema.ts`
- [ ] Run `npx drizzle-kit push` to apply schema change
- [ ] Add `logo_domain` field instead of `logo_url` — use [logo.dev](https://logo.dev) API (`https://img.logo.dev/{domain}?token=...`) to fetch logos by domain (e.g. `hsbc.com`); store domain in DB, construct URL at render time
- [ ] Populate `logo_domain` for all 7 roles in `db/seed.ts`; fall back to `public/logos/` for any not covered
- [ ] Render logo image in each role card in `page.tsx` (next/image, fallback to company initial if no logo)
- [ ] Verify build passes and logos display correctly on mobile

---

## Validation Checklist

- [ ] `npm run build` exits 0
- [ ] Zero TypeScript diagnostics
- [ ] Key anchors navigate correctly: `about`, `skills`, `journey`, `ask`
- [ ] No hardcoded content — all text from DB
- [ ] `OPENAI_API_KEY` + `IP_SALT` set in `.env.local` and Vercel
