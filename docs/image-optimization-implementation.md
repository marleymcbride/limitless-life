# Image Optimization - Implementation Guide

## Overview

Images are optimized using Next.js Image component with automatic WebP/AVIF conversion, responsive sizing, and lazy loading to reduce bandwidth and improve load times.

## Key Optimizations

### 1. Next-Gen Image Formats

**Formats Used**:
- **WebP**: Best compression, wide support (~95% browsers)
- **AVIF**: Modern format, best compression (~70% browsers)
- **JPG/PNG**: Fallbacks for older browsers

**Benefits**:
- 30-50% smaller file sizes
- Faster image load times
- Better quality at smaller sizes
- Automatic browser detection

### 2. Responsive Images

**Strategy**: Serve different sizes for different devices

**Sizes**:
- Mobile: 375px wide
- Tablet: 768px wide
- Desktop: 1920px wide

**Implementation**:
```tsx
<Image
  src="/image.jpg"
  sizes="(max-width: 768px) 100vw, 896px"
  width={1920}
  height={1080}
/>
```

### 3. Quality Optimization

**Presets**:
- Thumbnail: 60% quality
- Standard: 75% quality
- High: 85% quality (hero images)
- Maximum: 95% quality (portfolio)

**Benefits**:
- Balanced quality vs. size
- Optimized for web use
- Perceptual quality maintained

### 4. Lazy Loading

**Strategy**: Load images only when needed

**Implementation**:
- Below-fold images: Lazy loaded (default)
- Above-fold images: Preloaded (priority)

**Benefits**:
- 50-70% faster initial page load
- Reduced bandwidth usage
- Smoother scrolling

## Implementation

### Basic Usage

```tsx
import Image from 'next/image';
import { getOptimizedImageProps } from '@/lib/imageOptimization';

function MyComponent() {
  return (
    <Image
      {...getOptimizedImageProps({
        src: '/images/my-image.jpg',
        alt: 'Descriptive alt text',
        width: 800,
        quality: 'high',
      })}
    />
  );
}
```

### Responsive Image

```tsx
import Image from 'next/image';

function ResponsiveImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero section"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      quality={85}
      priority // Critical image
    />
  );
}
```

### Lazy-Loaded Image

```tsx
import Image from 'next/image';

function LazyImage() {
  return (
    <Image
      src="/section-image.jpg"
      alt="Section content"
      width={1920}
      height={1080}
      // loading="lazy" is automatic in Next.js
      placeholder="blur" // Optional blur effect
    />
  );
}
```

### With Blur Placeholder

```tsx
import Image from 'next/image';

function ImageWithBlur() {
  return (
    <Image
      src="/photo.jpg"
      alt="Descriptive text"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Image Configuration

### next.config.js

```javascript
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.b-cdn.net', // Bunny.net CDN
      },
    ],
    minimumCacheTTL: 60,
  },
};
```

## Performance Improvements

### Before Optimization

- Image sizes: Full resolution (2-5MB per image)
- Formats: JPG only
- Loading: All images load immediately
- Page size: ~10-15MB (images only)

### After Optimization

- Image sizes: Responsive (50-500KB per image)
- Formats: WebP/AVIF with fallbacks
- Loading: On-demand (lazy load)
- Page size: ~2-3MB (images only)
- **Reduction: 80% smaller**

## Best Practices

### 1. Use Next.js Image Component

✅ **DO**:
```tsx
import Image from 'next/image';
<Image src="/image.jpg" width={800} height={600} alt="..." />
```

❌ **DON'T**:
```tsx
<img src="/image.jpg" alt="..." />
```

### 2. Specify Dimensions

✅ **DO**:
```tsx
<Image
  src="/image.jpg"
  width={1920}
  height={1080}
  alt="..."
/>
```

❌ **DON'T**:
```tsx
<Image src="/image.jpg" alt="..." /> // Layout shift!
```

### 3. Use Responsive Sizes

✅ **DO**:
```tsx
<Image
  src="/image.jpg"
  sizes="(max-width: 768px) 100vw, 50vw"
  fill
  alt="..."
/>
```

❌ **DON'T**:
```tsx
<Image
  src="/image.jpg"
  width={1920} // Always loads 1920px!
  alt="..."
/>
```

### 4. Preload Critical Images

✅ **DO**:
```tsx
<Image
  src="/hero.jpg"
  priority // Preload!
  alt="..."
/>
```

❌ **DON'T**:
```tsx
<Image
  src="/hero.jpg"
  // No priority - slow!
  alt="..."
/>
```

## Critical Images

Images that should be preloaded (above the fold):

1. **Hero Background**: First visual
2. **VSL Poster**: Instant video placeholder
3. **Logo**: Brand visibility
4. **Primary CTA**: Conversion element

```tsx
// These should have priority={true}
<Image src="/hero-bg.jpg" priority alt="..." />
<Image src="/vsl-poster.jpg" priority alt="..." />
<Image src="/logo.png" priority alt="..." />
```

## Lazy Load Images

Images that should be lazy loaded (below the fold):

1. **Testimonials**: Below hero
2. **Section backgrounds**: Mid-page
3. **Gallery images**: Bottom of page
4. **FAQ icons**: Bottom of page

```tsx
// These will be lazy loaded automatically
<Image src="/testimonial-1.jpg" alt="..." />
<Image src="/section-bg.jpg" alt="..." />
```

## Image Sizes Guide

### Hero Images
- Desktop: 1920x1080 (2MB → 200KB)
- Mobile: 750x422 (500KB → 80KB)

### Testimonials
- Desktop: 120x120 (50KB → 5KB)
- Mobile: 80x80 (20KB → 3KB)

### Background Images
- Desktop: 1920x1080 (2MB → 150KB)
- Mobile: 750x1334 (1MB → 100KB)

### Product/Content Images
- Desktop: 896x504 (1MB → 100KB)
- Mobile: 375x211 (300KB → 50KB)

## Format Selection Guide

### Use WebP/AVIF for:
- Photos
- Graphics
- UI elements
- Illustrations

### Use PNG for:
- Logos (with transparency)
- Icons (small sizes)
- Graphics requiring transparency

### Use JPG for:
- Photos without transparency
- Large background images
- Fallback for older browsers

## Optimization Checklist

### Pre-Upload (Before Adding Images)

- [ ] Resize to max display size
- [ ] Export at 75-85% quality
- [ ] Use WebP format when possible
- [ ] Optimize with TinyPNG/Squoosh
- [ ] Test on both mobile and desktop

### Implementation (When Adding to Code)

- [ ] Use Next.js Image component
- [ ] Specify width/height
- [ ] Add descriptive alt text
- [ ] Use `sizes` for responsive images
- [ ] Add `priority` for critical images
- [ ] Remove `priority` for below-fold images
- [ ] Test actual image load times

### Monitoring (After Deployment)

- [ ] Check Lighthouse score (> 90)
- [ ] Check LCP (< 2.5s)
- [ ] Check CLS (< 0.1)
- [ ] Monitor bandwidth usage
- [ ] Test on slow connections (3G)

## Troubleshooting

### Layout Shift (CLS Issues)

**Problem**: Page jumps as images load

**Solution**: Always specify width/height
```tsx
<Image
  src="/image.jpg"
  width={800}  // Required!
  height={600} // Required!
  alt="..."
/>
```

### Slow Image Load

**Problem**: Images take too long to load

**Solutions**:
1. Check image size (should be < 500KB)
2. Enable WebP/AVIF
3. Use lower quality (75 instead of 85)
4. Implement lazy loading
5. Use CDN delivery

### Images Not Optimizing

**Problem**: Images still large

**Solutions**:
1. Verify next.config.js image config
2. Check image domain is in `remotePatterns`
3. Verify image is imported correctly
4. Check build logs for errors

### Blurry Images

**Problem**: Images look blurry

**Solutions**:
1. Increase quality setting
2. Check source image resolution
3. Verify correct dimensions
4. Test on high-DPI displays

## Advanced Optimization

### Generate Blur Placeholder

```bash
npm install sharp
```

```tsx
import { getPlaiceholder } from 'plaiceholder';

async function getBlurDataURL(src: string) {
  const buffer = await fetch(src).then(res => res.arrayBuffer());
  const { base64 } = await getPlaiceholder(Buffer.from(buffer));
  return base64;
}
```

### Custom Image Loader

```tsx
// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
};
```

```tsx
// lib/imageLoader.ts
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `https://cdn.example.com/${src}?w=${width}&q=${quality || 75}`;
}
```

### Responsive Art Direction

```tsx
<picture>
  <source media="(max-width: 768px)" srcSet="/mobile-image.jpg" />
  <source media="(min-width: 769px)" srcSet="/desktop-image.jpg" />
  <Image src="/desktop-image.jpg" alt="..." fill />
</picture>
```

## Monitoring & Testing

### Lighthouse Audit

```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Run Audit
```

**Target Scores**:
- Performance: > 90
- Image Optimization: Pass
- LCP: < 2.5s
- CLS: < 0.1

### Manual Testing

1. **Chrome DevTools > Network tab**
   - Reload page
   - Check image sizes
   - Verify WebP/AVIF used
   - Check lazy loading works

2. **Test on Mobile**
   - Use Chrome DevTools device emulation
   - Test on actual mobile device
   - Check 3G connection speed

3. **Test Bandwidth**
   - Use Chrome DevTools throttling
   - Test "Fast 3G" preset
   - Verify images load acceptably

## Resources

- [Next.js Image Documentation](https://nextjs.org/docs/api-reference/next/image)
- [WebP Support](https://caniuse.com/webp)
- [AVIF Support](https://caniuse.com/avif)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [Core Web Vitals](https://web.dev/vitals/)
