"use client";

export default function FourStepSystem() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            The 4-Step System That Transforms High-Performers
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Simple, proven steps that work with your body's natural intelligence
            to restore your energy and transform your life.
          </p>

          <div className="space-y-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-black">
                  Cellular Recharge
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Reset your mitochondria and restore natural energy production.
                Say goodbye to afternoon crashes and brain fog.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-black">
                  Hormonal Optimization
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Naturally boost testosterone, reduce cortisol, and balance
                your hormones for peak performance and vitality.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-black">
                  Metabolic Reset
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Reprogram your metabolism to burn fat efficiently, build lean
                muscle, and maintain optimal body composition.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-2xl font-bold text-black">
                  Lifestyle Integration
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Make the changes permanent by integrating them into your
                busy lifestyle. No willpower required.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-6">
              Each Step Builds On The Previous One
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              This isn't a random collection of tips. It's a systematic approach
              where each step creates the foundation for the next. By Step 4,
              the transformation is automatic and permanent.
            </p>
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
            Start Your Transformation Today
          </button>
        </div>
      </div>
    </section>
  );
}