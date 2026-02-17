import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { users, sessions, webhookQueue, events, payments } from '../src/db/schema';
import { eq, or, ilike, sql } from 'drizzle-orm';

// Load environment variables
config({ path: '.env.local' });

async function cleanupTestData() {
  console.log('🗑️  Cleaning up all test data...\n');

  const testEmails = [
    'test@test.com',
    'test-fallout-form@gmail.com',
    'test-fillout-form@gmail.com',
    'test.new_part2maybeform@gmail.cocm',
    'test.new.test.maybe@gmail.com',
    'test@newtest.com',
    'test_new_splitter@gmail.com',
    'test.72@gmail.com',
    'test.final.71@gmail.com',
    'test@example.com',
  ];

  try {
    // First, get all test user IDs
    const testUserIds: string[] = [];

    for (const email of testEmails) {
      const userRecords = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (userRecords.length > 0) {
        testUserIds.push(...userRecords.map(u => u.id));
      }
    }

    if (testUserIds.length === 0) {
      console.log('ℹ️  No test users found');
      return;
    }

    console.log(`Found ${testUserIds.length} test users to delete`);

    // Delete in order to respect foreign keys
    // 1. Events (has userId FK)
    const deletedEvents = await db
      .delete(events)
      .where(sql`user_id = ANY(${testUserIds})`);
    console.log(`✅ Deleted events for test users`);

    // 2. Payments (has userId FK)
    const deletedPayments = await db
      .delete(payments)
      .where(sql`user_id = ANY(${testUserIds})`);
    console.log(`✅ Deleted payments for test users`);

    // 3. Sessions (has userId FK)
    const deletedSessions = await db
      .delete(sessions)
      .where(sql`user_id = ANY(${testUserIds})`);
    console.log(`✅ Deleted sessions for test users`);

    // 4. Webhook queue entries (no FK to users, but clean them up)
    const allWebhooks = await db.select().from(webhookQueue);
    const testWebhooks = allWebhooks.filter(w =>
      JSON.stringify(w.payload).toLowerCase().includes('test')
    );

    for (const webhook of testWebhooks) {
      await db.delete(webhookQueue).where(eq(webhookQueue.id, webhook.id));
    }
    console.log(`✅ Deleted ${testWebhooks.length} webhook entries`);

    // 5. Finally delete the users
    for (const userId of testUserIds) {
      await db.delete(users).where(eq(users.id, userId));
    }
    console.log(`✅ Deleted ${testUserIds.length} test users`);

    console.log(`\n✨ Cleanup complete!`);
    console.log(`   - Deleted ${testUserIds.length} test users`);
    console.log(`   - All related data (events, payments, sessions, webhooks) removed`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupTestData();
