import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { users, sessions, webhookQueue, events, payments } from '../src/db/schema';
import { eq } from 'drizzle-orm';

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
    let deletedCount = 0;

    for (const email of testEmails) {
      // Get the user first
      const userRecords = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (userRecords.length === 0) {
        continue;
      }

      const userId = userRecords[0].id;

      // Delete events for this user
      await db.delete(events).where(eq(events.userId, userId));

      // Delete payments for this user
      await db.delete(payments).where(eq(payments.userId, userId));

      // Delete sessions for this user
      await db.delete(sessions).where(eq(sessions.userId, userId));

      // Finally delete the user
      await db.delete(users).where(eq(users.id, userId));

      console.log(`✅ Deleted: ${email}`);
      deletedCount++;
    }

    // Clean up webhook queue entries with 'test' in payload
    const allWebhooks = await db.select().from(webhookQueue);
    let webhookCount = 0;

    for (const webhook of allWebhooks) {
      const payloadStr = JSON.stringify(webhook.payload).toLowerCase();
      if (payloadStr.includes('test') || payloadStr.includes('example') || payloadStr.includes('demo')) {
        await db.delete(webhookQueue).where(eq(webhookQueue.id, webhook.id));
        webhookCount++;
      }
    }

    if (webhookCount > 0) {
      console.log(`✅ Deleted ${webhookCount} webhook entries`);
    }

    console.log(`\n✨ Cleanup complete!`);
    console.log(`   - Deleted ${deletedCount} test users`);
    console.log(`   - Deleted ${webhookCount} webhook entries`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupTestData();
