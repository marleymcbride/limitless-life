export default function BetaValueStack() {
  const items = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Morning Fuel System",
      description: "The exact morning system to wake up with real energy. No coffee needed. Just clean energy from the moment you open your eyes."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Rest-Focused Training Protocol",
      description: "A training method that lets you get better results in only 2-3 days per week. We prioritize resting and recovering, so you can make more progress, and actually spend time with the people that matter."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c1.5-4 2.5-4 4 0s2.5 4 4 0 2.5-4 4 0 2.5 4 4 0" />
        </svg>
      ),
      title: "Limitless Flow System",
      description: "Become your ultimate peaceful stress-free self who doesn't need vices like alcohol and caffeine. Without willpower, withdrawal or white-knuckling anything. This is the same protocol I've used to reach over 3.5 years alcohol-free and caffeine free for 18 months."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      title: "Metabolic Priming System",
      description: "A new approach to 'dieting' that lets you eat more food. This means you build more muscle, lose more fat and feel great.. without cutting out food groups or eating starvation diets."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Personal Coaching & Weekly Calls",
      description: "You will get direct access to me for 90 days. Health and performance check-in analysis each week, not just left guessing so we're always moving to your dream body and health."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Private Community Access",
      description: "The beta access is for certain calibre of man. You will get access to the private Limitless Community where you can be held accountable, share wins and make friends for life."
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain" style={{
        background: 'linear-gradient(135deg, rgba(56, 56, 56, 1) 0%, rgba(31, 31, 31, 1) 40%, rgba(31, 30, 30, 0.995) 45%, rgba(31, 28, 28, 0.99) 50%, rgba(30, 26, 26, 0.985) 55%, rgba(30, 23, 23, 0.98) 60%, rgba(30, 20, 20, 0.975) 65%, rgba(32, 17, 17, 0.97) 70%, rgba(35, 15, 15, 0.965) 75%, rgba(38, 13, 13, 0.96) 80%, rgba(42, 11, 11, 0.955) 85%, rgba(46, 9, 9, 0.95) 90%, rgba(50, 8, 8, 0.945) 95%, rgba(55, 7, 7, 0.94) 100%)'
      }}>
        <section className="py-16 px-24 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl md:mx-24 lg:mx-24 lg:text-5xl font-bold text-white mb-18"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            What You Get With The Beta Programme
          </h2>
        </div>

        {/* Grid layout - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg relative min-h-[380px] flex flex-col"
            >
              {/* Icon */}
              <div className="text-gray-800 mb-4">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>
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
    </>
  );
}
