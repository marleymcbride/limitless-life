import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessions, events } from '@/db/schema';

/**
 * GET /api/test/create-session
 *
 * Test creating a session and event directly
 */
export async function GET() {
  try {
    console.log('=== [TEST] Creating session ===');

    // Create session
    const sessionId = crypto.randomUUID();
    await db.insert(sessions).values({
      id: sessionId,
      firstSeen: new Date(),
      lastSeen: new Date(),
    });
    console.log('[TEST] Session created:', sessionId);

    // Create an event for that session
    const eventId = crypto.randomUUID();
    await db.insert(events).values({
      id: eventId,
      sessionId: sessionId,
      eventType: 'test_event',
      eventData: { test: true },
      createdAt: new Date(),
    });
    console.log('[TEST] Event created:', eventId);

    return NextResponse.json({
      success: true,
      sessionId,
      eventId,
    });
  } catch (error) {
    console.error('[TEST] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create test data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
