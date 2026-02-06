/**
 * Video Configuration & Optimization
 *
 * Optimizes VSL loading with:
 * - Poster image for instant visual
 * - Adaptive bitrate streaming
 * - Device-specific quality
 * - Optimized preload settings
 */

/**
 * Get video poster image URL
 * Provides instant visual while video loads
 */
export const VIDEO_POSTER = {
  desktop: 'https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net/a6751ee5-c1d3-4006-9776-7d1a9ced040c/poster.jpg',
  mobile: 'https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net/a6751ee5-c1d3-4006-9776-7d1a9ced040c/poster-mobile.jpg',
};

/**
 * Adaptive bitrate configuration
 * Bunny.net automatically handles adaptive streaming,
 * but we can specify quality preferences per device
 */
export interface VideoQualityConfig {
  label: string;
  height: number;
  bitrate: number; // in kbps
  targetDevice: 'mobile' | 'tablet' | 'desktop';
}

export const VIDEO_QUALITY_PRESETS: VideoQualityConfig[] = [
  {
    label: '360p',
    height: 360,
    bitrate: 600,
    targetDevice: 'mobile',
  },
  {
    label: '480p',
    height: 480,
    bitrate: 1000,
    targetDevice: 'mobile',
  },
  {
    label: '720p',
    height: 720,
    bitrate: 2000,
    targetDevice: 'tablet',
  },
  {
    label: '1080p',
    height: 1080,
    bitrate: 4000,
    targetDevice: 'desktop',
  },
];

/**
 * Get optimal video source based on device
 */
export function getVideoSource(deviceType: 'mobile' | 'desktop'): {
  quality: string;
  maxHeight: number;
  maxBitrate: number;
} {
  if (deviceType === 'mobile') {
    return {
      quality: '720p',
      maxHeight: 720,
      maxBitrate: 2000,
    };
  }

  // Desktop
  return {
    quality: '1080p',
    maxHeight: 1080,
    maxBitrate: 4000,
  };
}

/**
 * Get poster image URL for device
 */
export function getPosterImage(deviceType: 'mobile' | 'desktop'): string {
  return deviceType === 'mobile' ? VIDEO_POSTER.mobile : VIDEO_POSTER.desktop;
}

/**
 * Get preload strategy
 *
 * Strategy:
 * - First visit: preload="metadata" (loads info but not video)
 * - After first play: preload="auto" (loads full video)
 * - Mobile: always preload="metadata" to save bandwidth
 */
export function getPreloadStrategy(
  hasPlayedBefore: boolean,
  deviceType: 'mobile' | 'desktop'
): 'metadata' | 'none' | 'auto' {
  // Always use metadata on mobile to save bandwidth
  if (deviceType === 'mobile') {
    return 'metadata';
  }

  // Desktop: auto after first play, metadata initially
  return hasPlayedBefore ? 'auto' : 'metadata';
}

/**
 * Video player configuration
 */
export interface VideoPlayerConfig {
  videoId: string;
  libraryId: string;
  poster: string;
  preload: 'metadata' | 'none' | 'auto';
  autoplay: boolean;
  muted: boolean;
  controls: boolean;
  quality?: string;
  options?: {
    maxBitrate?: number;
    maxHeight?: number;
    adaptiveBitrate?: boolean;
  };
}

/**
 * Get complete player configuration
 */
export function getPlayerConfig(
  deviceType: 'mobile' | 'desktop',
  hasPlayedBefore: boolean = false
): VideoPlayerConfig {
  const source = getVideoSource(deviceType);
  const poster = getPosterImage(deviceType);
  const preload = getPreloadStrategy(hasPlayedBefore, deviceType);

  return {
    videoId: 'a6751ee5-c1d3-4006-9776-7d1a9ced040c',
    libraryId: '505300',
    poster,
    preload,
    autoplay: true,
    muted: true,
    controls: true,
    quality: source.quality,
    options: {
      maxBitrate: source.maxBitrate,
      maxHeight: source.maxHeight,
      adaptiveBitrate: true, // Enable adaptive bitrate streaming
    },
  };
}

/**
 * Detect device type
 */
export function detectDeviceType(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';

  const userAgent = navigator.userAgent || '';
  const maxWidth = 768; // Tablet and below

  // Check screen width
  if (window.innerWidth < maxWidth) {
    return 'mobile';
  }

  // Check user agent for mobile devices
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  if (mobileRegex.test(userAgent)) {
    return 'mobile';
  }

  return 'desktop';
}

/**
 * Get video loading strategy
 * Provides instructions for optimal loading
 */
export function getVideoLoadingStrategy() {
  const deviceType = detectDeviceType();

  return {
    device: deviceType,
    ...getPlayerConfig(deviceType),
    recommendations: {
      poster: 'Load poster image immediately for instant visual',
      preload: 'Use metadata initially, auto after first play',
      quality: deviceType === 'mobile' ? '720p max for mobile' : '1080p for desktop',
      adaptive: 'Enable adaptive bitrate for smooth playback',
    },
  };
}
