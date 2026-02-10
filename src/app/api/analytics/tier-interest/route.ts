import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, email, firstName, tier } = body;

    if (!sessionId || !email || !tier) {
      return NextResponse.json(
        { error: 'sessionId, email, and tier are required' },
        { status: 400 }
      );
    }

    // Validate tier value
    const validTiers = ['access', 'plus', 'premium', 'elite'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be one of: access, plus, premium, elite' },
        { status: 400 }
      );
    }

    // Track tier_click event
    await trackEvent({
      sessionId,
      userId,
      eventType: 'tier_click',
      eventData: { tier },
    });

    // If we have a userId, update their tierInterest
    if (userId) {
      await db
        .update(users)
        .set({
          tierInterest: tier as 'access' | 'plus' | 'premium' | 'elite',
          lastSeen: new Date(),
        })
        .where(eq(users.id, userId));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking tier interest:', error);
    return NextResponse.json(
      {
        error: 'Failed to track tier interest',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
