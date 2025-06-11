import ApplyNowButton from "./apply-now-button";
import { bgClasses, masculinePattern } from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function RunningEmptySection() {
  return (
    <section className="w-full py-20 text-white bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-[#541212] to-zinc-900 opacity-90"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#400909]/50 via-[#400909]/30 to-transparent"></div>
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        {/* THROWING ROCKS AT THE ENEMY - POLARIZING */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black mb-8 text-white">
            Why Everything Else Has Failed You (And Always Will)
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-300 font-medium leading-relaxed">
            Let me tell you exactly why the fitness industry, supplement
            companies, and "health gurus" have kept you trapped in the 4%
            category — and why they want it that way.
          </p>
        </div>

        {/* THE ENEMIES - PREMIUM DESIGN */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Enemy 1: Big Supplement */}
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 backdrop-blur-sm rounded-xl p-8 border border-red-500/40 hover:border-red-400/60 transition-all duration-300">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">💊</span>
                <h3 className="text-2xl font-bold text-red-300 mb-4">
                  Big Supplement
                </h3>
              </div>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Sells you 15+ pills that do nothing</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>$300-600/month for placebo effects</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Keeps you dependent on their products</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Never addresses the root cause</span>
                </p>
              </div>
              <div className="mt-6 p-4 bg-red-800/30 rounded-lg">
                <p className="text-red-200 font-bold text-center">
                  Their Goal: Keep You Buying Forever
                </p>
              </div>
            </div>

            {/* Enemy 2: Fitness Industry */}
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 backdrop-blur-sm rounded-xl p-8 border border-red-500/40 hover:border-red-400/60 transition-all duration-300">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">🏋️</span>
                <h3 className="text-2xl font-bold text-red-300 mb-4">
                  Fitness Industry
                </h3>
              </div>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Forces 5-7 days/week torture</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Ignores hormone optimization</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Burns out your nervous system</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>One-size-fits-all garbage programs</span>
                </p>
              </div>
              <div className="mt-6 p-4 bg-red-800/30 rounded-lg">
                <p className="text-red-200 font-bold text-center">
                  Their Goal: Keep You Exhausted
                </p>
              </div>
            </div>

            {/* Enemy 3: Big Pharma */}
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 backdrop-blur-sm rounded-xl p-8 border border-red-500/40 hover:border-red-400/60 transition-all duration-300">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">🏥</span>
                <h3 className="text-2xl font-bold text-red-300 mb-4">
                  Big Pharma
                </h3>
              </div>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Pushes TRT instead of natural fixes</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Antidepressants for lifestyle problems</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Treats symptoms, never causes</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <span>Creates lifelong dependencies</span>
                </p>
              </div>
              <div className="mt-6 p-4 bg-red-800/30 rounded-lg">
                <p className="text-red-200 font-bold text-center">
                  Their Goal: Keep You Sick
                </p>
              </div>
            </div>
          </div>

          {/* THE BRUTAL TRUTH */}
          <div className="bg-gradient-to-r from-red-900/50 to-red-800/40 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-red-500/50">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              Here's The Brutal Truth They Don't Want You To Know:
            </h3>
            <div className="text-center max-w-5xl mx-auto">
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                They make <span className="font-bold text-white">billions</span>{" "}
                keeping you in the 4% category. Sick enough to buy products,
                healthy enough to keep working. It's the perfect business model.
              </p>
              <p className="text-xl text-gray-200 leading-relaxed">
                <span className="font-bold text-white">
                  They don't want you to discover
                </span>{" "}
                that you can eliminate caffeine, alcohol, and all their products
                while feeling better than you have in decades.
                <span className="font-bold text-red-300">
                  That would destroy their entire industry.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* USP CLARITY - WHAT MAKES US DIFFERENT */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-8 text-white">
              Why Limitless Is The Only Solution That Actually Works
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium">
              We're the only program that eliminates your dependencies AND
              builds an elite physique — without pills, extreme diets, or
              burning out your nervous system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What Everyone Else Does */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/40 backdrop-blur-sm rounded-xl p-8 border border-gray-600/30">
              <h3 className="text-2xl font-bold text-gray-300 mb-6 text-center">
                ❌ What Everyone Else Does
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    Add more supplements, more workouts, more complexity
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    Focus on isolated goals (just weight loss OR just muscle)
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    Ignore caffeine and alcohol dependencies
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    Require 5-7 days/week in the gym
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    Rely on willpower instead of systems
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    Create new dependencies on their products
                  </p>
                </div>
              </div>
            </div>

            {/* What Limitless Does */}
            <div className="bg-gradient-to-br from-[#940909]/30 to-[#940909]/20 backdrop-blur-sm rounded-xl p-8 border border-[#940909]/50">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                ✅ The Limitless Difference
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-bold text-white">Eliminate</span>{" "}
                    what's blocking your natural systems
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-bold text-white">Integrate</span> all
                    7 components of peak male performance
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-bold text-white">Free you</span> from
                    caffeine and alcohol completely
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-bold text-white">
                      Maximize results
                    </span>{" "}
                    with just 2-3 days training
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-bold text-white">Build systems</span>{" "}
                    that make success inevitable
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-bold text-white">
                      Create complete freedom
                    </span>{" "}
                    from all dependencies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MORE PROOF - CASE STUDIES */}
        <div className="max-w-7xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Still Think This Is "Too Good To Be True"? Here's More Proof:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1: Rob's Complete Transformation */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#940909] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <h4 className="text-xl font-bold text-white">
                  Rob M. - Tech Executive, NYC
                </h4>
                <p className="text-gray-300 text-sm">
                  Age 39 • Revenue: $180M+ portfolio
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-red-900/30 rounded-lg p-4">
                  <h5 className="font-bold text-red-300 mb-2">
                    BEFORE (The Disaster):
                  </h5>
                  <p className="text-gray-300 text-sm">
                    "4-5 coffees daily, 3-4 drinks every night. Testosterone at
                    290. Gained 25 pounds. Sex drive non-existent. Wife
                    threatening divorce. Revenue dropping 40%."
                  </p>
                </div>
                <div className="bg-green-900/30 rounded-lg p-4">
                  <h5 className="font-bold text-green-300 mb-2">
                    AFTER (The Comeback):
                  </h5>
                  <p className="text-gray-300 text-sm">
                    "365+ days clean from everything. Lost 18 pounds.
                    Testosterone at 647. Sex drive back to my 20s. Marriage
                    saved. Just closed my biggest deal ever."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#940909]/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#ff6b6b]">18</p>
                  <p className="text-xs text-gray-300">lbs Lost</p>
                </div>
                <div className="bg-[#940909]/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#ff6b6b]">357</p>
                  <p className="text-xs text-gray-300">T-Level Gain</p>
                </div>
                <div className="bg-[#940909]/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#ff6b6b]">365+</p>
                  <p className="text-xs text-gray-300">Days Clean</p>
                </div>
              </div>
            </div>

            {/* Case Study 2: Marcus's Career Recovery */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#940909] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h4 className="text-xl font-bold text-white">
                  Marcus T. - Investment Banking, London
                </h4>
                <p className="text-gray-300 text-sm">
                  Age 42 • Managing Director
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-red-900/30 rounded-lg p-4">
                  <h5 className="font-bold text-red-300 mb-2">
                    BEFORE (The Spiral):
                  </h5>
                  <p className="text-gray-300 text-sm">
                    "Drinking 3 glasses wine daily, 4 coffees minimum. Anxiety
                    through the roof. Performance reviews declining.
                    Relationship falling apart."
                  </p>
                </div>
                <div className="bg-green-900/30 rounded-lg p-4">
                  <h5 className="font-bold text-green-300 mb-2">
                    AFTER (The Phoenix):
                  </h5>
                  <p className="text-gray-300 text-sm">
                    "Completely clean for 8 months. 22 pounds lighter. Just got
                    promoted. Relationship saved. Team asking what I'm on
                    because I'm crushing it."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#940909]/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#ff6b6b]">22</p>
                  <p className="text-xs text-gray-300">lbs Lost</p>
                </div>
                <div className="bg-[#940909]/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#ff6b6b]">240+</p>
                  <p className="text-xs text-gray-300">Days Clean</p>
                </div>
                <div className="bg-[#940909]/20 rounded-lg p-3">
                  <p className="text-lg font-bold text-[#ff6b6b]">PROMO</p>
                  <p className="text-xs text-gray-300">At Work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POLARIZING FINAL STATEMENT */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="bg-gradient-to-r from-[#940909]/30 to-[#940909]/20 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-[#940909]/40">
            <h3 className="text-3xl font-bold text-white mb-6">
              The Bottom Line: You Have Two Choices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-red-900/30 rounded-xl p-6">
                <h4 className="text-xl font-bold text-red-300 mb-4">
                  ❌ Stay Where You Are:
                </h4>
                <p className="text-gray-300">
                  Keep buying supplements that don't work. Keep training 5-7
                  days a week for minimal results. Keep depending on caffeine
                  and alcohol. Stay trapped in the 4% category forever.
                </p>
              </div>
              <div className="bg-green-900/30 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-300 mb-4">
                  ✅ Join The Elite 1%:
                </h4>
                <p className="text-gray-300">
                  Eliminate all dependencies. Build your Ultimate Male Form.
                  Access the Limitless Protocol and transform into the man you
                  know you're capable of becoming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <ApplyNowButton />
        </div>

        {/* Micro Testimonial */}
        <div className="mt-16 max-w-4xl mx-auto">
          <MicroTestimonial
            quote="Finally, someone who calls out the BS and actually delivers results. This program saved my life and career."
            name="David K."
            title="Private Equity"
            metric="31 lbs Lost"
            isDarkBackground={true}
          />
        </div>
      </div>
    </section>
  );
}
