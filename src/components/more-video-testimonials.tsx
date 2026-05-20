"use client";

import SimpleVideoPlayer from "./simple-video-player";
import { usePageType } from "@/contexts/PageContext";

interface MoreVideoTestimonialsProps {
  onApplyNowClick?: (e: React.MouseEvent) => void;
}

export default function MoreVideoTestimonials({ onApplyNowClick }: MoreVideoTestimonialsProps) {
  const { pageType } = usePageType();
  const ctaText = pageType === 'waitlist' ? 'Join the waitlist' : 'Join Now';
  return (
    <section className="bg-white py-16 px-4 w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Heres what our clients had to say
          </h2>

          <div className="space-y-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-[90%] md:w-full mx-auto md:mx-0">
                <SimpleVideoPlayer
                  libraryId="646962"
                  videoId="be78cf73-e7ff-4419-81f7-630399269ff8"
                  className="w-full"
                  autoplay={false}
                  muted={false}
                  preload={true}
                  controls={true}
                />
              </div>
              <div className="w-[90%] md:w-full mx-auto md:mx-0 text-left">
               <p className="text-lg text-black mb-2 font-normal">
                  &quot;Everything in my blood work was red, now it&apos;s all green&quot;
                </p>
                <p className="text-lg font-bold text-black mb-4">
                  — Geoff, 53
                </p>

                <p className="text-black-300 font-sans font-normal text-base md:text-lg hidden md:block">
                  Geoff&apos;s an oil & gas executive working 70-84 hour weeks who was told by his doctor he'd have a heart attack if he didn&apos;t fix his health. He came inside Limitless and went from 103kg to 78kg in 5 months.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-1 w-[90%] md:w-full mx-auto md:mx-0">
                <SimpleVideoPlayer
                  libraryId="646962"
                  videoId="3a66e03a-1da4-4891-849e-f034aee49807"
                  className="w-full"
                  autoplay={false}
                  muted={false}
                  preload={true}
                  controls={true}
                />
              </div>
              <div className="order-2 w-[90%] md:w-full mx-auto md:mx-0 text-left">
                <p className="text-lg text-black mb-2 font-normal">
                  &quot;I achieved in 8 weeks what took a year on my own&quot;
                </p>
                <p className="text-lg font-bold text-black mb-4">
                  — Laurence, 52
                </p>

                <p className="text-black-300 text-base md:text-lg font-normal hidden md:block">
                  Laurence is a company client manager with a young daughter who spent months training hard and getting nowhere, burned out and struggling to sleep. After the first 8 weeks inside he was able to drop his bodyfat by 25% and felt like a different man.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onApplyNowClick}
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
