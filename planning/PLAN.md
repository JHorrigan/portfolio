# Portfolio Project Plan (Current)

Last updated: 2026-03-02

## Objective

Maintain and incrementally improve a single-page portfolio for James Horrigan with a clear, modern, enterprise-meets-edgy presentation.

## Current Baseline (2026-03-02)

- Next.js 16.1.6 + React 19 + Tailwind CSS v4
- TypeScript strict mode
- Single-file page implementation in `app/page.tsx`
- Global tokens and utility in `app/globals.css`
- Local production build passing (`npm run build`)

## Source of Truth

- Primary implementation status: `CLAUDE.md`
- Tech stack reference: `planning/TECHSTACK.md`
- Career content reference: `planning/linkedin.pdf`

## Delivery Principles

- Keep implementation simple and incremental.
- Prefer small, verifiable changes.
- Maintain RSC-first approach unless interactivity requires otherwise.
- Keep docs synchronized with implementation.

## Active Work Items

### 1) Documentation Consistency

- [x] Align `README.md` with current architecture.
- [x] Replace outdated phased assumptions in this plan.
- [x] Keep `CLAUDE.md` and this plan in sync after feature changes.

### 2) UX Hygiene

- [x] Keep anchor navigation coherent with available sections.
- [x] Ensure placeholder project cards do not use dead links.
- [x] Keep footer metadata (year/name/contact) complete.

### 3) Career Content Strategy

- [x] Confirm whether timeline should remain condensed (5 roles) or be expanded from LinkedIn source.
- [x] Apply decision consistently in `app/page.tsx`.

### 4) Codebase Cleanliness

- [x] Remove or repurpose unused structure (for example empty directories).

## Validation Checklist

1. `npm run build` exits 0.
2. No new TypeScript diagnostics introduced.
3. Key anchors navigate correctly (`about`, `skills`, `journey`, `portfolio`).
4. No non-functional placeholder navigation.

## Commands

```bash
npm run dev
npm run build
npm run start
```
