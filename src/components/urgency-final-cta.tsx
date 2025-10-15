"use client";

export default function UrgencyFinalCTA() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            The Choice Is Yours
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            You can keep fighting your body, forcing yourself through each day with
            stimulants and willpower. Or you can work with your body's natural intelligence
            and experience the transformation you deserve.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-6">
              Three Months From Today...
            </h3>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-xl font-bold text-black mb-4">
                  If You Do Nothing:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Still relying on coffee to function</li>
                  <li>• Same afternoon energy crashes</li>
                  <li>• Same stress and sleep problems</li>
                  <li>• Same health concerns</li>
                  <li>• Another 90 days of feeling like crap</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-4">
                  If You Join The Limitless Protocol:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Wake up naturally energized</li>
                  <li>• Sustained energy all day</li>
                  <li>• Mental clarity and focus</li>
                  <li>• Better sleep and recovery</li>
                  <li>• Transformation in every area of life</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-6">
              Remember: I Only Accept 10 Clients Per Month
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Once these spots are filled, the application process closes. This ensures
              every client gets the personal attention and support they need to succeed.
            </p>
            <p className="text-lg text-gray-700">
              The question isn't whether this works. The question is whether you're
              ready to stop fighting your body and start working with it.
            </p>
          </div>

          <div className="text-center">
            <button
              className="bg-red-600 text-white font-bold py-6 px-12 text-xl rounded-lg"
              onClick={() => {
                const element = document.getElementById("application");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Apply To Transform Your Life Today
            </button>

            <p className="text-lg text-gray-600 mt-6">
              Your future self will thank you for the decision you make today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}