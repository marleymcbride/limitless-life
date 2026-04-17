"use client";

import { useSearchParams } from 'next/navigation';
import { GammaCTA } from '@/components/gamma-article';

// Default beta coupon ID - can be overridden via couponID URL param
const DEFAULT_BETA_COUPON = 'promo_1TNCRLDglwfGELM8hItfPc0O';

export default function BetaOpenCTA() {
  const searchParams = useSearchParams();

  const handleEnrollment = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Get email, name, and optional coupon from URL params
    const email = searchParams.get('email') || '';
    const name = searchParams.get('name') || '';
    const couponParam = searchParams.get('couponID') || '';

    // Use param coupon if provided, otherwise use default beta coupon
    const couponID = couponParam || DEFAULT_BETA_COUPON;

    try {
      console.log('[Beta Open] Creating Stripe checkout session for enrollment');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'beta', // Beta tier
          paymentPlan: 'full',
          customerEmail: email,
          customerName: name,
          couponID, // Apply beta discount coupon
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      console.log('[Beta Open] Checkout session created:', data.sessionId);

      // Immediately redirect to Stripe Checkout
      if (data.url) {
        console.log('[Beta Open] Redirecting to Stripe...');
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('[Beta Open] Error:', err);
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
          Click here to secure your beta spot
        </a>
      </span>

      {/* Desktop version */}
      <GammaCTA href="javascript:void(0)" onClick={handleEnrollment} className="hidden md:inline-block lg:inline-block">
        Click here to secure your beta spot
      </GammaCTA>
    </>
  );
}
