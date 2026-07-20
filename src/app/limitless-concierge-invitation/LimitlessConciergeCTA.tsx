"use client";

import { useSearchParams } from 'next/navigation';
import { GammaCTA } from '@/components/gamma-article';

export default function LimitlessConciergeCTA() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';

  const handleDeposit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      console.log('[Limitless Concierge] Creating Stripe checkout session');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'limitless-concierge',
          paymentPlan: 'full',
          customerEmail: email,
          customerName: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      console.log('[Limitless Concierge] Checkout session created:', data.sessionId);

      if (data.url) {
        console.log('[Limitless Concierge] Redirecting to Stripe...');
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('[Limitless Concierge] Error:', err);
      alert('Failed to process deposit. Please try again or contact support.');
    }
  };

  return (
    <>
      {/* Mobile version */}
      <span className="md:hidden lg:hidden inline">
        <a
          href="javascript:void(0)"
          onClick={handleDeposit}
          className="text-blue-400 font-bold underline hover:text-blue-300 cursor-pointer"
        >
          Click here to secure your<br /> place
        </a>
      </span>

      {/* Desktop version */}
      <GammaCTA href="javascript:void(0)" onClick={handleDeposit} className="hidden md:inline-block lg:inline-block">
        Click here to secure your place
      </GammaCTA>
    </>
  );
}
