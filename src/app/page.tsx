import VSLPlayer from "../components/vsl-player";
import DoesThisSoundLikeYou from "../components/does-this-sound-like-you";
import PersonalStorySection from "../components/personal-story-section";
import CoreValueProposition from "../components/core-value-proposition";
import VideoTestimonialCTA from "../components/video-testimonial-cta";
import SystemBenefitsProof from "../components/system-benefits-proof";
import ResultsProof from "../components/results-proof";
import ImagineThis from "../components/imaginethis";
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
import { vignetteEffect, unifiedGradientWithSpotlightDesktop, unifiedGradientWithSpotlightMobile } from "../lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col  min-h-screen">
      {/* 1. Hero Section (UNTOUCHED - PRESERVED EXACTLY) */}
      <section
        className={`pt-2 md:pt-6 px-3 pb-16 px-16min-h-[100vh] sm:pb-16 flex flex-col relative w-full overflow-hidden bg-black`}
      >
        <div className="hidden md:block">{unifiedGradientWithSpotlightDesktop}</div>
        <div className="block md:hidden">{unifiedGradientWithSpotlightMobile}</div>
        <div className="hero-grain-overlay"></div>
        <div className="hero-darkening-overlay"></div>
        {/* {redAccentBottom} */}
        {/* <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div> */}
        {vignetteEffect}

        <div className="container hero-full-width flex relative z-30 flex-col mx-auto h-full">
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

            {/* Desktop Eyebrow (hidden on mobile) */}
            <p
              className="hidden sm:block px-0 mx-auto mb-4 mt-1 text-xl text-center text-gray-300 md:text-lg lg:text-xl"
              style={{ maxWidth: "800px" }}
            >
              For the man who has EVERYTHING in life, except the energy to enjoy it... here&apos;s how to:
            </p>

            {/* Mobile Eyebrow (visible only on mobile) */}
            <p
              className="block sm:hidden px-0 mx-auto mb-4 mt-1 text-center text-gray-300 mobile-eyebrow"
              style={{ maxWidth: "100%" }}
            >
              For the man who has EVERYTHING in life, except the energy to enjoy it... here&apos;s how to:
            </p>
            
            {/* Mobile Headlines (visible only on mobile) */}
            <h1
              className="mobile-headline block px-1 mx-auto mt-2 mb-6 w-full font-bold text-center text-white sm:hidden capitalize"
              style={{
                fontFamily: "Neuemontreal, Arial, sans-serif",
                fontSize: "2.4rem",
                lineHeight: "1.25 !important",
              }}
            >
              Lose Your Gut, Stop Feeling Exhausted & Reverse Years Of Health Decline (In 2 Days Per Week)
            </h1>

            {/* Mobile Subheadline - RIGHT AFTER HEADLINE (visible only on mobile) */}
            <p
              className="mobile-subheadline block mx-auto mb-2 font-light text-center text-gray-300 sm:hidden px-0"
              style={{
                fontFamily: "Neuemontreal, Arial, sans-serif",
                fontSize: "1.3rem",
                lineHeight: "1.6 !important",
                width: "95% !important",
                maxWidth: "none !important",
              }}
            >
             You don&apos;t need to down 4 coffees, train 6 days a week, or cut out your favorite foods to feel incredible.
             Restore your energy, build an elite body and get back YEARS of life:
            </p>

            {/* Spacer div to push headline down */}
            <div className="hidden h-4"></div>

            {/* Desktop Headlines (hidden on mobile) */}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How To Look And Feel Better Than You Did At 25 (While Training 2 days a Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            Wake Up With More Energy Than You Had At 25 (Training Just 2 Days a Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            Discover How To Look And Feel Better Than You Did At 25 (Without Obsessing Over Your Health)"
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How I Got My Energy Back, Dropped 30 Pounds, And Got Off Alcohol—Without Willpower Or Restrictive Diets
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How I Went From Addicted to Caffine and 20lbs Overweight to Naturally Energized, and in the Shape of My Life (Training 2 Days A Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How I Stopped Feeling Like Shit Every Morning And Built An Elite
              Body (Training Only 2 Days Per Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            Stop Waking Up Feeling Like Shit and Build [X Body desired result] (Training Only 2 Days Per Week)
            </h1>*/}
            <h1
              className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize"
              style={{
                fontFamily: "Neuemontreal, Arial, sans-serif",
                lineHeight: "1.2 !important",
              }}
            >
            Lose Your Gut, Stop Waking Up Exhausted & Reverse Years of Health Decline (In Just 2 Days Per Week)
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-4"></div>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p
              className="hidden px-1 mx-auto mb-4  text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-xl"
              style={{ maxWidth: "725px" }}
              >
              You don&apos;t need to down 4 coffees a day, train 6 days a week,
              or cut out your favorite foods to feel incredible. Here&apos;s the
              proven system to restore your energy, build an elite body
              and get back YEARS of life
              (training only 2 days):
            </p>
          </div>

          {/* Video Player - Bunny.net VSL */}
          <div className="mx-auto mt-0 mb-4 w-full max-w-4xl px-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.018984375),0_0_40px_rgba(255,255,255,0.0094921875),0_0_65px_rgba(255,255,255,0.0050625),0_0_120px_rgba(255,255,255,0.002),0_0_20px_rgba(148,9,9,0.0825),0_0_40px_rgba(148,9,9,0.04125),0_0_65px_rgba(148,9,9,0.022),0_0_120px_rgba(148,9,9,0.008)] pointer-events-none"></div>
              <VSLPlayer
                libraryId="505300"
                videoId="ae86338e-0493-4ff0-bca9-87f9ad98dd89"
                autoplay={true}
                muted={true}
                preload={true}
                controls={true}
              />
            </div>
          </div>

          {/* Spacer div to maintain testimonial positioning */}
          <div className="h-5"></div>

          {/* CTA Button - positioned directly below VSL in dark section */}
          <div className="text-center">
            <a
              href="/application"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block"
            >
              JOIN NOW
            </a>
          </div>

          {/* Spacer div to maintain testimonial positioning */}
          <div className="h-8"></div>

          {/* Testimonial - Simple thin text at bottom of hero */}
          <div className="text-center mt-0 mb-0 max-w-4xl mx-auto">
            <div className="bg-transparent bg-opacity-10 p-0">
              <blockquote className="text-xl text-white mb-0">
                &ldquo;I&apos;m in the best shape I&apos;ve ever been,
                haven&apos;t touched booze in over a year and feel
                incredible.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 mt-6 rounded-full overflow-hidden">
                  <Image
                    src="/images/lewis-allan-avatar.png"
                    alt="Lewis Allan"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized={true}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-bold mt-4 text-white">
                    Lewis Allan
                  </div>
                  <div className="text-sm mt-0 text-center">
                  <div className="font-normal mt-0 mb-2 text-gray-200">
                    Energy Sector
                  </div>
                  <div className="text-lg mt-0 text-center"></div>
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Does This Sound Like You?" - Problem Agitation (Black background) */}
      <div className="dark-section-with-grain">
        <DoesThisSoundLikeYou />
      </div>

      {/* 3. Personal Story + Discovery (White background) */}
      <PersonalStorySection />

      {/* 4. Core Value Proposition (White background) */}
      <CoreValueProposition />

      {/* 5. Video Testimonial CTA (Black background) */}
      <div className="dark-section-with-grain">
        <VideoTestimonialCTA />
      </div>

      {/* 6. The Big Idea (Dark background) */}
      <div className="dark-section-with-grain">
        <BigIdeaSection />
      </div>

      {/* 7. Results Proof (White background) */}
      <ResultsProof />

      {/* 8. Imagine This (Black background) */}
      <div className="dark-section-with-grain">
        <ImagineThis />
      </div>

      {/* 9. Process Explanation (Black background) */}
      <div className="dark-section-with-grain">
        <ProcessExplanation />
      </div>

      {/* 10. More Video Testimonials (Black background) */}
      <div className="dark-section-with-grain">
        <MoreVideoTestimonials />
      </div>

      {/* 11. Introducing Limitless (Dark background) */}
      <div className="dark-section-with-grain">
        <IntroducingLimitless />
      </div>

      {/* 12. The 4-Step System (White background) */}
      <FourStepSystem />

      {/* 13. System Benefits Proof - Why This System Will Work For You (Dark background) */}
      <div className="dark-section-with-grain">
        <SystemBenefitsProof />
      </div>

      {/* 14. More Client Testimonials (Dark background) */}
      <div className="dark-section-with-grain">
        <MoreClientTestimonials />
      </div>

      {/* 15. Exclusivity & Personal Attention (Dark background) */}
      <div className="dark-section-with-grain">
        <ExclusivityPersonalAttention />
      </div>

      {/* 16. FAQ Section (Dark background) */}
      <div className="dark-section-with-grain">
        <FAQSection />
      </div>

      {/* 17. Urgency & Final CTA (White background) */}
      <UrgencyFinalCTA />

      {/* 18. Wall of Client Testimonials (Dark background) */}
      <div className="dark-section-with-grain">
        <WallClientTestimonials />
      </div>

      {/* Minimal Footer (Black) */}
      <div className="dark-section-with-grain">
        <FooterSection />
      </div>

      {/* Sticky CTA that appears on significant scroll */}
      <StickyCTA />
    </main>
  );
}
