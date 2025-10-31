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
import { blackRedGradientOverlay, vignetteEffect } from "../lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* 1. Hero Section (UNTOUCHED - PRESERVED EXACTLY) */}
      <section
        className={`py-6 md:py-8 px-4 min-h-[75vh] flex flex-col relative w-full overflow-hidden bg-black-red-gradient`}
      >
        {blackRedGradientOverlay}
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
            {/* Mobile Headlines (visible only on mobile) */}
            <h1
              className="mobile-headline block px-2 mx-auto mt-5 mb-4 w-full font-bold text-center text-white sm:hidden capitalize"
              style={{
                fontFamily: "Neuemontreal, Arial, sans-serif",
                fontSize: "2.4rem",
                lineHeight: "1.1 !important",
              }}
            >
              How I Stopped Feeling Like Shit Every Morning And Built An Elite
              Body (Training Only 2 Days Per Week)
            </h1>

            {/* Mobile Subheadline - RIGHT AFTER HEADLINE (visible only on mobile) */}
            <p
              className="mobile-subheadline block mx-auto mb-0 font-light text-center text-gray-300 sm:hidden px-0"
              style={{
                fontFamily: "Neuemontreal, Arial, sans-serif",
                fontSize: "1.2rem",
                lineHeight: "1.6 !important",
                width: "95% !important",
                maxWidth: "none !important",
              }}
            >
              You don&apos;t need to down 4 coffees a day, train 6 days a week,
              or cut out your favorite foods to feel incredible. Here&apos;s the
              proven system to restore your natural energy, get off alcohol
              easily, and build an elite body in only 2 days:
            </p>

            {/* Spacer div to push headline down */}
            <div className="h-10"></div>

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
            <h1
              className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize"
              style={{
                fontFamily: "Neuemontreal, Arial, sans-serif",
                lineHeight: "1.17",
              }}
            >
              How I Stopped Feeling Like Shit Every Morning And Built An Elite
              Body (Training Only 2 Days Per Week)
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-6"></div>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p
              className="hidden px-1 mx-auto mb-8  text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-xl"
              style={{ maxWidth: "725px" }}
            >
              You don&apos;t need to down 4 coffees a day, train 6 days a week,
              or cut out your favorite foods to feel incredible. Here&apos;s the
              proven system to restore your natural energy, get off alcohol
              easily, and build an elite body in only 2 days:
            </p>
          </div>

          {/* Video Player - Bunny.net VSL */}
          <div className="mx-auto mt-0 mb-4 w-full max-w-4xl px-4">
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
                &ldquo;I&apos;m in the best shape I&apos;ve ever been,
                haven&apos;t touched booze in over a year and feel
                incredible.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 mt-4 bg-[#940909] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold mt-4 text-white">
                    Client L - Investment Banking
                  </div>
                  <div className="text-lg mt-0 text-center">
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
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

      {/* 6. The Big Idea (White background) */}
      <BigIdeaSection />

      {/* 7. Results Proof (White background) */}
      <ResultsProof />

      {/* 8. Imagine This (Black background) */}
      <ImagineThis />

      {/* 9. Process Explanation (Black background) */}
      <ProcessExplanation />

      {/* 10. More Video Testimonials (Black background) */}
      <MoreVideoTestimonials />

      {/* 11. Introducing Limitless (Dark background) */}
      <IntroducingLimitless />

      {/* 12. The 4-Step System (White background) */}
      <FourStepSystem />

      {/* 13. System Benefits Proof - Why This System Will Work For You (Dark background) */}
      <SystemBenefitsProof />

      {/* 14. More Client Testimonials (Dark background) */}
      <MoreClientTestimonials />

      {/* 15. Exclusivity & Personal Attention (White background) */}
      <ExclusivityPersonalAttention />

      {/* 16. FAQ Section (Dark background) */}
      <FAQSection />

      {/* 17. Urgency & Final CTA (White background) */}
      <UrgencyFinalCTA />

      {/* 18. Wall of Client Testimonials (Dark background) */}
      <WallClientTestimonials />

      {/* Minimal Footer (Black) */}
      <FooterSection />

      {/* Sticky CTA that appears on significant scroll */}
      <StickyCTA />
    </main>
  );
}
