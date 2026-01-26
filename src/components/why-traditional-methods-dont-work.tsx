import { bgClasses } from "@/lib/utils";

export default function The4RootCauses() {
  return (
    <section className={`w-full ${bgClasses.white} pt-12 pb-12 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="text-center mb-6 w-full">
            <h2 className="mt-4 mb-12 text-gray-900 h2-alternate">
              <strong>Why Traditional Methods Don&apos;t Work</strong>
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <p className="text-gray-800 leading-relaxed mb-6">
              The problem isn&apos;t your diet, training, or even &apos;willpower&apos;.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              The problem is EVERYTHING you&apos;ve been doing has been designed to <span className="font-bold">TAKE your energy</span>.. not give it.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You drink coffee to wake up.. but coffee shuts down your natural energy production.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You train 4-6 days per week.. but your body can&apos;t recover.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You drink alcohol to unwind.. but alcohol wrecks your hormones and destroys your sleep.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            So typical methods like keto & fasting will always fail because they they don&apos;t address the root issues of a broken body.
            </p>

            {/* CTA Button - matching personal story style */}
            <div className="text-center mt-12">
              <a
                href="/application"
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 mb-6 text-lg rounded-md inline-block relative z-30"
              >
                Apply now
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
