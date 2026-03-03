import { NextRequest } from 'next/server';

export interface BrowserInfo {
  name: string;
  version: string;
  os: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

export function parseBrowser(userAgent: string): BrowserInfo {
  const ua = userAgent.toLowerCase();

  // Detect browser
  let name = 'Unknown';
  let version = '';

  if (ua.includes('chrome/') && !ua.includes('edg/')) {
    name = 'Chrome';
    const match = ua.match(/chrome\/(\d+\.\d+\.\d+\.\d+)/);
    version = match ? match[1] : '';
  } else if (ua.includes('safari/') && !ua.includes('chrome/')) {
    name = 'Safari';
    const match = ua.match(/version\/(\d+\.\d+\.\d+)/);
    version = match ? match[1] : '';
  } else if (ua.includes('firefox/')) {
    name = 'Firefox';
    const match = ua.match(/firefox\/(\d+\.\d+)/);
    version = match ? match[1] : '';
  } else if (ua.includes('edg/')) {
    name = 'Edge';
    const match = ua.match(/edg\/(\d+\.\d+\.\d+\.\d+)/);
    version = match ? match[1] : '';
  }

  // Detect OS
  let os = 'Unknown';
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('mac os x')) {
    os = 'macOS';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }

  // Detect device type
  let deviceType: BrowserInfo['deviceType'] = 'desktop';
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    deviceType = 'mobile';
  } else if (ua.includes('ipad') || ua.includes('tablet')) {
    deviceType = 'tablet';
  }

  return { name, version, os, deviceType };
}

export function getClientIP(req: NextRequest): string | null {
  // Check various headers for IP address
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip');

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to remote address
  return req.ip || null;
}

export async function getCountryCode(ip: string): Promise<string> {
  if (!ip || ip === 'Unknown' || ip === '::1' || ip === '127.0.0.1') {
    return 'Unknown';
  }

  try {
    // Using ip-api.com (free, no API key required for non-commercial use)
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (response.ok) {
      const data = await response.json();
      return data.countryCode || 'Unknown';
    }
  } catch (error) {
    console.error('[deviceInfo] Failed to get country code:', error);
  }

  return 'Unknown';
}
