import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, sessions, events, payments, leadAlerts, webhookQueue } from '@/db/schema';
import { eq, or, sql, ilike } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/admin-auth';

/**
 * DELETE /api/admin/delete-test-data
 *
 * Delete all test data from database tables.
 * Requires ADMIN_API_KEY for security.
 *
 * Deletes from:
 * - users (test emails like test@example.com)
 * - sessions (orphaned test sessions)
 * - events (events linked to test users/sessions)
 * - payments (test payments)
 * - lead_alerts (test alerts)
 * - webhook_queue (pending/processing webhooks with test emails)
 *
 * Returns summary of what was deleted.
 */
export async function DELETE(request: NextRequest) {
  // Verify admin authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { confirm } = body;

    // Require explicit confirmation to prevent accidents
    if (confirm !== true) {
      return NextResponse.json(
        { error: 'Confirmation required', message: 'Set confirm=true to delete test data' },
        { status: 400 }
      );
    }

    let deletedCounts = {
      users: 0,
      sessions: 0,
      events: 0,
      payments: 0,
      leadAlerts: 0,
      webhookQueue: 0,
    };

    // Delete test users (emails like test@example.com, test+, etc.)
    const testUsers = await db
      .select()
      .from(users)
      .where(or(
        eq(users.email, 'test@example.com'),
        eq(users.email, 'test+@example.com'),
        eq(users.email, 'test%@example.com'),
        ilike('%test%', users.email)
      ));

    if (testUsers.length > 0) {
      const userIds = testUsers.map(u => u.id);
      await db.delete(users).where(or(...userIds.map(id => eq(users.id, id))));
      deletedCounts.users = testUsers.length;
    }

    // Delete orphaned test sessions
    const testSessions = await db
      .select()
      .from(sessions)
      .where(
        or(
          ilike('%test%', sessions.id),
          ilike('%test%', sessions.userId)
        )
      );

    if (testSessions.length > 0) {
      const sessionIds = testSessions.map(s => s.id);
      await db.delete(sessions).where(or(...sessionIds.map(id => eq(sessions.id, id))));
      deletedCounts.sessions = testSessions.length;
    }

    // Delete events linked to test users/sessions
    const testEvents = await db
      .select()
      .from(events)
      .where(ilike('%test%', events.userId));

    if (testEvents.length > 0) {
      const eventIds = testEvents.map(e => e.id);
      await db.delete(events).where(or(...eventIds.map(id => eq(events.id, id))));
      deletedCounts.events = testEvents.length;
    }

    // Delete test payments (payments with test metadata or test user emails)
    const testPayments = await db
      .select()
      .from(payments)
      .innerJoin(users, eq(payments.userId, users.id))
      .where(ilike('%test%', users.email));

    if (testPayments.length > 0) {
      const paymentIds = testPayments.map(p => p.id);
      await db.delete(payments).where(or(...paymentIds.map(id => eq(payments.id, id))));
      deletedCounts.payments = testPayments.length;
    }

    // Delete test lead alerts
    const testAlerts = await db
      .select()
      .from(leadAlerts)
      .innerJoin(users, eq(leadAlerts.userId, users.id))
      .where(ilike('%test%', users.email));

    if (testAlerts.length > 0) {
      const alertIds = testAlerts.map(a => a.id);
      await db.delete(leadAlerts).where(or(...alertIds.map(id => eq(leadAlerts.id, id))));
      deletedCounts.leadAlerts = testAlerts.length;
    }

    // Delete test webhooks (pending/processing webhooks with test in payload)
    const testWebhooks = await db
      .select()
      .from(webhookQueue)
      .where(sql`${webhookQueue.payload}::text LIKE '%test%'`);

    if (testWebhooks.length > 0) {
      const webhookIds = testWebhooks.map(w => w.id);
      await db.delete(webhookQueue).where(or(...webhookIds.map(id => eq(webhookQueue.id, id))));
      deletedCounts.webhookQueue = testWebhooks.length;
    }

    console.log('[DELETE TEST DATA] Deleted:', deletedCounts);

    return NextResponse.json({
      success: true,
      message: 'Test data deleted successfully',
      deleted: deletedCounts,
    });
  } catch (error) {
    console.error('[DELETE TEST DATA] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete test data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
