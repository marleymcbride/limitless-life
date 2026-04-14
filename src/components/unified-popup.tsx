'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getDoorState, getRedirectUrl, choiceToInterestType, type DoorState, type InterestChoice } from '@/lib/door-state';
import { COHORT_CONFIG } from '@/config/waitlist';

interface UnifiedPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

/**
 * Unified Popup Component
 *
 * Works for both DOORS OPEN and DOORS CLOSED states.
 * - Step 1: Email input
 * - Step 2: Name input
 * - Step 3: Interest choice (Yes/Maybe/No)
 *
 * Routing is determined by door state + choice:
 * - DOORS OPEN + A/B → doors-open offer doc (buy)
 * - DOORS CLOSED + A/B → waitlist offer doc (deposit)
 * - Any state + C → scorecard
 */
export default function UnifiedPopup({ isOpen, onClose }: UnifiedPopupProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [step, setStep] = useState<Step>(1);
  const [userChoice, setUserChoice] = useState<InterestChoice | null>(null);
  const [mounted, setMounted] = useState(false);
  const [doorState, setDoorState] = useState<DoorState>('CLOSED');
  const [cohortDate, setCohortDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current door state
  useEffect(() => {
    const state = getDoorState();
    setDoorState(state.state);
    setCohortDate(state.cohortStartDate);
  }, []);

  // Block scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail('');
      setFirstName('');
      setUserChoice(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleFirstStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStep(2);
  };

  const handleSecondStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim()) setStep(3);
  };

  const handleChoice = async (choice: InterestChoice) => {
    if (isSubmitting) return;

    setUserChoice(choice);
    setIsSubmitting(true);

    const fullName = firstName.trim();
    if (!fullName || !email.trim()) {
      setIsSubmitting(false);
      return;
    }

    // Determine interest type
    const interestType = choiceToInterestType(choice);

    try {
      // Send to webhook - uses existing waitlist webhook
      await fetch('/api/webhooks/popup-choice-waitlist-version', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: fullName,
          choice,
          interestType,
          tier: doorState === 'OPEN' ? 'doors-open' : 'waitlist',
          flowType: doorState === 'OPEN' ? 'doors-open' : 'waitlist',
          doorState,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('[UnifiedPopup] Webhook failed:', error);
    }

    // Get redirect URL and navigate
    const redirectUrl = getRedirectUrl(choice, doorState, { name: fullName, email });
    console.log('[UnifiedPopup] Redirecting to:', redirectUrl);
    window.location.href = redirectUrl;
  };

  const getStepHeading = () => {
    if (step === 3) {
      return doorState === 'OPEN'
        ? `We kick off ${cohortDate}. Are you ready to secure your spot?`
        : `We kick off ${cohortDate}. Are you interested in joining?`;
    }
    return doorState === 'OPEN' ? 'Secure Your Spot' : 'Join the waitlist';
  };

  const getSubmitButtonLabel = () => {
    if (step === 3) {
      return doorState === 'OPEN' ? 'View Offer & Secure Your Spot' : 'Join Waitlist & Secure Early Access';
    }
    return 'Next';
  };

  const getChoiceButtonLabel = (choice: InterestChoice) => {
    switch (choice) {
      case 'yes':
        return 'Yes, secure my spot!';
      case 'maybe':
        return "Maybe, I'd like more details";
      case 'no':
        return "I'm not ready this cohort but keep me in the loop";
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] mx-auto flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="px-8 md:px-4 lg:px-4">
        <div className="pb-2 py-0 md:py-2 lg:py-2 px-4 md:px-10 lg:px-10 mx-0 ml-0 md:ml-16 lg:ml-16 w-full md:w-[420px] lg:w-[420px] max-h-[400vh] overflow-y-auto bg-gradient-to-b from-zinc-400 via-zinc-350 via-zinc-300 via-zinc-250 via-zinc-100 to-zinc-100 shadow-2xl rounded-xl shadow-[inset_0_2px_0_0_rgba(252,252,250,0.9)] relative">
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-4">
            {/* Logo */}
            {(step === 1 || step === 2 || step === 3) && (
              <div className="text-center scale-[60%] mb-2">
                <img
                  src="/images/LIMITLESS LIFE LOGO 2026.png"
                  alt="Limitless Life"
                  className="h-16 mx-auto"
                />
              </div>
            )}

            {/* Heading */}
            <div className="text-center pr-4 pl-4 mb-0">
              {step === 3 ? (
                <div className="mx-auto md:mx-0 lg:mx-auto lg:-ml-16 lg:-mr-16 mt-2 font-bold text-gray-900 tracking-tight leading-snug"
                  style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.4" }}>
                  <div className="text-3xl mx-auto md:-mr-0 md:-ml-0 lg:-mr-0 lg:-ml-0">
                    {getStepHeading()}
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-bold text-gray-900 tracking-tight">
                  {getStepHeading()}
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Name input */}
          {step === 2 && (
            <>
              <div className="text-center mb-2">
                <div className="text-[18px] md:text-[20px] lg:text-[20px] font-normal mb-4 text-stone-600 tracking-wide">
                  <strong className="text-[#c43427]">STEP 2:</strong> Please enter your details
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (firstName.trim()) {
                    setStep(3);
                  }
                }}
                className="space-y-4"
              >
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
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-5 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <strong>{isSubmitting ? 'Processing...' : 'Next'}</strong>
                </button>
              </form>
            </>
          )}

          {/* Step 1: Email input */}
          {step === 1 && (
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
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-5 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <strong>Next</strong>
                </button>
              </form>
            </>
          )}

          {/* Step 3: Interest choice */}
          {step === 3 && (
            <>
              <div className="animate-fade-in">
                <div className="space-y-3">
                  {/* Yes choice */}
                  <div
                    onClick={() => !isSubmitting && handleChoice('yes')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                      userChoice === 'yes'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium -mr-2 -mx-1 md:-mr-0 md:-mx-0 lg:-mr-0 lg:-mx-0 text-center text-[15px] md:text-[20px] lg:text-[20px] text-gray-700">
                      {getChoiceButtonLabel('yes')}
                    </div>
                  </div>

                  {/* Maybe choice */}
                  <div
                    onClick={() => !isSubmitting && handleChoice('maybe')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                      userChoice === 'maybe'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium -mr-2 -mx-1 md:-mr-0 md:-mx-0 lg:-mr-0 lg:-mx-0 text-center text-[15px] md:text-[20px] lg:text-[20px] text-gray-700">
                      {getChoiceButtonLabel('maybe')}
                    </div>
                  </div>

                  {/* No choice */}
                  <div
                    onClick={() => !isSubmitting && handleChoice('no')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                      userChoice === 'no'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium -mr-2 -mx-1 md:-mr-0 md:-mx-0 lg:-mr-0 lg:-mx-0 text-center text-[15px] md:text-[20px] lg:text-[20px] text-gray-700">
                      {getChoiceButtonLabel('no')}
                    </div>
                  </div>

                  <div className="h-0"></div>

                  {/* Submit button for choice */}
                  <button
                    type="button"
                    onClick={() => userChoice && !isSubmitting && handleChoice(userChoice)}
                    disabled={!userChoice || isSubmitting}
                    className={`w-full font-bold py-5 mb-0 px-6 rounded-lg transition-all duration-200 text-md uppercase tracking-wide shadow-lg ${
                      userChoice && !isSubmitting
                        ? 'bg-[#940909] hover:bg-[#7b0707] text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <strong>{isSubmitting ? 'Processing...' : getSubmitButtonLabel()}</strong>
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 3 && <div className="h-6"></div>}

          {/* Footer notice */}
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
