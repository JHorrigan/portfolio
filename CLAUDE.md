# Portfolio Project

A professional portfolio project for James Horrigan, a software engineer. The website style is stunning: enterprise meets edgy. It showcases the career explained in `planning/linkedin.pdf`. It should include about me, my career journey, links to a portfolio (for future). The website runs locally. It is built using NextJS, Typescript, Tailwind.

## Tech

- **Next.js 16.1.6** with React 19 — App Router, RSC-first
- **Tailwind CSS v4** — CSS-first config via `@theme inline` in `globals.css`, no `tailwind.config.js`
- **TypeScript** strict mode
- No `src/` directory — `app/` at root

## Commands

```bash
npm run dev       # start local dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
```

## Project Structure

```
app/
  layout.tsx       # root layout: Geist Sans + Geist Mono fonts, metadata
  page.tsx         # single file — all sections inline (header, hero, about, skills, journey, portfolio, footer)
  globals.css      # @import "tailwindcss" + @theme inline (Geist fonts) + .glass utility
  favicon.ico
public/            # empty (scaffold SVGs removed)
next.config.ts     # reactCompiler: true
planning/
  PLAN.md          # current implementation-aligned plan + checklist
  TECHSTACK.md     # tech stack research notes
  linkedin.pdf     # source of truth for career content
```

## Design System (globals.css)

- Background: `#020617` (slate-950 equivalent)
- Foreground: `#e2e8f0` (slate-200)
- `.glass` utility: gradient bg (slate-900 tones) + `backdrop-filter: blur(8px)` + slate border
- Accent: `cyan-300` / `cyan-400` used via Tailwind utilities directly
- Fonts: Geist Sans (body) + Geist Mono (mono) via `next/font/google`

## Current State (2026-03-02)

- All sections are inline in `page.tsx` — no separate component files
- Components directory removed; content arrays are inline in `page.tsx`
- Design: glass morphism cards, rounded-2xl/3xl, slate palette, cyan accents
- Sections: header, hero, about, skills, career journey (7 roles), portfolio (3 placeholders), footer
- Build: clean, zero TypeScript errors

## Key Conventions

- Single-file page approach — all content and markup in `page.tsx`
- Tailwind slate/cyan utilities used directly (no custom token classes)
- `.glass` CSS class for card surfaces
- Inline data arrays (journey, skills) defined at top of `page.tsx`
- All RSC — no `"use client"` needed

## Current Date
Today's date is 2026-03-02.
