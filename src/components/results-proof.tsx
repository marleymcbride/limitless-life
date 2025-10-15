"use client";

export default function ResultsProof() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            What Your Life Could Look Like
          </h2>

          <div className="mb-12">
            <div className="text-3xl md:text-4xl font-black font-medium text-gray-900 mb-4">
              Real results from men who were exactly where you are right now:
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">JS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client J - 47 years old</h3>
                    <p className="text-sm text-gray-600">16 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I've lost 31 pounds and haven't touched alcohol in 8 months. My business has never been better because I have the energy to actually focus."
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">MS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client M - 52 years old</h3>
                    <p className="text-sm text-gray-600">12 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Down 28 lbs and my doctor is amazed at my bloodwork. I feel like I'm 35 again, not 52."
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">DR</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client D - 39 years old</h3>
                    <p className="text-sm text-gray-600">20 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I was skeptical but this actually works. 22 lbs lost and my energy levels are through the roof. No more afternoon crashes."
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">TK</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client T - 44 years old</h3>
                    <p className="text-sm text-gray-600">14 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "My wife says I'm like a different person. I've lost 24 lbs and actually want to be intimate again. This system changed my marriage."
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">AR</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client A - 58 years old</h3>
                    <p className="text-sm text-gray-600">24 weeks</p>
                  </div>
                </div>
                <p className="gray-700 mb-4">
                  "I thought I was too old to change. Lost 18 lbs and my doctor took me off all medications. I feel better than I have in 20 years."
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">KL</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client K - 36 years old</h3>
                    <p className="text-sm text-gray-600">10 weeks</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I was a coffee addict. Now I wake up naturally energized. 19 lbs gone and I'm performing better at work than ever before."
                </p>
              </div>
            </div>
          </div>
          <button
            className="bg-red-600 text-white font-bold py-4 px-8 text-lg rounded-lg mt-16"
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
    </section>
  );
}