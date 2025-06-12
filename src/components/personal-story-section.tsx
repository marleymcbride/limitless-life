import Image from "next/image";
import { bgClasses } from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function PersonalStorySection() {
  return (
    <section
      className={`w-full ${bgClasses.white} py-20 text-black relative overflow-hidden`}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23f3f4f6' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-[#940909] to-gray-900 bg-clip-text text-transparent leading-tight">
            Fixing My Health Was The Most Frustrating Thing I Ever Did...
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Until I discovered the one thing that separates guys who feel like
            shit every day from guys who feel unstoppable. This changed
            everything.
          </p>
        </div>

        {/* PREMIUM STORY CARD */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 via-[#940909] to-gray-900 px-8 py-6">
              <h3 className="text-2xl font-bold text-white text-center">
                The Brutal Wake-Up Call That Changed My Life
              </h3>
            </div>
            <div className="p-8 lg:p-12">
              <p className="text-lg text-gray-800 mb-6 leading-relaxed font-medium">
                I was the poster boy for "doing everything right." Gym 5 times a
                week, eating "clean," reading every health blog. But I was dying
                slowly on 6 coffees a day and a bottle of wine every night.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg text-red-800 font-semibold italic">
                  "You're heading for a heart attack before 40 if you don't
                  change."
                </p>
                <p className="text-sm text-red-600 mt-2">
                  — My Doctor, showing me my bloodwork
                </p>
              </div>
              <p className="text-lg text-gray-800 leading-relaxed">
                35 pounds overweight. Testosterone in the gutter. Falling asleep
                at my desk by 2 PM. I'd tried everything — keto, intermittent
                fasting, more cardio, less cardio, every supplement stack you
                can imagine.{" "}
                <span className="font-bold text-[#940909]">
                  Nothing worked.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* DRAG VS GLIDE ENERGY - PREMIUM PRESENTATION */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-gray-900 via-[#940909] to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-6">
              <h3 className="text-3xl font-bold text-white text-center">
                Then I Discovered The Secret That Changed Everything...
              </h3>
            </div>
            <div className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-[#ff6b6b] mb-4">
                  The Drag vs Glide Energy Discovery
                </h4>
                <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  I realized I was living on what I now call{" "}
                  <span className="font-bold text-white">"Drag Energy"</span> —
                  forcing my body through each day with stimulants and
                  depressants. What I needed was
                  <span className="font-bold text-white">
                    {" "}
                    "Glide Energy"
                  </span>{" "}
                  — natural, sustained power that flows effortlessly.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                  <div className="text-center mb-4">
                    <span className="text-3xl">❌</span>
                    <h5 className="text-xl font-bold text-red-300 mt-2">
                      DRAG ENERGY (My Prison)
                    </h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <span className="text-red-400 mr-3">•</span>
                      <span>6-8 coffees daily just to function</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-red-400 mr-3">•</span>
                      <span>Wine every night to "switch off"</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-red-400 mr-3">•</span>
                      <span>Energy crashes every 2-3 hours</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-red-400 mr-3">•</span>
                      <span>Anxiety, mood swings, irritability</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-red-400 mr-3">•</span>
                      <span>Fighting my body every damn day</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-red-400 mr-3">•</span>
                      <span>Felt like pushing a boulder uphill</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                  <div className="text-center mb-4">
                    <span className="text-3xl">✅</span>
                    <h5 className="text-xl font-bold text-green-300 mt-2">
                      GLIDE ENERGY (My Freedom)
                    </h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">•</span>
                      <span>365+ days caffeine-free</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">•</span>
                      <span>1000+ days alcohol-free</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">•</span>
                      <span>Steady energy from 6 AM to 10 PM</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">•</span>
                      <span>Natural calm, focused mind</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">•</span>
                      <span>Body working WITH me, not against</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">•</span>
                      <span>Energy flows like water downhill</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRANSFORMATION PROOF - PREMIUM CARDS */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">
              Here's What Happened When I Stopped Fighting My Body
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-medium">
              These aren't marketing numbers. This is my actual transformation
              from Drag to Glide Energy:
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-4xl font-black text-[#940909] mb-2">35 lbs</p>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Pure Fat Lost
              </p>
              <p className="text-xs text-gray-500">212→177 lbs</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-4xl font-black text-[#940909] mb-2">365+</p>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Days Caffeine-Free
              </p>
              <p className="text-xs text-gray-500">Zero withdrawal</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-4xl font-black text-[#940909] mb-2">1000+</p>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Days Alcohol-Free
              </p>
              <p className="text-xs text-gray-500">Natural relaxation</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-4xl font-black text-[#940909] mb-2">678</p>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Testosterone ng/dl
              </p>
              <p className="text-xs text-gray-500">From 346 to 678</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border border-red-200 shadow-lg">
              <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                BEFORE (Living on Drugs)
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-medium">
                    Testosterone:
                  </span>
                  <span className="text-red-800 font-bold">
                    346 ng/dl (practically castrated)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-medium">Energy:</span>
                  <span className="text-red-800 font-bold">
                    3/10 (constant crashes and anxiety)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-medium">Body Fat:</span>
                  <span className="text-red-800 font-bold">
                    ~22% (soft, weak, embarrassing)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-medium">Sleep:</span>
                  <span className="text-red-800 font-bold">
                    5/10 (restless, wired, hungover)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-medium">Mood:</span>
                  <span className="text-red-800 font-bold">
                    Anxious, irritable, fucking miserable
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200 shadow-lg">
              <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                AFTER (Natural Power)
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">
                    Testosterone:
                  </span>
                  <span className="text-green-800 font-bold">
                    678 ng/dl (optimal, natural)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">Energy:</span>
                  <span className="text-green-800 font-bold">
                    9/10 (steady from 6 AM to 10 PM)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">Body Fat:</span>
                  <span className="text-green-800 font-bold">
                    ~12% (lean, strong, confident)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">Sleep:</span>
                  <span className="text-green-800 font-bold">
                    9/10 (deep, restorative, wake refreshed)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">Mood:</span>
                  <span className="text-green-800 font-bold">
                    Calm, focused, genuinely happy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VULNERABLE STORY SECTION - PREMIUM DESIGN */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src="/placeholder.svg?height=600&width=400"
                    alt="Marley McBride transformation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
                    <div className="flex justify-between">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-xs font-bold text-white">BEFORE</p>
                        <p className="text-sm text-white">212 lbs</p>
                      </div>
                      <div className="bg-[#940909]/60 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-xs font-bold text-white">AFTER</p>
                        <p className="text-sm text-white">177 lbs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  The 7 Years of Hell That Nearly Killed Me
                </h3>

                <div className="space-y-4 text-gray-800">
                  <p className="text-lg leading-relaxed">
                    My life was a total trainwreck. 3-4 coffees every morning
                    just to function. Half bottle of wine at night just to wind
                    down. Gained 24 pounds in 6 months. Brain fog constantly.{" "}
                    <span className="font-bold text-[#940909]">
                      This was my life for 7 years.
                    </span>
                  </p>

                  <p className="text-lg leading-relaxed">
                    Working 70+ hours a week. Carrying an extra 30 pounds —
                    hating what I saw in the mirror. Running on caffeine,
                    willpower, and desperation. Doctor told me I was heading for
                    a heart attack before 45 if I didn't change.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Tried every diet, workout program, productivity hack out
                    there. Minimal results. The problem wasn't lack of effort —
                    I was approaching health as isolated pieces instead of a
                    complete system.
                  </p>

                  <div className="bg-[#940909]/5 border-l-4 border-[#940909] rounded-r-lg p-6 my-6">
                    <p className="text-xl font-bold text-gray-900 italic">
                      "This wasn't living. It was barely surviving."
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed">
                    Mornings were the worst. Hitting snooze 5-6 times. Dragging
                    myself out of bed feeling like death. First thought every
                    day: need coffee now. Couldn't function without it. Felt
                    pathetic and weak.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Evenings no better. So wired and anxious I couldn't turn my
                    brain off. Pouring drinks just to relax. Sleeping pills when
                    alcohol wasn't enough. Waking up feeling worse than before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL PROOF */}
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
  );
}
