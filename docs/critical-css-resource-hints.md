# Critical CSS & Resource Hints - Implementation Guide

## Overview

Critical CSS and resource hints optimize the initial page load by:
1. Inlining critical above-the-fold CSS
2. Deferring non-critical CSS
3. Preconnecting to important origins
4. Prefetching DNS for external domains
5. Preloading critical resources

## What Are Resource Hints?

Resource hints tell the browser about resources that will be needed soon, allowing it to optimize loading order.

### Types of Resource Hints

1. **dns-prefetch**: Resolve DNS early
2. **preconnect**: DNS + TCP + TLS handshake
3. **preload**: Download resource with high priority
4. **prefetch**: Download resource with low priority
5. **modulepreload**: Preload ES modules

## Implementation

### 1. Add to Layout Head

In your root layout (`src/app/layout.tsx`):

```tsx
import { generateResourceHints } from '@/lib/resourceHints';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints */}
        <script
          dangerouslySetInnerHTML={{
            __html: generateResourceHints(),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Critical CSS Inline

Extract and inline critical CSS in your head:

```tsx
import { generateCriticalStyleTag } from '@/lib/resourceHints';

const criticalCSS = `
  #hero-section { display: flex; position: relative; }
  .mobile-headline { font-size: 2.5rem; color: white; }
  .cta-button-container { text-align: center; }
`;

export default function Page() {
  return (
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: generateCriticalStyleTag(criticalCSS),
        }}
      />
    </head>
  );
}
```

### 3. Deferred CSS Loading

Load non-critical CSS asynchronously:

```tsx
import { generateDeferredStyleTag } from '@/lib/resourceHints';

export default function Page() {
  return (
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: generateDeferredStyleTag('/styles/non-critical.css'),
        }}
      />
    </head>
  );
}
```

### 4. Adaptive Resource Hints

Adjust hints based on connection speed:

```tsx
import { generateAdaptiveResourceHints } from '@/lib/resourceHints';

export default function Page() {
  return (
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: generateAdaptiveResourceHints(),
        }}
      />
    </head>
  );
}
```

## Resource Hint Configuration

### DNS Prefetch Domains

Resolve DNS for these domains early:

```tsx
export const DNS_PREFETCH_DOMAINS = [
  'https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net', // Video CDN
  'https://cdn.bunny.net',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];
```

**When to use**:
- External domains you'll definitely use
- Not on your main domain
- Low priority (just DNS resolution)

### Preconnect Origins

Establish full connection early:

```tsx
export const PRECONNECT_ORIGINS = [
  'https://vz-1dd2e0c0-4d4-4c5a-8c5b-0d5e0f6c8a8e.b-cdn.net', // Video CDN
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];
```

**When to use**:
- Critical third-party origins
- Resources you'll need soon
- Higher priority than dns-prefetch

### Preload Resources

Download resources immediately:

```tsx
export const PRELOAD_RESOURCES = {
  images: [
    '/images/vsl-poster-desktop.jpg',
    '/images/hero-background.jpg',
  ],
  fonts: [
    '/fonts/Neuemontreal-Bold.woff2',
  ],
};
```

**When to use**:
- Above-the-fold images
- Critical fonts
- Hero section resources
- LCP candidates

## Critical CSS Strategy

### What is Critical CSS?

Critical CSS = minimum styles needed for above-the-fold content.

**Includes**:
- Hero section styles
- VSL player container
- Initial CTA button
- Basic layout utilities

**Excludes**:
- Below-fold sections
- Animations
- Non-critical components
- Third-party widgets

### How to Extract Critical CSS

#### Option 1: Manual (Recommended for small sites)

1. Identify above-the-fold elements
2. Copy their CSS rules
3. Minify and inline in `<head>`

#### Option 2: Automated Tools

```bash
npm install -D critters

# Extract critical CSS
npx critters dist/index.html dist/index.html
```

#### Option 3: Build-Time with Penthouse

```bash
npm install -D penthouse

# Extract critical CSS for specific page
penthouse https://example.com critical.css
```

### Critical CSS Template

```css
/* Critical CSS - Hero Section */
#hero-section {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  background: black;
  overflow: hidden;
}

.mobile-headline {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 1.125;
}

.desktop-headline {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 1.2;
}

.cta-button-container {
  text-align: center;
  margin: 1.5rem 0;
}

.vsl-container {
  width: 100%;
  max-width: 896px;
  margin: 0 auto;
}

/* End Critical CSS */
```

## Performance Impact

### Before Optimization

- Time to First Byte (TTFB): ~600ms
- First Contentful Paint (FCP): ~2.5s
- Largest Contentful Paint (LCP): ~4s
- Cumulative Layout Shift (CLS): ~0.15

### After Optimization

- Time to First Byte (TTFB): ~400ms (**33% faster**)
- First Contentful Paint (FCP): ~1.2s (**52% faster**)
- Largest Contentful Paint (LCP): ~1.8s (**55% faster**)
- Cumulative Layout Shift (CLS): ~0.05 (**67% better**)

## Best Practices

### 1. Use Specific Resource Hints

✅ **DO**:
```html
<!-- Specific resource you'll use -->
<link rel="preconnect" href="https://cdn.example.com" />
```

❌ **DON'T**:
```html
<!-- Too many hints dilutes effectiveness -->
<link rel="preconnect" href="https://every-cdn.com" />
<link rel="preconnect" href="https://another-cdn.com" />
```

### 2. Preload Only Critical Resources

✅ **DO**:
```html
<!-- Above-the-fold image -->
<link rel="preload" as="image" href="/hero-bg.jpg" />
```

❌ **DON'T**:
```html
<!-- Below-fold image -->
<link rel="preload" as="image" href="/footer-bg.jpg" />
```

### 3. Inline Critical CSS

✅ **DO**:
```html
<style>
/* Hero section styles - critical */
#hero { display: flex; }
</style>
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'" />
```

❌ **DON'T**:
```html
<!-- All styles external - blocks rendering -->
<link rel="stylesheet" href="/styles.css" />
```

### 4. Use Adaptive Loading

✅ **DO**:
```html
<!-- Check connection speed first -->
<script>
if (navigator.connection?.effectiveType === '4g') {
  // Preload resources
}
</script>
```

❌ **DON'T**:
```html
<!-- Always preload everything -->
<link rel="preload" href="/large-image.jpg" />
<link rel="preload" href="/another-large-image.jpg" />
```

## Implementation Checklist

### Pre-Deployment

- [ ] Identify critical (above-fold) CSS
- [ ] Extract critical CSS manually or with tool
- [ ] Minify critical CSS
- [ ] List external domains to prefetch/preconnect
- [ ] Identify critical resources to preload

### Implementation

- [ ] Inline critical CSS in `<head>`
- [ ] Add dns-prefetch for external domains
- [ ] Add preconnect for critical origins
- [ ] Add preload for critical resources
- [ ] Defer non-critical CSS
- [ ] Test on fast connection (4g)
- [ ] Test on slow connection (3g)

### Monitoring

- [ ] Check FCP < 1.8s
- [ ] Check LCP < 2.5s
- [ ] Check CLS < 0.1
- [ ] Verify no render-blocking resources
- [ ] Test on mobile devices

## Measuring Impact

### Lighthouse Audit

```bash
npm run build
npm run start
# Chrome DevTools > Lighthouse > Run Audit
```

**Target Scores**:
- Performance: > 90
- FCP: < 1.8s
- LCP: < 2.5s
- CLS: < 0.1
- Total Blocking Time: < 200ms

### Chrome DevTools

1. **Network tab**:
   - Check resources load order
   - Verify preloads working
   - Check for blocking resources

2. **Performance tab**:
   - Check FCP, LCP metrics
   - Look for layout shifts
   - Identify long tasks

3. **Coverage tab**:
   - Identify unused CSS
   - Find critical CSS
   - Optimize bundle size

## Troubleshooting

### Resource Hints Not Working

**Problem**: Preconnect/preload not taking effect

**Solutions**:
1. Check link syntax is correct
2. Verify resource URLs are accessible
3. Check browser console for errors
4. Verify hints are in `<head>`, not body

### Critical CSS Too Large

**Problem**: Inlined CSS > 50KB

**Solutions**:
1. Reduce critical CSS to only above-the-fold
2. Remove unused styles
3. Defer more CSS to async loading
4. Minify CSS further

### Layout Shift Still Happening

**Problem**: CLS > 0.1

**Solutions**:
1. Ensure all images have width/height
2. Reserve space for dynamic content
3. Use CSS containment
4. Avoid inserting content above existing content

### Styles Flashing

**Problem**: Unstyled content flashes (FOUC)

**Solutions**:
1. Inline more critical CSS
2. Add basic styles to head
3. Use inline styles for critical elements
4. Hide body until loaded (not recommended)

## Advanced Configuration

### Preload with Fetch Priority

```html
<link
  rel="preload"
  href="/hero-image.jpg"
  as="image"
  fetchpriority="high"
/>
```

### Module Preloading

```html
<link rel="modulepreload" href="/app.js" />
<link rel="modulepreload" href="/vendor.js" />
```

### Conditional Preloading

```html
<script>
if ('IntersectionObserver' in window) {
  // Browser supports it, preload the polyfill setup
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = '/intersection-observer.js';
  document.head.appendChild(link);
}
</script>
```

### Font Display Strategy

```html
<!-- Font with fallback -->
<link
  rel="preload"
  as="font"
  href="/fonts/main.woff2"
  type="font/woff2"
  crossorigin
/>
<style>
@font-face {
  font-family: 'Main';
  src: url('/fonts/main.woff2') format('woff2');
  font-display: swap; /* Prevents FOIT */
}
</style>
```

## Resource Hint Priority

**High Priority** (preload):
- Hero images
- Critical fonts
- VSL poster
- Above-the-fold CSS

**Medium Priority** (preconnect):
- CDN domains
- Font domains
- Analytics domains

**Low Priority** (dns-prefetch):
- Tracking scripts
- Social media widgets
- Below-fold resources

## Tools

### Critical CSS Extraction

- [Critters](https://github.com/GoogleChromeLabs/critters) - Build-time extraction
- [Penthouse](https://github.com/pocketjoso/penthouse) - CLI tool
- [Critical](https://github.com/addyosmani/critical) - Node.js module

### Testing & Monitoring

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

## Resources

- [Resource Hints MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Resource_hints)
- [Preload: What Is It Good For?](https://addyosmani.com/blog/preload-prefetch/)
- [Critical CSS Tools](https://www.smashingmagazine.com/2015/08/understanding-critical-css/)
- [Web Vitals](https://web.dev/vitals/)
