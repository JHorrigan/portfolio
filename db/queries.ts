import { asc } from 'drizzle-orm';
import { db } from './index';
import { portfolio, profile, roles, skills } from './schema';

export async function getProfile() {
  const rows = await db.select().from(profile).limit(1);
  return rows[0] ?? null;
}

export async function getRoles() {
  return db.select().from(roles).orderBy(asc(roles.sort_order));
}

export async function getPortfolio() {
  return db.select().from(portfolio).orderBy(asc(portfolio.sort_order));
}

export async function getSkillGroups() {
  const rows = await db.select().from(skills).orderBy(asc(skills.sort_order));
  const map = new Map<string, string[]>();
  for (const row of rows) {
    const cat = row.category ?? 'Other';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(row.name);
  }
  return Array.from(map.entries()).map(([title, items]) => ({ title, items }));
}
