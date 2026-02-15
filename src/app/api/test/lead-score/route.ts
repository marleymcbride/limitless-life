import { NextRequest, NextResponse } from 'next/server';
import { calculateLeadScore } from '@/lib/scoring';

export async function POST(req: NextRequest) {
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
