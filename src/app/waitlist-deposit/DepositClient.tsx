"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DepositClient() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');

  // Pre-fill from URL params
  useEffect(() => {
    setName(searchParams.get('name') || '');
    setEmail(searchParams.get('email') || '');
  }, [searchParams]);

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
          <p className="text-xl text-gray-300 mb-4">
            🎉 <strong>Waitlist Bonus Applied!</strong>
          </p>
          <p className="text-gray-300 mb-6">
            As a waitlist applicant, you'll receive a <strong>hefty discount</strong> on your deposit when you secure your spot now.
          </p>

          {/* User Info (if pre-filled) */}
          {(name || email) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">Application Details:</p>
              {name && <p className="text-gray-800"><strong>Name:</strong> {name}</p>}
              {email && <p className="text-gray-800"><strong>Email:</strong> {email}</p>}
            </div>
          )}

          <p className="text-yellow-300 text-sm mb-4">
            ⚠️ Stripe payment integration coming soon
          </p>
          <p className="text-gray-400 text-sm">
            The deposit payment flow will be connected here once the Stripe product and pricing are set up.
          </p>
        </div>

        {/* Next Steps Info */}
        <div className="bg-white/5 rounded-lg p-6 text-left">
          <h2 className="text-xl font-semibold text-white mb-4">What happens next:</h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 font-bold">1.</span>
              <span>Complete your deposit payment (waitlist discount applied)</span>
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
