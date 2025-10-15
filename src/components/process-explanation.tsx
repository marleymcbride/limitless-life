"use client";

export default function ProcessExplanation() {
  return (
    <section className="bg-black py-16 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            The Only System that Helps You Restore Your Energy, Transform Your Body & Get off Alcohol
          </h2>

          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            "The 4-Phase Energy Restoration System"
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-4">
                1. The Cellular Recharge
              </h3>
              <p className="text-gray-300 leading-relaxed">
                First, we reset your body's energy production at the cellular level. This eliminates the afternoon crashes and brain fog that make you reach for stimulants.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-4">
                2. The Hormonal Optimization
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Next, we restore your natural hormone balance. This rebuilds your masculinity, drive, and mental clarity without medications or supplements.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-4">
                3. The Lifestyle Integration
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Finally, we make this your new normal. The system becomes automatic, delivering sustained results without willpower or constant tracking.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-4">
                4. The Performance Amplification
              </h3>
              <p className="text-gray-300 leading-relaxed">
                With your energy restored, we amplify your performance in all areas of life. Your business, relationships, and health all level up together.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-red-600 text-white font-bold py-4 px-8 text-lg rounded-lg"
              onClick={() => {
                const element = document.getElementById("application");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              See If This Is Right For You
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}