import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * POST /api/test/payment-webhook
 *
 * Test endpoint to simulate Stripe checkout.session.completed webhook
 * Verifies full payment tracking flow without needing real Stripe webhooks
 */
export async function POST(request: NextRequest) {
  // Require admin authentication for security
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log('=== [TEST WEBHOOK] Simulating Stripe payment ===');

    // Test email (use existing or create new)
    const testEmail = 'webhook-test@example.com';
    const testFirstName = 'Webhook';
    const testLastName = 'Test';

    // Generate a valid UUID for sessionId
    const testSessionId = randomUUID();

    // Also create the session record so foreign key constraint works
    console.log('[TEST WEBHOOK] Creating session record...');
    const [session] = await db
      .insert(require('@/db/schema').sessions)
      .values({
        id: testSessionId,
        firstSeen: new Date(),
        lastSeen: new Date(),
        userId: null, // Will be updated after user lookup
      })
      .returning();
    console.log('[TEST WEBHOOK] Session created:', session.id);

    // Find or create user
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, testEmail))
      .limit(1);

    let userId: string;
    if (user.length === 0) {
      console.log('[TEST WEBHOOK] Creating new user...');
      const [newUser] = await db
        .insert(users)
        .values({
          email: testEmail,
          firstName: testFirstName,
          lastName: testLastName,
          status: 'customer',
          leadScore: 100, // payment_complete = 100 points
          leadTemperature: 'hot',
          firstSeen: new Date(),
          lastSeen: new Date(),
          createdAt: new Date(),
        })
        .returning();
      userId = newUser.id;
      console.log('[TEST WEBHOOK] User created:', userId);
    } else {
      userId = user[0].id;
      console.log('[TEST WEBHOOK] Using existing user:', userId);
    }

    // Update session with user_id now that we have it
    console.log('[TEST WEBHOOK] Updating session with user_id...');
    await db.update(require('@/db/schema').sessions)
      .set({ userId: userId })
      .where(eq(require('@/db/schema').sessions.id, testSessionId));
    console.log('[TEST WEBHOOK] Session updated with user_id');

    // Create payment record
    const stripePaymentId = `pi_test_${Date.now()}`;
    const amount = 299700; // $2,997 in cents

    console.log('[TEST WEBHOOK] Creating payment record...');
    await db.insert(payments).values({
      userId,
      stripePaymentIntentId: stripePaymentId,
      amount,
      currency: 'usd',
      status: 'succeeded',
      paymentDate: new Date(),
      metadata: {
        test: true,
        tier: 'Plus',
      },
    });
    console.log('[TEST WEBHOOK] Payment recorded');

    // Track payment_complete event
    console.log('[TEST WEBHOOK] Tracking payment_complete event...');
    await db.insert(events).values({
      sessionId: testSessionId,
      userId,
      eventType: 'payment_complete',
      eventData: {
        email: testEmail,
        amount: amount / 100,
        currency: 'usd',
        stripePaymentId,
      },
    });
    console.log('[TEST WEBHOOK] Event tracked');

    console.log('=== [TEST WEBHOOK] Complete ===');

    return NextResponse.json({
      success: true,
      message: 'Test webhook processed',
      data: {
        userId,
        paymentId: stripePaymentId,
        amount: amount / 100,
      },
    });

  } catch (error) {
    console.error('[TEST WEBHOOK] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
