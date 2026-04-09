import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessions, users } from '@/db/schema';
import { desc, isNull, isNotNull } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * GET /api/test/check-utm
 *
 * Check if UTM parameters are being captured and stored
 */
export async function GET() {
  // Require admin authentication for security
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get recent sessions with UTM data
    const recentSessions = await db
      .select({
        id: sessions.id,
        userId: sessions.userId,
        utmSource: sessions.utmSource,
        utmMedium: sessions.utmMedium,
        utmCampaign: sessions.utmCampaign,
        referrer: sessions.referrer,
        deviceType: sessions.deviceType,
        firstSeen: sessions.firstSeen,
      })
      .from(sessions)
      .orderBy(desc(sessions.firstSeen))
      .limit(10);

    // Count sessions with UTM data
    const [sessionsWithUTM] = await db
      .select({ count: sessions.id })
      .from(sessions)
      .where(isNotNull(sessions.utmSource));

    const [sessionsWithoutUTM] = await db
      .select({ count: sessions.id })
      .from(sessions)
      .where(isNull(sessions.utmSource));

    return NextResponse.json({
      recentSessions,
      utmStats: {
        total: recentSessions.length,
        withUTM: sessionsWithUTM.count,
        withoutUTM: sessionsWithoutUTM.count,
        captureRate: recentSessions.length > 0
          ? Math.round((sessionsWithUTM.count / recentSessions.length) * 100)
          : 0,
      },
      interpretation: recentSessions.length > 0 && sessionsWithUTM.count === 0
        ? '⚠️ UTM tracking NOT working - no sessions have UTM data'
        : sessionsWithUTM.count > 0
        ? '✅ UTM tracking working - sessions have UTM parameters'
        : '⚠️ No sessions found in database',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to check UTM tracking',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
