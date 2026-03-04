import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const success = await authenticateAdmin(password);

  if (success) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, error: 'Invalid password' },
    { status: 401 }
  );
}
