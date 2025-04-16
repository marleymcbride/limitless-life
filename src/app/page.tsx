import Image from "next/image"
import VideoPlayer from "../components/video-player"
import ProblemSection from "../components/problem-section"
import SolutionSection from "../components/solution-section"
import BenefitsSection from "../components/benefits-section"
import CoachSection from "../components/coach-section"
import TestimonialsSection from "../components/testimonials-section"
import ProgramDetails from "../components/program-details"
import FaqSection from "../components/faq-section"
import FinalCta from "../components/final-cta"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with VSL */}
      <section className="w-full bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
              The Proven 90 Day System For <br className="hidden md:block" />
              Explosive YouTube Growth
            </h1>
            <p className="mb-8 text-center text-lg md:text-xl lg:max-w-3xl mx-auto">
              The step-by-step YouTube growth system for entrepreneurs and business owners who want to build a loyal following and generate significant leads and income.
            </p>

            {/* VSL - centered and standalone */}
            <div className="w-full max-w-3xl mx-auto">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="w-full bg-white py-16 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8 lg:gap-12">
            <div className="mb-6 md:mb-0 md:w-1/3 relative">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-purple-500 rounded-lg opacity-50"></div>
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Client Testimonial"
                width={300}
                height={400}
                className="rounded-lg shadow-lg relative z-10"
              />
            </div>
            <div className="md:w-2/3">
              <p className="mb-6 text-xl font-medium italic md:text-2xl lg:text-3xl text-gray-800">
                "After years of grinding myself into the ground, I was exhausted, overweight, and losing my edge. The
                <span className="text-purple-600"> Limitless program </span>completely transformed my energy levels and got me back to peak performance in just 8
                weeks."
              </p>
              <div className="flex items-center">
                <p className="text-lg font-bold text-gray-900">Ryan D.</p>
                <span className="mx-2 text-gray-400">|</span>
                <p className="text-gray-700">CEO, Tech Innovations</p>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-emerald-600 font-semibold">
                  Results: <span className="font-bold">22 lbs lost</span>, <span className="font-bold">3x energy levels</span>, eliminated afternoon crashes
                </p>
              </div>
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