import postgres from 'postgres';
import { resolve } from 'path';

// Load env vars from project root
const projectRoot = resolve(process.cwd(), '.env.local');
const result = require('dotenv').config({ path: projectRoot });
if (result.error) {
  console.error('❌ Failed to load .env.local:', result.error);
  process.exit(1);
}

async function updateSessionWithUTM() {
  console.log('🔄 Updating session with UTM parameters...\n');

  const client = postgres(process.env.DATABASE_URL!);

  try {
    // Update the most recent session with test UTM data
    const updated = await client`
      UPDATE sessions
      SET
        utm_source = 'test_source',
        utm_medium = 'test_medium',
        utm_campaign = 'test_campaign_feb_2026',
        utm_content = 'test_content',
        utm_term = 'test_keyword'
      WHERE id = (
        SELECT id FROM sessions
        ORDER BY first_seen DESC
        LIMIT 1
      )
      RETURNING id, utm_source, utm_medium, utm_campaign, utm_content, utm_term
    `;

    if (updated.length > 0) {
      console.log('✅ Session updated successfully!\n');
      console.log('📊 Updated Session:');
      console.table(updated);
      console.log('\n✅ UTM Parameters Added:');
      console.log(`  utm_source: ${updated[0].utm_source}`);
      console.log(`  utm_medium: ${updated[0].utm_medium}`);
      console.log(`  utm_campaign: ${updated[0].utm_campaign}`);
      console.log(`  utm_content: ${updated[0].utm_content}`);
      console.log(`  utm_term: ${updated[0].utm_term}`);
    } else {
      console.log('❌ No sessions found to update');
    }

    await client.end();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Update failed:', error);
    await client.end();
    process.exit(1);
  }
}

updateSessionWithUTM();
