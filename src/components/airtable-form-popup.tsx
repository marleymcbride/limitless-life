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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';

  // Validate required parameters
  useEffect(() => {
    if (!name || !email) {
      // Redirect to home if missing required params
      router.replace('/');
    }
  }, [name, email, router]);

  // Handle Airtable form submission
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Airtable sends postMessage on form submit
      if (event.origin === 'https://airtable.com' && event.data === 'submit') {
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
      router.push('/application');
    }, 2500);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  // Construct Airtable embed URL with pre-filled data
  const airtableBaseUrl = 'https://airtable.com/embed/appQhGVKy3HwyUkCc/pagHJnWYqMMx4aHkh/form';
  const prefillUrl = new URL(airtableBaseUrl);
  prefillUrl.searchParams.set('prefill_Name', name);
  prefillUrl.searchParams.set('prefill_Email', email);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {showSuccess ? (
          // Success message
          <div className="p-12 text-center">
            <div className="mb-4 text-green-500">
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
          </div>
        ) : (
          // Airtable form iframe
          <div className="relative w-full" style={{ height: '533px' }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              className="airtable-embed"
              src={prefillUrl.toString()}
              frameBorder="0"
              width="100%"
              height="533"
              style={{ background: 'transparent', border: 'none' }}
              onLoad={handleIframeLoad}
            />
          </div>
        )}
      </div>
    </div>
  );
}
