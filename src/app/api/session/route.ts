import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const url = req.nextUrl;

  const sessionId = await getOrCreateSession({
    utmSource: url.searchParams.get('utm_source') || undefined,
    utmMedium: url.searchParams.get('utm_medium') || undefined,
    utmCampaign: url.searchParams.get('utm_campaign') || undefined,
    referrer: req.headers.get('referer') || undefined,
    deviceType: /mobile/i.test(req.headers.get('user-agent') || '') ? 'mobile' : 'desktop',
  });

  return NextResponse.json({ sessionId });
}
