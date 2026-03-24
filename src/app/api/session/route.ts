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

  // Parse new short params OR fall back to legacy UTM params
  const yt = url.searchParams.get('yt'); // YouTube
  const tts = url.searchParams.get('tts'); // Testimonials YouTube
  const tw = url.searchParams.get('tw'); // Twitter
  const ig = url.searchParams.get('ig'); // Instagram
  const em = url.searchParams.get('em'); // Email
  const fb = url.searchParams.get('fb'); // Facebook
  const li = url.searchParams.get('li'); // LinkedIn
  const tt = url.searchParams.get('tt'); // TikTok
  const bl = url.searchParams.get('bl'); // Blog
  const lm = url.searchParams.get('lm'); // Lead magnet
  const go = url.searchParams.get('go'); // Google
  const rd = url.searchParams.get('rd'); // Reddit
  const x = url.searchParams.get('x'); // Campaign identifier

  // Build source and campaign from short params
  let utmSource = url.searchParams.get('utm_source') || undefined;
  let utmMedium = url.searchParams.get('utm_medium') || undefined;
  let utmCampaign = url.searchParams.get('utm_campaign') || undefined;
  let utmContent = url.searchParams.get('utm_content') || undefined;
  let utmTerm = url.searchParams.get('utm_term') || undefined;

  // Map short params to UTM equivalent (short params take precedence)
  if (yt) {
    utmSource = 'youtube';
    utmMedium = 'video';
    utmCampaign = yt;
  } else if (tts) {
    utmSource = 'testimonials_yt';
    utmMedium = 'video';
    utmCampaign = tts;
  } else if (tw) {
    utmSource = 'twitter';
    utmMedium = 'social';
    utmCampaign = tw;
  } else if (ig) {
    utmSource = 'instagram';
    utmMedium = 'social';
    utmCampaign = ig;
  } else if (em) {
    utmSource = 'email';
    utmMedium = 'newsletter';
    utmCampaign = em;
  } else if (fb) {
    utmSource = 'facebook';
    utmMedium = 'social';
    utmCampaign = fb;
  } else if (li) {
    utmSource = 'linkedin';
    utmMedium = 'social';
    utmCampaign = li;
  } else if (tt) {
    utmSource = 'tiktok';
    utmMedium = 'video';
    utmCampaign = tt;
  } else if (bl) {
    utmSource = 'blog';
    utmMedium = 'link';
    utmCampaign = bl;
  } else if (lm) {
    utmSource = 'lead_magnet';
    utmMedium = 'content';
    utmCampaign = lm;
  } else if (go) {
    utmSource = 'google';
    utmMedium = go.includes('ad') ? 'paid' : 'organic';
    utmCampaign = go;
  } else if (rd) {
    utmSource = 'reddit';
    utmMedium = 'post';
    utmCampaign = rd;
  } else if (x) {
    // Campaign identifier (e.g., "bio" from ?x=bio)
    utmSource = 'campaign';
    utmMedium = 'link';
    utmCampaign = x;
  }

  const session = await getOrCreateSession({
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
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
