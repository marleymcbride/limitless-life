import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserLeadScore, calculateLeadScore } from '@/lib/scoring';
import { env } from '@/env.mjs';

const schema = z.object({
  userId: z.string().uuid(),
});

/**
 * POST /api/analytics/recalculate-score
 *
 * Recalculates and updates a user's lead score based on all their events.
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Body:
 * - userId: UUID of the user to recalculate
 *
 * Returns:
 * - success: boolean
 * - score: number (new lead score)
 * - temperature: 'cold' | 'warm' | 'hot'
 * - breakdown: detailed breakdown of scoring
 */
export async function POST(req: NextRequest) {
  try {
    // Verify admin API key
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { userId } = schema.parse(body);

    // Calculate new score
    const scoreData = await calculateLeadScore(userId);

    // Update in database
    await updateUserLeadScore(userId);

    return NextResponse.json({
      success: true,
      ...scoreData,
    });
  } catch (error) {
    if (error instanceof Error && 'message' in error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
