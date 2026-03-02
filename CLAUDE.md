# Portfolio Project

A professional portfolio project for James Horrigan, a software engineer. The website style is stunning: enterprise meets edgy. It showcases the career explained in `planning/linkedin.pdf`. It should include about me, my career journey, links to a portfolio (for future). The website runs locally. It is built using NextJS, Typescript, Tailwind.

## Tech

- **Next.js 16.1.6** with React 19 — App Router, RSC-first
- **Tailwind CSS v4** — CSS-first config via `@theme inline` in `globals.css`, no `tailwind.config.js`
- **TypeScript** strict mode
- No `src/` directory — `app/`, `lib/`, `types/`, `components/` at root

## Commands

```bash
npm run dev       # start local dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
```

## Project Structure

```
app/
  layout.tsx       # root layout: fonts (Inter, JetBrains Mono), metadata, body
  page.tsx         # single page — composes all section components
  globals.css      # @import "tailwindcss" + @theme inline design tokens
  favicon.ico
components/
  sections/        # Hero, About, Career, Skills, Portfolio, Footer (Phase 4)
  ui/              # reusable primitives: Tag, SectionHeading, etc.
lib/
  data.ts          # all content as typed TS — roles[], skillGroups[]
types/
  index.ts         # Role, SkillGroup types
planning/
  PLAN.md          # phased implementation plan with checkboxes
  TECHSTACK.md     # tech stack research notes
  linkedin.pdf     # source of truth for career content
```

## Design Tokens (globals.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0a0a0f` | Page background |
| `--color-surface` | `#111118` | Card/section backgrounds |
| `--color-accent` | `#00ffe0` | Electric cyan — used sparingly |
| `--color-text` | `#f0f0f4` | Primary text |
| `--color-muted` | `#666680` | Secondary/muted text |
| `--color-border` | `rgba(240,240,244,0.08)` | Dividers/borders |
| `--font-sans` | Inter (via next/font) | Body text |
| `--font-mono` | JetBrains Mono (via next/font) | Headings, code, stats |

## Current State (2026-03-02)

- Phases 1–3 complete: scaffold, design system, content data layer
- Phase 4 (page sections) not yet started — see `planning/PLAN.md`
- `page.tsx` is currently a placeholder

## Key Conventions

- Components are React Server Components by default — only add `"use client"` for interactivity
- All content lives in `lib/data.ts`, not in components
- Tailwind utility classes use token names: `bg-bg`, `text-accent`, `font-mono`, `text-muted`
- Animations: CSS `@keyframes` only, animate `transform`/`opacity` only
- Sharp corners — no `rounded-xl` softness; the aesthetic is technical/edgy

# currentDate
Today's date is 2026-03-02.
