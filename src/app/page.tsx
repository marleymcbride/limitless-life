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
      {/* Hero Section with VSL - New Design */}
      <section className="py-12 md:py-16 px-4 min-h-[95vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#1a1a1a_0%,#0a0a0a_70%,#050505_100%)] relative w-full">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.7) 150%)',
          mixBlendMode: 'multiply'
        }}></div>
        
        <div className="container mx-auto flex flex-col items-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center max-w-3xl mb-4">
            The Proven 12-Week System For Executive Health Transformation
          </h1>
          <p className="text-base md:text-lg text-gray-300 text-center max-w-3xl mb-10">
            The step-by-step program that has helped hundreds of high-performing men break free from burnout, reclaim their energy, and build unstoppable physical and mental performance without sacrificing their success
          </p>

          {/* Video container */}
          <div className="w-full max-w-3xl mx-auto">
            <EnhancedVideoPlayer />
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