import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events, payments } from '@/db/schema';
import { desc, count } from 'drizzle-orm';

/**
 * GET /api/test/db-connection
 *
 * Test endpoint to verify Railway database connection and show current data counts
 * This helps diagnose if data is being written to the database
 */
export async function GET(request: NextRequest) {
  try {
    console.log('=== [DB TEST] Testing Railway database connection ===');

    // Test basic connection
    const userCount = await db.select({ count: count() }).from(users);
    const eventCount = await db.select({ count: count() }).from(events);
    const paymentCount = await db.select({ count: count() }).from(payments);

    console.log('[DB TEST] Database connection successful');
    console.log('[DB TEST] Counts:', {
      users: userCount[0]?.count || 0,
      events: eventCount[0]?.count || 0,
      payments: paymentCount[0]?.count || 0,
    });

    // Get recent records for inspection
    const recentUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(5);

    const recentEvents = await db
      .select()
      .from(events)
      .orderBy(desc(events.createdAt))
      .limit(5);

    const recentPayments = await db
      .select()
      .from(payments)
      .orderBy(desc(payments.paymentDate))
      .limit(5);

    return NextResponse.json({
      success: true,
      connection: 'ok',
      counts: {
        users: userCount[0]?.count || 0,
        events: eventCount[0]?.count || 0,
        payments: paymentCount[0]?.count || 0,
      },
      recent: {
        users: recentUsers.map(u => ({
          id: u.id,
          email: u.email,
          status: u.status,
          leadScore: u.leadScore,
          createdAt: u.createdAt,
        })),
        events: recentEvents.map(e => ({
          id: e.id,
          eventType: e.eventType,
          userId: e.userId,
          createdAt: e.createdAt,
        })),
        payments: recentPayments.map(p => ({
          id: p.id,
          userId: p.userId,
          amount: p.amount,
          currency: p.currency,
          status: p.status,
          paymentDate: p.paymentDate,
        })),
      },
    });
  } catch (error) {
    console.error('[DB TEST] Database connection error:', error);
    return NextResponse.json({
      success: false,
      connection: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
