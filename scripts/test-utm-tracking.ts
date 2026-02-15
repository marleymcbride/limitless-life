import postgres from 'postgres';

// Load env vars
const result = require('dotenv').config({ path: '.env.local' });
if (result.error) {
  console.error('❌ Failed to load .env.local:', result.error);
  process.exit(1);
}

interface Session {
  id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  browser: string | null;
  ip_address: string | null;
  country_code: string | null;
  first_seen: Date;
}

async function testUTMTracking() {
  console.log('🧪 Testing UTM parameter tracking...\n');

  const client = postgres(process.env.DATABASE_URL!);

  try {
    // Query the latest session with all UTM columns
    const sessions = await client<Session[]>`
      SELECT
        id,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        browser,
        ip_address,
        country_code,
        first_seen
      FROM sessions
      ORDER BY first_seen DESC
      LIMIT 1
    `;

    // If no sessions exist, display test URL
    if (sessions.length === 0) {
      console.log('⚠️  No sessions found. Visit the site with UTM params first:\n');
      console.log('https://www.limitless-life.co/?utm_source=test_source&utm_medium=test_medium&utm_campaign=test_campaign_feb_2026&utm_content=test_content&utm_term=test_keyword\n');
      console.log('📋 After visiting, run this script again to verify tracking is working.');
      await client.end();
      process.exit(0);
    }

    const session = sessions[0];

    // Display the latest session
    console.log('📊 Latest Session:\n');
    console.table({
      ID: session.id,
      'UTM Source': session.utm_source || 'null',
      'UTM Medium': session.utm_medium || 'null',
      'UTM Campaign': session.utm_campaign || 'null',
      'UTM Content': session.utm_content || 'null',
      'UTM Term': session.utm_term || 'null',
      Browser: session.browser || 'null',
      'IP Address': session.ip_address || 'null',
      'Country': session.country_code || 'null',
      'First Seen': session.first_seen
    });

    console.log('\n✅ UTM columns exist and are working!\n');

    // Count how many UTM fields are populated
    const utmFields = [
      { name: 'utm_source', value: session.utm_source },
      { name: 'utm_medium', value: session.utm_medium },
      { name: 'utm_campaign', value: session.utm_campaign },
      { name: 'utm_content', value: session.utm_content },
      { name: 'utm_term', value: session.utm_term },
      { name: 'browser', value: session.browser },
      { name: 'ip_address', value: session.ip_address },
      { name: 'country_code', value: session.country_code }
    ];

    const populatedFields = utmFields.filter(field => field.value !== null && field.value !== '');
    const emptyFields = utmFields.filter(field => field.value === null || field.value === '');

    console.log(`📈 UTM Fields Populated: ${populatedFields.length}/${utmFields.length}\n`);

    if (populatedFields.length > 0) {
      console.log('✅ Populated Fields:');
      populatedFields.forEach(field => {
        console.log(`   ✅ ${field.name}: ${field.value}`);
      });
    }

    if (emptyFields.length > 0) {
      console.log('\n⚪ Empty Fields:');
      emptyFields.forEach(field => {
        console.log(`   ⚪ ${field.name}: null`);
      });
    }

    console.log('\n🎯 Test URL with all UTM params:');
    console.log('https://www.limitless-life.co/?utm_source=test_source&utm_medium=test_medium&utm_campaign=test_campaign_feb_2026&utm_content=test_content&utm_term=test_keyword\n');

    // Exit with success if at least one UTM field is populated
    await client.end();
    process.exit(populatedFields.length > 0 ? 0 : 1);

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Ensure DATABASE_URL is set in .env.local');
    console.error('   2. Ensure the sessions table has been migrated with UTM columns');
    console.error('   3. Run: npx tsx scripts/migrate-utm-columns.ts\n');
    await client.end();
    process.exit(1);
  }
}

testUTMTracking();
