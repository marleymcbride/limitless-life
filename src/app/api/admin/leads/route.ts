import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, sessions } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { desc, eq, and, gte, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') as 'all' | 'hot' | 'warm' | null;

    // Build query conditions based on filter
    let conditions = undefined;

    if (filter === 'hot') {
      conditions = gte(users.leadScore, 70);
    } else if (filter === 'warm') {
      conditions = and(gte(users.leadScore, 40), sql`${users.leadScore} < 70`);
    }
    // If filter is 'all' or null, we don't filter by score

    // Get all users with optional temperature filter
    const allUsers = await db
      .select()
      .from(users)
      .where(conditions)
      .orderBy(desc(users.createdAt));

    // For each user, get their most recent session to extract UTM params
    const leads = await Promise.all(
      allUsers.map(async (user) => {
        // Get most recent session for this user
        const userSessions = await db
          .select()
          .from(sessions)
          .where(eq(sessions.userId, user.id))
          .orderBy(desc(sessions.lastSeen))
          .limit(1);

        const latestSession = userSessions[0];

        // Determine temperature from leadScore
        let temperature: 'Hot' | 'Warm' | 'Cold' = 'Cold';
        if (user.leadScore >= 70) temperature = 'Hot';
        else if (user.leadScore >= 40) temperature = 'Warm';

        return {
          Email: user.email,
          Name: [user.firstName, user.lastName]
            .filter(Boolean)
            .join(' ') || user.email,
          Score: user.leadScore || 0,
          Temperature: temperature,
          Phone: undefined, // Phone not stored in users table currently
          UTMSource: latestSession?.utmSource || undefined,
          CreatedAt: user.createdAt?.toISOString() || new Date().toISOString(),
        };
      })
    );

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
