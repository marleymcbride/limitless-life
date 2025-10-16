"use client";

export default function IntroducingLimitless() {
  return (
    <section className="bg-black py-20 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-red-600 mb-4">
            Welcome to
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-0">
          Your Limitless Life
          </h2>

          <h3 className="text-3xl md:text-4xl font-bold mb-0">
            The 
          </h3>

          <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            What if you could wake up before your alarm feeling energized? Go through your day with sustained
            focus and clarity? Be present with your family instead of mentally checked out? Feel proud of your body
            instead of ashamed of it? This isn&apos;t a fantasy - this is what happens when you stop fighting your body
            and start working with its natural intelligence.
          </p>

          <div className="bg-gray-900 bg-opacity-50 rounded-lg p-12 mb-16">
            <h3 className="text-2xl font-bold text-white mb-8">
              Why This System Works When Nothing Else Has
            </h3>

            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">
                  It&apos;s The ONLY System That Addresses Your Reality
                </h4>
                <p className="text-gray-300 leading-relaxed mb-6">
                  You&apos;re not a 25-year-old athlete. You&apos;re a high-performer with real responsibilities, real stress,
                  and a body that&apos;s been fighting back for years. We don&apos;t use cookie-cutter solutions - we solve the
                  specific problems that successful men like you face every single day.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">
                  It Works WITH Your Body, Not Against It
                </h4>
                <p className="text-gray-300 leading-relaxed mb-6">
                  No more forcing yourself through punishing workouts or restrictive diets. We restore your body&apos;s
                  natural intelligence so the results become automatic and sustainable. No willpower required.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">
                  It&apos;s Designed For Your Life, Not The Other Way Around
                </h4>
                <p className="text-gray-300 leading-relaxed mb-6">
                  2-3 focused sessions per week. Works with your travel schedule. Fits into your busy lifestyle.
                  This system adapts to you, not the other way around.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">
                  It Delivers Real Results That Last
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Natural energy restoration, permanent habit change, hormone optimization, and complete life
                  transformation. Not temporary fixes that leave you back where you started.
                </p>
              </div>
            </div>
          </div>

          <button
            className="bg-red-600 text-white font-bold py-4 px-8 text-lg rounded-lg"
            onClick={() => {
              const element = document.getElementById("application");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Apply To The Limitless Protocol
          </button>
        </div>
      </div>
    </section>
  );
}