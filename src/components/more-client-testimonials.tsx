"use client";

export default function MoreClientTestimonials() {
  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            More Success Stories From High-Performers
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-gray-300 font-bold">JW</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client J - 45 years old</h3>
                  <p className="text-sm text-gray-400">CEO, 16 weeks</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "I was skeptical about another 'fitness program'. But this isn't fitness - it's a complete life overhaul. My energy is through the roof, and I closed my biggest deal ever."
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-gray-300 font-bold">RP</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client R - 38 years old</h3>
                  <p className="text-sm text-gray-400">Lawyer, 12 weeks</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The alcohol dependency was killing me. I haven't had a drink in 6 months and I don't even think about it. My clarity and focus have transformed my practice."
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-gray-300 font-bold">TM</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client T - 51 years old</h3>
                  <p className="text-sm text-gray-400">Surgeon, 20 weeks</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "As a surgeon, I need sustained energy for 12-hour procedures. This system gave me exactly that. I'm performing better than surgeons half my age."
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-gray-300 font-bold">KL</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client K - 43 years old</h3>
                  <p className="text-sm text-gray-400">Investor, 14 weeks</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "I thought I was too busy for this. But the efficiency is incredible. 2-3 sessions per week and my life has completely changed. Best investment I've ever made."
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-gray-300 font-bold">AS</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client A - 49 years old</h3>
                  <p className="text-sm text-gray-400">Executive, 18 weeks</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "My marriage was failing because I had no energy for anything. Now I'm like a new person. My wife can't believe the transformation. This saved my marriage."
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-gray-300 font-bold">MD</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Client M - 36 years old</h3>
                  <p className="text-sm text-gray-400">Founder, 10 weeks</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "I was addicted to coffee and energy drinks. Now I wake up naturally energized. My startup is thriving because I have the clarity and energy to lead effectively."
              </p>
            </div>
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
            Join These Success Stories
          </button>
        </div>
      </div>
    </section>
  );
}