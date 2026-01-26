"use client";

export default function WhyThisSystemWorks() {
  return (
    <section className="dark-card-bg-small w-full py-20 px-6 relative">      <div className="container mx-auto max-w-5xl hero-full-width">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              Why This System Will Work For You
            </h2>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-8"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              (even if nothing&apos;s worked before)
            </h2>

            <p className="text-3xl text-gray-300 mb-12 mt-12">
              It works because...
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
              <div>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  1. It fixes your body&apos;s natural energy production
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Instead of forcing stimulants, we restore your body&apos;s ability to generate its own sustained energy throughout the day.
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  2. It&apos;s designed to maximise the time you do have
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The system delivers incredible results with just 2-3 focused sessions per week, perfect for busy professionals.
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  3. You aren&apos;t expected to use &apos;willpower&apos;, because we fix your body at the root
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  By addressing the fundamental signaling issues, the results become automatic and permanent without constant struggle.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
              <div>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  4. You don&apos;t need to overhaul your entire life
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  This works alongside your career, family, and social commitments - no need to become a gym rat or count every calorie.
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  5. It&apos;s built for people who&apos;ve &apos;tried everything&apos;
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  If you&apos;ve failed with diets, supplements, or exercise programs before - that&apos;s actually a sign this will work for you.
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  6. You&apos;ll feel the difference in 7 days, not months
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Unlike traditional approaches that take months to show results, you&apos;ll notice improved energy and focus within the first week.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/application"
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
              >
                See If This Is Right For You
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
