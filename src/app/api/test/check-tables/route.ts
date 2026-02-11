import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, sessions, events, payments, webhookQueue, leadAlerts } from '@/db/schema';

/**
 * GET /api/test/check-tables
 *
 * Check record counts in all tracking tables
 */
export async function GET() {
  try {
    console.log('=== [TABLE CHECK] Starting ===');

    // Get counts from all tables
    const [userCount, sessionCount, eventCount, paymentCount, webhookQueueCount, leadAlertCount] = await Promise.all([
      db.select({ count: users.id }).from(users).then(r => r.length),
      db.select({ count: sessions.id }).from(sessions).then(r => r.length),
      db.select({ count: events.id }).from(events).then(r => r.length),
      db.select({ count: payments.id }).from(payments).then(r => r.length),
      db.select({ count: webhookQueue.id }).from(webhookQueue).then(r => r.length),
      db.select({ count: leadAlerts.id }).from(leadAlerts).then(r => r.length),
    ]);

    // Get recent records from each table (no orderBy to avoid complex queries)
    const [recentUsers, recentSessions, recentEvents, recentPayments] = await Promise.all([
      db.select().from(users).limit(5),
      db.select().from(sessions).limit(5),
      db.select().from(events).limit(5),
      db.select().from(payments).limit(5),
    ]);

    console.log('[TABLE CHECK] Counts:', {
      users: userCount,
      sessions: sessionCount,
      events: eventCount,
      payments: paymentCount,
      webhookQueue: webhookQueueCount,
      leadAlerts: leadAlertCount,
    });

    return NextResponse.json({
      counts: {
        users: userCount,
        sessions: sessionCount,
        events: eventCount,
        payments: paymentCount,
        webhookQueue: webhookQueueCount,
        leadAlerts: leadAlertCount,
      },
      recent: {
        users: recentUsers.map(u => ({
          id: u.id,
          email: u.email,
          status: u.status,
          createdAt: u.createdAt,
        })),
        sessions: recentSessions.map(s => ({
          id: s.id,
          userId: s.userId,
          firstSeen: s.firstSeen,
        })),
        events: recentEvents.map(e => ({
          id: e.id,
          eventType: e.eventType,
          sessionId: e.sessionId,
          userId: e.userId,
          createdAt: e.createdAt,
        })),
        payments: recentPayments.map(p => ({
          id: p.id,
          userId: p.userId,
          amount: p.amount,
          status: p.status,
          createdAt: p.createdAt,
        })),
      },
    });

  } catch (error) {
    console.error('[TABLE CHECK] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to check tables',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
