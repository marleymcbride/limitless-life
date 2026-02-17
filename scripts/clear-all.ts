import { config } from 'dotenv';
import { db } from '../src/lib/db';
import { sessions, events } from '../src/db/schema';

// Load environment variables
config({ path: '.env.local' });

async function clearAllSessionsAndEvents() {
  console.log('🗑️  Clearing ALL sessions and events...\n');

  try {
    // Delete all events
    const deletedEvents = await db.delete(events);
    console.log(`✅ Deleted all events`);

    // Delete all sessions
    const deletedSessions = await db.delete(sessions);
    console.log(`✅ Deleted all sessions`);

    console.log(`\n✨ Complete! All sessions and events cleared.`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearAllSessionsAndEvents();
