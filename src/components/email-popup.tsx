'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface EmailPopupProps {
  isOpen: boolean;
  tier: string;
  tierName: string;
  onClose: () => void;
  onSubmit: (data: { email: string; firstName: string }) => void;
  isLoading?: boolean;
}

export default function EmailPopup({
  isOpen,
  tier,
  tierName,
  onClose,
  onSubmit,
  isLoading = false,
}: EmailPopupProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('[EmailPopup] isOpen:', isOpen, 'mounted:', mounted);
  }, [isOpen, mounted]);

  // Reset form when popup opens/closes
  useEffect(() => {
    if (isOpen) {
      console.log('[EmailPopup] Popup opening, resetting form');
      setStep(1);
      setEmail('');
      setFirstName('');
      setLastName('');
    }
  }, [isOpen]);

  if (!isOpen || !mounted) {
    console.log('[EmailPopup] Not rendering:', { isOpen, mounted });
    return null;
  }

  console.log('[EmailPopup] Rendering popup!');

  const handleFirstStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && email.trim()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine first and last name
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName && email.trim()) {
      onSubmit({ email, firstName: fullName });
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Modal - 25% width, centered, tall square shape */}
      <div className="relative w-full max-w-[25vw] min-w-[320px] max-h-[90vh] overflow-y-auto bg-white shadow-2xl">

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
        <div className="p-8">
          {/* Brand */}
          <div className="text-center mb-6">
            <div className="text-[#940909] font-bold text-lg tracking-wider">
              Limitless-life
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              Claim Your Spot
            </h2>
          </div>

          {step === 1 ? (
            <>
              {/* Step 1 Content */}
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Step 1: Please enter your full name and email
                </p>
              </div>

              <form onSubmit={handleFirstStep} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm"
                    placeholder="John Doe"
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 text-sm uppercase tracking-wide shadow-lg mt-6"
                >
                  Go To Next Step 2
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Step 2 Content */}
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Step 2: Almost There!
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  You're one step away from accessing the Limitless Protocol.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {firstName}</p>
                  <p><strong>Email:</strong> {email}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="confirmEmail" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Confirm Your Email
                  </label>
                  <input
                    type="email"
                    id="confirmEmail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm"
                    placeholder="Confirm your email"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-xs uppercase tracking-wide"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-xs uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : 'Complete Application'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Trust indicator */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              🔒 Secure • Limited Spots Available
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
