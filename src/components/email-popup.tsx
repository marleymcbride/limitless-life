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
  const [userChoice, setUserChoice] = useState<'yes' | 'maybe' | 'no' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Block scrolling when popup is open
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
    if (email.trim()) {
      setStep(3); // Changed from 2 to 3 - skip to choice step
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleChoice = (choice: 'yes' | 'maybe' | 'no') => {
    setUserChoice(choice);

    const fullName = `${firstName}`.trim();
    if (!fullName || !email.trim()) {
      return;
    }

    if (choice === 'no') {
      // Route to enrollment page
      const params = new URLSearchParams({
        name: fullName,
        email: email,
      });
      window.location.href = `/enroll?${params.toString()}`;
    } else {
      // Route to Fillout application
      const params = new URLSearchParams({
        name: fullName,
        email: email,
      });
      window.location.href = `/application-prep?${params.toString()}`;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] mx-auto flex items-center justify-center bg-black/70 backdrop-blur-sm">
     <div className="px-4">
      {/* Modal - thin width, centered */}
      <div className="pb-2 px-4 ml-16 w-[420px] max-h-[400vh] overflow-y-auto bg-gradient-to-b from-zinc-400 via-zinc-350 via-zinc-300 via-zinc-250 via-zinc-100 to-zinc-100 shadow-2xl rounded-xl shadow-[inset_0_2px_0_0_rgba(252,252,250,0.9)]">

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
          <div className="text-center scale-[60%] mb-0">
            <img
              src="/images/LIMITLESS LIFE LOGO 2026.png"
              alt="Limitless Life"
              className="h-16 mx-auto"
            />
          </div>

          {/* Headline */}
          <div className="text-center mb-0">
            <div className="text-3xl font-bold text-gray-900 tracking-tight">
              Register Now to Secure Your Spot
            </div>
          </div>
        </div>

          {step === 1 ? (
            <>
              {/* Step 1 Content - Email only */}
              <div className="text-center mb-2">
                <p className="text-md font-normal text-stone-600 tracking-wide">
                <strong className="text-[#d12121]">STEP 1:</strong> Please enter your details below
                </p>
              </div>

              <form onSubmit={handleFirstStep} className="space-y-4">
                <div>
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Your Email"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-6 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg"
                >
                  <strong>Next</strong>
                </button>
              </form>
            </>
          ) : (
            <>
              {/* TEMPORARILY DISABLED: Step 2 form will be re-implemented in Task 2 */}
              {/* Step 2 Content - Name field revealed */}
              {/* <div className="text-center mb-2">
                <p className="text-md font-normal text-stone-600 tracking-wide">
                  <strong className="text-[#d12121]">STEP 1:</strong> Please enter your details below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Your Full Name"
                    autoFocus
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Your Email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#d12121] hover:bg-[#c62424] text-white font-bold py-6 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'GO TO NEXT STEP 2'}
                </button>
              </form> */}

              {/* Placeholder for Task 2 implementation */}
              <div className="text-center p-8 text-gray-500">
                <p>Step 2 form will be implemented in Task 2</p>
              </div>
            </>
          )}

          {/* Trust indicator */}
          <div className="text-center mt-8 pt-0 border-t border-gray-200">
            <p className="text-[10px] pt-2 text-gray-400 uppercase tracking-wide">
              🔒 Secure • Limited Spots Available
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
