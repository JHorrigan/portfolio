import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  title: text('title').array(),
  hero: text('hero'),
  hero_summary: text('hero_summary'),
  summary: text('summary'),
  career_summary: text('career_summary'),
  location: text('location'),
  email: text('email'),
  linkedin_url: text('linkedin_url'),
  github_url: text('github_url'),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category'),
  sort_order: integer('sort_order').default(0),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  period: text('period').notNull(),
  company: text('company').notNull(),
  role: text('role').notNull(),
  summary: text('summary'),
  highlights: text('highlights').array(),
  related_skills: integer('related_skills').array(),
  sort_order: integer('sort_order').default(0),
});

export const roleSkills = pgTable(
  'role_skills',
  {
    role_id: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    skill_id: integer('skill_id')
      .notNull()
      .references(() => skills.id, { onDelete: 'cascade' }),
    sort_order: integer('sort_order').default(0),
  },
  (table) => [
    primaryKey({ columns: [table.role_id, table.skill_id] }),
  ]
);

export const portfolio = pgTable('portfolio', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  image_url: text('image_url'),
  sort_order: integer('sort_order').default(0),
});

export const chatRateLimits = pgTable('chat_rate_limits', {
  ip_hash: text('ip_hash').primaryKey(),
  count: integer('count').notNull().default(0),
  window_start: timestamp('window_start', { withTimezone: true }).notNull(),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  qualification: text('qualification').notNull(),
  source: text('source'),
  date: text('date'),
  sort_order: integer('sort_order').default(0),
});
