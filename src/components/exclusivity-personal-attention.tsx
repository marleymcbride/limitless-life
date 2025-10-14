"use client";

export default function ExclusivityPersonalAttention() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            This Isn't For Everyone. And That's Intentional.
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            I work personally with every client. This means I can only accept
            a limited number of high-performers who are ready to transform.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-6">
              Why I Limit The Program
            </h3>

            <div className="space-y-6 text-left">
              <div>
                <h4 className="text-xl font-bold text-black mb-3">
                  Personal Attention
                </h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every client gets weekly 1-on-1 calls with me. I review your progress,
                  adjust your protocols, and ensure you're getting results. This can't be scaled.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-3">
                  Quality Control
                </h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I only work with committed high-performers who will follow the system
                  and get results. This protects the integrity of the program and ensures
                  everyone succeeds.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-black mb-3">
                  Exclusive Community
                </h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  You'll join an elite group of successful men who are all committed
                  to optimizing their performance. The networking and support alone
                  is worth the investment.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-6">
              I Only Accept 10 New Clients Per Month
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Once spots are filled, the application process closes until the following month.
              This ensures every client gets the attention and support they deserve.
            </p>
          </div>

          <div className="text-left mb-12">
            <h3 className="text-xl font-bold text-black mb-4">
              This Is For You If:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• You're a high-performer who's tired of feeling like crap</li>
              <li>• You're ready to commit to a proven system</li>
              <li>• You understand that transformation requires investment</li>
              <li>• You want personal coaching and accountability</li>
              <li>• You're ready to stop fighting your body</li>
            </ul>
          </div>

          <div className="text-left mb-12">
            <h3 className="text-xl font-bold text-black mb-4">
              This Is NOT For You If:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• You're looking for a quick fix or magic pill</li>
              <li>• You're not willing to invest in yourself</li>
              <li>• You want to continue making excuses</li>
              <li>• You're not ready to commit to real change</li>
              <li>• You're looking for a cheap, one-size-fits-all program</li>
            </ul>
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
            Apply For One Of The 10 Spots
          </button>
        </div>
      </div>
    </section>
  );
}