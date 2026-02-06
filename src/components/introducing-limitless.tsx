"use client";

import Image from "next/image";

export default function IntroducingLimitless() {
  return (
    <section className="introducing-limitless-bg py-20 px-4 w-full relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-30">
        <div className="text-center">

          {/* DESKTOP VERSION */}
          <div className="hidden md:inline-block">
            <div className="inline-block rounded-lg px-24 py-14 mb-4 relative introducing-limitless-box" style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
              boxShadow: "20px -10px 40px 5px rgba(45, 52, 65, 0.7)",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
              <style jsx>{`
                @media (max-width: 768px) {
                  .introducing-limitless-box h2 {
                    font-size: 1.5rem !important;
                  }
                  .introducing-limitless-box p {
                    font-size: 1.1rem !important;
                  }
                  .introducing-limitless-transparent-card h3 {
                    font-size: 1.5rem !important;
                  }
                  .introducing-limitless-transparent-card p {
                    font-size: 0.875rem !important;
                  }
                }
              `}</style>
              {/* Black overlay - adjust opacity to control darkness */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0)",
                borderRadius: "0.5rem",
                pointerEvents: "none"
              }}></div>
              <h2
                className="text-base md:text-xl mt-6 font-semibold relative z-10 uppercase tracking-wide"
                style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#940909" }}
              >
                Introducing for the first time:
              </h2>

              <h2
              className="text-3xl md:text-6xl font-bold text-black mx-10 my-6"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
                The Limitless Protocol<sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>™</sup>
            </h2>
            </div>
          </div>

          {/* MOBILE VERSION */}
          <div className="md:hidden lg:hidden">
            <div
              className="introducing-heading-mobile font-normal pl-2 -mx-4 tracking-wide mb-8 relative z-10 text-lg"
              style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#FFFFFF" }}
            >
              INTRODUCING FOR THE FIRST TIME:
            </div>
            <div className="rounded-lg px-6 py-4 mb-4 relative introducing-limitless-box-mobile" style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
              boxShadow: "20px -10px 40px 5px rgba(45, 52, 65, 0.2)",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
              <style jsx>{`
                @media (max-width: 768px) {
                  .introducing-heading-mobile {
                    font-size: 0.75rem !important;
                  }
                  .introducing-limitless-box-mobile {
                    border-radius: 0.6rem !important;
                  }
                  .introducing-limitless-box-mobile h2 {
                    font-size: 3rem !important;
                  }
                  .introducing-limitless-box-mobile p {
                    font-size: 1.1rem !important;
                  }
                  .introducing-paragraph-mobile {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                  }
                  .introducing-limitless-transparent-card h3 {
                    font-size: 1.25rem !important;
                  }
                  .introducing-limitless-transparent-card p {
                    font-size: 0.875rem !important;
                  }
                }
              `}</style>
              {/* Black overlay - adjust opacity to control darkness */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0)",
                borderRadius: "2.25rem",
                pointerEvents: "none"
              }}></div>

              <h2
              className="font-bold text-black -mr-3 leading-tight relative z-10"
              style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "3rem" }}
            >
                The Limitless Protocol<sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>™</sup>
            </h2>
            </div>
          </div>


          <p className="introducing-paragraph-mobile text-white-300 mt-8 mb-13 w-full px-4 md:px-24 md:ml-2 lg:px-24 lg:ml-2 md:text-left lg:text-left text-center leading-relaxed"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif", fontSize: "1.375rem" }}
          >
          After 12 years and 14,352 hours, I&apos;ve found a system that wakes you up energized, loses your gut in 2 days per week, and lets you feel present and stress-free without needing alcohol.
          </p>

          <p className="introducing-paragraph-mobile md:text-left lg:text-left text-center text-white-300 mb-13 w-full px-4 md:px-24 md:ml-2 lg:px-24 lg:ml-2 mt-8 mb-12 leading-relaxed"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif", fontSize: "1.375rem" }}
          >
          Here&apos;s why it works:
          </p>

          <div className="flex flex-col items-stretch gap-4 mb-4 text-left md:grid md:grid-cols-3 md:mb-12">
                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 py-28 border border-white/20 mobile-box-width-transparent introducing-limitless-transparent-card">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    It Works Because It Fixes Your Natural Energy
                  </h3>

                  <div className="h-6"></div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    The reason you need coffee to wake up and alcohol to wind down isn&apos;t because you&apos;re broken.. it&apos;s because your body stopped producing its own energy. This fixes that.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 py-28 border border-white/20 mobile-box-width-transparent introducing-limitless-transparent-card">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    It Works Because You Don&apos;t Need Willpower
                  </h3>

                  <div className="h-6"></div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    Most programs fail because they expect you to grind forever. This builds habits that make good choices automatic so you don&apos;t have to think about it.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 py-28 border border-white/20 mobile-box-width-transparent introducing-limitless-transparent-card">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    It Works Because It Fixes The Root Issues in Your Body
                  </h3>

                  <div className="h-6"></div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    No TRT. No supplements. No biohacks. Your body already knows how to produce energy and build muscle. It just needs the right conditions to do it again.
                  </p>
                </div>
              </div>
              </div>

              <div className="flex flex-col items-stretch gap-4 mb-4 text-left md:grid md:grid-cols-3 md:mb-12">
                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 py-28 border border-white/20 mobile-box-width-transparent introducing-limitless-transparent-card">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    It Works Because It Doesn&apos;t Rely on &apos;Effort and sacrifice&apos;
                  </h3>

                  <div className="h-6"></div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    Every guy who comes to me has already tried the diets, the fasting, the cardio overload. None of that worked because it doesn&apos;t fix the actual problem.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 py-28 border border-white/20 mobile-box-width-transparent introducing-limitless-transparent-card">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    It Works Because With Your Energy.. Less Is More
                  </h3>

                  <div className="h-6"></div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    Your body grows muscle when you recover, not when you train. That&apos;s why two or three focused sessions will beat six garbage ones every single time.
                  </p>
                </div>

                <div className="w-full px-12 md:px-12 lg:px-12 bg-white/10 rounded-lg p-6 py-28 border border-white/20 mobile-box-width-transparent introducing-limitless-transparent-card">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Neuemontreal, sans-serif" }}
                  >
                    It Works Because It&apos;s Designed Around YOUR Life
                  </h3>

                  <div className="h-6"></div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    I built this for guys working 60-80 hours a week who travel constantly and have families. You don&apos;t need to live at the gym to lose your gut and get in the best shape of your life.
                  </p>
                </div>

        </div>
      </div>
      <div className="mx-auto text-center mt-0">
      <a
            href="/application"
            className="font-bold !text-white text-center transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 mt-12 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply Now
          </a>

      </div>
    </section>
  );
}
