import ApplyNowButton from "./apply-now-button";
import { masculinePattern } from "@/lib/utils";
import { CheckCircle, Clock, Shield } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="w-full py-20 text-white bg-zinc-900 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-[#541212] to-zinc-900 opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#400909]/40 via-[#400909]/20 to-transparent"></div>
      {masculinePattern}

      <div className="container mx-auto px-4 relative z-10">
        {/* DECISION TIME */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            You&apos;re At A Crossroads, Scott
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-white/90 mb-8">
            You can keep doing what you&apos;re doing - managing your symptoms
            with caffeine and alcohol, spending £850+ monthly to feel like shit,
            slowly dying in the 4% trap...
          </p>
          <p className="text-xl max-w-4xl mx-auto text-white font-bold">
            Or you can join the Limitless 1% and become truly independent.
          </p>
        </div>

        {/* PRICING TIERS - 4 LEVELS */}
        <div className="max-w-7xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center text-white mb-12">
            Choose Your Level of Transformation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tier 1: Essential */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-4">Essential</h4>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">£1,997</p>
                <p className="text-white/70">One-time investment</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Complete Limitless Protocol
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">4 Core System Modules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Anti-Stack Implementation
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">90-Day Guarantee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Community Access</span>
                </li>
              </ul>
              <ApplyNowButton className="w-full" fullWidth={true} />
              <p className="text-center text-white/60 text-sm mt-2">
                For self-guided transformation
              </p>
            </div>

            {/* Tier 2: Accelerated */}
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border border-white/30">
              <h4 className="text-xl font-bold text-white mb-4">Accelerated</h4>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">£2,997</p>
                <p className="text-white/70">One-time investment</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Everything in Essential</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Weekly Group Coaching (12 weeks)
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Direct Telegram Support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Habit Tracking System</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Personalized Adjustments
                  </span>
                </li>
              </ul>
              <ApplyNowButton className="w-full" fullWidth={true} />
              <p className="text-center text-white/60 text-sm mt-2">
                Most popular choice
              </p>
            </div>

            {/* Tier 3: Premium */}
            <div className="bg-[#940909]/30 backdrop-blur-sm rounded-lg p-6 border border-[#940909]/50 transform scale-105">
              <div className="text-center mb-4">
                <span className="bg-[#940909] text-white px-3 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Premium</h4>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">£3,997</p>
                <p className="text-white/70">One-time investment</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Everything in Accelerated
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    2 x 1-on-1 Strategy Calls
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Custom Protocol Design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">VIP Telegram Channel</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Priority Support</span>
                </li>
              </ul>
              <ApplyNowButton
                className="w-full bg-[#940909] hover:bg-[#760707]"
                fullWidth={true}
              />
              <p className="text-center text-white/60 text-sm mt-2">
                Maximum results, minimum time
              </p>
            </div>

            {/* Tier 4: Elite */}
            <div className="bg-gradient-to-b from-[#940909]/20 to-[#940909]/40 backdrop-blur-sm rounded-lg p-6 border-2 border-[#940909]/70">
              <h4 className="text-xl font-bold text-white mb-4">Elite</h4>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">£4,997</p>
                <p className="text-white/70">One-time investment</p>
                <p className="text-yellow-400 text-sm font-semibold">
                  (5 spots max per month)
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Everything in Premium</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    4 x 1-on-1 Deep Dive Calls
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Direct WhatsApp Access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Blood Work Analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">Unlimited Support</span>
                </li>
              </ul>
              <ApplyNowButton
                className="w-full bg-gradient-to-r from-[#940909] to-[#760707]"
                fullWidth={true}
              />
              <p className="text-center text-white/60 text-sm mt-2">
                White-glove transformation
              </p>
            </div>
          </div>
        </div>

        {/* BUYER TYPE ADDRESSING */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center text-white mb-12">
            Still Not Sure? Here&apos;s How To Decide...
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* The Neanderthal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                If You Just Want Results...
              </h4>
              <p className="text-white/90 mb-4">
                You don&apos;t care about the theory. You just want to stop
                feeling like shit and start looking good. You want someone to
                tell you exactly what to do.
              </p>
              <p className="text-white font-bold">
                → Choose Essential or Accelerated
              </p>
            </div>

            {/* The Nerd */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                If You Want All The Details...
              </h4>
              <p className="text-white/90 mb-4">
                You need to understand exactly how and why everything works. You
                want the complete system, the science, the methodology, the
                customization.
              </p>
              <p className="text-white font-bold">→ Choose Premium or Elite</p>
            </div>

            {/* The Skeptic */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                If You&apos;re Still Skeptical...
              </h4>
              <p className="text-white/90 mb-4">
                You&apos;ve been burned before. You want proof this actually
                works before you fully commit. You need the guarantee and want
                to test the waters.
              </p>
              <p className="text-white font-bold">
                → Start with Essential + 90-day guarantee
              </p>
            </div>

            {/* The Emotional */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                If You&apos;re Ready For Change...
              </h4>
              <p className="text-white/90 mb-4">
                You&apos;re sick of feeling this way. You&apos;re ready to
                invest in yourself. You want support, community, and someone who
                believes in you.
              </p>
              <p className="text-white font-bold">
                → Choose Accelerated or Premium
              </p>
            </div>

            {/* The Analytical */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                If You Want Maximum ROI...
              </h4>
              <p className="text-white/90 mb-4">
                You calculate everything. You want the most efficient path to
                results with the highest probability of success and maximum
                support.
              </p>
              <p className="text-white font-bold">
                → Choose Premium (best value/result ratio)
              </p>
            </div>

            {/* The Time-Poor Executive */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                If Time Is Everything...
              </h4>
              <p className="text-white/90 mb-4">
                You&apos;re insanely busy. You need this handled for you. You
                want the fastest path to results with white-glove service and
                zero guesswork.
              </p>
              <p className="text-white font-bold">
                → Choose Elite (done-for-you transformation)
              </p>
            </div>
          </div>
        </div>

        {/* MASSIVE GUARANTEE */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-green-900/30 backdrop-blur-sm rounded-lg p-8 border border-green-500/30 text-center">
            <Shield className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-6">
              90-Day &ldquo;Get Your Life Back&rdquo; Guarantee
            </h3>
            <p className="text-lg text-white/90 mb-4">
              Follow the Limitless Protocol for 90 days. If you don&apos;t have
              more energy than you&apos;ve had in years, if you don&apos;t look
              better than you have in decades, if you&apos;re not completely off
              caffeine and alcohol...
            </p>
            <p className="text-xl font-bold text-white mb-4">
              I&apos;ll refund every penny. No questions asked.
            </p>
            <p className="text-white/80">
              You risk nothing. Your current life of caffeine dependency and
              alcohol reliance? That&apos;s the real risk.
            </p>
          </div>
        </div>

        {/* URGENCY AND SCARCITY */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-8 border border-red-500/30 text-center">
            <Clock className="h-16 w-16 text-red-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-6">
              This Offer Expires In 72 Hours
            </h3>
            <p className="text-lg text-white/90 mb-4">
              I only take on 20 new clients per month across all tiers. Elite is
              limited to 5 spots maximum.
            </p>
            <p className="text-lg text-white/90 mb-4">
              After 72 hours, the price increases by £500 across all tiers, and
              I close enrollment until next month.
            </p>
            <p className="text-xl font-bold text-white">
              Every day you wait is another day of caffeine crashes and alcohol
              dependency.
            </p>
          </div>
        </div>

        {/* FAQ FOR OBJECTION HANDLING */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center text-white mb-12">
            Final Questions Before You Transform Your Life
          </h3>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                &ldquo;What if I don&apos;t have time for another
                program?&rdquo;
              </h4>
              <p className="text-white/90">
                This isn&apos;t another time-consuming program. The 2-Day
                Training Protocol means you&apos;ll actually spend LESS time
                working out. The systems are designed for busy executives -
                maximum results, minimum time investment.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                &ldquo;Can I really quit caffeine without withdrawal?&rdquo;
              </h4>
              <p className="text-white/90">
                Yes. The Anti-Stack System eliminates withdrawal symptoms by
                replacing artificial stimulation with natural energy production.
                You&apos;ll have more energy without caffeine than you currently
                have with it.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                &ldquo;What about client dinners and social drinking?&rdquo;
              </h4>
              <p className="text-white/90">
                I&apos;ll show you exactly how to navigate social situations,
                client events, and business dinners without alcohol while
                actually increasing your presence and influence. You&apos;ll be
                more charismatic sober than you ever were drinking.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                &ldquo;Is this just willpower-based restriction?&rdquo;
              </h4>
              <p className="text-white/90">
                The opposite. This is about eliminating the need for willpower
                by fixing your biochemistry. When your energy systems work
                properly, you don&apos;t crave caffeine or alcohol because you
                don&apos;t need them.
              </p>
            </div>
          </div>
        </div>

        {/* FINAL DECISION SECTION */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
            It&apos;s Decision Time, Scott
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-300 mb-4">
                Path 1: Stay Where You Are
              </h3>
              <ul className="text-left text-red-200 space-y-3">
                <li>
                  • Wake up groggy every morning for the rest of your life
                </li>
                <li>• Stay dependent on caffeine and alcohol</li>
                <li>• Keep spending £850+ monthly to feel like shit</li>
                <li>• Watch your energy, testosterone, and health decline</li>
                <li>• Remain trapped in the 4% category forever</li>
                <li>• Look back in 10 years with regret</li>
              </ul>
            </div>

            <div className="bg-green-900/30 backdrop-blur-sm rounded-lg p-8 border border-green-500/30">
              <h3 className="text-xl font-bold text-green-300 mb-4">
                Path 2: Become Limitless
              </h3>
              <ul className="text-left text-green-200 space-y-3">
                <li>• Wake up naturally energized every day</li>
                <li>• Complete independence from all substances</li>
                <li>
                  • Save £10,000+ annually on caffeine, alcohol, supplements
                </li>
                <li>• Peak energy, testosterone, and vitality</li>
                <li>• Join the Limitless 1% elite</li>
                <li>
                  • Look back in 10 years as the best decision you ever made
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-2xl text-white mb-6">
              You already know which path you want to take.
            </p>
            <p className="text-xl text-white/90 mb-8">
              The question is: Are you going to take action, or are you going to
              let fear keep you trapped in the 4% category for another year?
            </p>
          </div>

          <div className="space-y-4">
            <ApplyNowButton className="text-xl px-12 py-4" />
            <p className="text-white/70">
              Click above to choose your transformation level
            </p>
            <p className="text-white/60 text-sm">
              90-day money-back guarantee • Secure checkout • Instant access
            </p>
          </div>

          <div className="mt-12 p-6 bg-[#940909]/20 backdrop-blur-sm rounded-lg border border-[#940909]/50">
            <p className="text-lg text-white/90 italic">
              &ldquo;The best time to start was 10 years ago. The second best
              time is right now.&rdquo;
            </p>
            <p className="text-white/70 mt-2">- Ancient Proverb</p>
          </div>
        </div>
      </div>
    </section>
  );
}
