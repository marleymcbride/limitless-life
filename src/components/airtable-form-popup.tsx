'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface AirtableFormPopupProps {
  onClose?: () => void;
}

export default function AirtableFormPopup({ onClose }: AirtableFormPopupProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';

  // Validate required parameters
  useEffect(() => {
    if (!name || !email) {
      setError('Missing required information');
      // Redirect to home after 3 seconds
      const timer = setTimeout(() => {
        setIsAnimatingOut(true);
        setTimeout(() => {
          router.replace('/');
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

  // Handle Airtable form submission
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin for security
      if (event.origin !== 'https://airtable.com') return;

      // Airtable sends various messages on form submit
      if (event.data === 'submit' || (typeof event.data === 'object' && event.data?.type === 'submit')) {
        handleFormSuccess();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Fallback: Poll for form completion (postMessage backup)
  useEffect(() => {
    if (showSuccess) return;

    const checkInterval = setInterval(() => {
      // Check if iframe URL changed to success page
      try {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
          const currentUrl = iframe.contentWindow.location.href;
          if (currentUrl.includes('airtable.com') && currentUrl.includes('success')) {
            handleFormSuccess();
          }
        }
      } catch (e) {
        // Cross-origin access blocked - expected, rely on postMessage
      }
    }, 2000);

    // Timeout after 5 minutes
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 300000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [showSuccess]);

  const handleFormSuccess = () => {
    setShowSuccess(true);
    // Redirect to application after 2.5 seconds
    setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        router.push('/application');
      }, 300);
    }, 2500);
  };

  const handleClose = () => {
    // Give user a choice to close and return home
    if (confirm('Close this form and return to the home page?')) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        router.replace('/');
      }, 300);
    }
    if (onClose) onClose();
  };

  // Construct Airtable embed URL with pre-filled data
  const airtableBaseUrl = 'https://airtable.com/embed/appQhGVKy3HwyUkCc/pagHJnWYqMMx4aHkh/form';
  const prefillUrl = new URL(airtableBaseUrl);
  prefillUrl.searchParams.set('prefill_Name', name);
  prefillUrl.searchParams.set('prefill_Email', email);

  const handleIframeLoad = () => {
    // Add a small delay for smooth fade-out of loader
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleIframeError = () => {
    setError('Failed to load the application form. Please try again.');
    setIsLoading(false);
  };

  // Show error state
  if (error) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out"
        style={{
          opacity: backdropOpacity,
        }}
      >
        <div
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center transition-all duration-300 ease-out"
          style={{
            opacity: modalOpacity,
            transform: `scale(${modalScale})`,
          }}
        >
          <div className="mb-4 text-red-500">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  // Calculate opacity and scale based on animation state
  const backdropOpacity = isAnimatingIn ? 0 : (isAnimatingOut ? 0 : 1);
  const modalScale = isAnimatingIn ? 0.95 : (isAnimatingOut ? 0.95 : 1);
  const modalOpacity = isAnimatingIn ? 0 : (isAnimatingOut ? 0 : 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out"
      style={{
        opacity: backdropOpacity,
        transitionDelay: isAnimatingIn ? '0ms' : '0ms',
      }}
    >
      <div
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transition-all duration-300 ease-out"
        style={{
          opacity: modalOpacity,
          transform: `scale(${modalScale})`,
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {showSuccess ? (
          // Success message with fade-in
          <div className="p-12 text-center animate-fade-in">
            <div className="mb-4 text-green-500 transition-all duration-500 ease-out" style={{ transform: 'scale(0)' }}>
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Step Complete!
            </h2>
            <p className="text-gray-600">
              Redirecting you to continue...
            </p>
            <style>{`
              @keyframes checkmark {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); opacity: 1; }
              }
              .text-green-500 > svg {
                animation: checkmark 0.5s ease-out forwards;
              }
            `}</style>
          </div>
        ) : (
          // Airtable form iframe with smooth loader
          <div className="relative w-full" style={{ height: '533px' }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-400 ease-out">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm font-medium animate-pulse">Loading your application...</p>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              className="airtable-embed transition-opacity duration-400 ease-out"
              src={prefillUrl.toString()}
              frameBorder="0"
              width="100%"
              height="533"
              style={{
                background: 'transparent',
                border: 'none',
                opacity: isLoading ? 0 : 1,
              }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        )}
      </div>
    </div>
  );
}
