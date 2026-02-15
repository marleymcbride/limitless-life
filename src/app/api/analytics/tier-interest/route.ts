import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, sessions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { trackEvent } from '@/lib/analytics.server';
import { updateUserLeadScore } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    console.log('=== [TIER INTEREST] Request received ===');
    const body = await request.json();
    let { sessionId, userId, email, firstName, tier } = body;
    console.log('[TIER INTEREST] Request data:', { sessionId, userId, email, firstName, tier });

    // Auto-create session if not provided or invalid
    if (!sessionId) {
      console.log('[TIER INTEREST] No sessionId provided, creating session...');
      const sessionIds = await db.insert(sessions).values({
        firstSeen: new Date(),
        lastSeen: new Date(),
      }).returning();
      sessionId = sessionIds[0].id;
      console.log('[TIER INTEREST] Session created:', sessionId);
    }

    if (!sessionId || !email || !tier) {
      return NextResponse.json(
        { error: 'sessionId, email, and tier are required' },
        { status: 400 }
      );
    }

    // Validate tier value
    const validTiers = ['access', 'plus', 'premium', 'elite', 'undecided'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be one of: access, plus, premium, elite, undecided' },
        { status: 400 }
      );
    }

    // Find or create user
    let finalUserId = userId;
    if (!finalUserId) {
      console.log('[TIER INTEREST] No userId, looking up user by email...');
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length === 0) {
        console.log('[TIER INTEREST] Creating new user in Railway...');
        const [newUser] = await db
          .insert(users)
          .values({
            email,
            firstName,
            status: 'prospect',
            leadScore: 15, // tier_click = 15 points
            leadTemperature: 'warm', // They've taken action - not cold!
            tierInterest: tier as 'access' | 'plus' | 'premium' | 'elite' | null,
            lastSeen: new Date(),
          })
          .returning();
        finalUserId = newUser.id;
        console.log('[TIER INTEREST] User created:', { userId: finalUserId, email });
      } else {
        finalUserId = existingUser[0].id;
        console.log('[TIER INTEREST] Existing user found:', { userId: finalUserId, email });
      }

      // Link session to user
      console.log('[TIER INTEREST] Linking session to user...');
      await db
        .update(sessions)
        .set({ userId: finalUserId })
        .where(eq(sessions.id, sessionId));
      console.log('[TIER INTEREST] Session linked to user');
    }

    // Track tier_click event
    console.log('[TIER INTEREST] Tracking tier_click event...');
    await trackEvent({
      sessionId,
      userId: finalUserId,
      eventType: 'tier_click',
      eventData: { tier, email, firstName },
    });
    console.log('[TIER INTEREST] Event tracked');

    // Update user's tierInterest
    console.log('[TIER INTEREST] Updating user tierInterest...');
    await db
      .update(users)
      .set({
        tierInterest: tier as 'access' | 'plus' | 'premium' | 'elite' | null,
        lastSeen: new Date(),
      })
      .where(eq(users.id, finalUserId));
    console.log('[TIER INTEREST] User updated');

    // Update lead score (triggers hot lead alerts if score >= 70)
    console.log('[TIER INTEREST] Updating lead score...');
    await updateUserLeadScore(finalUserId);
    console.log('[TIER INTEREST] Lead score updated');

    console.log('=== [TIER INTEREST] Complete ===');
    return NextResponse.json({ success: true, userId: finalUserId });
  } catch (error) {
    console.error('[TIER INTEREST] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to track tier interest',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
