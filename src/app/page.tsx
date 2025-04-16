import Image from "next/image"
import VideoPlayer from "@/components/video-player"
import ProblemSection from "@/components/problem-section"
import SolutionSection from "@/components/solution-section"
import BenefitsSection from "@/components/benefits-section"
import CoachSection from "@/components/coach-section"
import TestimonialsSection from "@/components/testimonials-section"
import ProgramDetails from "@/components/program-details"
import FaqSection from "@/components/faq-section"
import FinalCta from "@/components/final-cta"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with VSL */}
      <section className="w-full bg-black text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
              Tired, Stressed, and Stuck in a Rut? Discover How Busy Executives Reclaim Their Energy, Body, and Mind in
              Just 12 Weeks
            </h1>
            <p className="mb-8 text-center text-lg md:text-xl lg:max-w-3xl">
              The proven system that has helped hundreds of high-performing men break free from burnout and build
              unstoppable energy without sacrificing success
            </p>

            {/* VSL - centered and standalone */}
            <div className="w-full max-w-4xl">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial (based on Rian Doris example) */}
      <section className="w-full bg-zinc-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8 lg:gap-12">
            <div className="mb-6 md:mb-0 md:w-1/3">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Client Testimonial"
                width={300}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <p className="mb-6 text-xl font-medium italic md:text-2xl lg:text-3xl">
                "After years of grinding myself into the ground, I was exhausted, overweight, and losing my edge. The
                Limitless program completely transformed my energy levels and got me back to peak performance in just 8
                weeks."
              </p>
              <div className="flex items-center">
                <p className="text-lg font-bold">Ryan D.</p>
                <span className="mx-2">|</span>
                <p>CEO, Tech Innovations</p>
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Results: 22 lbs lost, 3x energy levels, eliminated afternoon crashes
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* About the Coach */}
      <CoachSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Program Details */}
      <ProgramDetails />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA */}
      <FinalCta />
    </main>
  )
}