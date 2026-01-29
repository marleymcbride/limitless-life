export default function WeCanHelpIf() {
  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-full relative z-30">

        <div className="text-center mb-12">
        </div>

        <div className="flex flex-col items-stretch md:grid md:grid-cols-2 gap-10 mb-12">

          {/* We Can Help If */}
          <div className="bg-white/5 px-12 md:px-12 lg:px-12 border border-green-500/30 rounded-lg p-8 mobile-box-width-transparent we-can-help-box">
            <h3 className="text-4xl font-bold text-white pl-6 mb-8" style={{ fontFamily: "Neuemontreal, sans-serif" }}>
              We Can Help If:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You're a high-performer who's burned out and relying on caffeine and alcohol to get through the day</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You want a system, not quick fixes or another diet to try for 3 weeks</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You're committed to the process: follow the protocols, track results, adjust</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You're willing to train LESS and recover MORE</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You're ready to actually fix what's broken</span>
              </li>
            </ul>
          </div>

          {/* We Can't Help If */}
          <div className="bg-white/5 px-12 md:px-12 lg:px-12 border border-red-500/30 rounded-lg p-8 mobile-box-width-transparent we-can-help-box">
            <h3 className="text-4xl font-bold text-white pl-5 mb-8" style={{ fontFamily: "Neuemontreal, sans-serif" }}>
              We Can't Help If:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You're looking for a magic pill or quick fix</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You're not ready to commit 90 days to this</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You can't afford the investment</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You don't want to be challenged</span>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply Now
          </a>
          </div>
          </div>
        </section>
      </div>
    </>
  );
}
