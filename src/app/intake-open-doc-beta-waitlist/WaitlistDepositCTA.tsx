"use client";

import { useSearchParams } from 'next/navigation';
import { GammaCTA } from '@/components/gamma-article';

export default function WaitlistDepositCTA() {
  const searchParams = useSearchParams();

  const handleDeposit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Get email and name from URL params
    const email = searchParams.get('email') || '';
    const name = searchParams.get('name') || '';

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

  return (
    <GammaCTA href="javascript:void(0)" onClick={handleDeposit}>
      Confirm your spot
    </GammaCTA>
  );
}
