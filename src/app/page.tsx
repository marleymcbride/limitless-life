import Image from "next/image"
import EnhancedVideoPlayer from "../components/enhanced-video-player"
import FeaturedTestimonial from "../components/featured-testimonial"
import PainPoints from "../components/pain-points"
import TransformationCTA from "../components/transformation-cta"
import SolutionSection from "../components/solution-section"
import BenefitsSection from "../components/benefits-section"
import CoachSection from "../components/coach-section"
import TestimonialsSection from "../components/testimonials-section"
import ProgramDetails from "../components/program-details"
import WhatsIncluded from "../components/whats-included"
import ComparisonTable from "../components/comparison-table"
import FaqSection from "../components/faq-section"
import FinalCta from "../components/final-cta"
import NumberedList from "../components/numbered-list"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with VSL - New Design for Mobile */}
      <section className="py-6 md:py-8 px-4 min-h-[94.75vh] flex flex-col relative w-full overflow-hidden bg-black">

        {/* Main background gradient that reaches halfway up before fading out */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(80, 0, 0, 0.4) 0%, rgba(60, 0, 0, 0.3) 25%, rgba(30, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.9) 75%, rgb(0, 0, 0) 100%)'
        }}></div>

        {/* Stronger red accent at bottom extending halfway up */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#940909] via-[#940909]/20 to-transparent opacity-60"></div>

        {/* Ensure deep black at the top quarter */}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div>

        {/* Vignette effect to enhance depth and blend */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
          mixBlendMode: 'multiply'
        }}></div>

        <div className="container mx-auto flex flex-col relative z-10 h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex-grow flex flex-col justify-start sm:justify-center pt-10 sm:pt-0 sm:mt-12 md:mt-0">
            <h1 className="text-5xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 mt-0 sm:mt-0">
              Escape Drag Energy. Experience The Limitless Protocol.
            </h1>
            <p className="text-xl sm:text-xl md:text-lg text-gray-300 text-center max-w-3xl mx-auto mb-8 sm:mb-16 px-2">
              The elite 12-week system that transforms high-performing men from burned-out and caffeine-dependent to natural, unstoppable energy — without sacrificing their physique, performance, or success
            </p>
          </div>

          {/* Video container positioned in the bottom portion of the screen */}
          <div className="mt-auto mb-6 mx-auto w-full sm:mb-12">
            <div className="relative w-full sm:w-auto sm:mx-auto" style={{ maxWidth: "95%", marginLeft: "auto", marginRight: "auto" }}>
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

      {/* Combined Running on Empty + Three Ways to Live Section */}
      <section className="w-full py-16 text-white relative overflow-hidden">
        {/* Black base */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Red gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(80, 0, 0, 0.4) 0%, rgba(60, 0, 0, 0.3) 25%, rgba(30, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.9) 75%, rgb(0, 0, 0) 100%)'
        }}></div>

        {/* Red accent at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[100vh] bg-gradient-to-t from-[#940909] via-[#940909]/20 to-transparent opacity-60"></div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
          mixBlendMode: 'multiply'
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* First Section: "You're Running on Empty" content */}
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl relative">
            You&apos;re Running on Empty
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#940909]"></span>
          </h2>

          <div className="mx-auto max-w-3xl space-y-6 mb-16">
            <p>
              You wake up <span className="text-[#940909] font-semibold">tired</span>, even after a full night&apos;s sleep. The first thing you reach for is coffee – the first of
              many cups you&apos;ll need today just to function.
            </p>

            <p>
              You&apos;ve gained 10-20 pounds over the last few years. Your clothes don&apos;t fit right anymore. You avoid looking
              in the mirror when you get out of the shower.
            </p>

            <p>
              <span className="text-[#940909] font-semibold">Stress follows you everywhere</span>. Your mind races at night. You snap at your family over small things. You
              wonder if this is just what success costs.
            </p>

            <p>
              You find yourself pouring a drink 3-5 nights a week just to &quot;wind down.&quot; It&apos;s the only way you know how to
              switch off from work mode.
            </p>

            <p>
              Despite knowing something needs to change, you can&apos;t break free from your work-dominated lifestyle. There&apos;s
              always another deadline, another meeting, another crisis to handle.
            </p>
          </div>

          {/* Second Section: "The Three Ways to Live" content */}
          <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold">The Three Ways To Live</h2>
          <div className="mx-auto px-2 sm:px-0 max-w-4xl">
            <div className="mb-10 border-l-4 border-zinc-700 pl-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">The Typical Lifestyle (95% of men)</h3>
              <p className="mb-6 text-base sm:text-lg">
                Western diet, regular drinking, barely exercising. Constantly tired, wired on caffeine, dependent on alcohol to wind down. You're accessing maybe 20% of your potential, wasting 80% in a fog of low energy and bad habits.
              </p>
            </div>

            <div className="mb-10 border-l-4 border-zinc-500 pl-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">The Health-Conscious (4% of men)</h3>
              <p className="mb-6 text-base sm:text-lg">
                You hit the gym, monitor your food, cut back on booze. But there's no real system, you're training and working too hard, always one bad week from burnout. You're accessing 50-60% of your potential, but it's a constant struggle.
              </p>
            </div>

            <div className="mb-10 border-l-4 border-[#940909] pl-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">The Limitless 1%</h3>
              <p className="mb-6 text-base sm:text-lg">
                Intentional systems for energy, health, and performance. You understand your body on a deeper level, making optimal health effortless. No caffeine, no alcohol needed — just pure, natural Glide Energy. You're unlocking 95-100% of your potential daily.
              </p>
            </div>

            <p className="font-bold text-base sm:text-lg text-center mt-8">
              I was trapped in the health-conscious group for years. Always working hard, never feeling my best. The Limitless Protocol was the 1% path I was missing.
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
