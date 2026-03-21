"use client";

import Script from "next/script";
import { usePageType } from "@/contexts/PageContext";

interface SenjaTestimonials1Props {
  onApplyNowClick?: (e: React.MouseEvent) => void;
}

export default function SenjaTestimonials1({ onApplyNowClick }: SenjaTestimonials1Props) {
  const { pageType } = usePageType();
  const ctaText = pageType === 'waitlist' ? 'Join the waitlist' : 'Apply Now';
  return (
    <section id="senja-testimonials-1" className="results-proof-gradient py-20 px-0">
      <div className="container scale-[105%] my-8 mx-auto max-w-full">
        <div className="text-left">
          {/* Senja Testimonials Embed */}
          <div style={{ maxHeight: '180px', overflow: 'hidden' }}>
            <div
              className="senja-embed"
              data-id="f8eb0d9c-a489-4ea7-bf96-c89dd2a7c22f"
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
        src="https://widget.senja.io/widget/f8eb0d9c-a489-4ea7-bf96-c89dd2a7c22f/platform.js"
        strategy="afterInteractive"
        async
      />
    </section>
  );
}
