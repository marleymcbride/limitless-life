import { bgClasses } from "@/lib/utils";

export default function The4RootCauses() {
  return (
    <section className={`w-full ${bgClasses.white} pt-12 pb-10 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>

          <div className="text-center mb-6 w-full">
            <h2 className="mb-4 text-gray-900 h2-alternate">
              Why Traditional Methods Don&apos;t Work:
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

          <p className="text-gray-800 leading-relaxed mb-6">
              Most people think they &apos;aren&apos;t discplined enough&apos; or need to punish themselves.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              But the problem isn&apos;t your diet, training, or even &apos;willpower&apos;.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              The problem is EVERYTHING you&apos;ve done has been <span className="font-bold">taking your energy</span>.. not giving it.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You drink coffee to wake up.. but coffee shuts down your natural energy production.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You train 4-6 days per week.. but your body can't recover.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              You drink alcohol to unwind.. but alcohol wrecks your hormones and destroys your sleep.
            </p>

            <p className="text-gray-800 leading-relaxed">
            So typical methods like keto & fasting will always fail because they can&apos;t fix a broken body.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
