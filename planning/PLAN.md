# Portfolio Project Plan

## Overview

A single-page portfolio website for James Horrigan — Full Stack Software Engineer with 25+ years experience. Style: enterprise meets edgy. Built with Next.js, TypeScript, Tailwind CSS, running locally.

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

---

## Phase 3: Content Data Layer ✅

Extract all content into `lib/data.ts` as typed TypeScript.

- [x] `types/index.ts` — `Role` and `SkillGroup` types defined
- [x] `lib/data.ts` — career roles encoded
- [x] Skills grouped by domain: Backend, Frontend, AI/ML, Cloud & DevOps, Data
- [ ] **Missing:** Add Trainee Software Engineer role (Marconi PLC, Aug 1996 – Aug 1998)

**Career data encoded:**

| Period | Company | Title | Status |
|--------|---------|-------|--------|
| Oct 2023 – Jul 2025 | Intrum | Full Stack Software Engineer | ✅ |
| Jan 2019 – Jul 2023 | CiiVSOFT | CTO / Software Engineer | ✅ |
| Jan 2017 – Dec 2018 | Pricesearcher.com | Data Platform Engineer | ✅ |
| Mar 2016 – Dec 2016 | Capita | Innovations Technician | ✅ |
| Jan 2008 – Mar 2016 | Capita | Web Administrator / Communications Manager | ✅ |
| Aug 1998 – Sep 2006 | Marconi PLC | Software Engineer | ✅ |
| Aug 1996 – Aug 1998 | Marconi PLC | Trainee Software Engineer | ❌ |

---

## Phase 4: Page Sections — Build Order

Build one section at a time, validate in browser before moving on.

### 4.1 Layout & Navigation
- [ ] `app/layout.tsx` + sticky/fixed nav component
- [ ] Name / initials on left
- [ ] Nav links: About, Career, Skills, Portfolio (smooth scroll)
- [ ] Subtle top border accent line

### 4.2 Hero Section
- [ ] Full-viewport opening section
- [ ] Name: large, bold, monospace — `James Horrigan`
- [ ] Subtitle: `Full Stack Software Engineer`
- [ ] Descriptor line: `Python · AWS · React · AI · Serverless — 25+ years`
- [ ] Subtle CSS `@keyframes` animation (e.g. blinking cursor or slow-panning grid)
- [ ] Single CTA: scroll to career or download CV link

### 4.3 About Section
- [ ] Two-column layout (stacked on mobile)
- [ ] Left: concise first-person statement (2–3 paragraphs)
- [ ] Right: skill tags grouped by domain (from `skillGroups` in `data.ts`)

### 4.4 Career Journey Section
- [ ] Vertical timeline — centrepiece of the site
- [ ] Each entry: company name, role + period, 3–4 impact-led bullet points, tech strip
- [ ] Accent line down the left, year markers styled as monospace/terminal text
- [ ] Spans 1996 – 2025 (all 7 roles)

### 4.5 Skills Section
- [ ] Grouped visual skill display (no bar charts)
- [ ] Categories match `skillGroups` data
- [ ] Grid of labelled tags or styled tag clouds

### 4.6 Portfolio Section (Placeholder)
- [ ] Section heading: "Projects"
- [ ] Placeholder cards with "Coming soon" treatment
- [ ] Card component ready for real data

### 4.7 Contact / Footer
- [ ] LinkedIn: www.linkedin.com/in/jameshorrigan
- [ ] Email: jahorrigan1411@gmail.com
- [ ] Year + name

---

## Phase 5: Responsiveness & Polish

- [ ] Mobile-first check: hero, nav, timeline all reflow correctly
- [ ] Keyboard navigation / focus styles consistent with design
- [ ] Smooth scroll: already set in CSS
- [ ] Consider `animation-timeline: scroll()` for career timeline entrance effects
- [ ] Review typography scale at all breakpoints

---

## Phase 6: Final Review

- [ ] Read through all content for accuracy against LinkedIn PDF
- [ ] Check design consistency: spacing, colour, font usage
- [ ] Confirm local dev runs cleanly (`npm run dev`)
- [ ] Update CLAUDE.md with any final notes

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
