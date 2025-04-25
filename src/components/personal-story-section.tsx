import Image from "next/image"
import { bgClasses } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.white} py-20 text-black relative`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">MY JOURNEY</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">From Burnout to Breakthrough</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            How I went from caffeine-dependent, alcohol-reliant, and 35 pounds overweight to creating the Limitless Protocol
          </p>
        </div>

        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12 max-w-5xl mx-auto">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Marley McBride"
                width={400}
                height={600}
                className="object-cover"
              />

              {/* Before/After overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex flex-col justify-end p-4">
                <div className="flex justify-between">
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1">
                    <p className="text-xs font-bold text-white">BEFORE</p>
                    <p className="text-sm text-white">212 lbs</p>
                  </div>
                  <div className="bg-[#940909]/30 backdrop-blur-sm rounded px-3 py-1">
                    <p className="text-xs font-bold text-white">AFTER</p>
                    <p className="text-sm text-white">177 lbs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <p className="mb-4 text-xl text-gray-800">
              My life was a total trainwreck. 3-4 coffees every morning. Half bottle of wine at night just to wind down. Gained 24 pounds in 6 months. Brain fog constantly. This was my life for 7 years.
            </p>

            <p className="mb-4 text-lg text-gray-700">
              Working 70+ hours a week. Carrying extra 30 pounds - hating what I saw in mirror. Running on caffeine - willpower - desperation. Doctor told me heading for heart attack before 45 if didn't change.
            </p>

            <p className="mb-4 text-lg text-gray-700">
              Tried every diet - workout program - productivity hack out there. Minimal results. Problem wasn't lack of effort - was approaching health as isolated pieces instead of complete system.
            </p>

            <p className="mb-4 text-lg text-gray-700">
              Mornings were worst. Hitting snooze 5-6 times. Dragging myself out of bed feeling like death. First thought every day - need coffee now. Couldn't function without it. Felt pathetic - weak.
            </p>

            <p className="mb-4 text-lg text-gray-700">
              Evenings no better. So wired and anxious couldn't turn brain off. Pouring drinks just to relax. Sleeping pills when alcohol wasn't enough. Waking up feeling worse than before.
            </p>

            <div className="mt-6 p-4 bg-[#940909]/5 border-l-4 border-[#940909] rounded-r-lg">
              <p className="text-xl font-bold text-gray-800">
                This wasn't living. It was barely surviving.
              </p>
            </div>

            {/* Key metrics to show transformation */}
            <div className="grid grid-cols-3 gap-4 mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#940909]">1000+</p>
                <p className="text-sm text-gray-600">Days Caffeine-Free</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#940909]">35 lbs</p>
                <p className="text-sm text-gray-600">Weight Lost</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#940909]">350+</p>
                <p className="text-sm text-gray-600">Days Alcohol-Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mt-16 max-w-4xl mx-auto">
          <MicroTestimonial
            quote="I related to Marley's story so much it was scary. If he could transform after 7 years of burnout, I knew I could too."
            name="James T."
            title="Marketing Director"
            metric="42 lbs Lost"
            isDarkBackground={false}
          />
        </div>
      </div>
    </section>
  )
}
