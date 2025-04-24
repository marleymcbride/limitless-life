"use client"

import { Button } from "./ui/button"
import { Check, X } from "lucide-react"
import { bgClasses } from "@/lib/utils"
import ApplyNowButton from "./apply-now-button"

export default function FinalCta() {
  return (
    <section className={`w-full py-20 ${bgClasses.white} text-black`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-12">
            <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Final Decision</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Stop Settling for Exhaustion, Weight Gain, and Brain Fog
            </h2>
            <p className="text-xl text-gray-700">
              In just 12 weeks, you can transform your energy, body, and mind—without sacrificing your success or spending
              hours in the gym.
            </p>
          </div>

          <div className="mb-12 rounded-lg bg-gray-100 p-8 text-left shadow-lg">
            <h3 className="mb-6 text-center text-2xl font-bold border-b border-[#940909] pb-4">The Choice Is Yours</h3>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 relative shadow-md">
                <div className="absolute top-0 right-0 w-10 h-10 bg-gray-400 flex items-center justify-center transform translate-x-3 -translate-y-3 rounded-full border-2 border-white">
                  <X className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-4 font-bold text-xl text-gray-500">Do Nothing:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">Continue waking up exhausted every morning</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">Remain dependent on caffeine just to function</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">Keep watching your waistline expand year after year</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">Accept brain fog and diminished performance as "normal"</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">Miss precious moments with family due to exhaustion</span>
                  </li>
                  <li className="flex items-start">
                    <X className="mr-2 mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">Put your long-term health at serious risk</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-[#940909]/5 p-6 border border-[#940909] relative shadow-md">
                <div className="absolute top-0 right-0 w-10 h-10 bg-[#940909] flex items-center justify-center transform translate-x-3 -translate-y-3 rounded-full border-2 border-white">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-4 font-bold text-xl text-[#940909]">Join Limitless:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span className="text-gray-700">Wake up naturally energized before your alarm</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span className="text-gray-700">Feel, look and perform like you did 10 years ago</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span className="text-gray-700">Maintain razor-sharp focus all day without crashes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span className="text-gray-700">Feel confident and proud when looking in the mirror</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span className="text-gray-700">Be fully present and energetic with your family</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 mt-1 h-5 w-5 text-[#940909] flex-shrink-0" />
                    <span className="text-gray-700">Build a foundation for longevity and vibrant health</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative bg-[#940909] text-white p-10 rounded-lg shadow-2xl transform transition-all hover:shadow-[0_20px_50px_rgba(148,9,9,0.3)]">
            <h3 className="text-2xl font-bold mb-6">Take the First Step Toward Limitless Energy Today</h3>
            <p className="mb-8 text-lg">Only 10 spots available this month. Don't miss your chance to transform.</p>

            <Button
              size="lg"
              className="mx-auto w-full max-w-md bg-white text-[#940909] py-6 text-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all uppercase tracking-wide"
              asChild
            >
              <a href="#application">JOIN THE LIMITLESS PROTOCOL</a>
            </Button>

            <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-center">
              <Check className="mr-2 h-5 w-5 text-white" />
              <span className="font-medium">100% Results Guarantee: If you don't see significant improvements in 30 days, we'll refund every penny</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
