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
import GuaranteeSection from "../components/guarantee-section"
import FaqSection from "../components/faq-section"
import FinalCta from "../components/final-cta"
import FooterSection from "../components/footer-section"
import StickyCTA from "../components/sticky-cta"
import NattySweetSpotSection from "../components/natty-sweet-spot-section"
import { bgClasses, blackRedGradientOverlay, redAccentBottom, vignetteEffect } from "../lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 1. Hero Section (black with red gradient) */}
      <section className={`py-6 md:py-8 px-4 min-h-[94.75vh] flex flex-col relative w-full overflow-hidden ${bgClasses.blackRedGradient}`}>
        {blackRedGradientOverlay}
        {redAccentBottom}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto flex flex-col relative z-10 h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex-grow flex flex-col justify-start sm:justify-center pt-10 sm:pt-0 sm:mt-12 md:mt-0">
            <h1 className="text-5xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 mt-0 sm:mt-0">
              The Proven 12-Week System For Executive Health Transformation
            </h1>
            <p className="text-xl sm:text-xl md:text-lg text-gray-300 text-center max-w-3xl mx-auto mb-8 sm:mb-16 px-2">
              The step-by-step program that has helped hundreds of high-performing men break free from burnout, reclaim their energy, and build unstoppable physical and mental performance without sacrificing their success
            </p>
          </div>

          {/* Video container positioned in the bottom portion of the screen */}
          <div className="mt-auto mb-6 mx-auto w-full sm:mb-12">
            <div className="relative w-full sm:w-auto sm:mx-auto" style={{ maxWidth: "95%", marginLeft: "auto", marginRight: "auto" }}>
              {/* Purple play button overlay for mobile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#940909] flex items-center justify-center md:hidden z-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              {/* Sound indicator for mobile */}
              <div className="absolute bottom-4 right-4 bg-black/70 rounded-full px-3 py-1 text-white text-sm md:hidden z-30">
                Tap for sound
              </div>
              <EnhancedVideoPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Credibility Quote (white background for testimonials) */}
      <FeaturedTestimonial />

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

      {/* 14. Program Details (black with red gradient) */}
      <ProgramDetails />

      {/* 15. What's Included (black with red gradient) */}
      <WhatsIncluded />

      {/* 16. FAQ Section (includes guarantee info, white background) */}
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
