import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dismissedLeads } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Upsert via raw query to avoid Drizzle conflict syntax issues
    await db.execute(sql`INSERT INTO dismissed_leads (user_id) VALUES (${userId}) ON CONFLICT (user_id) DO NOTHING`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[dismiss-lead] Error:', error);
    return NextResponse.json({ error: 'Failed to dismiss lead' }, { status: 500 });
  }
}
