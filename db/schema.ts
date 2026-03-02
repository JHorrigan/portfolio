import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  title: text('title'),
  hero: text('hero'),
  summary: text('summary'),
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

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  qualification: text('qualification').notNull(),
  source: text('source'),
  date: text('date'),
  sort_order: integer('sort_order').default(0),
});
