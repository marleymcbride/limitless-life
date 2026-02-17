import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { users, sessions, webhookQueue, events } from '../src/db/schema';
import { eq } from 'drizzle-orm';

// Load environment variables
config({ path: '.env.local' });

async function cleanupAllTestData() {
  console.log('🗑️  Cleaning up ALL test data...\n');

  const testPatterns = [
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
    'test72@gmail.com',
    'testfinal.71@gmail.com',
  ];

  try {
    let totalDeleted = { users: 0, sessions: 0, events: 0, webhooks: 0 };

    // 1. Delete all users with test emails
    for (const email of testPatterns) {
      const userRecords = await db.select().from(users).where(eq(users.email, email));

      if (userRecords.length > 0) {
        const userId = userRecords[0].id;

        // Delete their events first
        await db.delete(events).where(eq(events.userId, userId));
        totalDeleted.events += userRecords.length;

        // Delete the user
        await db.delete(users).where(eq(users.id, userId));
        totalDeleted.users++;

        console.log(`✅ Deleted user: ${email}`);
      }
    }

    // 2. Delete all sessions (check for test patterns in referrer/campaign)
    const allSessions = await db.select().from(sessions);
    for (const session of allSessions) {
      const sessionData = JSON.stringify(session).toLowerCase();
      if (testPatterns.some(p => sessionData.includes(p.toLowerCase())) ||
          sessionData.includes('test_') ||
          sessionData.includes('test.') ||
          sessionData.includes('test@')) {
        await db.delete(sessions).where(eq(sessions.id, session.id));
        totalDeleted.sessions++;
      }
    }

    // 3. Delete all events with test data (check event_data JSON)
    const allEvents = await db.select().from(events);
    for (const event of allEvents) {
      const eventData = JSON.stringify(event.eventData).toLowerCase();
      if (testPatterns.some(p => eventData.includes(p.toLowerCase())) ||
          eventData.includes('test@') ||
          eventData.includes('test.') ||
          eventData.includes('"test"') ||
          eventData.includes('test72') ||
          eventData.includes('testfinal')) {
        await db.delete(events).where(eq(events.id, event.id));
        totalDeleted.events++;
      }
    }

    // 4. Delete webhook queue entries with test data
    const allWebhooks = await db.select().from(webhookQueue);
    for (const webhook of allWebhooks) {
      const payloadStr = JSON.stringify(webhook.payload).toLowerCase();
      if (payloadStr.includes('test') || payloadStr.includes('example') || payloadStr.includes('demo')) {
        await db.delete(webhookQueue).where(eq(webhookQueue.id, webhook.id));
        totalDeleted.webhooks++;
      }
    }

    console.log(`\n✨ Cleanup complete!`);
    console.log(`   - Deleted ${totalDeleted.users} test users`);
    console.log(`   - Deleted ${totalDeleted.sessions} test sessions`);
    console.log(`   - Deleted ${totalDeleted.events} test events`);
    console.log(`   - Deleted ${totalDeleted.webhooks} webhook entries`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupAllTestData();
