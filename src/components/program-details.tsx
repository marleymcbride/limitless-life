"use client"

import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { bgClasses, blackRedGradientOverlay, redAccentBottom, vignetteEffect } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function ProgramDetails() {
  return (
    <section className={`w-full py-20 text-white relative overflow-hidden ${bgClasses.blackRedGradient}`}>
      {blackRedGradientOverlay}
      {redAccentBottom}
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">The Program</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Limitless 12-Week Program</h2>
          <p className="text-xl max-w-3xl mx-auto">
            A Complete System for Total Transformation That Has Helped Hundreds of High-Performing Executives Reclaim Their Energy, Body, and Mind
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h3 className="mb-8 text-2xl font-bold text-center">The 4-Phase Approach</h3>

            <div className="relative">
              {/* Vertical line connecting phases */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-[#940909] hidden md:block"></div>

              <div className="mb-8 space-y-6 md:space-y-0 md:grid md:grid-cols-[80px_1fr] md:gap-4">
                <div className="hidden md:flex md:justify-center md:mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#940909] flex items-center justify-center z-10">
                    <span className="font-bold">1</span>
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <h4 className="mb-2 text-xl font-bold flex items-center md:block">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#940909] mr-3 md:hidden">1</span>
                    Phase 1: Assessment & Reset
                    <span className="text-[#940909] ml-2 text-base font-normal">(Weeks 1-2)</span>
                  </h4>
                  <p>
                    We begin with comprehensive metabolic and lifestyle profiling to identify your unique patterns and
                    blockers. Then we implement a precision reset protocol to prepare your body for rapid transformation.
                  </p>
                </div>

                <div className="hidden md:flex md:justify-center md:mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#940909] flex items-center justify-center z-10">
                    <span className="font-bold">2</span>
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <h4 className="mb-2 text-xl font-bold flex items-center md:block">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#940909] mr-3 md:hidden">2</span>
                    Phase 2: Foundation Building
                    <span className="text-[#940909] ml-2 text-base font-normal">(Weeks 3-5)</span>
                  </h4>
                  <p>
                    We establish your core energy, nutrition, and recovery protocols, customized to your unique metabolic
                    profile and lifestyle constraints. You'll experience the first major energy and clarity breakthroughs.
                  </p>
                </div>

                <div className="hidden md:flex md:justify-center md:mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#940909] flex items-center justify-center z-10">
                    <span className="font-bold">3</span>
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <h4 className="mb-2 text-xl font-bold flex items-center md:block">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#940909] mr-3 md:hidden">3</span>
                    Phase 3: Acceleration
                    <span className="text-[#940909] ml-2 text-base font-normal">(Weeks 6-9)</span>
                  </h4>
                  <p>
                    With your foundation in place, we implement advanced protocols to accelerate fat loss, energy
                    production, and cognitive enhancement. This is where the most visible physical changes occur.
                  </p>
                </div>

                <div className="hidden md:flex md:justify-center md:mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#940909] flex items-center justify-center z-10">
                    <span className="font-bold">4</span>
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800 p-6 border-l-4 border-[#940909] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <h4 className="mb-2 text-xl font-bold flex items-center md:block">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#940909] mr-3 md:hidden">4</span>
                    Phase 4: Integration & Mastery
                    <span className="text-[#940909] ml-2 text-base font-normal">(Weeks 10-12)</span>
                  </h4>
                  <p>
                    We fine-tune your systems and ensure complete lifestyle integration for lasting results. You'll
                    develop the skills to maintain and even enhance your transformation long after the program ends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Micro-testimonial for social proof */}
          <div className="mb-12">
            <MicroTestimonial
              quote="The structured phased approach is brilliant. I never felt overwhelmed, and by week 6 I was already seeing dramatic changes in my energy and body."
              name="William S."
              title="CFO, Tech Startup"
              metric="30 lbs Lost"
            />
          </div>

          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-center">What's Included</h3>

            <div className="rounded-lg bg-zinc-800 p-6 mb-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Personalized Metabolic Optimization Protocol</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Weekly 1:1 Coaching Calls</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Custom Nutrition & Supplement Plan</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Precision Exercise Protocols (3-4 hrs/week)</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Stress Management & Sleep Optimization</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Unlimited Text Support</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Biometric Tracking System</span>
                </div>

                <div className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                  <span>Lifetime Access to Program Materials</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-8 text-center relative overflow-hidden shadow-xl transform transition-all hover:scale-[1.01]">
            {/* Red accent corner */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#940909] rotate-45"></div>

            <h3 className="mb-4 text-2xl font-bold">Investment: $2,000</h3>
            <p className="mb-6">Or 3 monthly payments of $700</p>
            <p className="mb-8 text-lg">Only 10 spots available this month</p>

            <Button
              className="mx-auto w-full max-w-md bg-[#940909] py-6 text-xl font-bold hover:bg-[#7b0707] transition-all hover:scale-105 uppercase tracking-wide"
              asChild
            >
              <a href="#application">Claim Your Spot Now</a>
            </Button>

            <p className="mt-6 text-sm flex items-center justify-center">
              <Check className="mr-2 h-5 w-5 text-[#940909]" />
              <span>100% Money-Back Guarantee for 30 Days</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
