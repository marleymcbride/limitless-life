import ApplyNowButton from "./apply-now-button"

export default function SolutionSection() {
    return (
      <section className="w-full py-16 text-white relative overflow-hidden">
        {/* Black base */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Red gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(80, 0, 0, 0.4) 0%, rgba(60, 0, 0, 0.3) 25%, rgba(30, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.9) 75%, rgb(0, 0, 0) 100%)'
        }}></div>

        {/* Red accent at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#940909] via-[#940909]/20 to-transparent opacity-60"></div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
          mixBlendMode: 'multiply'
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">Introducing The Limitless Method</h2>
          <p className="mb-12 text-center text-xl">
            The Complete System for High-Performing Men to Reclaim Their Energy, Body, and Mind
          </p>

          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <h3 className="mb-4 text-2xl font-bold">What Makes This Different</h3>
              <p className="mb-4">
                Unlike generic fitness programs or one-size-fits-all health advice, The Limitless Method is specifically
                engineered for busy executives and entrepreneurs in their 30s, 40s, and 50s.
              </p>
              <p>
                We don't just focus on one aspect of your health. Our proprietary system targets all four critical systems
                that determine your energy, physical appearance, mental clarity, and overall performance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-black/40 border border-[#940909]/30 p-6">
                <h4 className="mb-3 text-xl font-bold">System 1: Metabolic Optimization</h4>
                <p>
                  Our advanced metabolic profiling identifies your unique energy pathways and optimizes them using
                  precision nutrition protocols and targeted supplementation strategies.
                </p>
              </div>

              <div className="rounded-lg bg-black/40 border border-[#940909]/30 p-6">
                <h4 className="mb-3 text-xl font-bold">System 2: Physiological Restoration</h4>
                <p>
                  We recalibrate your hormonal balance, sleep architecture, and recovery mechanisms using proprietary
                  biometric tracking and adjustment protocols.
                </p>
              </div>

              <div className="rounded-lg bg-black/40 border border-[#940909]/30 p-6">
                <h4 className="mb-3 text-xl font-bold">System 3: Cognitive Enhancement</h4>
                <p>
                  Our neurocognitive training system optimizes mental performance, focus, and stress resilience through
                  advanced mindfulness techniques and brain-training protocols.
                </p>
              </div>

              <div className="rounded-lg bg-black/40 border border-[#940909]/30 p-6">
                <h4 className="mb-3 text-xl font-bold">System 4: Behavioral Integration</h4>
                <p>
                  We implement sustainable habit engineering that fits your busy lifestyle, ensuring lasting results
                  without requiring hours of your time each day.
                </p>
              </div>
            </div>

            {/* Apply Now Button - Visible on mobile only */}
            <div className="block sm:hidden mt-12">
              <ApplyNowButton />
            </div>
          </div>
        </div>
      </section>
    )
  }
