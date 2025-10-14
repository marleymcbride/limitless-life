import ApplyNowButton from "./apply-now-button";
import { bgClasses, masculinePattern } from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function SolutionSection() {
  return (
    <section className="w-full py-20 text-white bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-[#541212] to-zinc-900 opacity-90"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#400909]/50 via-[#400909]/30 to-transparent"></div>
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        {/* ED LAWRENCE STYLE PROOF TRANSITION */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black mb-8 text-white">
            And The Best Part? You Don't Have To Take My Word For It...
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-300 font-medium">
            When other burned-out executives start using these exact systems,
            this is what happens:
          </p>
        </div>

        {/* MASSIVE TESTIMONIAL WALL - ED LAWRENCE STYLE */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Rob M. - Tech Executive */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-[#940909]/50 transition-none duration-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Rob M.</h3>
                  <p className="text-gray-300 text-sm">Tech Executive, NYC</p>
                </div>
              </div>
              <blockquote className="text-gray-200 mb-4 italic">
                "18lbs gone, hitting record revenue months at work, sex drive
                back to what it was in my 20s. This isn't just health coaching -
                it's life transformation."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  18lbs Lost
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Energy Restored
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Record Revenue
                </span>
              </div>
            </div>

            {/* Marcus T. - Investment Banking */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-[#940909]/50 transition-none duration-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Marcus T.</h3>
                  <p className="text-gray-300 text-sm">
                    Investment Banking, London
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-200 mb-4 italic">
                "Went from 4 coffees and 3 glasses of wine daily to completely
                clean. 22lbs off, promotion at work, relationship saved. Best
                investment I've ever made."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  22lbs Lost
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Promoted
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Relationship Saved
                </span>
              </div>
            </div>

            {/* James K. - Sales Director */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-[#940909]/50 transition-none duration-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">James K.</h3>
                  <p className="text-gray-300 text-sm">Sales Director, Dubai</p>
                </div>
              </div>
              <blockquote className="text-gray-200 mb-4 italic">
                "280 days caffeine-free, 6 months alcohol-free, down 27lbs. My
                team's asking what I'm on because my performance has
                skyrocketed."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  280 Days Clean
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  27lbs Lost
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Performance Up
                </span>
              </div>
            </div>

            {/* David L. - Finance Partner */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-[#940909]/50 transition-none duration-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">David L.</h3>
                  <p className="text-gray-300 text-sm">
                    Finance Partner, Singapore
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-200 mb-4 italic">
                "From pre-diabetic to perfect bloodwork in 90 days. 31lbs gone,
                confidence through the roof, wife says I'm like a different
                person."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  31lbs Lost
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Perfect Bloodwork
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Marriage Restored
                </span>
              </div>
            </div>

            {/* Alex P. - Private Equity */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-[#940909]/50 transition-none duration-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Alex P.</h3>
                  <p className="text-gray-300 text-sm">Private Equity, NYC</p>
                </div>
              </div>
              <blockquote className="text-gray-200 mb-4 italic">
                "Testosterone up 340 points naturally. 24lbs off, best shape of
                my life at 44. Closed 3 deals this quarter feeling superhuman."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  +340 Testosterone
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  24lbs Lost
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  3 Deals Closed
                </span>
              </div>
            </div>

            {/* Client L. - Already established */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-[#940909]/50 transition-none duration-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client L.</h3>
                  <p className="text-gray-300 text-sm">Investment Banking</p>
                </div>
              </div>
              <blockquote className="text-gray-200 mb-4 italic">
                "I was drinking heavily after work, looked rough, my high-stakes
                job was tanking, split with my girlfriend, hormones were shot.
                This literally saved my life."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  35lbs Lost
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  15 Months Sober
                </span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  Career Saved
                </span>
              </div>
            </div>
          </div>

          {/* AGGREGATE PROOF STATS */}
          <div className="bg-gradient-to-r from-[#940909]/20 to-[#940909]/30 backdrop-blur-sm rounded-xl p-8 border border-[#940909]/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              The Average Limitless Client Results:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-black text-[#ff6b6b]">26 lbs</p>
                <p className="text-gray-300 text-sm">Average Fat Loss</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#ff6b6b]">89%</p>
                <p className="text-gray-300 text-sm">Stay Alcohol-Free</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#ff6b6b]">94%</p>
                <p className="text-gray-300 text-sm">Quit Caffeine</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#ff6b6b]">276</p>
                <p className="text-gray-300 text-sm">Avg Testosterone Gain</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRAM INTRODUCTION - AFTER EMOTIONAL INVESTMENT */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
            The Limitless Protocol
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-300 font-medium">
            Not Another Workout Plan or Diet — A Complete Reset of Your Energy
            Systems
          </p>
        </div>

        {/* NATTY SWEET SPOT EXPLANATION */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              Your Ultimate Male Form: The Natty Sweet Spot
            </h3>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-4xl mx-auto">
              This isn't another workout plan or diet. The Limitless Protocol is
              a complete reset of your entire being. It transforms your{" "}
              <span className="font-bold text-white">Body</span>, optimizes your{" "}
              <span className="font-bold text-white">Hormones</span>, restores
              your <span className="font-bold text-white">Health</span>, creates{" "}
              <span className="font-bold text-white">Peace</span>, unleashes
              natural <span className="font-bold text-white">Energy</span>,
              strengthens{" "}
              <span className="font-bold text-white">Mental Health</span>, and
              ensures lasting{" "}
              <span className="font-bold text-white">Happiness</span> — all in
              just 90 days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#940909]/20 rounded-xl p-6 border border-[#940909]/30">
                <h4 className="text-xl font-bold text-white mb-3">
                  💪 Elite Physique
                </h4>
                <p className="text-gray-300">
                  11-14% body fat with lean muscle mass. You look incredible
                  naked and command respect in every room.
                </p>
              </div>
              <div className="bg-[#940909]/20 rounded-xl p-6 border border-[#940909]/30">
                <h4 className="text-xl font-bold text-white mb-3">
                  ⚡ Limitless Energy
                </h4>
                <p className="text-gray-300">
                  Steady power from 6 AM to 10 PM without caffeine, crashes, or
                  artificial stimulants. Pure Glide Energy.
                </p>
              </div>
              <div className="bg-[#940909]/20 rounded-xl p-6 border border-[#940909]/30">
                <h4 className="text-xl font-bold text-white mb-3">
                  🧠 Laser Focus
                </h4>
                <p className="text-gray-300">
                  Crystal clear thinking, sharp decision-making, and the mental
                  clarity that separates elite performers.
                </p>
              </div>
              <div className="bg-[#940909]/20 rounded-xl p-6 border border-[#940909]/30">
                <h4 className="text-xl font-bold text-white mb-3">
                  🛡️ Bulletproof Confidence
                </h4>
                <p className="text-gray-300">
                  Unshakeable self-assurance that comes from feeling incredible
                  in your own skin every single day.
                </p>
              </div>
              <div className="bg-[#940909]/20 rounded-xl p-6 border border-[#940909]/30">
                <h4 className="text-xl font-bold text-white mb-3">
                  💎 Anti-Fragile Resilience
                </h4>
                <p className="text-gray-300">
                  You don't just handle stress — you thrive under pressure and
                  come back stronger from every challenge.
                </p>
              </div>
              <div className="bg-[#940909]/20 rounded-xl p-6 border border-[#940909]/30">
                <h4 className="text-xl font-bold text-white mb-3">
                  🏆 Peak Longevity
                </h4>
                <p className="text-gray-300">
                  Optimized hormones, perfect bloodwork, and the vitality to
                  dominate for decades to come.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE VS AFTER LIFE TRANSFORMATION */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Your Life: Before vs After The Limitless Protocol
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm rounded-xl p-8 border border-red-500/30">
              <h4 className="text-2xl font-bold text-red-300 mb-6 text-center">
                ❌ Your Current Reality
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Wake up feeling like death, need coffee immediately
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Energy crashes every 2-3 hours, constant fatigue
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Need alcohol to wind down, poor sleep quality
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Carrying 15-30 extra pounds, soft physique
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Low testosterone, zero libido, relationship strain
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Anxiety, mood swings, irritability
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Taking 12+ supplements that don't work
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
              <h4 className="text-2xl font-bold text-green-300 mb-6 text-center">
                ✅ Your Limitless Life
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Wake up refreshed, energized, ready to dominate
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Steady energy from 6 AM to 10 PM naturally
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Natural relaxation, deep restorative sleep
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Lean, strong, confident physique at 11-14% body fat
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Optimal testosterone, incredible sex drive
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Calm, focused, genuinely happy every day
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300">
                    Perfect bloodwork without pills or supplements
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join the Elite 1% Who Actually Feel Incredible?
            </h3>
            <p className="text-xl text-gray-300">
              Stop settling for the 4% health-conscious trap. Access the
              complete Limitless Protocol and transform into your Ultimate Male
              Form.
            </p>
          </div>
          <ApplyNowButton />
        </div>
      </div>
    </section>
  );
}
