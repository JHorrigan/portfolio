# Portfolio Project Plan

Last updated: 2026-03-24

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

### Phase 9 — Portfolio Section ✅
- [x] Add `url` column to `portfolio` schema, pushed to Neon via targeted SQL (not seed)
- [x] Populated portfolio table with 3 Xploratech sites via SQL UPDATE
- [x] Screenshots added to `public/` — `xploratech-screenshot.png`, `xa3-screenshot.png`, `xploratech-api-screenshot.png`
- [x] Flip card UI: front = screenshot + title overlay, hover = detail card with description + Visit link
- [x] `app/icon.svg` — JH monogram favicon (replaced default `favicon.ico`)
- [x] "Projects" added to NavMenu
- [x] Build clean, deployed to production

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

### Phase 14 — Digital Twin Improvements
**UX**
- [ ] **Multi-turn conversation**: pass full message history to the API so follow-up questions retain context; keep history client-side only (stateless server)
- [ ] **Markdown rendering**: render assistant responses as markdown (bold, bullets, code) using a lightweight renderer (e.g. `react-markdown` + `remark-gfm`); user bubbles stay plain text
- [ ] **Follow-up suggestion chips**: after each assistant response, show 2–3 contextual follow-up prompts; replace the static `SUGGESTED` list which currently vanishes after the first message
- [ ] **Clean stream signalling**: replace the `__remaining:N__` string injected into the stream body with a proper `X-Remaining` response header read after streaming completes; eliminates fragile regex parsing in the client
- [ ] **Live auto-scroll during streaming**: move `bottomRef.scrollIntoView` inside the chunk loop so the window tracks the response as it streams, not only at the end

**Cost Optimisation**
- [ ] **Cap conversation history sent to API**: send at most the last 6 messages (3 turns) to avoid token bloat as conversations grow; oldest messages dropped client-side before the POST
- [ ] **Trim system prompt**: remove verbose fields (e.g. full role summaries) from `buildSystemPrompt` when highlights are populated — keep only the highest-signal content to minimise prompt tokens
- [ ] **Log token usage**: log `usage.prompt_tokens` + `usage.completion_tokens` from the OpenAI response to the console in development so cost per request is visible
- [ ] **Tune `max_tokens`**: review typical response lengths after logging; lower the 300-token cap if responses consistently finish well below it

**Testing**
- [ ] **Unit test rate limiter**: test `checkRateLimit` logic in isolation — first request, within-window increment, window expiry reset, limit hit
- [ ] **Unit test system prompt builder**: assert `buildSystemPrompt` includes key profile/role/skill fields and handles nulls gracefully
- [ ] **Component test `DigitalTwin`**: use React Testing Library to test suggestion chip click → message appears, input disabled when `remaining === 0`, error state renders
- [ ] **E2E smoke test**: Playwright test that opens `/`, clicks a suggestion chip, and asserts an assistant message appears (mock the `/api/chat` endpoint)
- [ ] **Verify build passes and UX works end-to-end on mobile**

### Phase 13 — Interactive Contact Form
- [ ] Add `contact_messages` table to `db/schema.ts` (id, name, email, message, created_at)
- [ ] Run `npx drizzle-kit push` to create the table
- [ ] Create `app/api/contact/route.ts` — POST handler: validate fields, insert row to DB, return success/error JSON
- [ ] Create `app/components/ContactForm.tsx` — "use client"; name, email, message fields; submit button; inline success/error feedback; loading state
- [ ] Replace `mailto:` link in footer with `ContactForm` component (or add a dedicated `#contact` section above footer)
- [ ] Verify build passes and form submits correctly

### Phase 12 — Company Logos on Roles
- [ ] Add `logo_url` field to `roles` table in `db/schema.ts`
- [ ] Run `npx drizzle-kit push` to apply schema change
- [ ] Add `logo_domain` field instead of `logo_url` — use [logo.dev](https://logo.dev) API (`https://img.logo.dev/{domain}?token=...`) to fetch logos by domain (e.g. `hsbc.com`); store domain in DB, construct URL at render time
- [ ] Populate `logo_domain` for all 7 roles in `db/seed.ts`; fall back to `public/logos/` for any not covered
- [ ] Render logo image in each role card in `page.tsx` (next/image, fallback to company initial if no logo)
- [ ] Verify build passes and logos display correctly on mobile

### Phase 15 — UI/UX Enhancement
> Reviewed 2026-03-26. Goal: elevate visual impact and recruiter UX without changing the design system or adding new sections.

**Priority 1 — Career Journey Timeline (highest impact)**
- [ ] Add vertical timeline spine: a `2px` left-edge line with filled circle nodes connecting all role cards
- [ ] Style nodes with cyan accent (`bg-cyan-400`, `ring-2 ring-cyan-400/30`) and position relative to the `<ol>`
- [ ] Differentiate current/most-recent role node (larger, glowing) vs historical
- [ ] Ensure the spine aligns correctly on mobile (remains left-aligned, not centred)

**Priority 1 — Hero Section Elevation**
- [ ] Break hero out of the generic `.glass rounded-3xl` treatment — give it distinct visual weight (taller, wider paddings, larger h1)
- [ ] Add a subtle dot-grid or scan-line texture overlay in the hero background (CSS, no images)
- [ ] Increase h1 to `text-4xl md:text-7xl`, weight `font-bold`, tighter tracking `tracking-tight`
- [ ] Add a faint cyan glow text-shadow on the h1 via `drop-shadow` utility or inline style
- [ ] Add a "scroll to explore" hint with a small animated chevron below the CTAs

**Priority 2 — Background Texture**
- [ ] Add a full-page `position:fixed` dot-grid overlay in `globals.css` using a radial-gradient background-image (very low opacity, `~3–5%`) — no new assets required
- [ ] Keep the existing radial gradient blobs; stack texture on top

**Priority 2 — Section Header Treatment**
- [ ] Add a leading cyan accent bar (`4px wide, 20px tall, rounded`) before each `h2` section title
- [ ] Or: prefix section numbers (`01`, `02`, `03`…) in a muted monospace style before the title
- [ ] Apply consistently to: About, Skills, Career Journey, Live Projects, Digital Twin

**Priority 2 — Portfolio Card Height & Affordance**
- [ ] Increase flip card height from `h-52` to `h-72` so screenshots are not cramped
- [ ] Add a "hover to explore" affordance label on the front face (small, muted, bottom-right corner)
- [ ] On mobile (no hover), add a `tap to flip` mechanic (toggle via `onClick` state in a new `PortfolioCard` client component)

**Priority 3 — Digital Twin Section Wrapper**
- [ ] In `page.tsx`, wrap `<DigitalTwin />` in a proper `<section id="ask">` with an `h2` header ("Digital Twin") and a 1–2 line descriptor

**Priority 3 — Entry Animations**
- [ ] Add CSS-only `@keyframes fadeInUp` in `globals.css` with `animation-fill-mode: both`
- [ ] Apply `animate-fade-in-up` with staggered `animation-delay` to each `<section>` via a `@theme` animation token in Tailwind v4
- [ ] Use `prefers-reduced-motion` media query to disable for accessibility

**Priority 3 — Footer Upgrade**
- [ ] Replace the bare `<footer>` with a structured footer: name + tagline left, social links (LinkedIn, GitHub, email) right
- [ ] Add a thin top separator line (same cyan gradient line already used at top of page)
- [ ] Add `© 2025 James Horrigan` with location

**Priority 2 — Accordion for Verbose Sections**
- [x] **Career Journey role cards**: `RoleCard.tsx` (`"use client"`) — collapsed by default, most-recent open; chevron rotates; CSS grid-rows animation; timeline spine + dot nodes in `page.tsx`
- [x] **About Me**: `ReadMore.tsx` (`"use client"`) — shows first paragraph; "Read more/less" toggle

**Priority 4 — Nav Active State**
- [ ] Create `NavMenuActive.tsx` (or extend `NavMenu.tsx`) using `IntersectionObserver` to highlight the current section's nav pill
- [ ] Active pill: `bg-cyan-400/10 border-cyan-400/40 text-cyan-200` (already in the design language)

---

## Validation Checklist

- [ ] `npm run build` exits 0
- [ ] Zero TypeScript diagnostics
- [ ] Key anchors navigate correctly: `about`, `skills`, `journey`, `portfolio`, `ask`
- [ ] No hardcoded content — all text from DB
- [ ] `OPENAI_API_KEY` + `IP_SALT` set in `.env.local` and Vercel
