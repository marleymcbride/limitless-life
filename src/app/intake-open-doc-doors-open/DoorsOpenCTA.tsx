"use client";

import { useSearchParams } from 'next/navigation';
import { GammaCTA } from '@/components/gamma-article';
import { useSession } from '@/hooks/useSession';
import { trackEvent } from '@/lib/analytics';

export default function DoorsOpenCTA() {
  const searchParams = useSearchParams();
  const { session } = useSession();

  const handleEnrollment = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Get email and name from URL params
    const email = searchParams.get('email') || '';
    const name = searchParams.get('name') || '';

    // Fire-and-forget tracking — don't block the Stripe redirect
    if (session?.sessionId) {
      trackEvent({
        sessionId: session.sessionId,
        userId: session.userId ?? undefined,
        eventType: 'stripe_checkout_initiated',
        eventData: {
          page: 'offer-doc-doors-open',
          email: email || undefined,
          name: name || undefined,
          tier: 'life-whatsapp',
        },
      }).catch(() => {});
    }

    try {
      console.log('[Doors Open] Creating Stripe checkout session for enrollment');

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

      console.log('[Doors Open] Checkout session created:', data.sessionId);

      // Immediately redirect to Stripe Checkout
      if (data.url) {
        console.log('[Doors Open] Redirecting to Stripe...');
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('[Doors Open] Error:', err);
      alert('Failed to process enrollment. Please try again or contact support.');
    }
  };

  return (
    <>
      {/* Mobile version */}
      <span className="md:hidden lg:hidden inline">
        <a
          href="javascript:void(0)"
          onClick={handleEnrollment}
          className="text-blue-400 font-bold underline hover:text-blue-300 cursor-pointer"
        >
          Click here to secure your spot
        </a>
      </span>

      {/* Desktop version */}
      <GammaCTA href="javascript:void(0)" onClick={handleEnrollment} className="hidden md:inline-block lg:inline-block">
        Click here to secure your spot
      </GammaCTA>
    </>
  );
}
