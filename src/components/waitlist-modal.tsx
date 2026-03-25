'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({
  isOpen,
  onClose,
}: WaitlistModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Block scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ firstName: '', email: '' });
      setSubmitResult(null);
    }
  }, [isOpen]);

  if (!isOpen || !mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email) return;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setSubmitResult({
        success: false,
        message: 'Please enter a valid email address',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const { submitToN8nWebhook } = await import(
        '../lib/n8n-webhook-client'
      );

      await submitToN8nWebhook(
        formData.email,
        formData.firstName,
        'limitless-protocol-premium-waitlist'
      );

      setSubmitResult({
        success: true,
        message: "You're on the waitlist.",
      });

      const params = new URLSearchParams({
        name: formData.firstName,
        email: formData.email,
      });

      setFormData({ firstName: '', email: '' });

      // Wait 2 seconds then close modal and redirect to thank you page (Variant A)
      setTimeout(() => {
        onClose();
        window.location.href = `/waitlist-thank-you?${params.toString()}`;
      }, 2000);
    } catch {
      setSubmitResult({
        success: false,
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] mx-auto flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="px-8 md:px-4 lg:px-4">
        {/* Modal - matching EmailPopup styling */}
        <div className="pb-2 py-0 md:py-2 lg:py-2 px-4 md:px-10 lg:px-10 mx-0 ml-0 md:ml-16 lg:ml-16 w-full md:w-[420px] lg:w-[420px] max-h-[400vh] overflow-y-auto bg-gradient-to-b from-zinc-400 via-zinc-350 via-zinc-300 via-zinc-250 via-zinc-100 to-zinc-100 shadow-2xl rounded-xl shadow-[inset_0_2px_0_0_rgba(252,252,250,0.9)] relative">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-4">
            {/* Brand */}
            <div className="text-center scale-[60%] mb-2">
              <img
                src="/images/LIMITLESS LIFE LOGO 2026.png"
                alt="Limitless Life"
                className="h-16 mx-auto"
              />
            </div>

            {/* Headline */}
            <div className="text-center mb-0">
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                Join the Waitlist
              </div>
            </div>
          </div>

          {!submitResult?.success ? (
            <>
              {/* Step Content - Form fields */}
              <div className="text-center mb-2">
                <div className="text-lg md:text-lg lg:text-lg font-normal text-stone-600 tracking-wide">
                  <strong className="text-[#d12121]">STEP 1:</strong> Please enter your details
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {submitResult?.success === false && (
                  <div className="p-3 text-sm text-center text-red-200 rounded border border-red-800 bg-red-900/20">
                    {submitResult.message}
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Your Full Name"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-5 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <strong>{isSubmitting ? 'JOINING...' : "I&apos;M INTERESTED"}</strong>
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="animate-fade-in p-6 text-center">
                <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif' }}>
                  You&apos;re on the waitlist!
                </p>
                <p className="text-sm text-gray-600">Redirecting to application...</p>
              </div>
            </>
          )}

          {/* Trust indicator */}
          {!submitResult?.success && (
            <div className="text-center mt-8 pt-0 border-t border-gray-200">
              <div className="text-[10px] md:text-[12px] lg:text-[12px] pt-2 text-gray-400 uppercase tracking-wide">
                🔒 Secure • Limited Spots Available
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
