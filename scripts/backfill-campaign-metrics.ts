import { db } from '../src/lib/db';
import { campaigns, campaignMetrics } from '../src/db/schema';
import { fetchCampaigns } from '../src/lib/airtable';
import { eq, sql } from 'drizzle-orm';

async function main() {
  console.log('Fetching campaigns from Airtable...');
  const airtableCamps = await fetchCampaigns();
  console.log(`Found ${airtableCamps.length} campaigns in Airtable`);

  // Get existing campaigns in Postgres
  const dbCamps = await db.select().from(campaigns);
  console.log(`Found ${dbCamps.length} campaigns in Postgres`);

  // For each Airtable campaign, ensure it exists in Postgres, then insert baseline
  for (const ac of airtableCamps) {
    const match = dbCamps.find(c => c.utmCampaign === ac.utmCampaign);
    if (!match) {
      console.log(`No Postgres match for: ${ac.name} (${ac.utmCampaign}) — skipping`);
      continue;
    }

    // Insert July 1st baseline
    await db.insert(campaignMetrics).values({
      campaignId: match.id,
      metricDate: new Date('2026-07-01'),
      views: ac.views || 0,
      clicks: ac.clicks || 0,
      emails: 0,
      sales: 0,
      revenue: 0,
    }).onConflictDoNothing();

    console.log(`Inserted baseline for: ${ac.name} — views: ${ac.views}, clicks: ${ac.clicks}`);
  }

  console.log('Done.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
