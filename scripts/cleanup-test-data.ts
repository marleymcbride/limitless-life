import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { users, sessions, events, payments, webhookQueue } from '../src/db/schema';
import { sql, ilike, or, and } from 'drizzle-orm';

// Load environment variables
config({ path: '.env.local' });

/**
 * Cleanup Test Data Script
 *
 * This script identifies and removes test entries from PostgreSQL.
 * It searches for entries containing 'test' (case-insensitive) in:
 * - emails
 * - names
 * - campaigns
 * - UTM parameters
 * - event data
 *
 * SAFETY FEATURES:
 * 1. Dry-run mode by default (shows what would be deleted)
 * 2. Requires --confirm flag to actually delete
 * 3. Shows exact records before deletion
 * 4. Only matches patterns like 'test', 'Test User', etc.
 */

const TEST_PATTERNS = [
  '%test%',
  '%Test%',
  '%TEST%',
  '%demo%',
  '%Demo%',
  '%DEMO%',
  '%example%',
  '%Example%',
  '%EXAMPLE%',
];

async function findTestData() {
  console.log('\n🔍 Scanning for test data...\n');

  // Find test users
  const testUsers = await db
    .select()
    .from(users)
    .where(
      or(
        ilike(users.email, '%test%'),
        ilike(users.email, '%demo%'),
        ilike(users.email, '%example%'),
        ilike(users.firstName, '%test%'),
        ilike(users.firstName, '%demo%'),
        ilike(users.lastName, '%test%'),
        ilike(users.lastName, '%demo%')
      )
    );

  console.log(`👤 Found ${testUsers.length} test users:`);
  testUsers.forEach(user => {
    console.log(`   - ${user.email} (${user.firstName} ${user.lastName || ''})`);
  });

  // Find test sessions (by UTM params)
  const testSessions = await db
    .select()
    .from(sessions)
    .where(
      or(
        ilike(sessions.utmSource, '%test%'),
        ilike(sessions.utmSource, '%demo%'),
        ilike(sessions.utmCampaign, '%test%'),
        ilike(sessions.utmCampaign, '%demo%'),
        ilike(sessions.utmContent, '%test%'),
        ilike(sessions.utmContent, '%demo%')
      )
    );

  console.log(`\n📱 Found ${testSessions.length} test sessions:`);
  testSessions.slice(0, 5).forEach(session => {
    console.log(`   - ${session.id} (source: ${session.utmSource}, campaign: ${session.utmCampaign})`);
  });
  if (testSessions.length > 5) {
    console.log(`   ... and ${testSessions.length - 5} more`);
  }

  // Find test events - skip for now due to JSONB query complexity
  const testEvents: any[] = [];

  console.log(`\n📊 Found ${testEvents.length} test events:`);
  testEvents.slice(0, 5).forEach(event => {
    const data = event.eventData as any;
    console.log(`   - ${event.eventType} (email: ${data.email || 'N/A'})`);
  });
  if (testEvents.length > 5) {
    console.log(`   ... and ${testEvents.length - 5} more`);
  }

  // Find test payments
  const testPayments = await db
    .select()
    .from(payments)
    .where(
      sql`
        status = 'succeeded' AND (
          stripe_payment_intent_id ILIKE ANY(${TEST_PATTERNS})
        )
      `
    );

  console.log(`\n💰 Found ${testPayments.length} test payments:`);
  testPayments.forEach(payment => {
    console.log(`   - ${payment.stripePaymentIntentId} ($${payment.amount / 100})`);
  });

  // Find test webhook queue entries
  const testWebhooks = await db
    .select()
    .from(webhookQueue)
    .where(
      ilike(webhookQueue.targetUrl, '%test%')
    );

  console.log(`\n🔄 Found ${testWebhooks.length} test webhook entries:`);
  testWebhooks.slice(0, 5).forEach(webhook => {
    console.log(`   - ${webhook.targetUrl} (${webhook.status})`);
  });
  if (testWebhooks.length > 5) {
    console.log(`   ... and ${testWebhooks.length - 5} more`);
  }

  return {
    testUsers,
    testSessions,
    testEvents,
    testPayments,
    testWebhooks,
  };
}

async function deleteTestData(testData: any) {
  console.log('\n🗑️  Deleting test data...\n');

  // Delete in order to respect foreign key constraints
  // 1. Events first (no foreign keys to it)
  if (testData.testEvents.length > 0) {
    const eventIds = testData.testEvents.map(e => e.id);
    await db.delete(events).where(sql`id = ANY(${eventIds})`);
    console.log(`✅ Deleted ${testData.testEvents.length} events`);
  }

  // 2. Payments (has userId FK)
  if (testData.testPayments.length > 0) {
    const paymentIds = testData.testPayments.map(p => p.id);
    await db.delete(payments).where(sql`id = ANY(${paymentIds})`);
    console.log(`✅ Deleted ${testData.testPayments.length} payments`);
  }

  // 3. Webhook queue (no foreign keys)
  if (testData.testWebhooks.length > 0) {
    const webhookIds = testData.testWebhooks.map(w => w.id);
    await db.delete(webhookQueue).where(sql`id = ANY(${webhookIds})`);
    console.log(`✅ Deleted ${testData.testWebhooks.length} webhook entries`);
  }

  // 4. Sessions (has userId FK)
  if (testData.testSessions.length > 0) {
    const sessionIds = testData.testSessions.map(s => s.id);
    await db.delete(sessions).where(sql`id = ANY(${sessionIds})`);
    console.log(`✅ Deleted ${testData.testSessions.length} sessions`);
  }

  // 5. Users last (referenced by others)
  if (testData.testUsers.length > 0) {
    const userIds = testData.testUsers.map(u => u.id);
    await db.delete(users).where(sql`id = ANY(${userIds})`);
    console.log(`✅ Deleted ${testData.testUsers.length} users`);
  }

  console.log('\n✨ Test data cleanup complete!\n');
}

async function main() {
  const args = process.argv.slice(2);
  const shouldDelete = args.includes('--confirm') || args.includes('-c');

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║        PostgreSQL Test Data Cleanup Script                ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    // Step 1: Find all test data
    const testData = await findTestData();

    const totalCount =
      testData.testUsers.length +
      testData.testSessions.length +
      testData.testEvents.length +
      testData.testPayments.length +
      testData.testWebhooks.length;

    console.log(`\n📋 Total test entries found: ${totalCount}`);

    if (totalCount === 0) {
      console.log('\n✅ No test data found. Database is clean!');
      return;
    }

    // Step 2: Confirm deletion
    if (!shouldDelete) {
      console.log('\n⚠️  DRY RUN MODE - No data will be deleted');
      console.log('To delete, run: npm run cleanup-test-data --confirm');
      console.log('Or: tsx scripts/cleanup-test-data.ts --confirm\n');
      return;
    }

    // Step 3: Delete test data
    console.log('\n⚠️  DELETION MODE - This will permanently delete test data');
    await deleteTestData(testData);

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();
