import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { users, sessions, webhookQueue } from '../src/db/schema';
import { sql, eq } from 'drizzle-orm';

// Load environment variables
config({ path: '.env.local' });

async function cleanupTestData() {
  console.log('🗑️  Cleaning up all test data...\n');

  // Test email patterns
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
    // 1. Delete webhook queue entries with test patterns in URL
    const testWebhooks = await db
      .select()
      .from(webhookQueue)
      .where(sql`${webhookQueue.targetUrl} ILIKE ANY(${testEmails.map(e => `%${e}%`)})`);

    if (testWebhooks.length > 0) {
      const webhookIds = testWebhooks.map(w => w.id);
      await db.delete(webhookQueue).where(sql`id = ANY(${webhookIds})`);
      console.log(`✅ Deleted ${testWebhooks.length} webhook entries`);
    }

    // 2. Delete test users and their cascade
    const deletedUsers: string[] = [];

    for (const email of testEmails) {
      const matchingUsers = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (matchingUsers.length > 0) {
        const userId = matchingUsers[0].id;
        await db.delete(users).where(eq(users.id, userId));
        deletedUsers.push(email);
        console.log(`✅ Deleted user: ${email}`);
      }
    }

    console.log(`\n✨ Cleanup complete!`);
    console.log(`   - Deleted ${deletedUsers.length} test users`);
    console.log(`   - Sessions, events, and payments were cascade deleted`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupTestData();
