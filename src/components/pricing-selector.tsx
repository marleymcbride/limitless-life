"use client";

import { useState, useEffect, useRef } from "react";
import { CTAButton } from "./ui/cta-button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

type Tier = 'protocol' | 'life' | 'life-whatsapp' | 'concierge' | null;
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
    displayName: "Limitless Life + WhatsAp Access",
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
    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Scroll carousel to last item on mount so final tier centers
  useEffect(() => {
    if (carouselApi) {
      // Scroll to last item (index 3 of 4) to show ghost/next item
      carouselApi.scrollTo(3);
    }
  }, [carouselApi]);

  useEffect(() => {
    if (internalShowEnroll) {
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
      const userEmail = typeof window !== 'undefined' ? sessionStorage.getItem('userEmail') : null;
      const userName = typeof window !== 'undefined' ? sessionStorage.getItem('userName') : null;
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
        <div className="fixed inset-0 z-50 px-2 md:px-4 lg:px-16 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full relative my-4 md:my-8 flex flex-col">
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2">✕</button>

            <div className="overflow-y-scroll mb-6 -mt-6 h-full rounded-md scrollbar-hide" style={{ maxHeight: '85vh' }}>
              
              {/* Mobile Carousel */}
              <div className="block md:hidden rounded-md bg-white px-2 pt-8 pb-4">
                <Carousel setApi={setCarouselApi} opts={{ align: 'start' }} className="w-full scrollbar-hide">
                  <CarouselContent>
                    {(Object.keys(tierContent) as Array<Exclude<Tier, null>>).map((tier) => {
                      const content = tierContent[tier];
                      const isSelected = selectedTier === tier;
                      return (
                        <CarouselItem key={tier} className="basis-[70%] ml-12 p-2 -mx-10">
                          <div
                            onClick={() => { setSelectedTier(tier); setSelectedPayment(null); }}
                            className={`w-full shadow-sm text-left p-6 rounded-lg border-2 transition-all ${isSelected ? "border-red-600 bg-red-50" : "border-gray-200 bg-white"}`}
                          >
                            <h4 className="font-bold text-center text-lg py-4">{content.displayName}</h4>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-center gap-2 mt-4">
                  {(Object.keys(tierContent) as Array<Exclude<Tier, null>>).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-red-600 w-6' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Enrollment Content */}
              <div className="bg-white px-6 py-4 md:p-12 scrollbar-hide">
                {!selectedTier ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold">Select a Program Above</h3>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{tierContent[selectedTier].title}</h3>
                      <div className="text-lg text-gray-600 mb-8">{tierContent[selectedTier].tagline}</div>
                      <h4 className="font-bold uppercase tracking-wider text-sm text-gray-400 mb-4">What's Included</h4>
                      <ul className="space-y-4">
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
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <label className="block text-sm font-bold uppercase mb-4 text-gray-500">Choose Your Payment Plan</label>
                      <div className="space-y-3 mb-8">
                        {tierContent[selectedTier].paymentOptions.map((opt) => (
                          <label key={opt} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === opt ? "border-red-600 bg-white" : "border-gray-200 bg-transparent hover:border-gray-300"}`}>
                            <input
                              type="radio"
                              name="payment"
                              value={opt}
                              checked={selectedPayment === opt}
                              onChange={() => setSelectedPayment(opt)}
                              className="hidden"
                            />
                            <span className="font-bold">{opt.toUpperCase()}</span>
                          </label>
                        ))}
                      </div>
                      <CTAButton onClick={handleCheckout} disabled={!selectedPayment || isLoading} className="w-full py-4 text-lg">
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Program</h3>
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