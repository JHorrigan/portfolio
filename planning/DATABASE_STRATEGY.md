# Database Strategy

Decision: **Neon (serverless Postgres) + Drizzle ORM**

- No free-tier inactivity pause (unlike Supabase)
- `@neondatabase/serverless` HTTP driver works natively in RSC and edge
- Drizzle generates TypeScript types from schema — typed queries, no boilerplate
- Standard Postgres — easy to migrate elsewhere

## Schema

| Table | Purpose | Key columns |
|---|---|---|
| `profile` | Hero/about text, social links | title[], hero, summary, career_summary, linkedin_url, github_url, email |
| `skills` | Skills list | id, name, category, sort_order |
| `roles` | Career timeline | id, period, company, role, summary, highlights (text[]), sort_order |
| `roleSkills` | Role ↔ skill join | role_id, skill_id |
| `portfolio` | Project cards | id, title, description, url, image_url, sort_order |
| `education` | Education entries | id, qualification, source, date, sort_order |
| `heroStats` | Hero stat strip | id, value, label, color, sort_order |
| `marqueeItems` | Hero marquee | id, text, sort_order |
| `chat_rate_limits` | Digital twin rate limiting | ip_hash, count, window_start |

## Neon project

- Project: `ancient-feather-39071286` (eu-west-2)
- DB: `neondb`
- Env var: `DATABASE_URL` in `.env.local`
