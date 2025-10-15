"use client";

export default function SystemBenefitsProof() {
  return (
    <section className="bg-black py-16 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Why This System Will Work For You Even If You Don't Have Time And Nothing's Worked Before
          </h2>

          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            "It works because..."
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                It fixes your body's natural energy production
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Instead of forcing stimulants, we restore your body's ability to generate its own sustained energy throughout the day.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                It's designed to maximise the time you do have
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The system delivers incredible results with just 2-3 focused sessions per week, perfect for busy professionals.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                You aren't expected to use 'willpower', because we fix your body at the root
              </h3>
              <p className="text-gray-300 leading-relaxed">
                By addressing the fundamental signaling issues, the results become automatic and permanent without constant struggle.
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