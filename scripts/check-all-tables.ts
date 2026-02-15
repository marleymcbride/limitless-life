import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

async function checkTables() {
  console.log('🔍 Checking all PostgreSQL tables...\n');

  const client = postgres(process.env.DATABASE_URL!);

  try {
    const result = await client`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    console.log('📊 Current tables in database:');
    console.table(result.map(r => ({ table_name: r.table_name })));

    console.log('\n🔍 Comparing with n8n integration requirements:\n');

    const requiredTables = {
      'users': 'Main customer records with lead scoring',
      'events': 'Complete user journey tracking',
      'payments': 'Transaction records',
      'lead_alerts': 'Hot lead notification tracking',
      'sessions': 'User session data',
      'webhook_queue': 'Webhook queue',
      'application_submissions': 'Application tracking'
    };

    const existingTables = result.map(r => r.table_name);
    const missingTables = [];
    const presentTables = [];

    Object.entries(requiredTables).forEach(([name, purpose]) => {
      if (existingTables.includes(name)) {
        presentTables.push({ table: name, status: '✅', purpose });
      } else {
        missingTables.push({ table: name, status: '❌', purpose });
      }
    });

    console.log('✅ Present Tables:');
    presentTables.forEach(t => {
      console.log(`   ${t.status} ${t.table.padEnd(30)} - ${t.purpose}`);
    });

    if (missingTables.length > 0) {
      console.log('\n❌ Missing Tables:');
      missingTables.forEach(t => {
        console.log(`   ${t.status} ${t.table.padEnd(30)} - ${t.purpose}`);
      });
    } else {
      console.log('\n✅ All required tables exist!');
    }

    console.log('\n🎯 Table Requirements for n8n Integration:');
    console.log('   Critical: users, events, payments, lead_alerts');
    console.log('   Supporting: sessions, webhook_queue, application_submissions');
    console.log('   Status: ' + (missingTables.length === 0 ? '✅ COMPLETE' : '❌ INCOMPLETE'));

    await client.end();
    process.exit(missingTables.length > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Check failed:', error);
    await client.end();
    process.exit(1);
  }
}

checkTables();
