/**
 * Portfolio card changes. Kept separate from `update-twin.ts` because this one
 * DOES delete rows, and update-twin.ts guarantees it never does.
 *
 * Removes two cards whose links are dead (verified 2026-08-16, both returned no
 * response at all):
 *   - XA3            https://xa3.xploratech.ai
 *   - Xploratech API https://api.xploratech.ai/docs
 *
 * Backup of the deleted rows, should they ever be wanted again:
 *   {"id":2,"title":"XA3","description":"Admin platform I built to run my own consultancy",
 *    "url":"https://xa3.xploratech.ai","image_url":"/xa3-screenshot.png","sort_order":2}
 *   {"id":3,"title":"Xploratech API","description":"Serverless API behind my own applications",
 *    "url":"https://api.xploratech.ai/docs","image_url":"/xploratech-api-screenshot.png","sort_order":3}
 *
 * Adds two cards with more substance, and rewrites the surviving two into a
 * consistent third-person voice of roughly equal length.
 *
 * Run with:  npx tsx --env-file=.env.local db/update-cards.ts --force
 */
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, inArray } from 'drizzle-orm';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const REMOVE = ['XA3', 'Xploratech API'];

const CARDS = [
  {
    title: 'MYTRADEBARGAINS',
    description:
      'A UK trade price-comparison platform. Semantic search across merchant catalogues using vector ' +
      'embeddings, so a query finds the right products even when the wording differs, with a supplier ' +
      'portal for managing listings and analytics.',
    url: 'https://mytradebargains.com',
    image_url: '/bargains-screenshot.png',
    // Consumer-facing screens only - no supplier portal (not live) and no admin
    // (internal). Files that do not exist yet are dropped from the rotation by
    // PortfolioCard's onError handler, so this can be populated ahead of time.
    image_urls: [
      '/bargains-screenshot.png',   // home
      '/bargains-search.png',
      '/bargains-product.png',
      '/bargains-suppliers.png',
      '/bargains-lists.png',
      '/bargains-favourites.png',
    ],
    sort_order: 0,
  },
  {
    title: 'MYTRADE TECHNOLOGIES',
    description:
      'The corporate site for the business behind MyTrade Bargains, built as one of five Next.js ' +
      'applications in a single monorepo alongside the consumer site, supplier portal, admin system and ' +
      'internal operations tooling.',
    url: 'https://mytradetechnologies.com',
    image_url: '/mytradetechnologies-screenshot.png' as string | null,
    sort_order: 1,
  },
  {
    title: 'BACK-OFFICE AUTOMATION',
    description:
      'A self-hosted n8n platform provisioned with Terraform on AWS, with no SSH access and its workflows ' +
      'version-controlled in git. Around 15 workflows covering cost reporting, uptime monitoring, lead ' +
      'enrichment and social publishing, all reporting into Slack.',
    // Deliberately unlinked: the host is an n8n login screen, not a demo.
    url: null as string | null,
    image_url: null as string | null,
    // Workflow canvases show the work far better than a login page would.
    image_urls: [
      '/n8n-daily-deal.png',        // daily deal auto-post, incl. the Slack approval gate
      '/n8n-cost-digest.png',       // AWS daily cost digest
      '/n8n-suggest-prewarm.png',   // search suggestion pre-warm
    ],
    sort_order: 2,
  },
  {
    title: 'XPLORATECH.AI',
    description:
      'The agency site for my limited company, built and deployed on Next.js and AWS as part of rebuilding ' +
      "the consultancy's own platform.",
    url: 'https://xploratech.ai',
    image_url: '/xploratech-screenshot.png',
    sort_order: 3,
  },
];

async function update() {
  console.log('Removing cards with dead links...');
  const doomed = await db
    .select()
    .from(schema.portfolio)
    .where(inArray(schema.portfolio.title, REMOVE));
  for (const row of doomed) {
    console.log(`  removing id=${row.id} "${row.title}" -> ${row.url}`);
  }
  if (doomed.length > 0) {
    await db.delete(schema.portfolio).where(inArray(schema.portfolio.title, REMOVE));
  } else {
    console.log('  none found (already removed)');
  }

  console.log('Upserting cards...');
  const existing = await db.select().from(schema.portfolio);
  const byTitle = new Map(existing.map((r) => [r.title, r]));

  for (const card of CARDS) {
    const found = byTitle.get(card.title);
    if (found) {
      await db
        .update(schema.portfolio)
        .set({
          description: card.description,
          url: card.url,
          sort_order: card.sort_order,
          ...(card.image_url ? { image_url: card.image_url } : {}),
          ...('image_urls' in card && card.image_urls ? { image_urls: card.image_urls } : {}),
        })
        .where(eq(schema.portfolio.id, found.id));
      console.log(`  updated: ${card.title}`);
    } else {
      await db.insert(schema.portfolio).values(card);
      console.log(`  added:   ${card.title}${card.image_url ? '' : '  (NEEDS A SCREENSHOT)'}`);
    }
  }

  console.log('Done.');
}

if (!process.argv.includes('--force')) {
  console.error('Aborted. This script DELETES two portfolio rows (backed up in the header comment).');
  console.error('Run with --force to confirm: npx tsx --env-file=.env.local db/update-cards.ts --force');
  process.exit(1);
}

update().catch((err) => {
  console.error(err);
  process.exit(1);
});
