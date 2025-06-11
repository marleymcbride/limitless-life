import Image from "next/image"
import { bgClasses, invertedGradientOverlay, strongRedAccent, vignetteEffect } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function PersonalStoryDiscoverySection() {
  return (
    <section className={`w-full py-20 ${bgClasses.blackRedGradient} relative`}>
      {invertedGradientOverlay}
      {strongRedAccent}
      {vignetteEffect}

      <div className="container mx-auto px-4 relative z-10">

        {/* Story Hook */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white/10 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            MY TRANSFORMATION STORY
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
            Fixing My Health Was The Most Frustrating Thing I Ever Did
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            I was exactly where you are now — burned out, dependent, and trapped in the 4% category
          </p>
        </div>

        {/* Personal Struggle */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-[#940909]/30 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-white">The Breaking Point</h3>
            <div className="space-y-4 text-white/90">
              <p>
                I was that guy who "had it all together" on paper. Successful business, good income, hitting the gym regularly.
                But underneath? I was falling apart.
              </p>
              <p>
                Every morning started with caffeine. Every evening ended with alcohol. I was carrying an extra 25 pounds of stress weight,
                my energy crashed every afternoon, and I couldn't sleep without a few drinks to "wind down."
              </p>
              <p className="font-bold text-[#ff6b6b]">
                Sound familiar? I was trapped in the 4% category — health-conscious but health-broken.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Before - The Struggle */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-red-500/30">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Before: The Caffeine-Alcohol Trap
              </h4>
              <ul className="space-y-2 text-white/90">
                <li>• 4-6 cups of coffee daily just to function</li>
                <li>• 3-5 drinks nightly to "unwind"</li>
                <li>• 25+ pounds overweight, bloated face</li>
                <li>• Energy crashes every afternoon</li>
                <li>• Restless sleep, waking up exhausted</li>
                <li>• Constantly stressed and irritable</li>
              </ul>
            </div>

            {/* After - The Breakthrough */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-green-500/30">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                After: The Limitless Transformation
              </h4>
              <ul className="space-y-2 text-white/90">
                <li>• <strong>1,000+ days</strong> completely alcohol-free</li>
                <li>• <strong>1+ year</strong> completely caffeine-free</li>
                <li>• Lost 25+ pounds, best physique ever</li>
                <li>• Natural energy all day, no crashes</li>
                <li>• Deep sleep, wake up before the alarm</li>
                <li>• Calm, focused, completely in control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Discovery Moment */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-[#940909]/50">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">The 80/20 Discovery That Changed Everything</h3>
            <div className="space-y-4 text-white/90">
              <p className="text-lg">
                After years of struggling, I discovered something the fitness industry doesn't want you to know:
              </p>
              <div className="bg-[#940909]/30 p-6 rounded-lg border border-[#940909]/50">
                <p className="text-xl font-bold text-white mb-4">
                  "80% of your energy problems come from just 20% of your habits"
                </p>
                <p className="text-white/90">
                  It's not about training harder, eating less, or taking more supplements. It's about finding your personal
                  <span className="font-bold text-[#ff6b6b]"> Natty Sweet Spot</span> — where your body naturally optimizes
                  energy, hormones, and performance without artificial crutches.
                </p>
              </div>
              <p className="text-lg">
                This discovery led me to develop what I call <strong>Drag Energy vs Glide Energy</strong> — the difference between
                fighting your biochemistry every day and working with it to feel naturally incredible.
              </p>
            </div>
          </div>
        </div>

        {/* Transformation Proof */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">The Numbers Don't Lie</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30">
              <div className="text-3xl font-bold text-[#940909] mb-2">1000+</div>
              <div className="text-white/90 text-sm">Days Alcohol-Free</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30">
              <div className="text-3xl font-bold text-[#940909] mb-2">365+</div>
              <div className="text-white/90 text-sm">Days Caffeine-Free</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30">
              <div className="text-3xl font-bold text-[#940909] mb-2">25+</div>
              <div className="text-white/90 text-sm">Pounds Lost</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-[#940909]/30">
              <div className="text-3xl font-bold text-[#940909] mb-2">11%</div>
              <div className="text-white/90 text-sm">Body Fat</div>
            </div>
          </div>
        </div>

        {/* The Big Idea */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-[#940909]/50">
            <h3 className="text-2xl font-bold text-white mb-6">From Drag Energy to Glide Energy</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-bold text-red-300 mb-3">DRAG ENERGY (Where You Are)</h4>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• Fighting upstream against your biochemistry</li>
                  <li>• Caffeine crashes and alcohol dependency</li>
                  <li>• Constant friction and struggle</li>
                  <li>• Energy peaks and valleys all day</li>
                  <li>• Relying on stimulants to function</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-300 mb-3">GLIDE ENERGY (Where You're Going)</h4>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• Smooth, natural energy flow</li>
                  <li>• Zero need for chemical assistance</li>
                  <li>• Feeling incredible all day long</li>
                  <li>• Sustained performance without crashes</li>
                  <li>• Your body working as it was designed</li>
                </ul>
              </div>
            </div>
            <p className="text-xl font-bold text-white mt-6">
              This transformation is what I help high-performing men achieve through The Limitless Protocol.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
