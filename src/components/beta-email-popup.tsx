'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface BetaEmailPopupProps {
  isOpen: boolean;
  tier: string;
  tierName: string;
  onClose: () => void;
}

export default function BetaEmailPopup({
  isOpen,
  tier,
  tierName,
  onClose,
}: BetaEmailPopupProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
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

  // Reset form when popup opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail('');
      setFirstName('');
      setUserChoice(null);
    }
  }, [isOpen]);

  if (!isOpen || !mounted) {
    return null;
  }

  const handleFirstStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleChoice = async (choice: 'yes' | 'maybe' | 'no') => {
    setUserChoice(choice);

    const fullName = `${firstName}`.trim();
    if (!fullName || !email.trim()) {
      return;
    }

    // Determine interest type based on choice
    let interestType: 'tire_kicker' | 'course' | 'coaching';
    let eventType: string;

    if (choice === 'no') {
      interestType = 'tire_kicker';
      eventType = 'tire_kicker_interest_beta';
    } else if (choice === 'maybe') {
      interestType = 'course';
      eventType = 'course_interest_beta';
    } else {
      interestType = 'coaching';
      eventType = 'coaching_interest_beta';
    }

    try {
      // Send to n8n for Airtable sync - BETA VERSION
      await fetch('/api/webhooks/popup-choice-beta-version', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: fullName,
          choice,
          interestType,
          tier,
          flowType: 'beta',
          timestamp: new Date().toISOString(),
        }),
      });

      // Route to beta application prep page
      const params = new URLSearchParams({
        name: fullName,
        email: email,
      });
      window.location.href = `/application-prep-beta-version?${params.toString()}`;
    } catch (error) {
      console.error('[BetaEmailPopup] Failed to track choice:', error);
      const params = new URLSearchParams({
        name: fullName,
        email: email,
      });
      window.location.href = `/application-prep-waitlist-version?${params.toString()}`;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] mx-auto flex items-center justify-center bg-black/70 backdrop-blur-sm">
     <div className="px-8 md:px-4 lg:px-4">
      <div className="pb-2 py-0 md:py-2 lg:py-2 px-4 md:px-10 lg:px-10 mx-0 ml-0 md:ml-16 lg:ml-16 w-full md:w-[420px] lg:w-[420px] max-h-[400vh] overflow-y-auto bg-gradient-to-b from-zinc-400 via-zinc-350 via-zinc-300 via-zinc-250 via-zinc-100 to-zinc-100 shadow-2xl rounded-xl shadow-[inset_0_2px_0_0_rgba(252,252,250,0.9)] relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4">
          {(step === 1 || step === 2 || step === 3) && (
            <div className="text-center scale-[60%] mb-2">
              <img
                src="/images/LIMITLESS LIFE LOGO 2026.png"
                alt="Limitless Life"
                className="h-16 mx-auto"
              />
            </div>
          )}

          <div className="text-center mb-0">
            {step === 3 ? (
              <div className="text-[28px] md:text[40px] lg:text[40px] mx-0 md:mx-4 lg:mx-4 mt-2 font-bold text-gray-900 tracking-tight leading-snug">
                Are you interested in working together?
              </div>
            ) : (
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                Apply for a   Beta Spot
              </div>
            )}
          </div>
        </div>

          {step === 2 ? (
            <>
              <div className="text-center mb-2">
                <div className="text-[18px] md:text-[20px] lg:text-[20px] font-normal mb-4 text-stone-600 tracking-wide">
                  <strong className="text-[#c43427]">STEP 1:</strong> Please enter your details
                </div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (firstName.trim()) {
                  // Go directly to beta application page
                  const fullName = `${firstName}`.trim();
                  const params = new URLSearchParams({
                    name: fullName,
                    email: email,
                  });
                  window.location.href = `/beta-application?${params.toString()}`;
                }
              }} className="space-y-4">
                <div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    readOnly
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="firstName"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Your Full Name"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-5 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg"
                >
                  <strong>Join Now</strong>
                </button>
              </form>
            </>
          ) : step === 1 ? (
            <>
              <div className="text-center mb-2">
                <div className="text-lg md:text-lg lg:text-lg font-normal text-stone-600 tracking-wide">
                <strong className="text-[#d12121]">STEP 1:</strong> Please enter your details
                </div>
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
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-5 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg"
                >
                  <strong>Next</strong>
                </button>
              </form>
            </>
          ) : step === 3 ? (
            <>
              <div className="animate-fade-in">
                <div className="">
                <div className="space-y-3">
                  <div
                    onClick={() => setUserChoice('yes')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                      userChoice === 'yes'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium -mr-2 -mx-1 md:-mr-0 md:-mx-0 lg:-mr-0 lg:-mx-0  text-[15px] md:text-[16px] lg:text-[16px] text-gray-700">Yes, I want to work together</div>
                  </div>

                  <div
                    onClick={() => setUserChoice('maybe')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                      userChoice === 'maybe'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium -mr-2 -mx-1 md:-mr-0 md:-mx-0 lg:-mr-0 lg:-mx-0 text-[15px] md:text-[16px] lg:text-[16px] text-gray-700">Maybe, I&apos;d like to see what it looks like</div>
                  </div>

                  <div
                    onClick={() => setUserChoice('no')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                      userChoice === 'no'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium -mr-2 -mx-1 md:-mr-0 md:-mx-0 lg:-mr-0 lg:-mx-0  text-[15px] md:text-[16px] lg:text-[16px] text-gray-700">No, I prefer to go at my own pace</div>
                  </div>

                  {step === 3 && <div className="h-0"></div>}

                  <button
                    type="button"
                    onClick={() => userChoice && handleChoice(userChoice)}
                    disabled={!userChoice}
                    className={`w-full font-bold py-5 mb-0 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg ${
                      userChoice
                        ? 'bg-[#940909] hover:bg-[#7b0707] text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <strong>Next</strong>
                  </button>
                </div>
                </div>
              </div>
            </>
          ) : null}

          {step === 3 && <div className="h-6"></div>}

          {step !== 3 && (
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
