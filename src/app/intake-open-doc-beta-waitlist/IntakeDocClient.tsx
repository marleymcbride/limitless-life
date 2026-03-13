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

  // Add global function for waitlist deposit
  useEffect(() => {
    (window as any).handleWaitlistDeposit = async (e: Event) => {
      e.preventDefault();

      // Get email and name from URL params
      const params = new URLSearchParams(window.location.search);
      const email = params.get('email') || '';
      const name = params.get('name') || '';

      try {
        console.log('[Waitlist Deposit] Creating Stripe checkout session');

        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier: 'life-whatsapp',
            paymentPlan: 'full',
            customerEmail: email,
            customerName: name,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        console.log('[Waitlist Deposit] Checkout session created:', data.sessionId);

        // Immediately redirect to Stripe Checkout
        if (data.url) {
          console.log('[Waitlist Deposit] Redirecting to Stripe...');
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned');
        }
      } catch (err) {
        console.error('[Waitlist Deposit] Error:', err);
        alert('Failed to process deposit. Please try again or contact support.');
      }
    };

    return () => {
      delete (window as any).handleWaitlistDeposit;
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
