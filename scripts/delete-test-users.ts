import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { users, sessions, webhookQueue, events, payments } from '../src/db/schema';
import { eq, or, ilike } from 'drizzle-orm';

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
    // Delete users with test emails (cascade will handle sessions, events, payments)
    let deletedCount = 0;

    for (const email of testEmails) {
      const result = await db
        .delete(users)
        .where(eq(users.email, email))
        .returning();

      if (result.length > 0) {
        console.log(`✅ Deleted user: ${email}`);
        deletedCount++;
      }
    }

    // Also delete any remaining webhook queue entries with test in payload
    const allWebhooks = await db.select().from(webhookQueue);
    const testWebhooks = allWebhooks.filter(w =>
      JSON.stringify(w.payload).includes('test') ||
      JSON.stringify(w.payload).includes('Test') ||
      w.targetUrl.includes('test')
    );

    if (testWebhooks.length > 0) {
      for (const webhook of testWebhooks) {
        await db.delete(webhookQueue).where(eq(webhookQueue.id, webhook.id));
      }
      console.log(`✅ Deleted ${testWebhooks.length} webhook entries`);
    }

    console.log(`\n✨ Cleanup complete!`);
    console.log(`   - Deleted ${deletedCount} test users`);
    console.log(`   - Deleted ${testWebhooks.length} webhook entries`);
    console.log(`   - Related sessions, events, and payments were cascade deleted`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupTestData();
