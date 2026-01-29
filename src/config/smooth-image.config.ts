/**
 * Global configuration for SmoothImage component
 * Adjust these values to change the behavior across all testimonial images
 */
export const SMOOTH_IMAGE_CONFIG = {
  /**
   * When to trigger the image load:
   * - 0.01 = as soon as the top edge is visible
   * - 0.5 = when 50% of the image is visible
   * - 1.0 = when the entire image is visible
   *
   * Recommended: 0.01 for smooth loading
   */
  intersectionThreshold: 0.01,

  /**
   * How far outside the viewport to start loading (in pixels)
   *
   * - "100px" = start loading 100px before entering viewport
   * - "0px" = start loading exactly at viewport edge
   *
   * Recommended: "100px" to start loading before visible
   */
  rootMargin: "100px",

  /**
   * Duration of the fade-in animation (milliseconds)
   */
  animationDuration: 700,

  /**
   * Delay after image enters viewport before starting fade-in (milliseconds)
   * This makes the animation more visible
   */
  fadeInDelay: 300,

  /**
   * Enable priority loading for above-fold images
   * Images with priority={true} will load immediately
   */
  enablePriority: true,
} as const;
