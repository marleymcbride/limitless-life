/**
 * Parse User-Agent to extract browser info
 */
export interface BrowserInfo {
  name: string;       // Chrome, Firefox, Safari, Edge
  version?: string;    // Browser version
  os?: string;         // Windows, macOS, iOS, Android
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

export function parseBrowser(userAgent: string): BrowserInfo {
  const ua = userAgent.toLowerCase();

  // Detect browser
  let name = 'Unknown';
  let version: string | undefined;

  if (ua.includes('chrome/') && !ua.includes('edg/')) {
    const match = ua.match(/chrome\/([\d.]+)/);
    name = 'Chrome';
    version = match?.[1];
  } else if (ua.includes('firefox/')) {
    const match = ua.match(/firefox\/([\d.]+)/);
    name = 'Firefox';
    version = match?.[1];
  } else if (ua.includes('safari/') && !ua.includes('chrome/')) {
    name = 'Safari';
    // Safari version is tricky - look for Version/X.X
    const match = ua.match(/version\/([\d.]+)/);
    version = match?.[1];
  } else if (ua.includes('edg/')) {
    const match = ua.match(/edg\/([\d.]+)/);
    name = 'Edge';
    version = match?.[1];
  } else if (ua.includes('opr/') || ua.includes('opera/')) {
    name = 'Opera';
  }

  // Detect OS
  let os: string | undefined;
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('mac os x') || ua.includes('macintosh')) {
    os = 'macOS';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }

  // Detect device type
  const deviceType: BrowserInfo['deviceType'] =
    /mobile|android|iphone|ipod/.test(ua) ? 'mobile' :
    /tablet|ipad/.test(ua) ? 'tablet' :
    'desktop';

  return { name, version, os, deviceType };
}

/**
 * Get client IP address from request headers
 * In production with Railway/Vercel, check x-forwarded-for header
 */
export function getClientIP(req: NextRequest): string | null {
  // Railway/Vercel sets x-forwarded-for
  const forwardedFor = req.headers.get('x-forwarded-for');

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take first one
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[0] || null;
  }

  // Fallback: check cf-connecting-ip (Cloudflare)
  return req.headers.get('cf-connecting-ip') || null;
}

/**
 * Get country code from IP address (using free IPapi.co)
 * Returns ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'DE')
 */
export async function getCountryCode(ipAddress: string): Promise<string> {
  if (!ipAddress) return 'Unknown';

  try {
    const response = await fetch(`https://ipapi.co/${ipAddress}`);
    if (!response.ok) {
      console.error('Failed to get country code:', response.status);
      return 'Unknown';
    }

    const data = await response.json();

    // API returns { country_code: 'US' }
    return data.country_code || 'Unknown';
  } catch (error) {
    console.error('Error getting country code:', error);
    return 'Unknown';
  }
}
