import Image from "next/image"
import EnhancedVideoPlayer from "../components/enhanced-video-player"
import FeaturedTestimonial from "../components/featured-testimonial"
import PainPoints from "../components/pain-points"
import PersonalStorySection from "../components/personal-story-section"
import DiscoverySection from "../components/discovery-section"
import RunningEmptySection from "../components/running-empty-section"
import SuccessStoriesSection from "../components/success-stories-section"
import SolutionSection from "../components/solution-section"
import ProgramComponentsSection from "../components/program-components-section"
import ResultsSection from "../components/results-section"
import ComparisonTable from "../components/comparison-table"
import CoachSection from "../components/coach-section"
import ProgramDetails from "../components/program-details"
import WhatsIncluded from "../components/whats-included"
import FaqSection from "../components/faq-section"
import FinalCta from "../components/final-cta"
import FooterSection from "../components/footer-section"
import StickyCTA from "../components/sticky-cta"
import NattySweetSpotSection from "../components/natty-sweet-spot-section"
import TestimonialGrid from "../components/testimonial-grid"
import { Button } from "@/components/ui/button"
import { bgClasses, blackRedGradientOverlay, redAccentBottom, vignetteEffect } from "../lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 1. Hero Section (black with red gradient) */}
      <section className={`py-6 md:py-8 px-4 min-h-[75vh] flex flex-col relative w-full overflow-hidden ${bgClasses.blackRedGradient}`}>
        {blackRedGradientOverlay}
        {redAccentBottom}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto flex flex-col relative z-10 h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex-grow flex flex-col justify-start sm:justify-center pt-5 sm:pt-0 sm:mt-6 md:mt-0">
            {/* Pill Logo */}
            <div className="flex justify-center mb-1 relative">
              {/* Base grey version */}
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
              {/* Overlaid colored pill with transparency */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-auto">
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
            {/* Mobile Headlines (visible only on mobile) */}
            <h1 className="block sm:hidden text-4xl font-bold text-white text-center mb-0 mt-0 max-w-[87%] mx-auto px-4">
              You don't need more coffee. You need a system that actually fixes your broken body:
            </h1>

            {/* Desktop Headlines (hidden on mobile) */}
            <h1 className="hidden sm:block text-4xl sm:text-4xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4">
              You dont need another black Americano or BS supplement. You need a real system that quite simply, stops you feeling like shit.
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-6"></div>

            {/* Mobile Subheadline (visible only on mobile) */}
            <p className="block sm:hidden text-xl text-gray-300 text-center max-w-3xl mx-auto mb-0 px-1">
              The proven system for high performers to build a top 1% physique, get their sex drive back, and quite simply stop feeling like shit... without extreme diets or training more than 2 days a week
            </p>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p className="hidden sm:block text-xl sm:text-xl md:text-lg text-gray-300 text-center max-w-3xl mx-auto mb-0 px-1">
              Learn the proven system high performers are using to build a top 1% physique, get their sex drive back and wake up feeling electric every day — without eating less, taking a bunch of crazy pills or spending more than 2 days a week in the gym:
            </p>
          </div>

          {/* Video container positioned in the bottom portion of the screen */}
          <div className="mt-1 mb-0 mx-auto w-full max-w-2xl">
            <div
              className="relative w-full sm:w-auto sm:mx-auto max-w-[50%] mx-auto max-w-500px"
            >
              {/* Red play button overlay for mobile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#940909] flex items-center justify-center md:hidden z-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
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
      </section>

      {/* 2. Credibility Quote (white background for testimonials) - Removed margin between sections */}
      <FeaturedTestimonial />
      {/*
        Why is that section red?
        The hero section uses a red accent color (#940909) for the play button overlay and a black-to-red gradient background via the bgClasses.blackRedGradient utility.
        The play button overlay is styled with bg-[#940909], which is a deep red.
        The background gradient (bgClasses.blackRedGradient) likely includes a red color stop, giving the section a red-tinted appearance.
        If you want to change the red, adjust the bg-[#940909] class or the bgClasses.blackRedGradient definition.
      */}

      {/* 3. Pain Points (black with red accents) */}
      <PainPoints />

      {/* 4. Personal Story Section (white background for written content) */}
      <PersonalStorySection />

      {/* 5. The 80/20 Discovery (white background) */}
      <DiscoverySection />

      {/* 6. Natty Sweet Spot Section (black with red accents) */}
      <NattySweetSpotSection />

      {/* 7. Running on Empty + Three Ways to Live (black with red gradient) */}
      <RunningEmptySection />

      {/* 8. Success Stories Gallery (white background for testimonials) */}
      <SuccessStoriesSection />

      {/* New Testimonial Grid */}
      <TestimonialGrid />

      {/* 9. Deep-Dive Offer Intro/Solution Section (black with red gradient) */}
      <SolutionSection />

      {/* 10. Program Components Breakdown (black with red gradient) */}
      <ProgramComponentsSection />

      {/* 11. Benefits & Results (white background) */}
      <ResultsSection />

      {/* 12. Comparison Table (black with red accents) */}
      <ComparisonTable />

      {/* 13. About the Coach (white background for written content) */}
      <CoachSection />

      {/* More Info anchor point for Tell Me More button */}
      <div id="more-info" className="w-full py-12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900"></div>
        {vignetteEffect}

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to transform your energy and reclaim your natural power?
          </h2>
          <div className="flex justify-center">
            <a href="#program-details">
              <Button size="lg" className="bg-[#940909] hover:bg-[#7e0808] text-white font-bold py-4 px-8 rounded-md text-lg shadow-lg transition duration-300">
                JOIN THE MENTORSHIP
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* 14. Program Details (black with red gradient) */}
      <div id="program-details">
        <ProgramDetails />
      </div>

      {/* 15. What's Included (black with red gradient) */}
      <WhatsIncluded />

      {/* 16. FAQ Section with Guarantee (white background) */}
      <FaqSection />

      {/* 17. Final Recap + CTA (black with red accents) */}
      <FinalCta />

      {/* 18. Minimal Footer (black) */}
      <FooterSection />

      {/* Sticky CTA that appears on significant scroll */}
      <StickyCTA />
    </main>
  )
}
