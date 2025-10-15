import VSLPlayer from "../components/vsl-player";
import DoesThisSoundLikeYou from "../components/does-this-sound-like-you";
import PersonalStorySection from "../components/personal-story-section";
import CoreValueProposition from "../components/core-value-proposition";
import VideoTestimonialCTA from "../components/video-testimonial-cta";
import SystemBenefitsProof from "../components/system-benefits-proof";
import ResultsProof from "../components/results-proof";
import ProcessExplanation from "../components/process-explanation";
import MoreVideoTestimonials from "../components/more-video-testimonials";
import BigIdeaSection from "../components/big-idea-section";
import IntroducingLimitless from "../components/introducing-limitless";
import FourStepSystem from "../components/four-step-system";
import MoreClientTestimonials from "../components/more-client-testimonials";
import ExclusivityPersonalAttention from "../components/exclusivity-personal-attention";
import FAQSection from "../components/faq-section";
import UrgencyFinalCTA from "../components/urgency-final-cta";
import WallClientTestimonials from "../components/wall-client-testimonials";
import FooterSection from "../components/footer-section";
import StickyCTA from "../components/sticky-cta";
import {
  bgClasses,
  blackRedGradientOverlay,
  vignetteEffect,
} from "../lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* 1. Hero Section (UNTOUCHED - PRESERVED EXACTLY) */}
      <section
        className={`py-6 md:py-8 px-4 min-h-[75vh] flex flex-col relative w-full overflow-hidden ${bgClasses.blackRedGradient}`}
      >
        {blackRedGradientOverlay}
        {/* {redAccentBottom} */}
        {/* <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div> */}
        {vignetteEffect} 

        <div className="container flex relative z-10 flex-col mx-auto h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex flex-col flex-grow justify-start pt-5 sm:justify-center sm:pt-0 sm:mt-6 md:mt-0">
            {/* Pill Logo */}
            {/*
            <div className="hidden relative justify-center mb-1 sm:flex">
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
              <div className="absolute top-0 left-1/2 w-auto transform -translate-x-1/2">
                <Image
                  src="/images/THE-LIMITLESS-PILL-FINAL.png"
                  alt=""
                  width={228}
                  height={72}
                  priority
                  className="h-auto opacity-100"
                />
              </div>
            </div>
            */}
            {/* Mobile Headlines (visible only on mobile) */}
            <h1 className="block px-2 mx-auto mt-0 mb-4 w-full text-6xl font-bold leading-tight text-center text-white sm:hidden">
              You don&apos;t need more coffee. You need a system that actually
              fixes your broken body.
            </h1>

            {/* Mobile Subheadline - RIGHT AFTER HEADLINE (visible only on mobile) */}
            <p
              className="block px-2 mx-auto mb-6 font-light text-center text-gray-300 sm:hidden text-[1.75rem] leading-[1.3]"
            >
              The proven system for high performers to build a top 1% physique,
              get their sex drive back, and quite simply stop feeling like
              shit... without extreme diets or training more than 2 days a week
            </p>

            {/* Spacer div to push headline down */}
            <div className="h-10"></div>

            {/* Desktop Headlines (hidden on mobile) */}
            <h1 className="hidden sm:block text-4xl line-height:2 sm:text-4xl md:text-3xl  lg:text-4xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4">
              You don&apos;t need another black Americano or BS supplement. You
              need a real system that quite simply, stops you feeling like shit.
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-6"></div>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p className="hidden px-1 mx-auto mb-0 max-w-3xl text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-2xl">
              Learn the new system high performers are using to build a top 1%
              physique, get their sex drive back and wake up feeling electric
              every day — without starving, taking 100 pills or spending more
              than 2 days a week in the gym:
            </p>
          </div>

          {/* Video Player - Bunny.net VSL */}
          <div className="mx-auto mt-6 mb-4 w-full max-w-4xl px-4">
            <VSLPlayer
              libraryId="505300"
              videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
              autoplay={true}
              muted={true}
              preload={true}
              controls={true}
            />
          </div>

          {/* Testimonial - Simple thin text at bottom of hero */}
          <div className="text-center mt-10 mb-8 max-w-4xl mx-auto">
            <div className="bg-transparent bg-opacity-10 p-6">
              <blockquote className="text-xl text-white italic mb-4">
                &ldquo;I&apos;m in the best shape I&apos;ve ever
                been, haven&apos;t touched booze in over a year and
                feel incredible.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 mt-4 bg-[#940909] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold mt-4 text-white">Client L - Investment Banking</div>
                  <div className="text-lg mt-0 text-center">⭐️⭐️⭐️⭐️⭐️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Does This Sound Like You?" - Problem Agitation (Black background) */}
      <DoesThisSoundLikeYou />

      {/* 3. Personal Story + Discovery (White background) */}
      <PersonalStorySection />

      {/* 4. Core Value Proposition (White background) */}
      <CoreValueProposition />

      {/* 5. Video Testimonial CTA (Black background) */}
      <VideoTestimonialCTA />

      {/* 6. System Benefits Proof (Dark background) */}
      <SystemBenefitsProof />

      {/* 7. Results Proof (White background) */}
      <ResultsProof />

      {/* 8. Process Explanation (White background) */}
      <ProcessExplanation />

      {/* 9. More Video Testimonials (Black background) */}
      <MoreVideoTestimonials />

      {/* 10. The Big Idea (White background) */}
      <BigIdeaSection />

      {/* 11. Introducing Limitless (Dark background) */}
      <IntroducingLimitless />

      {/* 12. The 4-Step System (White background) */}
      <FourStepSystem />

      {/* 13. More Client Testimonials (Dark background) */}
      <MoreClientTestimonials />

      {/* 14. Exclusivity & Personal Attention (White background) */}
      <ExclusivityPersonalAttention />

      {/* 15. FAQ Section (Dark background) */}
      <FAQSection />

      {/* 16. Urgency & Final CTA (White background) */}
      <UrgencyFinalCTA />

      {/* 17. Wall of Client Testimonials (Dark background) */}
      <WallClientTestimonials />

      {/* Minimal Footer (Black) */}
      <FooterSection />

      {/* Sticky CTA that appears on significant scroll */}
      <StickyCTA />
    </main>
  );
}
