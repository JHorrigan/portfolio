# Portfolio Project Plan

Last updated: 2026-03-31

## References
- Implementation status (source of truth): `@AGENTS.md`
- DB decision rationale: `@planning/DATABASE_STRATEGY.md`
- Tech stack notes: `@planning/TECHSTACK.md`

## Principles

- Simple and incremental. Small, verifiable changes.
- RSC-first unless interactivity requires `"use client"`.
- Content editable via DB, not code deploys.
- Docs stay synchronised with implementation.

---

## Completed

Phases 1–9 shipped. Current state fully documented in `@AGENTS.md`.

One open item from Phase 8: fill CV placeholders — phone `+44 [PHONE]`, education, certifications.

---

## Active / Future Work

### Phase 10 — Search
> **Awaiting scope confirmation.** Assumed: client-side search across skills/roles/content.
- [ ] Define search scope (skills, roles, all sections?)
- [ ] Implement `SearchBar.tsx` client component
- [ ] Wire to DB-sourced content (already fetched in `page.tsx`)
- [ ] Add to `NavMenu.tsx` or inline above relevant section
- [ ] Verify no regression on build + mobile layout

### Phase 11 — Content Completion
- [ ] Populate `highlights` field in `db/seed.ts` for all 7 roles
- [ ] Render `highlights` bullet list in role cards in `page.tsx`
- [ ] Add `certifications` table to `db/schema.ts` (id, title, issuer, date, sort_order)
- [ ] Run `npx drizzle-kit push` + populate + render education & certifications sections
- [ ] Add `getEducation()` and `getCertifications()` queries to `db/queries.ts`
- [ ] Update CV placeholders: phone number, education, certifications
- [ ] Verify build passes

### Phase 12 — Company Logos on Roles
- [ ] Add `logo_domain` field to `roles` table; push schema
- [ ] Use logo.dev API to fetch by domain; store domain in DB, construct URL at render time
- [ ] Populate all 7 roles; fall back to company initial if missing
- [ ] Render in role cards via `next/image`

### Phase 13 — Contact Form
- `app/api/contact/route.ts` and `app/components/ContactForm.tsx` already shipped.
- [ ] Verify `contact_messages` table exists in Neon; add if missing

### Phase 14 — Digital Twin Improvements

**UX**
- [ ] Multi-turn conversation: pass full message history to API; keep history client-side only
- [ ] Markdown rendering for assistant responses (`react-markdown` + `remark-gfm`)
- [ ] Follow-up suggestion chips after each response (2–3 contextual prompts)
- [ ] Clean stream signalling: use `X-Remaining` response header instead of `__remaining:N__` in stream body
- [ ] Live auto-scroll during streaming (move `bottomRef.scrollIntoView` into chunk loop)

**Cost Optimisation**
- [ ] Cap history sent to API at last 6 messages (3 turns)
- [ ] Trim system prompt once `highlights` are populated
- [ ] Log `usage.prompt_tokens` + `usage.completion_tokens` in development
- [ ] Tune `max_tokens` based on observed response lengths

### Phase 15 — UI/UX Enhancements
- [ ] Add vertical timeline spine with styled nodes to career section

---

## Validation Checklist

- [ ] `npm run build` exits 0
- [ ] Zero TypeScript diagnostics
- [ ] Key anchors navigate correctly: `about`, `skills`, `journey`, `portfolio`, `ask`, `contact`
- [ ] No hardcoded content — all text from DB
- [ ] `OPENAI_API_KEY` + `IP_SALT` set in `.env.local` and Vercel
