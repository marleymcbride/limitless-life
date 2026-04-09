import { NextRequest, NextResponse } from 'next/server';
import { calculateLeadScore } from '@/lib/scoring';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  // Require admin authentication for security
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const scoreData = await calculateLeadScore(userId);

    return NextResponse.json({
      success: true,
      data: scoreData,
    });
  } catch (error) {
    console.error('Score calculation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate score' },
      { status: 500 }
    );
  }
}
