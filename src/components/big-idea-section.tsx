"use client";

export default function BigIdeaSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            The Big Idea: Stop Fighting Your Body
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Most high-performers are fighting their bodies every single day.
            Forcing stimulants, pushing through fatigue, using willpower to override natural signals.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-6">
              What if you could work WITH your body instead of against it?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Your body has incredible intelligence. It knows how to generate sustained energy,
              how to burn fat efficiently, how to build muscle, how to heal itself.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The problem isn't your body. The problem is that you've been taught to fight it
              instead of listen to it.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="text-left">
              <h3 className="text-xl font-bold text-black mb-3">
                Drag Energy vs Glide Energy
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Drag Energy:</strong> Forcing yourself through each day with coffee,
                stress hormones, and willpower. It's exhausting and unsustainable.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-black mb-3">
                The Energy Restoration Method
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Glide Energy:</strong> Natural, sustained power that flows effortlessly
                throughout your day. This is your birthright.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-black mb-3">
                Simple But Not Easy
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The system is simple because it works with your body's natural intelligence.
                But it requires you to stop fighting and start listening.
              </p>
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
            See If This Is Right For You
          </button>
        </div>
      </div>
    </section>
  );
}