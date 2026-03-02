# James Horrigan — Portfolio

Personal portfolio site for James Horrigan, Full Stack Software Engineer.

Built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Stack

- **Framework:** Next.js 16.1.6 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme inline` in `app/globals.css`)
- **Language:** TypeScript (strict)
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Bundler:** Turbopack (default)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve production build
```

## Current Architecture

Single-file page approach:

```text
app/
  layout.tsx       # metadata + font setup
  page.tsx         # all sections inline (header, hero, about, journey, portfolio, footer)
  globals.css      # Tailwind import, theme tokens, .glass utility
planning/
  PLAN.md
  TECHSTACK.md
```

## Notes

- RSC-first: no `"use client"` required in current implementation.
- Content and section data are inline in `app/page.tsx`.
- `planning/TECHSTACK.md` contains tech stack notes and references.
