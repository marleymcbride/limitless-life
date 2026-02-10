import { useEffect, useRef } from 'react';

interface ScrollTrackingOptions {
  sessionId: string;
  userId?: string;
  enabled?: boolean;
  thresholds?: number[];
}

/**
 * Hook to track scroll depth on a page
 * Sends scroll_depth events when user crosses 25%, 50%, 75%, 100% thresholds
 */
export function useScrollTracking({
  sessionId,
  userId,
  enabled = true,
  thresholds = [25, 50, 75, 100],
}: ScrollTrackingOptions) {
  const trackedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!enabled || !sessionId) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Check each threshold
      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !trackedThresholds.current.has(threshold)) {
          trackedThresholds.current.add(threshold);

          // Send scroll depth event to analytics
          fetch('/api/analytics/scroll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId,
              userId,
              depth: threshold,
            }),
          }).catch((err) => console.error('Failed to track scroll:', err));
        }
      }
    };

    // Add scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sessionId, userId, enabled, thresholds]);
}
