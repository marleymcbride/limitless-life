export default function BonusStack() {
  const bonuses = [
    {
      title: "Bonus 1: Wake Up With More Energy Than You Had At 25 (Value: £1,200+)",
      description: "The exact morning system that has high-performers waking up fired up before they even leave the house. No caffeine. No supplements. Just smooth energy that lasts all day.",
      transition: "You'll get:",
      bullets: [
        "4 extra hours of high-performance time every day",
        "Smooth energy that lasts from morning to night",
        "Wake up ready to attack the day (no brain fog)"
      ]
    },
    {
      title: "Bonus 2: Get Off Alcohol Without Willpower (Value: £3,000+)",
      description: "The exact system I used to quit drinking for 3+ years. No counting days. No AA meetings. No white-knuckling it.",
      transition: "You'll learn to:",
      bullets: [
        "Fix why you actually drink (so the desire disappears)",
        "Stop drinking without willpower or counting days",
        "Never feel like you're 'missing out' when you don't drink"
      ]
    },
    {
      title: "Bonus 3: Train 2-3 Days Per Week And Build More Muscle Than The 6-Day Guys (Value: £1,500+)",
      description: "Most guys train 4-6 days and spin their wheels. You'll get more done in 2 days because your body actually recovers and grows.",
      transition: "You'll build:",
      bullets: [
        "More muscle in 2 days than most guys get in 6",
        "A physique that signals you're capable and disciplined",
        "Fill out a suit like you belong in the room"
      ]
    },
    {
      title: "Bonus 4: Eat MORE Food And Burn More Fat (Value: £2,000+)",
      description: "The simple diet process that lets you eat more when you need it while your body burns fat instead of storing it.",
      transition: "You'll learn to:",
      bullets: [
        "Fix your metabolism so it actually works again",
        "Eat more food while your body burns fat",
        "Finally lose the gut that won't budge"
      ]
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-20 max-w-100 relative overflow-hidden">
          <div className="container w-full relative z-30">

            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl mx-24 lg:text-5xl font-bold text-white mb-0"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                Your Bonus Stack
              </h2>
              <h2
                className="text-3xl md:text-4xl mx-24 lg:text-5xl font-bold text-white"
                style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
              >
                (Worth £8,500+):
              </h2>
            </div>
            <div className="mb-16 mx-20">
              <p className="text-2xl text-gray-300">
                I know what you&apos;re thinking: <span className="italic">"Bonuses? Probably just some throw-in PDFs nobody reads."</span>
              </p>
              <p className="text-2xl text-gray-300 mt-6">
                Not even close.
              </p>
              <p className="text-2xl text-gray-300 mt-6">
                These are the <span className="font-bold">exact systems</span> that got guys off alcohol for 3+ years. The morning protocol that has high-performers waking up with more energy than they had at 25. The training that builds more muscle in 2 days than most guys get in 6.
              </p>
              <p className="text-2xl text-gray-300 mt-6">
                These aren&apos;t throw-ins. <span className="font-bold">These are the secrets that actually make everything work.</span>
              </p>
              <div className="text-center mt-12">
                <a
                  href="/application"
                  className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
                >
                  Apply Now
                </a>
              </div>
            </div>

            {/* Bonus cards - like How Limitless Protocol Works */}
            <div className="max-w-4xl mx-auto px-4">
              <div className="space-y-16">
                {bonuses.map((bonus, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-8 md:p-10 shadow-lg"
                  >
                    <div className="py-10 px-[8%]">
                      <h3
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center"
                        style={{ fontFamily: "Neuemontreal, sans-serif" }}
                      >
                        {bonus.title.split('(Value:')[0].trim()}<span className="font-normal"> (Value: {bonus.title.split('(Value:')[1]}</span>
                      </h3>
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-6">
                        {bonus.description}
                      </p>
                      <p className="text-gray-900 font-semibold text-xl md:text-2xl mt-8 mb-4">
                        {bonus.transition}
                      </p>
                      <ul className="space-y-5 ml-6">
                        {bonus.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="text-gray-700 text-lg md:text-xl leading-relaxed flex items-start">
                            <span className="mr-3">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
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
