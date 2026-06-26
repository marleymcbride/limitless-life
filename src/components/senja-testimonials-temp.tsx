"use client";

import Script from "next/script";
import { usePageType } from "@/contexts/PageContext";

interface SenjaTestimonialsTempProps {
  onApplyNowClick?: (e: React.MouseEvent) => void;
}

export default function SenjaTestimonialsTemp({ onApplyNowClick }: SenjaTestimonialsTempProps) {
  const { pageType } = usePageType();
  const ctaText = pageType === 'waitlist' ? 'Join the waitlist' : 'Join Now';
  return (
    <section id="senja-testimonials-temp" className="results-proof-gradient py-20 px-0">
      <div className="container scale-[105%] my-0 md:my-8 lg:my-8 mx-auto max-w-full">
        <div className="text-left">
          {/* Desktop - Senja Testimonials Embed */}
          <div className="hidden md:block lg:block" style={{ maxHeight: '180px', overflow: 'hidden' }}>
            <div
              className="senja-embed"
              data-id="2ef4d93b-6ae1-4906-be0e-8329a4815d34"
              data-mode="shadow"
              data-lazyload="false"
              style={{
                display: 'block',
                width: '100%',
                transformOrigin: 'left center',
                filter: 'contrast(1.2) brightness(1.08) saturate(0.8) drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            ></div>
          </div>



          {/* Mobile - Testimonial 1 */}
          <div className="block md:hidden scale-[80%] lg:hidden -mt-0" style={{ maxHeight: '170px', overflow: 'hidden' }}>
            <div
              className="senja-embed"
              data-id="2ef4d93b-6ae1-4906-be0e-8329a4815d34"
              data-mode="shadow"
              data-lazyload="false"
              style={{
                display: 'block',
                width: '100%',
                transformOrigin: 'left center',
                filter: 'contrast(1.2) brightness(1.08) saturate(0.8) drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            ></div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onApplyNowClick}
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30 "
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Senja Widget Script */}
      <Script
        src="https://widget.senja.io/widget/2ef4d93b-6ae1-4906-be0e-8329a4815d34/platform.js"
        strategy="afterInteractive"
        async
      />
    </section>
  );
}
