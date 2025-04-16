"use client"

import { Button } from "./ui/button"
import { Check, X } from "lucide-react"

export default function FinalCta() {
  return (
    <section className="w-full bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Stop Settling for Exhaustion, Weight Gain, and Brain Fog
          </h2>

          <p className="mb-8 text-xl">
            In just 12 weeks, you can transform your energy, body, and mind—without sacrificing your success or spending
            hours in the gym.
          </p>

          <div className="mb-12 rounded-lg bg-zinc-900 p-8 text-left">
            <h3 className="mb-6 text-center text-2xl font-bold border-b border-[#940909] pb-4">The Choice Is Yours</h3>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-10 h-10 bg-zinc-700 flex items-center justify-center transform translate-x-3 -translate-y-3 rounded-full border-2 border-zinc-800">
                  <X className="h-6 w-6 text-red-500" />
                </div>
                <h4 className="mb-4 font-bold text-xl text-gray-400">Do Nothing:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Continue waking up exhausted every morning</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Remain dependent on caffeine just to function</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Keep watching your waistline expand year after year</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Accept brain fog and diminished performance as "normal"</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Miss precious moments with family due to exhaustion</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Put your long-term health at serious risk</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-[#940909]/10 p-6 border border-[#940909] relative">
                <div className="absolute top-0 right-0 w-10 h-10 bg-[#940909] flex items-center justify-center transform translate-x-3 -translate-y-3 rounded-full border-2 border-black">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-4 font-bold text-xl text-white">Join Limitless:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span>Wake up naturally energized before your alarm</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span>Feel, look and perform like you did 10 years ago</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span>Maintain razor-sharp focus all day without crashes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span>Feel confident and proud when looking in the mirror</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span>Be fully present and energetic with your family</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span>Build a foundation for longevity and vibrant health</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#940909] to-[#c20d0d] blur-md opacity-70"></div>
            <div className="relative bg-black rounded-lg p-8 border border-[#940909]">
              <h3 className="text-2xl font-bold mb-4">Ready to Reclaim Your Energy, Body & Mind?</h3>
              <p className="mb-6">Join hundreds of high-performing executives who have transformed their lives in just 12 weeks</p>
              
              <Button
                size="lg"
                className="mx-auto w-full max-w-md bg-[#940909] py-8 text-2xl font-bold hover:bg-[#7b0707] hover:scale-105 transition-all"
                asChild
              >
                <a href="#application">Transform Your Life Now</a>
              </Button>
              
              <div className="mt-6 flex items-center justify-center">
                <span className="mr-2 bg-[#940909] text-white px-3 py-1 rounded-md text-sm font-bold">LIMITED</span>
                <span className="font-bold">Only 10 spots available this month</span>
              </div>

              <p className="mt-6 text-sm flex items-center justify-center">
                <Check className="mr-2 h-5 w-5 text-[#940909]" />
                <span>100% Money-Back Guarantee: If you don't see significant improvements in 30 days</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}