"use client";

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
}

export default function IntakeDocClient({ children }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if mobile device - skip animations entirely
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    // Get elements to animate
    const elements = container.querySelectorAll('p, h1, h2, h3, ul, li, blockquote, div[style*="background-color"]');

    // IMMEDIATELY set all elements to hidden state (synchronously) - NO TRANSFORM to prevent scroll issues
    elements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transition = 'opacity 1s ease-out';
    });

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            // Fade in only - no transform to prevent rubber banding
            setTimeout(() => {
              element.style.opacity = '1';
            }, 50);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    // Observe all elements
    elements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
