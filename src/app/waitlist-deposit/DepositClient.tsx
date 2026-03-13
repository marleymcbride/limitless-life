"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DepositClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill from URL params
  useEffect(() => {
    setName(searchParams.get('name') || '');
    setEmail(searchParams.get('email') || '');
  }, [searchParams]);

  const handleDeposit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[Deposit] Creating Stripe checkout session for waitlist applicant');

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

      console.log('[Deposit] Checkout session created:', data.sessionId);

      // Immediately redirect to Stripe Checkout
      if (data.url) {
        console.log('[Deposit] Redirecting to Stripe...');
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('[Deposit] Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process deposit');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/images/LIMITLESS LIFE LOGO 2026.png"
            alt="Limitless Life"
            className="h-16 mx-auto"
          />
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Confirm Your Spot
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
          {/* Waitlist Bonus Banner */}
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6 mb-6">
            <p className="text-2xl text-green-300 mb-2">
              🎉 <strong>Waitlist Bonus Applied!</strong>
            </p>
            <p className="text-green-100">
              As a waitlist applicant, you're receiving a <strong>hefty discount</strong> on your deposit when you secure your spot now.
            </p>
          </div>

          {/* User Info (if pre-filled) */}
          {(name || email) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Application Details:</p>
              {name && <p className="text-gray-800 mb-1"><strong>Name:</strong> {name}</p>}
              {email && <p className="text-gray-800"><strong>Email:</strong> {email}</p>}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 text-left">
              <p className="text-red-300 font-semibold mb-1">Error:</p>
              <p className="text-red-100 text-sm">{error}</p>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleDeposit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Secure Your Spot Now →'
            )}
          </button>

          {/* Pricing Info */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-gray-300 text-sm mb-2">
              <strong>Product:</strong> Limitless Life + WhatsApp
            </p>
            <p className="text-gray-400 text-xs">
              One-time Payment in Full (waitlist discount applied)
            </p>
          </div>
        </div>

        {/* Next Steps Info */}
        <div className="bg-white/5 rounded-lg p-6 text-left">
          <h2 className="text-xl font-semibold text-white mb-4">What happens next:</h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 font-bold">1.</span>
              <span>Complete your secure deposit payment (waitlist discount applied)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 font-bold">2.</span>
              <span>We'll review your application within 72 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 font-bold">3.</span>
              <span>If accepted, you'll get immediate access to the beta cohort</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 font-bold">4.</span>
              <span>If not accepted, we'll refund your deposit immediately</span>
            </li>
          </ol>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-gray-400 text-sm">
          <p>Questions? Contact us at support@limitless-life.co</p>
        </div>
      </div>
    </div>
  );
}
