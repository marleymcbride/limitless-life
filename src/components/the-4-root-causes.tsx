import { bgClasses } from "@/lib/utils";

export default function The4RootCauses() {
  return (
    <section className={`w-full ${bgClasses.white} pt-12 pb-12 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <div className="text-center mb-6 w-full">
              <h2
                className="font-bold mb-4 leading-tight text-gray-900"
                style={{ fontSize: "3rem", lineHeight: "1.2" }}
              >
                So What&apos;s Actually Wrong?
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
              The problem isn&apos;t your diet, your training schedule, or even your willpower.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              The problem is EVERYTHING you&apos;ve been doing has been designed to <span className="font-bold">take your energy</span>.. not give it.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You drink coffee to wake up.. but coffee shuts down your natural energy production.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You drink alcohol to unwind.. but alcohol ruins your sleep and wrecks your hormones.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You train 4-6 days per week.. but when you&apos;re already stressed, training more just makes it worse.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            And this is the problem with the typical methods because they don&apos;t address these problems.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
