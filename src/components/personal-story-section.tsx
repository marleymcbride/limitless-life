import Image from "next/image"
import { bgClasses, masculinePattern } from "@/lib/utils"
import MicroTestimonial from "./ui/micro-testimonial"

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.darkRed} py-20 text-white relative`}>
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Marley McBride"
                width={400}
                height={600}
                className="rounded-lg shadow-xl"
              />

              {/* Before/After overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-lg flex flex-col justify-end p-4">
                <div className="flex justify-between">
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1">
                    <p className="text-xs font-bold">BEFORE</p>
                    <p className="text-sm">212 lbs</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1">
                    <p className="text-xs font-bold">AFTER</p>
                    <p className="text-sm">177 lbs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="mb-6">
              <span className="bg-white/20 text-white uppercase tracking-wider text-xs font-bold px-3 py-1 rounded-sm">My Story</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold">My Journey From Burnout to Breakthrough</h2>
            </div>

            <p className="mb-4 text-xl">
              My life was a total trainwreck. 3-4 coffees every morning. Half bottle of wine at night just to wind down. Gained 24 pounds in 6 months. Brain fog constantly. This was my life for 7 years.
            </p>

            <p className="mb-4 text-lg">
              Working 70+ hours a week. Carrying extra 30 pounds - hating what I saw in mirror. Running on caffeine - willpower - desperation. Doctor told me heading for heart attack before 45 if didn't change.
            </p>

            <p className="mb-4 text-lg">
              Tried every diet - workout program - productivity hack out there. Minimal results. Problem wasn't lack of effort - was approaching health as isolated pieces instead of complete system.
            </p>

            <p className="mb-4 text-lg">
              Mornings were worst. Hitting snooze 5-6 times. Dragging myself out of bed feeling like death. First thought every day - need coffee now. Couldn't function without it. Felt pathetic - weak.
            </p>

            <p className="mb-4 text-lg">
              Evenings no better. So wired and anxious couldn't turn brain off. Pouring drinks just to relax. Sleeping pills when alcohol wasn't enough. Waking up feeling worse than before.
            </p>

            <p className="mb-4 text-lg">
              Body falling apart. Clothes didn't fit. Avoiding mirrors after shower. Blood pressure through roof. Testosterone levels bottomed out. Constant brain fog ruining my work.
            </p>

            <div className="mt-8 text-2xl font-bold">
              This wasn't living. It was barely surviving.
            </div>

            {/* Key metrics to show transformation */}
            <div className="grid grid-cols-3 gap-4 mt-8 bg-black/20 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-sm">Days Caffeine-Free</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">35 lbs</p>
                <p className="text-sm">Weight Lost</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">350+</p>
                <p className="text-sm">Days Alcohol-Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mt-16">
          <MicroTestimonial
            quote="I related to Marley's story so much it was scary. If he could transform after 7 years of burnout, I knew I could too."
            name="James T."
            title="Marketing Director"
            metric="42 lbs Lost"
          />
        </div>
      </div>
    </section>
  )
}
