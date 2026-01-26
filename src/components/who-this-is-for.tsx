export default function WeCanHelpIf() {
  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-full relative z-30">

        <div className="text-center mb-12">
        </div>

        <div className="grid md:grid-cols-2 gap-24 mb-12">

          {/* We Can Help If */}
          <div className="bg-white/5 border border-green-500/30 rounded-lg p-8">
            <h3 className="text-4xl font-bold text-white pl-6 mb-8" style={{ fontFamily: "Neuemontreal, sans-serif" }}>
              We Can Help If:
            </h3>
            
            <ul className="space-y-6 text-lg">
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You&apos;re tired of having the money but not the energy</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You&apos;re willing to train LESS and recover MORE</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You want a system that works with your busy life, not against it</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You&apos;re ready to stop suffering for results</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span>You want to wake up and actually feel good</span>
              </li>
            </ul>
          </div>

          {/* We Can't Help If */}
          <div className="bg-white/5 border border-red-500/30 rounded-lg p-8">
            <h3 className="text-4xl font-bold text-white pl-5 mb-8" style={{ fontFamily: "Neuemontreal, sans-serif" }}>
              We Can&apos;t Help If:
            </h3>
            <ul className="space-y-6 text-lg">
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You give up easily and can&apos;t stick to anything for longer than 2 weeks</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You need someone to hold your hand every day</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You&apos;re not willing to change the way you&apos;ve done things for years</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-red-400 mr-3 mt-1">✗</span>
                <span>You&apos;re looking for a magic pill</span>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 pb-2">
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
