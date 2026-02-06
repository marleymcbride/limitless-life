/**
 * Resource Hints & Critical CSS
 *
 * Optimizes resource loading with:
 * - DNS prefetch for external domains
 * - Preconnect for important origins
 * - Preload for critical resources
 * - Critical CSS extraction
 */

/**
 * External domains that should be prefetched
 */
export const DNS_PREFETCH_DOMAINS = [
  'https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net', // Bunny.net CDN (video)
  'https://cdn.bunny.net', // Bunny.net CDN
  'https://fonts.googleapis.com', // Google Fonts
  'https://fonts.gstatic.com', // Google Fonts static
  'https://www.googletagmanager.com', // Google Analytics
];

/**
 * Origins that should be preconnected (DNS + TCP + TLS)
 */
export const PRECONNECT_ORIGINS = [
  'https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net', // Video CDN
  'https://fonts.googleapis.com', // Fonts
  'https://fonts.gstatic.com', // Font static
];

/**
 * Critical resources to preload
 */
export const PRELOAD_RESOURCES = {
  images: [
    '/images/vsl-poster-desktop.jpg',
    '/images/hero-background.jpg',
    '/images/logo.png',
  ],
  fonts: [
    '/fonts/Neuemontreal-Bold.woff2',
    '/fonts/Neuemontreal-Medium.woff2',
  ],
  scripts: [], // Add critical inline scripts if needed
  styles: [], // Critical CSS files
};

/**
 * Generate DNS prefetch link tags
 */
export function generateDNSPrefetchLinks(): string {
  return DNS_PREFETCH_DOMAINS
    .map((domain) => `<link rel="dns-prefetch" href="${domain}" />`)
    .join('\n');
}

/**
 * Generate preconnect link tags
 */
export function generatePreconnectLinks(): string {
  return PRECONNECT_ORIGINS
    .map((origin) => `<link rel="preconnect" href="${origin}" />`)
    .join('\n');
}

/**
 * Generate preload link tags for critical resources
 */
export function generatePreloadLinks(): string {
  const links: string[] = [];

  // Preload critical images
  PRELOAD_RESOURCES.images.forEach((image) => {
    links.push(
      `<link rel="preload" as="image" href="${image}" imagesrcset="${image}" />`
    );
  });

  // Preload critical fonts
  PRELOAD_RESOURCES.fonts.forEach((font) => {
    links.push(
      `<link rel="preload" as="font" href="${font}" type="font/woff2" crossorigin />`
    );
  });

  // Preload critical scripts
  PRELOAD_RESOURCES.scripts.forEach((script) => {
    links.push(`<link rel="preload" as="script" href="${script}" />`);
  });

  // Preload critical styles
  PRELOAD_RESOURCES.styles.forEach((style) => {
    links.push(`<link rel="preload" as="style" href="${style}" />`);
  });

  return links.join('\n');
}

/**
 * Generate all resource hint tags
 */
export function generateResourceHints(): string {
  return [
    generateDNSPrefetchLinks(),
    generatePreconnectLinks(),
    generatePreloadLinks(),
  ].join('\n');
}

/**
 * Critical CSS selectors (above-the-fold content)
 *
 * These styles are needed for initial render and should be inlined.
 * Everything else can be loaded asynchronously.
 */
export const CRITICAL_CSS_SELECTORS = [
  // Hero section
  '#hero-section',
  '.hero-container',
  '.mobile-headline',
  '.mobile-subheadline',
  '.desktop-headline',

  // VSL Player
  '#vsl-outer-container',
  '.vsl-border-wrapper',
  '.vsl-container',

  // CTA Button
  '.cta-button-container',
  '.cta-btn-mob',

  // Layout utilities
  'body',
  'html',
];

/**
 * Critical CSS properties (minimal set for above-the-fold)
 */
export const CRITICAL_CSS_PROPS = [
  'display',
  'position',
  'width',
  'height',
  'margin',
  'padding',
  'font-size',
  'line-height',
  'color',
  'background-color',
];

/**
 * Generate critical CSS inline style tag
 *
 * This should be placed in the <head> before any external stylesheets.
 */
export function generateCriticalStyleTag(css: string): string {
  return `
<style data-emotion="critical">
/* Critical CSS - Above the Fold */
${css}
</style>
  `.trim();
}

/**
 * Non-critical CSS (can be deferred)
 *
 * These styles are loaded after initial render using:
 * - media="print" onload="this.media='all'" trick
 * - or async loading with JavaScript
 */
export function generateDeferredStyleTag(href: string): string {
  return `
<link
  rel="stylesheet"
  href="${href}"
  media="print"
  onload="this.media='all'; this.onload=null;"
/>
  `.trim();
}

/**
 * Generate module preload hints for ES modules
 */
export function generateModulePreload(modules: string[]): string {
  return modules
    .map(
      (module) => `<link rel="modulepreload" href="${module}" />`
    )
    .join('\n');
}

/**
 * Performance monitoring hints
 */
export const PERFORMANCE_HINTS = {
  // Preload connection to analytics
  preconnectAnalytics: `<link rel="preconnect" href="https://www.googletagmanager.com" />`,

  // DNS prefetch for tracking
  dnsPrefetchTracking: `<link rel="dns-prefetch" href="https://www.google-analytics.com" />`,

  // Preload to CDN
  preconnectCDN: `<link rel="preconnect" href="https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net" />`,
};

/**
 * Resource priority hints
 *
 * High priority: Load immediately
 * Auto: Browser decides (default)
 * Low: Load when idle
 */
export function generatePriorityHints(): string {
  return `
<!-- High Priority Resources -->
<link rel="preload" href="/images/vsl-poster-desktop.jpg" as="image" importance="high" />

<!-- Low Priority Resources -->
<link rel="preload" href="/images/footer-bg.jpg" as="image" importance="low" />
  `.trim();
}

/**
 * Complete head tag with all resource hints
 */
export function generateOptimizedHead({
  criticalCSS,
  deferredStylesheets,
}: {
  criticalCSS?: string;
  deferredStylesheets?: string[];
}): string {
  const parts: string[] = [];

  // Resource hints
  parts.push('<!-- Resource Hints -->');
  parts.push(generateResourceHints());

  // Critical CSS (if provided)
  if (criticalCSS) {
    parts.push('<!-- Critical CSS -->');
    parts.push(generateCriticalStyleTag(criticalCSS));
  }

  // Deferred stylesheets
  if (deferredStylesheets && deferredStylesheets.length > 0) {
    parts.push('<!-- Deferred Stylesheets -->');
    deferredStylesheets.forEach((href) => {
      parts.push(generateDeferredStyleTag(href));
    });
  }

  return parts.join('\n');
}

/**
 * Connection type detection for adaptive loading
 */
export function getConnectionType(): {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  saveData?: boolean;
} {
  if (typeof window === 'undefined') {
    return {};
  }

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

  if (!connection) {
    return {};
  }

  return {
    effectiveType: connection.effectiveType,
    saveData: connection.saveData,
  };
}

/**
 * Adaptive resource hints based on connection
 */
export function generateAdaptiveResourceHints(): string {
  const connection = getConnectionType();

  // Slow connection: Minimal resource hints
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData) {
    return `
<!-- Slow Connection - Minimal Hints -->
<link rel="dns-prefetch" href="https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net" />
    `.trim();
  }

  // Fast connection: All resource hints
  return `
<!-- Fast Connection - All Hints -->
${generateResourceHints()}
${generatePriorityHints()}
  `.trim();
}
