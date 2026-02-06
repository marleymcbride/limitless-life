/**
 * Image Optimization Configuration
 *
 * Provides optimized image settings for Next.js Image component
 * and best practices for image optimization.
 */

import { ImageProps } from 'next/image';

/**
 * Supported image formats with characteristics
 */
export interface ImageFormat {
  extension: string;
  mimeType: string;
  supportsTransparency: boolean;
  useCase: string;
  compression: 'lossy' | 'lossless';
}

export const IMAGE_FORMATS: Record<string, ImageFormat> = {
  webp: {
    extension: 'webp',
    mimeType: 'image/webp',
    supportsTransparency: true,
    useCase: 'Photos, graphics, UI elements (best compression)',
    compression: 'lossy',
  },
  avif: {
    extension: 'avif',
    mimeType: 'image/avif',
    supportsTransparency: true,
    useCase: 'Modern browsers, best compression',
    compression: 'lossy',
  },
  jpg: {
    extension: 'jpg',
    mimeType: 'image/jpeg',
    supportsTransparency: false,
    useCase: 'Photos without transparency',
    compression: 'lossy',
  },
  png: {
    extension: 'png',
    mimeType: 'image/png',
    supportsTransparency: true,
    useCase: 'Graphics, logos, images with transparency',
    compression: 'lossless',
  },
};

/**
 * Image quality presets for different use cases
 */
export interface QualityPreset {
  quality: number;
  useCase: string;
}

export const QUALITY_PRESETS: Record<string, QualityPreset> = {
  thumbnail: {
    quality: 60,
    useCase: 'Small thumbnails, avatars',
  },
  standard: {
    quality: 75,
    quality: 75,
    useCase: 'General web images',
  },
  high: {
    quality: 85,
    useCase: 'Hero images, featured content',
  },
  maximum: {
    quality: 95,
    useCase: 'Photography portfolio, print-quality',
  },
};

/**
 * Image size presets for different device contexts
 */
export interface SizePreset {
  width: number;
  height?: number;
  device: 'mobile' | 'tablet' | 'desktop';
}

export const SIZE_PRESETS: Record<string, SizePreset> = {
  thumbnail: {
    width: 150,
    height: 150,
    device: 'mobile',
  },
  mobile: {
    width: 375,
    device: 'mobile',
  },
  tablet: {
    width: 768,
    device: 'tablet',
  },
  desktop: {
    width: 1920,
    device: 'desktop',
  },
  '4k': {
    width: 3840,
    device: 'desktop',
  },
};

/**
 * Get optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(options: {
  src: string;
  alt: string;
  width?: number;
  quality?: keyof typeof QUALITY_PRESETS;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}): Omit<ImageProps, 'ref' | 'onLoadingComplete'> {
  const qualityPreset = options.quality
    ? QUALITY_PRESETS[options.quality]
    : QUALITY_PRESETS.standard;

  const props: Omit<ImageProps, 'ref' | 'onLoadingComplete'> = {
    src: options.src,
    alt: options.alt,
    quality: qualityPreset.quality,
    priority: options.priority || false,
    fill: options.fill || false,
  };

  if (!options.fill && options.width) {
    props.width = options.width;
  }

  if (options.sizes) {
    props.sizes = options.sizes;
  }

  if (options.priority) {
    props.priority = true;
  }

  return props;
}

/**
 * Responsive image sizes for different contexts
 */
export const RESPONSIVE_SIZES = {
  fullWidth: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  hero: '100vw',
  content: '(max-width: 768px) 100vw, 896px',
  thumbnail: '(max-width: 768px) 50px, 100px',
  testimonial: '(max-width: 768px) 60px, 120px',
  logo: '(max-width: 768px) 120px, 200px',
};

/**
 * Get device-specific image dimensions
 */
export function getDeviceDimensions(
  deviceType: 'mobile' | 'tablet' | 'desktop'
): { maxWidth: number; suggestedQuality: number } {
  switch (deviceType) {
    case 'mobile':
      return { maxWidth: 375, suggestedQuality: 75 };
    case 'tablet':
      return { maxWidth: 768, suggestedQuality: 80 };
    case 'desktop':
      return { maxWidth: 1920, suggestedQuality: 85 };
  }
}

/**
 * Check if image format supports next-gen formats
 */
export function supportsNextGenFormat(): boolean {
  if (typeof window === 'undefined') return true; // Server-side: assume yes

  const img = new Image();
  return img.supports?.('image/avif') || img.supports?.('image/webp');
}

/**
 * Get best image format for current browser
 */
export function getBestImageFormat(): 'avif' | 'webp' | 'jpg' | 'png' {
  if (typeof window === 'undefined') return 'webp';

  const img = new Image();

  if (img.supports?.('image/avif')) {
    return 'avif';
  }

  if (img.supports?.('image/webp')) {
    return 'webp';
  }

  // Fallback to traditional formats
  return 'jpg';
}

/**
 * Calculate optimal image sizes for srcset
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[]
): string {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Common srcset widths
 */
export const SRCSET_WIDTHS = [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/**
 * Preload critical images
 */
export function generatePreloadLink(
  imageUrl: string,
  type: 'image' | 'fetch' = 'image'
): string {
  return `<link rel="preload" href="${imageUrl}" as="${type}" />`;
}

/**
 * Critical images to preload (above the fold)
 */
export const CRITICAL_IMAGES = [
  '/images/vsl-poster-desktop.jpg',
  '/images/hero-background.jpg',
  '/images/logo.png',
];

/**
 * Generate preload tags for critical images
 */
export function generateCriticalImagePreloads(): string[] {
  return CRITICAL_IMAGES.map((url) => generatePreloadLink(url));
}

/**
 * Image optimization checklist
 */
export const IMAGE_OPTIMIZATION_CHECKLIST = {
  format: 'Use WebP/AVIF with JPG/PNG fallbacks',
  compression: 'Compress to 75-85% quality',
  dimensions: 'Resize to max display size',
  responsive: 'Use srcset for multiple sizes',
  lazy: 'Lazy load below-fold images',
  priority: 'Preload critical (above-fold) images',
  modern: 'Use Next.js Image component',
  monitor: 'Check Core Web Vitals (LCP, CLS)',
};
