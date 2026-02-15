import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { trackEvent } from '@/lib/analytics.server';
import { syncPaymentToAirtable } from '@/lib/n8nWebhooks';
import { calculateLeadScore } from '@/lib/scoring';

/**
 * TEST ENDPOINT: Simulate a payment to populate Railway and trigger n8n
 *
 * This bypasses Stripe signature verification for testing purposes.
 * DELETE THIS FILE AFTER TESTING!
 *
 * Usage: POST /api/test/populate-railway
 * Body: {
 *   email: string,
 *   tier: 'Access' | 'Plus' | 'Premium' | 'Elite',
 *   amount: number (in cents),
 *   skipN8N?: boolean (default: false)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, tier, amount, skipN8N = false } = body;

    if (!email || !tier || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: email, tier, amount' },
        { status: 400 }
      );
    }

    console.log(`[TEST] Simulating payment for ${email}, tier: ${tier}, amount: $${amount / 100}`);

    // Find or create user
    let existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;

    if (existingUser.length === 0) {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          status: 'customer',
          leadScore: 50, // Payment gives them 50 points
          leadTemperature: 'hot',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      userId = newUser.id;
      console.log(`[TEST] Created new user: ${userId}`);
    } else {
      userId = existingUser[0].id;
      console.log(`[TEST] Found existing user: ${userId}`);
    }

    // Generate fake Stripe payment ID
    const testPaymentId = `pi_test_${Date.now()}`;

    // Create payment record
    await db.insert(payments).values({
      userId,
      stripePaymentIntentId: testPaymentId,
      amount: amount / 100, // Convert cents to dollars
      currency: 'USD',
      status: 'succeeded',
      paymentDate: new Date(),
      metadata: {
        test: true,
        tier,
      },
    });
    console.log(`[TEST] Payment record created: ${testPaymentId}`);

    // Update user status to customer
    await db
      .update(users)
      .set({
        status: 'customer',
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // Track analytics event
    await trackEvent({
      sessionId: 'test-session',
      userId,
      eventType: 'payment_complete',
      eventData: {
        email,
        amount: amount / 100,
        currency: 'USD',
        stripePaymentId: testPaymentId,
      },
    });

    // Trigger n8n webhook (unless skipped)
    let n8nSuccess = false;
    if (!skipN8N) {
      const scoreData = await calculateLeadScore(userId);

      n8nSuccess = await syncPaymentToAirtable({
        email,
        firstName: existingUser[0]?.firstName || 'Test',
        lastName: existingUser[0]?.lastName || 'User',
        tier,
        amount, // in cents
        stripePaymentId: testPaymentId,
        paymentDate: new Date().toISOString(),
        score: scoreData.score,
        phone: existingUser[0]?.phone,
        utmSource: 'test',
        utmCampaign: 'manual_webhook_test',
        utmMedium: 'test',
      });

      console.log(`[TEST] n8n webhook ${n8nSuccess ? 'succeeded' : 'failed'}`);
    }

    return NextResponse.json({
      success: true,
      userId,
      email,
      tier,
      amount: amount / 100,
      stripePaymentId: testPaymentId,
      n8nTriggered: !skipN8N,
      n8nSuccess,
      message: 'Railway populated successfully! Check Airtable for synced data.'
    });

  } catch (error) {
    console.error('[TEST] Error:', error);
    return NextResponse.json(
      { error: 'Test failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
