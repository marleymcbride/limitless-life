"use client";

import { useState, useEffect, useRef } from "react";
import { CTAButton } from "./ui/cta-button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { trackEvent } from '@/lib/analytics';

type Tier = 'protocol' | 'life' | 'life-whatsapp' | 'concierge' | 'ghost-tier' | null;
type PaymentPlan = 'weekly' | '3pay' | '2pay' | 'full' | null;

const tierContent = {
  protocol: {
    title: "The Limitless Protocol",
    displayName: "The Limitless Protocol",
    tagline: "Complete transformation system",
    basePrice: "$297",
    features: [
      "Full 4-Step System Protocol",
      "Video Training Library",
      "Nutrition & Supplement Guides",
      "Mobile App Access",
      "Email Support",
    ],
    paymentOptions: ['full'],
  },
  life: {
    title: "Limitless Life (4-Month Program)",
    displayName: "Limitless Life Advisory",
    tagline: "Coaching advisory",
    basePrice: "$2,597",
    features: [
      "Everything in Protocol, plus:",
      "Weekly 1-on-1 coaching calls (4 total)",
      "Personalized nutrition protocol",
      "Workout plan customization",
      "Priority email support",
    ],
    paymentOptions: ['weekly', '3pay', '2pay', 'full'],
  },
  'life-whatsapp': {
    title: "Limitless Life + WhatsApp Access",
    displayName: "Limitless Life + WhatsApp Access",
    tagline: "Direct access to your coach",
    basePrice: "$4,397",
    features: [
      "Everything in Limitless Life, plus:",
      "Unlimited WhatsApp messaging",
      "Same-day response guarantee",
      "Form check via video",
      "Real-time protocol adjustments",
    ],
    paymentOptions: ['weekly', '3pay', '2pay', 'full'],
  },
  concierge: {
    title: "Limitless Health Concierge (6-Month Program)",
    displayName: "Limitless Health Concierge",
    tagline: "Premium support + experience",
    basePrice: "$6,897",
    features: [
      "Everything in Life + WhatsApp, plus:",
      "6 months of coaching (2 extra months)",
      "Priority scheduling (first access)",
      "Quarterly in-person assessment",
      "Custom supplement protocol",
      "VIP community access",
    ],
    paymentOptions: ['weekly', '6pay', 'full'],
  },
  'ghost-tier': {
    title: "",
    displayName: "",
    tagline: "",
    basePrice: "",
    features: [],
    paymentOptions: [],
  },
} as const;

type PricingSelectorProps = {
  showEnroll?: boolean;
  onClose?: () => void;
  initialTier?: string | null;
};

export default function PricingSelector({ showEnroll: externalShowEnroll = false, onClose, initialTier }: PricingSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<Tier>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentPlan>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [internalShowEnroll, setInternalShowEnroll] = useState(false);
  
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalShowEnroll) setInternalShowEnroll(true);
  }, [externalShowEnroll]);

  useEffect(() => {
    if (initialTier && ['protocol', 'life', 'life-whatsapp', 'concierge'].includes(initialTier)) {
      setSelectedTier(initialTier as Tier);
    }
  }, [initialTier]);

  useEffect(() => {
    if (!carouselApi) return;
    setCurrentSlide(carouselApi.selectedScrollSnap());

    const onSelect = () => {
      const snap = carouselApi.selectedScrollSnap();
      // Limit scrolling to max index 3 (tier 4 - Concierge)
      if (snap > 3) {
        carouselApi.scrollTo(3);
        setCurrentSlide(3);
      } else {
        setCurrentSlide(snap);
      }
    };

    const onReach = (index: number) => {
      // Block scrolling past index 3
      if (index > 3) {
        carouselApi.scrollTo(3);
      }
    };

    carouselApi.on("select", onSelect);
    carouselApi.on("reach", onReach);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reach", onReach);
    };
  }, [carouselApi]);

  // Scroll carousel to last item on mount so final tier centers
  useEffect(() => {
    if (carouselApi) {
      // Scroll to last item (index 3 of 4) to show ghost/next item
      carouselApi.scrollTo(3);
    }
  }, [carouselApi]);

  // Scroll to selected tier when clicked
  useEffect(() => {
    if (carouselApi && selectedTier && selectedTier !== 'ghost-tier') {
      const tierIndex = Object.keys(tierContent).findIndex(t => t === selectedTier);
      if (tierIndex >= 0) {
        carouselApi.scrollTo(tierIndex);
      }
    }
  }, [selectedTier, carouselApi]);

  // Auto-select payment option if tier has only one
  useEffect(() => {
    if (selectedTier && selectedTier !== 'ghost-tier') {
      const options = tierContent[selectedTier].paymentOptions;
      if (options.length === 1) {
        setSelectedPayment(options[0]);
      } else {
        setSelectedPayment(null);
      }
    }
  }, [selectedTier]);

  // Helper to safely fetch session data
  const getSessionData = async () => {
    try {
      const response = await fetch('/api/session');
      if (!response.ok) {
        console.error('Session API error:', response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch session:', error);
      return null;
    }
  };

  useEffect(() => {
    if (internalShowEnroll) {
      // Track tier view event
      const trackTierView = async () => {
        try {
          const sessionData = await getSessionData();
          if (!sessionData) return;

          await trackEvent({
            sessionId: sessionData.sessionId,
            userId: sessionData.userId,
            eventType: 'tier_view',
            eventData: { source: 'pricing_selector' },
          });
        } catch (error) {
          console.error('Failed to track tier view:', error);
        }
      };
      trackTierView();

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
  }, [internalShowEnroll]);

  const handleCheckout = async () => {
    if (!selectedTier || !selectedPayment) return;
    setIsLoading(true);
    try {
      // Get email from sessionStorage (set during email capture)
      const userEmail = typeof window !== 'undefined' ? sessionStorage.getItem('userEmail') : null;
      const userName = typeof window !== 'undefined' ? sessionStorage.getItem('userName') : null;

      console.log('[Pricing Selector] Checkout clicked:', { selectedTier, selectedPayment, userEmail });

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedTier,
          paymentPlan: selectedPayment,
          customerEmail: userEmail,
          customerName: userName || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={carouselRef}>
      {internalShowEnroll ? (
        <div className="fixed inset-0 z-50 px-2 md:px-4 lg:px-16 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 pt-8 md:p-4 overflow-y-auto overflow-x-hidden">
          <div className="bg-white rounded-lg shadow-xl shadow-stone-800 max-w-6xl w-full relative my-4 md:my-8 flex flex-col">
            <div className="overflow-y-scroll overflow-x-hidden md:overflow-y-hidden pb-6 -mt-6 h-full rounded-md scrollbar-hide" style={{ maxHeight: '90vh' }}>
              
              {/* Desktop Layout - Original Two-Column Grid */}
              <div className="hidden md:block px-4 md:px-6 lg:px-12 py-0 my-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-12">
                  {/* Left Column: Tier Selection */}
                  <div className="order-2 md:order-1 space-y-2 md:space-y-3">
                    <div className="h-8"></div>

                    {(Object.keys(tierContent).filter(t => t !== 'ghost-tier') as Array<Exclude<Tier, null>>).map((tier) => {
                      const content = tierContent[tier];
                      const isSelected = selectedTier === tier;

                      return (
                        <div key={tier}>
                          <div
                            onClick={() => {
                              if (!isSelected) {
                                setSelectedTier(tier);
                              }
                            }}
                            className={`w-full text-left p-3 md:p-4 lg:p-6 rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-red-600 bg-red-50 cursor-default"
                                : "border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className={`font-bold text-base md:text-lg mb-0.5 md:mb-1 ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                                  {content.title}
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600">{content.tagline}</p>
                              </div>
                              <div className={`font-semibold text-sm md:text-base ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                                {content.basePrice}
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="mt-3">
                              {tier === 'life' && (
                                <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                  Most Popular
                                </span>
                              )}
                              {tier === 'concierge' && (
                                <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                  Limited Spots
                                </span>
                              )}
                            </div>

                            {/* Installment Dropdown - shows inside when tier is selected */}
                            {isSelected && (
                              <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-gray-200">
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                  Choose Investment Option
                                </label>
                                <select
                                  value={selectedPayment || ''}
                                  onChange={async (e) => {
                                    const plan = e.target.value as PaymentPlan;
                                    setSelectedPayment(plan);

                                    try {
                                      const sessionData = await getSessionData();
                                      if (!sessionData) return;

                                      await trackEvent({
                                        sessionId: sessionData.sessionId,
                                        userId: sessionData.userId,
                                        eventType: 'payment_plan_select',
                                        eventData: {
                                          tier: selectedTier,
                                          paymentPlan: plan,
                                        },
                                      });
                                    } catch (error) {
                                      console.error('Failed to track payment plan selection:', error);
                                    }
                                  }}
                                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                                >
                                  <option value="" disabled>Select investment option</option>
                                  {content.paymentOptions.includes('weekly') && (
                                    <option value="weekly">Weekly</option>
                                  )}
                                  {content.paymentOptions.includes('3pay') && (
                                    <option value="3pay">3 Installment split</option>
                                  )}
                                  {content.paymentOptions.includes('2pay') && (
                                    <option value="2pay">2 Installment split</option>
                                  )}
                                  {content.paymentOptions.includes('6pay') && (
                                    <option value="6pay">Monthly</option>
                                  )}
                                  {content.paymentOptions.includes('full') && (
                                    <option value="full">One time investment</option>
                                  )}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Dynamic Details */}
                  <div className="order-1 md:order-2 md:sticky md:top-4 lg:md:top-8">
                    {!selectedTier ? (
                      <div className="bg-gray-50 mt-4 md:mt-11 border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 text-center">
                        <svg
                          className="mx-auto h-16 w-16 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 15l-2 5L9 9l11 11-5 5m5 5l2-2m-2-2L9 9l-5 5"
                          />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Select your tier
                        </h3>
                        <p className="text-gray-600">
                          Choose your tier level from options on left.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border-2 mt-4 md:mt-11 border-gray-200 rounded-lg p-4 md:p-6 lg:p-8 shadow-lg">
                        {/* Header */}
                        <div className="mb-6">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                            {tierContent[selectedTier].title}
                          </h3>
                          <p className="text-lg text-gray-700 mb-4">
                            {tierContent[selectedTier].tagline}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h4>
                          <ul className="space-y-3">
                            {tierContent[selectedTier].features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-700">
                                <svg
                                  className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600"
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
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Checkout Button */}
                        <div className="border-t border-gray-200 pt-3 md:pt-6">
                          <CTAButton
                            onClick={handleCheckout}
                            disabled={!selectedPayment || isLoading}
                            className="w-full mx-auto text-center rounded-2xl md:rounded-3xl py-2 md:py-3 px-3 md:px-4 text-sm md:text-base"
                          >
                            {isLoading ? "Redirecting to Stripe..." : "Confirm Enrollment"}
                          </CTAButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Carousel */}
              <div className="block md:hidden rounded-md bg-white -mb-0 px-2 pt-4 pb-0" style={{ transform: 'scale(1.2)', transformOrigin: 'top center' }}>
                <div className="text-sm font-bold text-center w-fit mx-auto px-4 py-1 text-white mt-0 rounded-full bg-gray-900/50 border border-gray-300">TIER {currentSlide + 1}</div>
                <Carousel setApi={setCarouselApi} opts={{ align: 'center', containScroll: true }} className="w-full -mt-4 scrollbar-hide">
                  <CarouselContent className="px-10">
                    {(Object.keys(tierContent) as Array<Exclude<Tier, null>>).map((tier) => {
                      const content = tierContent[tier];
                      const isSelected = selectedTier === tier;
                      const isGhost = tier === 'ghost-tier';

                      if (isGhost) {
                        return (
                          <CarouselItem key={tier} className="basis-[70%] ml-12 p-2" />
                        );
                      }

                      return (
                        <CarouselItem key={tier} className="basis-[70%] ml-12 p-2 -mx-10">
                          <div
                            onClick={() => { setSelectedTier(tier); setSelectedPayment(null); }}
                            className={`w-full shadow-sm text-left p-6 rounded-lg border-2 transition-all ${isSelected ? "border-gray-500 bg-red-200/20 text-white" : "border-gray-200 bg-white "}`}
                          >
                            <div className="font-bold text-slate-600 text-center -mx-2 text-md mx-3 text-lg py-0 uppercase">{content.displayName}</div>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-center gap-2 mt-2">
                  {(Object.keys(tierContent).filter(t => t !== 'ghost-tier') as Array<Exclude<Tier, null>>).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-red-600 w-6' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Enrollment Content */}
              <div className="bg-white px-6 pb-4 md:p-12 scrollbar-hide block md:hidden">
                {!selectedTier ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold">Select a Program Above</h3>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      {/* <h3 className="text-3xl font-bold text-center mb-2">{tierContent[selectedTier].title}</h3> */}
                      <div className="text-lg text-gray-600 mb-8">{tierContent[selectedTier].tagline}</div>
                      <h4 className="font-bold uppercase tracking-wider text-lg text-gray-400 mb-2">What&apos;s Included</h4>
                      <ul className="space-y-1">
                        {tierContent[selectedTier].features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <svg className="h-5 w-5 mt-0.5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 -mt-8 p-6 rounded-2xl border border-gray-100">
                      <label className="block text-sm font-bold uppercase mb-4 text-gray-500">Choose investment option</label>
                      <div className="mb-2">
                        <select
                          value={selectedPayment || ''}
                          onChange={async (e) => {
                            const plan = e.target.value as PaymentPlan;
                            setSelectedPayment(plan);

                            try {
                              const sessionData = await fetch('/api/session').then(r => r.json());
                              await trackEvent({
                                sessionId: sessionData.sessionId,
                                userId: sessionData.userId,
                                eventType: 'payment_plan_select',
                                eventData: {
                                  tier: selectedTier,
                                  paymentPlan: plan,
                                },
                              });
                            } catch (error) {
                              console.error('Failed to track payment plan selection:', error);
                            }
                          }}
                          className="w-full -mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="" disabled>Select investment option</option>
                          {tierContent[selectedTier].paymentOptions.includes('weekly') && (
                            <option value="weekly">Weekly</option>
                          )}
                          {tierContent[selectedTier].paymentOptions.includes('3pay') && (
                            <option value="3pay">3 installment split</option>
                          )}
                          {tierContent[selectedTier].paymentOptions.includes('2pay') && (
                            <option value="2pay">2 installment split</option>
                          )}
                          {tierContent[selectedTier].paymentOptions.includes('6pay') && (
                            <option value="6pay">Monthly</option>
                          )}
                          {tierContent[selectedTier].paymentOptions.includes('full') && (
                            <option value="full">One time investment</option>
                          )}
                        </select>
                      </div>
                      <CTAButton onClick={handleCheckout} disabled={!selectedPayment || isLoading} className="w-full -mt-4 pb-4 mb-2 text-lg">
                        {isLoading ? "Redirecting to Stripe..." : "Confirm Enrollment"}
                      </CTAButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-3">
            {(Object.keys(tierContent) as Array<Exclude<Tier, null>>).map((tier) => {
              const content = tierContent[tier];
              const isSelected = selectedTier === tier;
              return (
                <div key={tier} onClick={() => { setSelectedTier(tier); setSelectedPayment(null); }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? "border-red-600 bg-red-50" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">{content.displayName}</h4>
                    <span className="font-semibold">{content.basePrice}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200">
            {selectedTier ? (
              <div>
                <h3 className="text-2xl font-bold mb-2">{tierContent[selectedTier].title}</h3>
                <p className="text-gray-600 mb-8">{tierContent[selectedTier].tagline}</p>
                <CTAButton onClick={() => setInternalShowEnroll(true)} className="px-12 py-4 text-lg">
                  View Details & Enroll
                </CTAButton>
              </div>
            ) : (
              <p className="text-gray-400">Select a program to see the full protocol details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}