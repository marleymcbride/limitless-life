"use client";

import { Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  bgClasses,
  blackRedGradientOverlay,
  redAccentBottom,
  vignetteEffect,
} from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";
import Image from "next/image";

export default function ProgramDetails() {
  return (
    <section className="w-full py-20 bg-zinc-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/80 to-black"></div>
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            You only need to sign 1 client
            <br />
            to make your money back
          </h2>
          <p className="text-md max-w-3xl mx-auto mb-8 text-gray-300">
            If I'm honest, I can't expect to predict all your problems, so this
            course will grow with the people who are a part of it, as I learn
            your problems I'll address them ongoing. Please also don't forget
            this course is a tax write off for your next tax bill, it's a
            legitimate business expense.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Pricing boxes grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Left pricing box */}
            <div className="relative overflow-hidden">
              {/* Price tag at top */}
              <div className="w-full px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-center rounded-t-lg border border-blue-900 text-3xl font-bold">
                £1,999/ $2,499
              </div>

              {/* Main pricing box content */}
              <div className="bg-[#0a192f] p-8 pb-4 rounded-b-lg border border-t-0 border-blue-900">
                <h3 className="text-2xl font-bold mb-2 text-center">
                  JOIN THE BUSINESS
                  <br />
                  <span className="text-gray-400">MENTORSHIP TODAY.</span>
                </h3>

                <div className="space-y-4 mt-8">
                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Lifetime access to the Business Mentorship Course
                      including all modules + new videos produced monthly.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Access to private community where you can chat with me
                      anytime and be interactive with other members.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Detailed tasks per module so you can practically learn and
                      then apply what I am teaching you in the course.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Bonus, lifetime access to Black Belt Content Mastery,
                      Email Advantage, PT Starter Kit & Silver Play Button.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-none text-lg">
                    JOIN NOW
                  </Button>

                  <p className="text-center my-4 text-gray-400 font-medium">
                    OR
                  </p>

                  <Button className="w-full py-4 bg-[#0d2249] hover:bg-[#0f264e] text-white font-bold border border-blue-800 rounded transition-none text-sm">
                    PAY IN 2 MONTHLY INSTALLMENTS OF
                    <br />
                    £1,049/$1,299
                  </Button>
                </div>

                <div className="flex justify-center space-x-3 mt-4 mb-2">
                  <Image
                    src="/images/visa.svg"
                    alt="Visa"
                    width={40}
                    height={20}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/images/paypal.svg"
                    alt="PayPal"
                    width={40}
                    height={20}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/images/apple-pay.svg"
                    alt="Apple Pay"
                    width={40}
                    height={20}
                    className="h-6 w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right pricing box */}
            <div className="relative overflow-hidden">
              {/* Price tag at top */}
              <div className="w-full px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-center rounded-t-lg border border-blue-900 text-3xl font-bold">
                $12,500
              </div>

              {/* Main pricing box content */}
              <div className="bg-[#0a192f] p-8 pb-4 rounded-b-lg border border-t-0 border-blue-900 relative">
                {/* Application only badge */}
                <div className="absolute right-4 top-0 transform -translate-y-1/2">
                  <div className="bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                    APPLICATION ONLY
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-center">
                  10 WEEKS OF 1-1 COACHING.
                </h3>

                <div className="space-y-4 mt-8">
                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Have me step inside your business and work closely with
                      you on improving every area of your current operation.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      FREE access to the full suite of Business Mentorship
                      Courses (worth $2499)
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Join our private Discord community where you can chat with
                      me anytime and be interactive with other members.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-700 p-1 mr-3 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm">
                      Instantly receive new courses and modules within the
                      business mentorship suite for free, for life.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-none text-lg">
                    APPLY NOW
                  </Button>
                </div>

                <div className="flex justify-center space-x-3 mt-4 mb-2">
                  <Image
                    src="/images/visa.svg"
                    alt="Visa"
                    width={40}
                    height={20}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/images/paypal.svg"
                    alt="PayPal"
                    width={40}
                    height={20}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/images/apple-pay.svg"
                    alt="Apple Pay"
                    width={40}
                    height={20}
                    className="h-6 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* What's Included Section - From 2nd reference image */}
          <div className="max-w-4xl mx-auto mt-20 mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              What's Included
            </h3>

            <div className="bg-zinc-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
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

          {/* Investment section - similar to 2nd reference image */}
          <div className="rounded-lg bg-zinc-800 p-8 text-center relative overflow-hidden shadow-xl transform transition-none  mt-10 max-w-4xl mx-auto">
            {/* Red accent corner */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#940909] rotate-45"></div>

            <h3 className="mb-4 text-2xl font-bold">Investment: $2,000</h3>
            <p className="mb-6">Or 3 monthly payments of $700</p>
            <p className="mb-8 text-lg">Only 10 spots available this month</p>

            <Button
              className="mx-auto w-full max-w-md bg-[#940909] py-6 text-xl font-bold hover:bg-[#7b0707] transition-none  uppercase tracking-wide"
              asChild
            >
              <a href="#application">CLAIM YOUR SPOT NOW</a>
            </Button>

            <div className="mt-6 flex items-center justify-center">
              <Check className="mr-2 h-5 w-5 text-[#940909]" />
              <span>100% Money-Back Guarantee for 30 Days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
