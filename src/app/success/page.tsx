"use client";

import { CTAButton } from "../../components/ui/cta-button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [sessionData, setSessionData] = useState<VerifiedSession | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setVerificationStatus('error');
        setErrorMessage('No session ID found. Please complete your checkout first.');
        return;
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data: VerifiedSession = await response.json();

        if (!response.ok || !data.success) {
          setVerificationStatus('error');
          setErrorMessage(data.error || 'Payment verification failed. Please contact support if you believe this is an error.');
          return;
        }

        setSessionData(data);
        setVerificationStatus('success');
      } catch (error) {
        console.error('Session verification error:', error);
        setVerificationStatus('error');
        setErrorMessage('Unable to verify your payment. Please contact support.');
      }
    };

    verifySession();
  }, [searchParams]);

  // Loading state
  if (verificationStatus === 'loading') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#940909] rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-black mb-4">
            Verifying Your Payment...
          </h1>
          <p className="text-gray-600">
            Please wait while we confirm your payment.
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (verificationStatus === 'error') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-10 w-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Payment Verification Failed
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {errorMessage}
          </p>
          <div className="space-y-4">
            <CTAButton
              onClick={() => window.location.href = '/'}
              className="w-full md:w-auto"
            >
              Return to Home
            </CTAButton>
            <p className="text-gray-600">
              Need help? Contact us at{" "}
              <a
                href="mailto:contact@limitlessprotocol.com"
                className="text-[#940909] font-semibold"
              >
                contact@limitlessprotocol.com
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Success state
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#940909] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Welcome to The Limitless Protocol
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your payment was successfully verified and your transformation journey begins
            now.
          </p>
          {sessionData?.session?.customer_email && (
            <p className="text-sm text-gray-500 mb-8">
              Confirmation sent to {sessionData.session.customer_email}
            </p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">
            What Happens Next?
          </h2>
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#940909] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-1">
                  Check Your Email
                </h3>
                <p className="text-gray-700">
                  You'll receive a welcome email with your login credentials and
                  immediate next steps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#940909] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-1">
                  Access Your Portal
                </h3>
                <p className="text-gray-700">
                  Get immediate access to the training materials and your
                  personalized protocol setup.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#940909] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-1">
                  Schedule Your Onboarding
                </h3>
                <p className="text-gray-700">
                  Depending on your tier, you'll receive instructions to
                  schedule your coaching calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CTAButton
            onClick={() =>
              (window.location.href = "mailto:contact@limitlessprotocol.com")
            }
            className="w-full md:w-auto"
          >
            Contact Support
          </CTAButton>
          <p className="text-gray-600">
            For any questions or support, email us at{" "}
            <a
              href="mailto:contact@limitlessprotocol.com"
              className="text-[#940909] font-semibold"
            >
              contact@limitlessprotocol.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
