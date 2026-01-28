export default function WhatYoullAchieve() {
  const items = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Get Off Alcohol For Good",
      description: "You stop drinking completely without needing willpower or AA meetings. We fix why you actually drink - the stress, the anxiety, needing to shut your brain off after work - so the booze becomes easy to walk away from."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      title: "Lose Your Gut & Get Lean",
      description: "Your body will start burning fat, building new muscle and feel genuinely ache-free again - even if you've made no progress for months or years."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Wake Up Energized Every Day",
      description: "You wake up ready to attack the day instead of dragging yourself out of bed and needing multiple coffees before you can think straight. No morning brain fog, no needing caffeine just to function, just smooth energy all day that actually lasts."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Skyrocket Your Testosterone",
      description: "Your body produces testosterone again. You'll notice more energy and ambition, higher sex drive, better erections, more muscle and stubborn body fat dissapearing."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
        </svg>
      ),
      title: "Save Your Marriage",
      description: "She notices the changes and she's attracted to you again. The dead bedroom wakes up and you actually reconnect like you did when you first met instead of just co-existing in the same house and taking each other for granted."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Be Present For Your Kids",
      description: "You have the energy to play catch, go to the park, build forts instead of being too tired and always collapsing on the couch. They'll remember you as the dad who was actually fun and present, not the guy who was always exhausted."
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain" style={{
        background: 'linear-gradient(135deg, rgba(56, 56, 56, 1) 0%, rgba(31, 31, 31, 1) 40%, rgba(31, 30, 30, 0.995) 45%, rgba(31, 28, 28, 0.99) 50%, rgba(30, 26, 26, 0.985) 55%, rgba(30, 23, 23, 0.98) 60%, rgba(30, 20, 20, 0.975) 65%, rgba(32, 17, 17, 0.97) 70%, rgba(35, 15, 15, 0.965) 75%, rgba(38, 13, 13, 0.96) 80%, rgba(42, 11, 11, 0.955) 85%, rgba(46, 9, 9, 0.95) 90%, rgba(50, 8, 8, 0.945) 95%, rgba(55, 7, 7, 0.94) 100%)'
      }}>
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-6xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl md:mx-24 lg:mx-24 lg:text-5xl font-bold text-white mb-18"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            What You&apos;ll Achieve With The Limitless Protocol<sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>™</sup>
          </h2>
        </div>

        {/* Grid layout - 3 columns on desktop, 1 on mobile */}
        <div className="flex flex-col items-stretch gap-10 mb-12 md:grid md:grid-cols-2 lg:grid-cols-3">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg relative min-h-[380px] flex flex-col mobile-box-width whatyoull-achieve-card"
            >
              {/* Icon */}
              <div className="text-gray-800 mb-4">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  {item.title}
                </h3>
                <div className="text-gray-700 text-base leading-relaxed mt-4 achieve-description">
                  {item.description}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
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
      <style jsx>{`
        @media (max-width: 768px) {
          .whatyoull-achieve-card h3 {
            font-size: 1.75rem !important;
          }
          .whatyoull-achieve-card div.achieve-description {
            font-size: 1.22rem !important;
          }
        }
      `}</style>
    </>
  );
}
