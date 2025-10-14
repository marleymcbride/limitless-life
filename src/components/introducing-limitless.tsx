"use client";

export default function IntroducingLimitless() {
  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Introducing The Limitless Energy Protocol
          </h2>

          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            The complete system for restoring your natural energy, transforming your body,
            and getting off alcohol without willpower or struggle.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-4">
                What You Get Inside The Limitless Energy Protocol:
              </h3>

              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>The complete 3-Phase Energy Restoration System</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Customized nutrition protocols for your body type</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>2-3x per week training sessions (no cardio required)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Sleep optimization protocols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Stress management techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Hormone optimization strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Private community of high-performers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Weekly coaching calls with Marley</span>
                </li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-4">
                What Makes This Different:
              </h3>

              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>No supplements required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>No medications or TRT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Works with your busy schedule</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Permanent results, not temporary fixes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Based on real client results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Sustainable long-term approach</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Personalized to your lifestyle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Guaranteed results or your money back</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              This Is For You If You're Ready To:
            </h3>
            <p className="text-lg text-gray-300">
              Stop fighting your body and start working with it. Wake up naturally energized.
              Perform at your peak in business and life. Feel amazing in your body again.
            </p>
          </div>

          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-lg rounded-lg transition-none duration-0"
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