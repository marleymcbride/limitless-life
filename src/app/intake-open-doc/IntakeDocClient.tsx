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

    // Get elements to animate
    const elements = container.querySelectorAll('p, h1, h2, h3, ul, li, blockquote, div[style*="background-color"]');

    // IMMEDIATELY set all elements to hidden state (synchronously)
    elements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 1.8s ease-out, transform 1.8s ease-out';
    });

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            // Fade in
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
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
