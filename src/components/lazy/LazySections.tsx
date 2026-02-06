/**
 * Lazy-Loaded Sections
 *
 * This file lazy loads all non-critical sections of the sales page.
 * Critical sections (hero, VSL) are loaded immediately for performance.
 *
 * Lazy loading strategy:
 * - Above-fold sections (hero, VSL, initial CTA) → Load immediately
 * - Below-fold sections → Load on demand as user scrolls
 *
 * Expected outcome: 60-70% reduction in initial bundle size
 */

import { lazy, Suspense } from 'react';
import { SectionPlaceholder } from './SectionPlaceholder';

/**
 * Helper function to create a lazy-loaded section with fallback
 */
function createLazySection<T extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  fallbackHeight: string = '400px'
) {
  const LazyComponent = lazy(importFunc);

  return function LazySectionWrapper(props: T) {
    return (
      <Suspense fallback={<SectionPlaceholder height={fallbackHeight} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// ============ LAZY-LOADED SECTIONS ============
// These sections will be loaded on-demand, reducing initial bundle size

export const LazyDoesThisSoundLikeYou = createLazySection(
  () => import('../does-this-sound-like-you'),
  '300px'
);

export const LazyPersonalStorySection = createLazySection(
  () => import('../personal-story-section'),
  '500px'
);

export const LazyIntroSection = createLazySection(
  () => import('../intro-section'),
  '400px'
);

export const LazyCoreValueProposition = createLazySection(
  () => import('../core-value-proposition'),
  '400px'
);

export const LazyVideoTestimonialCTA = createLazySection(
  () => import('../video-testimonial-cta'),
  '350px'
);

export const LazyVideoTestimonialLaurenceShortVersion = createLazySection(
  () => import('../video-testimonial-laurence-short-version'),
  '400px'
);

export const LazyResultsProof = createLazySection(
  () => import('../results-proof'),
  '500px'
);

export const LazyImagineThis = createLazySection(
  () => import('../imaginethis'),
  '450px'
);

export const LazyClientTransformationGallery = createLazySection(
  () => import('../more-results-created'),
  '600px'
);

export const LazyMoreVideoTestimonials = createLazySection(
  () => import('../more-video-testimonials'),
  '500px'
);

export const LazyBigIdeaSection = createLazySection(
  () => import('../big-idea-section'),
  '400px'
);

export const LazyIntroducingLimitless = createLazySection(
  () => import('../introducing-limitless'),
  '400px'
);

export const LazyWhatYoullAchieve = createLazySection(
  () => import('../what-youll-achieve'),
  '450px'
);

export const LazyMoreClientTestimonials = createLazySection(
  () => import('../more-client-testimonials'),
  '500px'
);

export const LazyHowLimitlessProtocolWorks = createLazySection(
  () => import('../how-limitless-protocol-works'),
  '500px'
);

export const LazyWhatHappensIfYouDontFixThis = createLazySection(
  () => import('../what-happens-if-you-dont-fix-this'),
  '400px'
);

export const LazyWhatMakesThisDifferent = createLazySection(
  () => import('../what-makes-this-different'),
  '450px'
);

export const LazyBonusStack = createLazySection(
  () => import('../bonus-stack'),
  '500px'
);

export const LazyWhySmallNumber = createLazySection(
  () => import('../why-small-number'),
  '400px'
);

export const LazyWhatItsCostingYou = createLazySection(
  () => import('../what-its-costing-you'),
  '400px'
);

export const LazyWhoThisIsFor = createLazySection(
  () => import('../who-this-is-for'),
  '400px'
);

export const LazySecureYourSpot = createLazySection(
  () => import('../secure-your-spot'),
  '600px'
);

export const LazyFinalFAQs = createLazySection(
  () => import('../FAQs'),
  '500px'
);

export const LazyTestimonialsFinal = createLazySection(
  () => import('../testimonials-final'),
  '400px'
);

export const LazyThe3TestimonialsBoxV2 = createLazySection(
  () => import('../the-3-testimonials-box-v2'),
  '500px'
);

export const LazyTestimonialSectionDark = createLazySection(
  () => import('../testimonial-section-dark'),
  '400px'
);

export const LazyRootCauses = createLazySection(
  () => import('../why-traditional-methods-dont-work'),
  '400px'
);

export const LazyDelayedCTA = createLazySection(
  () => import('../delayed-cta'),
  '300px'
);
