# Portfolio Project Plan

## Overview

A single-page portfolio website for James Horrigan — Full Stack Software Engineer with 25+ years experience. Style: enterprise meets edgy. Built with Next.js, TypeScript, Tailwind CSS, running locally.

---

## Phase 1: Project Bootstrap

Set up a clean Next.js 15 app with TypeScript and Tailwind v4.

- `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-eslint`
  - As of Next.js 15.2, this scaffolds with Tailwind CSS v4 automatically
- Delete boilerplate (default page content, global styles beyond base reset)
- Establish folder structure:
  ```
  app/
    layout.tsx       # root layout: fonts, metadata, nav
    page.tsx         # single page, composes all sections
    globals.css      # @import "tailwindcss" + @theme design tokens
  components/
    sections/        # one file per page section
    ui/              # reusable primitives (Tag, SectionHeading, etc.)
  lib/
    data.ts          # all content as typed data (career, skills, etc.)
  types/
    index.ts         # shared TypeScript types
  ```
- Add `export const metadata` to `layout.tsx` (Next.js Metadata API — no react-helmet)
- Commit: working blank page with design system foundations

---

## Phase 2: Design System & Visual Identity

Define the "enterprise meets edgy" aesthetic before building sections.

**Colour palette**
- Dark background: near-black (`#0a0a0f`) with subtle dark navy tones
- Accent: electric cyan or acid green — sharp, technical, modern
- Text: off-white primary, muted grey secondary
- Borders/dividers: low-opacity white or accent colour at low opacity

**Typography**
- Heading: `JetBrains Mono` or `Space Grotesk` — technical, structured
- Body: `Inter` or `DM Sans` — clean and readable

**Design motifs**
- Thin rule lines, grid overlays, subtle noise/grain texture
- Sharp corners (no rounded-xl softness)
- Minimal use of colour — accent used sparingly for emphasis only
- Monospace numbers for years/stats

**Deliverable:** All tokens defined in `app/globals.css` under `@theme` — Tailwind v4 converts them to utility classes automatically (e.g. `bg-bg`, `text-accent`). No `tailwind.config.js` or `design-tokens.ts` file needed.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg:      #0a0a0f;
  --color-surface: #111118;
  --color-accent:  #00ffe0;   /* or acid green -- decide in Phase 2 */
  --color-text:    #f0f0f0;
  --color-muted:   #666680;
  --font-mono: 'JetBrains Mono Variable', monospace;
  --font-sans: 'Inter Variable', sans-serif;
}
```

Fonts loaded via `next/font/google` in `layout.tsx` (self-hosted, no CLS, no Google requests at runtime).

---

## Phase 3: Content Data Layer

Extract all content into `lib/data.ts` as typed TypeScript so components are purely presentational.

```ts
// Key types
type Role = {
  company: string
  title: string
  period: string
  location: string
  summary: string[]     // key points, not full prose
  tech: string[]
}

type Section = 'hero' | 'about' | 'career' | 'skills' | 'portfolio'
```

**Career data to encode (from LinkedIn PDF):**

| Period | Company | Title |
|--------|---------|-------|
| Oct 2023 – Jul 2025 | Intrum | Full Stack Software Engineer |
| Jan 2019 – Jul 2023 | CiiVSOFT | CTO / Software Engineer |
| Jan 2017 – Dec 2018 | Pricesearcher.com | Data Platform Engineer |
| Mar 2016 – Dec 2016 | Capita | Innovations Technician |
| Jan 2008 – Mar 2016 | Capita | Web Administrator / Communications Manager |
| Aug 1998 – Sep 2006 | Marconi PLC | Software Engineer |
| Aug 1996 – Aug 1998 | Marconi PLC | Trainee Software Engineer |

**Skills to highlight:** Python, AWS, Serverless, React, Next.js, TypeScript, Tailwind, Docker, AI/NLP, API Development, Agile

---

## Phase 4: Page Sections — Build Order

Build one section at a time, validate in browser before moving on.

### 4.1 Layout & Navigation

`app/layout.tsx` + sticky/fixed nav component.
- Name / initials on left
- Nav links: About, Career, Skills, Portfolio (smooth scroll)
- Subtle top border accent line
- No hamburger menu needed (single page, few links)

### 4.2 Hero Section

Full-viewport opening section.
- Name: large, bold, monospace — `James Horrigan`
- Subtitle: `Full Stack Software Engineer`
- Descriptor line: `Python · AWS · React · AI · Serverless — 25+ years`
- Subtle animated element (CSS `@keyframes` only — e.g. slow-panning grid, scanline, or a blinking cursor; animate only `transform`/`opacity` for GPU acceleration)
- No photo — let typography carry it
- Single CTA: scroll to career or download CV link

### 4.3 About Section

Two-column layout (or stacked on mobile).
- Left: concise first-person statement (2–3 tight paragraphs drawn from LinkedIn summary)
  - 25 years breadth, Python/AWS depth, AI passion, self-driven learner
- Right: skill tags grouped by domain
  - Backend: Python, AWS Lambda, API Gateway, DynamoDB, Celery, Django
  - Frontend: React, Next.js, TypeScript, Tailwind, MUI
  - AI/ML: spaCy, NLP, Generative AI
  - DevOps: Docker, Serverless Framework, Azure DevOps, CI/CD
  - Data: Elasticsearch, SQS, Step Functions, EventBridge

### 4.4 Career Journey Section

Timeline — the centrepiece of the site.
- Vertical timeline with alternating or left-aligned entries
- Each entry:
  - Company name (large, styled)
  - Role title + period (monospace, muted)
  - 3–4 bullet points — impact-led, not task-led
  - Tech tag strip
- Visual treatment: accent line down the left, year markers styled as code/terminal text
- Span: 1996 – 2025 (29 years, 7 employers, clear progression)

**Narrative arc to communicate:**
- Embedded C roots → web development → data engineering at scale → CTO/product leadership → full-stack cloud/serverless → AI

### 4.5 Skills Section

Optional standalone section (may be sufficient within About).
- If included: grouped visual skill display, not a bar chart
- Categories match About section groupings
- Consider a simple grid of labelled icons or styled tag clouds

### 4.6 Portfolio Section (Placeholder)

- Section heading: "Projects"
- Placeholder cards with "Coming soon" treatment
- Styled consistently — don't skip it, just make it clearly a future area
- Structure the card component ready for real data to be dropped in

### 4.7 Contact / Footer

- Minimal footer
- LinkedIn link (www.linkedin.com/in/jameshorrigan)
- Email: jahorrigan1411@gmail.com
- Year + name

---

## Phase 5: Responsiveness & Polish

- Mobile-first check: hero, nav, timeline all reflow correctly
- Keyboard navigation / focus styles consistent with design
- Smooth scroll: `scroll-behavior: smooth` in CSS is sufficient — no JS scroll library needed
- Consider `animation-timeline: scroll()` for entrance effects on the career timeline — native browser API, no JS
- Page performance: no unnecessary JS, images, or dependencies
- Review typography scale at all breakpoints

---

## Phase 6: Final Review

- Read through all content for accuracy against LinkedIn PDF
- Check design consistency: spacing, colour, font usage
- Confirm local dev runs cleanly (`npm run dev`)
- Update CLAUDE.md with final commands and structure

---

## Commands (to add once scaffolded)

```bash
npm run dev       # start local dev server
npm run build     # production build
npm run lint      # lint check
```

---

## Out of Scope (for now)

- Deployment / hosting
- CMS or dynamic content
- Contact form with backend
- Dark/light mode toggle
- Animations beyond subtle CSS
- Actual portfolio project content (placeholder only)
