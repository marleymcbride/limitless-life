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
      <div className="container scale-[105%] my-0 md:my-8 lg:my-8 mx-auto max-w-full">
        <div className="text-left">
          {/* Desktop - Senja Testimonials Embed */}
          <div className="hidden md:block lg:block" style={{ maxHeight: '180px', overflow: 'hidden' }}>
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



          {/* Mobile - Testimonial 1 */}
          <div className="block md:hidden scale-[80%] lg:hidden -mt-0" style={{ maxHeight: '170px', overflow: 'hidden' }}>
            <div
              className="senja-embed"
              data-id="fd8cc308-5ecf-4509-abb6-1de51c2842b9"
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

          {/* Mobile - Testimonial 2 */}
          <div className="block md:hidden scale-[80%] lg:hidden -mt-4" style={{ maxHeight: '170px', overflow: 'hidden' }}>
            <div
              className="senja-embed"
              data-id="885410f8-1537-4917-906a-cc7e2028c592"
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

          {/* Mobile - Testimonial 3 */}
          <div className="block md:hidden scale-[80%] lg:hidden -mt-4 -mb-4" style={{ maxHeight: '170px', overflow: 'hidden' }}>
            <div
              className="senja-embed"
              data-id="472804b8-1b87-435d-ab8a-d43b244ddf75"
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

      {/* Senja Widget Scripts - Load all widget IDs */}
      <Script
        src="https://widget.senja.io/widget/f8eb0d9c-a489-4ea7-bf96-c89dd2a7c22f/platform.js"
        strategy="afterInteractive"
        async
      />
      <Script
        src="https://widget.senja.io/widget/fd8cc308-5ecf-4509-abb6-1de51c2842b9/platform.js"
        strategy="afterInteractive"
        async
      />
      <Script
        src="https://widget.senja.io/widget/885410f8-1537-4917-906a-cc7e2028c592/platform.js"
        strategy="afterInteractive"
        async
      />
      <Script
        src="https://widget.senja.io/widget/472804b8-1b87-435d-ab8a-d43b244ddf75/platform.js"
        strategy="afterInteractive"
        async
      />
    </section>
  );
}
