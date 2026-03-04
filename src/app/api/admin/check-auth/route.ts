import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  const auth = await isAdminAuthenticated();

  return NextResponse.json({ authenticated: auth });
}
