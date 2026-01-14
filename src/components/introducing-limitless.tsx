"use client";

export default function IntroducingLimitless() {
  return (
    <section className="introducing-limitless-bg py-20 px-4 w-full relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-30">
        <div className="text-center">
          <div className="inline-block rounded-lg px-5 py-10 mb-4 relative" style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
            boxShadow: "20px -10px 40px 5px rgba(45, 52, 65, 0.7)",
            border: "1px solid rgba(0, 0, 0, 0.1)"
          }}>
            {/* Black overlay - adjust opacity to control darkness */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0)",
              borderRadius: "0.5rem",
              pointerEvents: "none"
            }}></div>
            <h2
              className="text-base sm:text-sm md:text-xl mt-6 font-semibold relative z-10 uppercase tracking-wide"
              style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#940909" }}
            >
              <span className="md:hidden">Introducing for the first time:</span>
              <span className="hidden md:inline">Introducing for the first time:</span>
            </h2>

            <h2
            className="text-3xl md:text-6xl font-bold text-black mx-10 my-6"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
              <span className="md:hidden uppercase">The Limitless Protocol</span>
              <span className="hidden md:inline">The Limitless Protocol<sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>™</sup></span>
          </h2>
          </div>


          <p className="text-xl text-white-300 mt-8 mb-13 max-w-5xl text-left leading-relaxed"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
          After 12 years and 14,352 hours, I created a system that wakes you up energized, builds a lean body in 2 days per week, and has you feeling completely relaxed without needing alcohol.
          </p>

          <p className="text-xl text-white-300 mb-13 max-w-5xl mt-6 mb-12 text-left leading-relaxed"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
          Here&apos;s why it works:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12 text-left">
                <div className="w-full bg-white/10 rounded-lg p-6 py-28 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    1. It fixes your body&apos;s natural energy production
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Instead of forcing stimulants, we restore your body&apos;s ability to generate its own sustained energy throughout the day.
                  </p>
                </div>

                <div className="w-full bg-white/10 rounded-lg p-6 py-28 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    2. You don&apos;t need to overhaul your entire life
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    This works alongside your career, family, and social commitments - no need to become a gym rat or count every calorie.
                  </p>
                </div>

                <div className="w-full bg-white/10 rounded-lg p-6 py-28 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    3. It&apos;s designed to maximise the time you do have
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    The system delivers incredible results with just 2-3 focused sessions per week, perfect for busy professionals.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-12 text-left">
                <div className="w-full bg-white/10 rounded-lg p-6 py-28 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    4. It&apos;s built for people who&apos;ve &apos;tried everything&apos;
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    If you&apos;ve failed with diets, supplements, or exercise programs before - that&apos;s actually a sign this will work for you.
                  </p>
                </div>

                <div className="w-full bg-white/10 rounded-lg p-6 py-28 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    5. It Works Because It&apos;s Designed for High-Performers
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Built around 70-hour work weeks and constant travel. Your training enhances work performance instead of draining it.
                  </p>
                </div>

                <div className="w-full bg-white/10 rounded-lg p-6 py-28 border border-white/20">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    6. It Works Because It&apos;s Natural, Not Chemical
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    No TRT. No supplements. No biohacks. Your body already knows how to work - it just needs the right conditions.
                  </p>
                </div>
              </div>

          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
