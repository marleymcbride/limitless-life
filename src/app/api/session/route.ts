import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateSession } from '@/lib/session';
import { parseBrowser, getClientIP, getCountryCode } from '@/lib/deviceInfo';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const userAgent = req.headers.get('user-agent') || '';
  const cookieStore = await cookies();

  // Extract device and browser info
  const browserInfo = parseBrowser(userAgent);
  const ipAddress = getClientIP(req);
  const countryCode = await getCountryCode(ipAddress || 'Unknown');

  const session = await getOrCreateSession({
    utmSource: url.searchParams.get('utm_source') || undefined,
    utmMedium: url.searchParams.get('utm_medium') || undefined,
    utmCampaign: url.searchParams.get('utm_campaign') || undefined,
    utmContent: url.searchParams.get('utm_content') || undefined,
    utmTerm: url.searchParams.get('utm_term') || undefined,
    referrer: req.headers.get('referer') || undefined,
    deviceType: browserInfo.deviceType,
    browser: browserInfo.name ? JSON.stringify({
      name: browserInfo.name,
      version: browserInfo.version,
      os: browserInfo.os,
    }) : undefined,
    ipAddress: ipAddress,
    countryCode: countryCode,
  }, cookieStore);

  // Set cookie if new session
  if (!cookieStore.get('ll_session')) {
    cookieStore.set({
      name: 'll_session',
      value: session.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  console.log('[SESSION API] Returning:', { sessionId: session.id, userId: session.userId });
  return NextResponse.json({ sessionId: session.id, userId: session.userId ?? null, debug: 'code-v2' });
}
