import Image from "next/image";
import EnhancedVideoPlayer from "../components/enhanced-video-player";
import ImmediateProofSection from "../components/immediate-proof-section";
import DoesThisSoundLikeYou from "../components/does-this-sound-like-you";
import PersonalStorySection from "../components/personal-story-section";
import SolutionSection from "../components/solution-section";
import RunningEmptySection from "../components/running-empty-section";
import FinalCta from "../components/final-cta";
import FooterSection from "../components/footer-section";
import StickyCTA from "../components/sticky-cta";
import { Button } from "@/components/ui/button";
import {
  bgClasses,
  blackRedGradientOverlay,
  redAccentBottom,
  vignetteEffect,
} from "../lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 1. Hero Section (UNTOUCHED - PRESERVED EXACTLY) */}
      <section
        className={`py-6 md:py-8 px-4 min-h-[75vh] flex flex-col relative w-full overflow-hidden ${bgClasses.blackRedGradient}`}
      >
        {blackRedGradientOverlay}
        {redAccentBottom}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto flex flex-col relative z-10 h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex-grow flex flex-col justify-start sm:justify-center pt-5 sm:pt-0 sm:mt-6 md:mt-0">
            {/* Pill Logo */}
            {/*<div className="hidden sm:flex justify-center mb-1 relative">
              <div className="w-auto">
                <Image
                  src="/images/THE-LIMITLESS-PILL-(ALL GREY)-FINAL.png"
                  alt="The Limitless Pill"
                  width={228}
                  height={72}
                  priority
                  className="h-auto"
                />
              </div>
/              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-auto">
                <Image
                  src="/images/THE-LIMITLESS-PILL-FINAL.png"
                  alt=""
                  width={228}
                  height={72}
                  priority
                  className="h-auto opacity-100"
                />
              </div>
            </div>*/}
            {/* Mobile Headlines (visible only on mobile) */}
            <h1 className="block sm:hidden text-6xl font-bold text-white text-center mb-4 mt-0 w-full mx-auto px-2 leading-tight">
              You don&apos;t need more coffee. You need a system that actually
              fixes your broken body.
            </h1>

            {/* Mobile Subheadline - RIGHT AFTER HEADLINE (visible only on mobile) */}
            <p
              className="block sm:hidden text-gray-300 text-center mx-auto mb-6 px-2 font-normal"
              style={{
                fontSize: "1.75rem !important",
                lineHeight: "1.3 !important",
              }}
            >
              The proven system for high performers to build a top 1% physique,
              get their sex drive back, and quite simply stop feeling like
              shit... without extreme diets or training more than 2 days a week
            </p>

            {/* Desktop Headlines (hidden on mobile) */}
            <h1 className="hidden sm:block text-4xl sm:text-4xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4">
              You don&apos;t need another black Americano or BS supplement. You
              need a real system that quite simply, stops you feeling like shit.
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-6"></div>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p className="hidden sm:block text-xl sm:text-xl md:text-lg text-gray-300 text-center max-w-3xl mx-auto mb-0 px-1">
              Learn the proven system high performers are using to build a top
              1% physique, get their sex drive back and wake up feeling electric
              every day — without eating less, taking a bunch of crazy pills or
              spending more than 2 days a week in the gym:
            </p>
          </div>

          {/* Video container positioned in the bottom portion of the screen */}
          <div className="mt-1 mb-0 mx-auto w-full max-w-2xl">
            <div className="relative w-full sm:w-auto sm:mx-auto max-w-[50%] mx-auto max-w-500px">
              {/* Red play button overlay for mobile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#940909] flex items-center justify-center md:hidden z-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              {/* Sound indicator for mobile */}
              <div className="absolute bottom-3 right-3 bg-black/70 rounded-full px-2 py-0.5 text-white text-xs md:hidden z-30">
                Click to play
              </div>
              <EnhancedVideoPlayer />
            </div>
          </div>
        </div>

        {/* Mobile Subheadline - OUTSIDE CONTAINER (visible only on mobile) */}
        <div className="block sm:hidden w-full relative z-20">
          <p
            className="text-red-500 text-center font-bold w-full"
            style={{ fontSize: "4rem", lineHeight: "1.1", padding: "0 1rem" }}
          >
            THIS IS THE MOBILE SUBHEADLINE TEST - IT SHOULD BE HUGE AND RED
          </p>
        </div>
      </section>

      {/* 2. IMMEDIATE PROOF - Clean Testimonial Only (White background) */}
      <ImmediateProofSection />

      {/* 3. "Does This Sound Like You?" - Problem Agitation (Black/Red - V1 Professional Style) */}
      <DoesThisSoundLikeYou />

      {/* 4. Personal Story + Discovery (White background - ELEVATED to V1 Quality) */}
      <PersonalStorySection />

      {/* 5. Solution + Proof Density (Black with red accents) */}
      <SolutionSection />

      {/* 6. Enemy + USP + More Proof (Black with red accents) */}
      <RunningEmptySection />

      {/* 7. Final Offer + Urgency + Guarantee (Black with red accents) */}
      <FinalCta />

      {/* Minimal Footer (Black) */}
      <FooterSection />

      {/* Sticky CTA that appears on significant scroll */}
      <StickyCTA />
    </main>
  );
}
