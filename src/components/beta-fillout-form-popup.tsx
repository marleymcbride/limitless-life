'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { FilloutStandardEmbed } from '@fillout/react';

interface BetaFilloutFormPopupProps {
  onClose?: () => void;
}

export default function BetaFilloutFormPopup({ onClose }: BetaFilloutFormPopupProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';

  // Validate required parameters
  useEffect(() => {
    if (!name || !email) {
      setError('Missing required information');
      const timer = setTimeout(() => {
        setIsAnimatingOut(true);
        setTimeout(() => {
          router.replace('/beta-access');
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [name, email, router]);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimatingIn(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Fallback: Hide loading state after timeout
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 1500);
    return () => clearTimeout(loadingTimeout);
  }, [isLoading]);

  const handleFormSuccess = () => {
    setShowSuccess(true);
    // Redirect to beta confirmed after 2.5 seconds
    setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        router.push('/beta-access/confirmed');
      }, 300);
    }, 2500);
  };

  const handleClose = () => {
    if (confirm('Close this form and return to the beta page?')) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        router.replace('/beta-access');
      }, 300);
    }
    if (onClose) onClose();
  };

  // Show error state
  if (error) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <p className="text-gray-600 text-sm">Redirecting to beta page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isAnimatingIn ? 'opacity-0' : 'opacity-100'} ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative w-full max-w-4xl mx-4 h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {!showSuccess ? (
          <>
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading your application...</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="flex-1 overflow-y-auto">
              <FilloutStandardEmbed
                filloutId="v6MK9qTEGNus"
                domain="limitless-life.fillout.com"
                parameters={{
                  name: name,
                  email: email,
                  filloutPageId: 'page1',
                }}
                onSubmit={() => {
                  console.log('[BetaFillout] Form submitted');
                  handleFormSuccess();
                }}
                onReady={() => {
                  console.log('[BetaFillout] Form ready');
                  console.log('[BetaFillout] Pre-filling with:', { name, email });
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 400);
                }}
              />
            </div>
          </>
        ) : (
          /* Success state */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You're on the waitlist!
              </h2>
              <p className="text-gray-600">Redirecting to confirmation page...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
