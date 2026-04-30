"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface VerifiedSession {
  success: boolean;
  session?: {
    id: string;
    customer_email: string;
    amount_total: number;
    currency: string;
  };
  error?: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [sessionData, setSessionData] = useState<VerifiedSession | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setVerificationStatus('error');
        setErrorMessage('No session ID found.');
        return;
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data: VerifiedSession = await response.json();

        if (!response.ok || !data.success) {
          setVerificationStatus('error');
          setErrorMessage(data.error || 'Payment verification failed.');
          return;
        }

        setSessionData(data);
        setVerificationStatus('success');
      } catch (error) {
        console.error('Session verification error:', error);
        setVerificationStatus('error');
        setErrorMessage('Unable to verify your payment.');
      }
    };

    verifySession();
  }, [searchParams]);

  if (verificationStatus === 'loading') {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying...</p>
        </div>
      </main>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-gray-300 mb-4">{errorMessage}</p>
          <a href="/" className="text-white underline">Return Home</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        {/* Animated checkmark */}
        <div className="mb-10">
          <div className="w-20 h-20 border-3 border-white rounded-full flex items-center justify-center mx-auto">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          You&apos;re in.
        </h1>

        {/* Subheadline - excitement */}
        <p className="text-xl text-gray-300 mb-8">
          This is going to be good.
        </p>

        {/* Email reminder */}
        <div className="border border-gray-800 rounded-lg p-6 mb-6">
          <p className="text-gray-400 mb-2">Check your email</p>
          <p className="text-white">
            I&apos;ll be in touch within 24 hours with next steps.
          </p>
        </div>

        {/* Beta confirmation if applicable */}
        {sessionData?.session?.amount_total === 99700 && (
          <p className="text-gray-500 text-sm mb-6">
            Beta cohort secured at £997
          </p>
        )}

        {/* Sign-off */}
        <p className="text-gray-600 text-sm">
          Marley
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
