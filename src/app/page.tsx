import Image from "next/image"
import EnhancedVideoPlayer from "../components/enhanced-video-player"
import FeaturedTestimonial from "../components/featured-testimonial"
import PainPoints from "../components/pain-points"
import TransformationCTA from "../components/transformation-cta"
import RunningEmptyBanner from "../components/running-empty-banner"
import ProblemSection from "../components/problem-section"
import SolutionSection from "../components/solution-section"
import BenefitsSection from "../components/benefits-section"
import CoachSection from "../components/coach-section"
import TestimonialsSection from "../components/testimonials-section"
import ProgramDetails from "../components/program-details"
import WhatsIncluded from "../components/whats-included"
import ComparisonTable from "../components/comparison-table"
import FaqSection from "../components/faq-section"
import FinalCta from "../components/final-cta"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with VSL - New Design for Mobile */}
      <section className="py-6 md:py-8 px-4 min-h-[94.75vh] flex flex-col bg-[radial-gradient(ellipse_at_center,#1a1a1a_0%,#0a0a0a_70%,#050505_100%)] relative w-full">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-50"></div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-50"></div>

        {/* Vignette effect */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.7) 150%)',
          mixBlendMode: 'multiply'
        }}></div>

        <div className="container mx-auto flex flex-col relative z-10 h-full">
          {/* Text content takes priority on mobile - positioned at the top */}
          <div className="flex-grow flex flex-col justify-center mt-0 sm:mt-12 md:mt-0 md:justify-start">
            <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 pt-12 sm:pt-0">
              The Proven 12-Week System For Executive Health Transformation
            </h1>
            <p className="text-xl sm:text-2xl md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-2">
              The step-by-step program that has helped hundreds of high-performing men break free from burnout, reclaim their energy, and build unstoppable physical and mental performance without sacrificing their success
            </p>
          </div>

          {/* Video container positioned in the bottom portion of the screen */}
          <div className="w-full max-w-xl sm:max-w-2xl md:max-w-2xl lg:max-w-3xl mx-auto mt-auto mb-8 sm:mb-12 px-4 sm:px-8">
            <div className="relative">
              {/* Purple play button overlay for mobile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-800 flex items-center justify-center md:hidden z-30">
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

      {/* Featured Testimonial - New Design */}
      <FeaturedTestimonial />

      {/* Pain Points Section - New Design */}
      <PainPoints />

      {/* Transformation CTA - New Design */}
      <TransformationCTA />

      {/* Running on Empty Banner */}
      <RunningEmptyBanner />

      {/* Problem Section */}
      <ProblemSection />

      {/* Opportunity Section */}
      <section className="w-full bg-zinc-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">The Old Way Doesn't Work Anymore</h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-6">
              For years, I pushed through fatigue with more coffee. I ignored my expanding waistline. I told myself the
              stress, anxiety, and brain fog were just "part of success."
            </p>
            <p className="mb-6">
              I tried everything: random diets, expensive supplements, workout programs designed for 20-year-olds.
              Nothing worked because they were all missing the big picture.
            </p>
            <p className="mb-6">
              The breaking point came when my doctor told me my blood pressure and stress hormones were through the
              roof. I was heading for a heart attack at 42.
            </p>
            <p className="mb-6 font-bold">
              I couldn't keep living like this. My family deserved better. My business deserved better. I deserved
              better.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <SolutionSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* About the Coach */}
      <CoachSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Program Details */}
      <ProgramDetails />

      {/* What's Included */}
      <WhatsIncluded />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA */}
      <FinalCta />
    </main>
  )
}
