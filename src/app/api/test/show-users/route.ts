import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { desc } from 'drizzle-orm';

/**
 * GET /api/test/show-users
 *
 * Show full user records with all fields
 */
export async function GET() {
  try {
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(10);

    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch users',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
