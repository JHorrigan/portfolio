# Portfolio Project Plan

## Overview

A single-page portfolio website for James Horrigan — Full Stack Software Engineer with 25+ years experience. Style: enterprise meets edgy. Built with Next.js, TypeScript, Tailwind CSS, running locally.

---

## Testing Guidelines (All Phases)

### How to Test
1. `npm run dev` — start Turbopack dev server, open http://localhost:3000
2. `npm run build` — TypeScript compile + production build; must complete with zero errors
3. Visual check in browser: Chrome or Firefox at 1440px width and 375px (mobile)
4. Keyboard navigation: Tab through all interactive elements; verify focus rings are visible
5. Scroll: verify smooth scroll to anchors; sections must align under nav

### Success Criteria (Shared)
- `npm run build` exits 0 with no TypeScript errors
- No console errors in browser DevTools
- All design tokens used consistently — no hardcoded hex colours or font names
- No `rounded-xl` or soft corners — aesthetic is sharp/technical
- Only RSC unless `"use client"` is explicitly required for interactivity

---

## Phase 1: Project Bootstrap ✅

Set up a clean Next.js app with TypeScript and Tailwind v4.

- [x] Scaffold with `npx create-next-app@latest` — Next.js 16.1.6, React 19, Tailwind v4
- [x] Delete boilerplate (default page content, global styles beyond base reset)
- [x] Establish folder structure:
  ```
  app/
    layout.tsx       # root layout: fonts, metadata, nav
    page.tsx         # single page, composes all sections
    globals.css      # @import "tailwindcss" + @theme design tokens
  components/
    sections/        # one file per page section (to be created in Phase 4)
    ui/              # reusable primitives (Tag, SectionHeading, etc.)
  lib/
    data.ts          # all content as typed data (career, skills, etc.)
  types/
    index.ts         # shared TypeScript types
  ```
- [x] Add `export const metadata` to `layout.tsx` (Next.js Metadata API)
- [x] Commit: working blank page with design system foundations

### Phase 1 Success Criteria
- `npm run build` completes with zero errors
- `npm run dev` serves a blank dark page at http://localhost:3000
- Folder structure matches spec above

---

## Phase 2: Design System & Visual Identity ✅

Define the "enterprise meets edgy" aesthetic before building sections.

**Colour palette**
- [x] Dark background: `#0a0a0f` with surface `#111118`
- [x] Accent: electric cyan `#00ffe0`
- [x] Text: off-white `#f0f0f4`, muted grey `#666680`
- [x] Borders: low-opacity white `rgba(240,240,244,0.08)`

**Typography**
- [x] Heading/mono: `JetBrains Mono` — loaded via `next/font/google`
- [x] Body: `Inter` — loaded via `next/font/google`

**Deliverable**
- [x] All tokens defined in `app/globals.css` under `@theme inline`
- [x] `html { scroll-behavior: smooth }` set
- [x] Body background and font defaults applied

### Phase 2 Success Criteria
- `app/globals.css` contains all 5 colour tokens and 2 font tokens under `@theme inline`
- Body renders with `#0a0a0f` background
- Inter loads as body font, JetBrains Mono loads as mono font
- No Tailwind config file — CSS-first config only

---

## Phase 3: Content Data Layer ✅

Extract all content into `lib/data.ts` as typed TypeScript.

- [x] `types/index.ts` — `Role` and `SkillGroup` types defined
- [x] `lib/data.ts` — career roles encoded
- [x] Skills grouped by domain: Backend, Frontend, AI/ML, Cloud & DevOps, Data
- [x] Add Trainee Software Engineer role (Marconi PLC, Aug 1996 – Aug 1998)

**Career data encoded:**

| Period | Company | Title | Status |
|--------|---------|-------|--------|
| Oct 2023 – Jul 2025 | Intrum | Full Stack Software Engineer | ✅ |
| Jan 2019 – Jul 2023 | CiiVSOFT | CTO / Software Engineer | ✅ |
| Jan 2017 – Dec 2018 | Pricesearcher.com | Data Platform Engineer | ✅ |
| Mar 2016 – Dec 2016 | Capita | Innovations Technician | ✅ |
| Jan 2008 – Mar 2016 | Capita | Web Administrator / Communications Manager | ✅ |
| Aug 1998 – Sep 2006 | Marconi PLC | Software Engineer | ✅ |
| Aug 1996 – Aug 1998 | Marconi PLC | Trainee Software Engineer | ✅ |

### Phase 3 Success Criteria
- `lib/data.ts` exports `roles` array with exactly 7 entries (all roles including Trainee)
- `lib/data.ts` exports `skillGroups` array with 5 groups
- `types/index.ts` defines `Role` and `SkillGroup` types
- TypeScript strict mode passes: `npm run build` with zero type errors
- All role entries have: company, title, period, location, summary (≥1 bullet), tech (≥1 item)

---

## Phase 4: Page Sections ✅

Build one section at a time, validate in browser before moving on.

### 4.1 Layout & Navigation ✅
- [x] Sticky nav bar at top of page
- [x] Site name / initials on left: `JH` in accent colour, monospace font
- [x] Nav links: About, Career, Skills, Portfolio (smooth scroll anchors)
- [x] 1px top accent line in cyan
- [x] Nav background: `bg-surface` with bottom border

**4.1 Success Criteria**
- Nav sticks to top while scrolling
- All 4 nav links scroll to correct section (About, Career, Skills, Portfolio)
- `JH` branding visible in accent colour on left
- No layout overflow at 375px mobile width
- Accent top border is visible (1px cyan line)

### 4.2 Hero Section ✅
- [x] Full-viewport opening section (`min-h-screen`)
- [x] Name: `James Horrigan` in large bold monospace
- [x] Subtitle: `Full Stack Software Engineer`
- [x] Descriptor line: `Python · AWS · React · AI · Serverless — 25+ years`
- [x] Subtle CSS `@keyframes` animation (blinking cursor)
- [x] CTA: scroll-to-career link

**4.2 Success Criteria**
- Hero fills full viewport height
- Name is visually dominant — largest text on page, monospace font
- Accent colour used on at least one element (cursor or highlight)
- Descriptor line is visible and readable
- CTA button/link is present and scrolls to Career section
- Blinking cursor animation is smooth, no jank
- No layout overflow at 375px

### 4.3 About Section ✅
- [x] Two-column layout (stacks on mobile)
- [x] Left column: concise first-person statement (2–3 paragraphs)
- [x] Right column: skill tags grouped by domain from `skillGroups` in `data.ts`

**4.3 Success Criteria**
- Section has `id="about"` for nav scroll target
- About text is first-person, 2–3 paragraphs, accurate to career
- Skill groups match exactly the 5 groups in `skillGroups` data (no hardcoded skills)
- Tags use consistent styling — no rounded pill softness
- Two columns on desktop, single column on mobile (≤640px)

### 4.4 Career Journey Section ✅
- [x] Vertical timeline — centrepiece of the site
- [x] Accent line down the left side
- [x] Each entry: company, role + period, bullet points, tech strip
- [x] Year/period markers styled as monospace/terminal text
- [x] All 7 roles from `roles` data array rendered

**4.4 Success Criteria**
- Section has `id="career"` for nav scroll target
- Exactly 7 role entries rendered (matches `roles` array length)
- Each entry shows: company name, title, period, all summary bullets, all tech tags
- Vertical accent line visible on left side
- Period/year labels are monospace font
- Tech tags are consistent with About section tag style
- Roles rendered in chronological order (most recent first)
- No layout overflow at 375px

### 4.5 Skills Section ✅
- [x] Section heading: `Skills`
- [x] Grouped visual display — grid of labelled tag groups
- [x] All 5 `skillGroups` from data rendered
- [x] No bar charts — tag-based display only

**4.5 Success Criteria**
- Section has `id="skills"` for nav scroll target
- All 5 skill group labels visible
- All skills within each group rendered (no hardcoded content)
- Grid layout with group labels prominent
- Consistent tag styling matching Career section
- Responsive: stacks to single column on mobile

### 4.6 Portfolio Section (Placeholder) ✅
- [x] Section heading: `Projects`
- [x] Placeholder cards with "Coming soon" treatment
- [x] Card border and layout ready for real data

**4.6 Success Criteria**
- Section has `id="portfolio"` for nav scroll target
- At least 2–3 placeholder cards visible
- "Coming soon" or similar placeholder text clear
- Cards use `bg-surface` and border token, no soft corners
- Grid layout — responsive

### 4.7 Contact / Footer ✅
- [x] LinkedIn link: `https://www.linkedin.com/in/jameshorrigan`
- [x] Email: `jahorrigan1411@gmail.com`
- [x] Copyright line: year + name
- [x] Top border separator

**4.7 Success Criteria**
- LinkedIn and email links present and use correct URLs
- Links open (LinkedIn in new tab, email via mailto)
- Copyright year is 2025 or current
- Footer uses muted text, clear separation from portfolio section

---

## Phase 5: Responsiveness & Polish

- [ ] Mobile-first check: hero, nav, timeline all reflow correctly
- [ ] Keyboard navigation / focus styles consistent with design
- [ ] Smooth scroll: already set in CSS
- [ ] Consider `animation-timeline: scroll()` for career timeline entrance effects
- [ ] Review typography scale at all breakpoints

### Phase 5 Success Criteria
- All sections pass visual check at 375px (iPhone SE) and 768px (tablet)
- No horizontal overflow at any breakpoint
- Tab order is logical: nav → hero → about → career → skills → portfolio → footer
- Focus ring visible on all interactive elements (links, buttons)

---

## Phase 6: Final Review

- [ ] Read through all content for accuracy against LinkedIn PDF
- [ ] Check design consistency: spacing, colour, font usage
- [ ] Confirm local dev runs cleanly (`npm run dev`)
- [ ] Update CLAUDE.md with final notes

### Phase 6 Success Criteria
- Zero TypeScript errors on `npm run build`
- Zero console errors in browser
- All content matches LinkedIn career history
- Visual review passes: colours, typography, spacing all consistent with design system
- CLAUDE.md `## Current State` section updated to reflect complete Phase 4

---

## Commands

```bash
npm run dev       # start local dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
```

---

## Out of Scope (for now)

- Deployment / hosting
- CMS or dynamic content
- Contact form with backend
- Dark/light mode toggle
- Animations beyond subtle CSS
- Actual portfolio project content (placeholder only)
