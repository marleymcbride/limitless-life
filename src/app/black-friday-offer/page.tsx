import { Metadata } from "next";
import { blackFridayVignetteEffect, unifiedGradientWithSpotlightDesktop, unifiedGradientWithSpotlightMobile, vignetteEffect } from "@/lib/utils";

export const metadata: Metadata = {
  title: "LIMITLESS LIFE™ - BLACK FRIDAY FOUNDING COHORT",
  description: "10 spots. Doors close December 2nd.",
};

export default function BlackFridayOffer() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. Hero Section - DARK background with gradient */}
      <section
        className={`pt-2 md:pt-6 px-3 pb-16 px-16min-h-[100vh] sm:pb-16 flex flex-col relative w-full overflow-hidden bg-black`}
      >
        <div className="hidden md:block">{unifiedGradientWithSpotlightDesktop}</div>
        <div className="block md:hidden">{unifiedGradientWithSpotlightMobile}</div>
        <div className="hero-grain-overlay"></div>
        <div className="hero-darkening-overlay"></div>
        {vignetteEffect}
        {blackFridayVignetteEffect}

        <div className="container hero-full-width flex relative z-30 flex-col mx-auto h-full">
          <div className="flex flex-col flex-grow justify-start pt-5 sm:justify-center sm:pt-0 sm:mt-6 md:mt-0">
            {/* Headline */}
            <h1 className="mobile-headline block px-1 mx-auto mt-2 mb-6 w-full font-bold text-center text-white sm:hidden capitalize text-[2.4rem] leading-[1.25]">
              BLACK FRIDAY FOUNDING COHORT: Get The Complete Man Package For 75% Off
            </h1>

            <h1 className="hidden sm:block px-0 mx-auto mb-4 text-5xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-0 sm:mt-0 max-w-[87%] capitalize">
              BLACK FRIDAY FOUNDING COHORT: Get The Complete Man Package For 75% Off
            </h1>

            {/* Subheadline */}
            <p className="mobile-subheadline block mx-auto mb-2 font-light text-center text-gray-300 sm:hidden px-0 text-[1.3rem] leading-[1.6] w-[95%]">
              Stop feeling exhausted, build an elite body, and get back years of energy—while training just 2 days per week.
            </p>

            <p className="hidden px-1 mx-auto mb-4 text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-xl max-w-[725px]">
              Stop feeling exhausted, build an elite body, and get back years of energy—while training just 2 days per week.
            </p>

            {/* Pills - Hidden on mobile, visible on desktop */}
            <div className="hidden relative justify-center mb-1 sm:flex">
              <div className="w-auto">
                <div className="flex items-center gap-2">
                  <div className="bg-[#940909] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    LIMITED TO 10 MEN
                  </div>
                  <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
                    75% OFF
                  </div>
                  <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
                    JANUARY 1ST START
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden h-4"></div>

            {/* Desktop Headlines */}
            <h2 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize">
              Lose Your Gut, Stop Feeling Exhausted & Reverse Years Of Health Decline (In 2 Days Per Week)
            </h2>

            {/* Desktop Subheadline */}
            <p className="hidden px-1 mx-auto mb-4 text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-xl max-w-[725px]">
              You don't need 4 coffees a day, train 6 days a week, or cut out your favorite foods to feel incredible.
              Here's the proven system to restore your energy, build an elite body and get back YEARS of your life:
            </p>

            <div className="h-4"></div>
          </div>
        </div>
      </section>

      {/* 2. Core Value Proposition - WHITE background */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              So Let's Get This In The Open...
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              You make good money, got the career, maybe even the nice house and family. On the surface, life ain't going too bad.
            </p>
          </div>

          <div className="text-lg md:text-xl space-y-6 mb-12">
            <p className="text-gray-800 mb-4">
              And look, you probably had this big grandiose vision of once you got there you'd feel great. The long nights, the stress, the years of grinding away would lift you to a state where you felt <strong>complete.</strong>
            </p>

            <p className="text-gray-800 mb-4">
              But for some reason… <strong>you don't.</strong>
            </p>

            <p className="text-gray-800 mb-4">
              It's like after ticking off the financial/success box, it just doesn't feel like you thought it would.
            </p>

            <p className="text-gray-800 mb-4">
              And sure, the money can buy nicer things… it puts you in a nicer house, nicer car, you can go to fancy restaurants and cool trips each year.
            </p>

            <p className="text-gray-800 mb-4">
              But if you look at your <strong>ACTUAL happiness</strong>… <strong>not that much has changed.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Core Problem - DARK background */}
      <div className="dark-section-with-grain bg-black">
        <div className="full-width-content py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Energy = The Cornerstone of Your Business
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                The person with the most energy wins. <strong className="underline">Period.</strong>
              </p>
            </div>

            <div className="text-lg md:text-xl space-y-6 mb-12">
              <p className="text-gray-100 mb-4">
                Imagine you had 3 extra hours of unrelenting energy every single day. Think what you could actually do with that!
              </p>

              <p className="text-gray-100 mb-4">
                Your business would probably be twice the size. And when I started piecing this together, I realized energy is the real play.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                Because Money Is Just A Number
              </h2>

              <p className="text-gray-100 mb-4">
                Once You Have enough, it doesn't really do any more for your life… In fact it does just seem to bring more and more stress.
              </p>

              <p className="text-gray-100 mb-4">
                I figured out the REAL thing I want is more energy… <strong>Energy is presence. Power. Aura.</strong>
              </p>

              <p className="text-gray-100 mb-4">
                All the things you associate when you think of a 'complete man'.
              </p>

              <div className="my-8"></div>

              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                But Here's The Problem…
              </h2>

              <p className="text-gray-100 mb-4">
                The Modern World Has Destroyed The Modern Man. You've probably been told this is Just "Getting Older." That "Life's Downhill After 30."
              </p>

              <p className="text-gray-100 mb-4">
                But if anything… Life as a man should get BETTER.
              </p>

              <p className="text-gray-100 mb-4">
                You shouldn't have to drag yourself out of bed wondering if you'll even get through the day.
              </p>

              <p className="text-gray-100 mb-4">
                You shouldn't be ashamed to take your shirt off. You shouldn't NEED coffee after coffee just to think straight, or drinks every night to shut your brain off.
              </p>

              <p className="text-gray-100 mb-4">
                But truth is…
              </p>

              <div className="my-8"></div>

              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                Male Testosterone Has Dropped 25% Since 2007
              </h2>

              <p className="text-gray-100 mb-4">
                A 40-year-old man today has the SAME testosterone as an 80-year-old from 50 years ago.
              </p>

              <p className="text-gray-100 mb-4">
                Men with declining testosterone have up to 50% higher chance of early death.
              </p>

              <p className="text-gray-100 mb-4">
                And the more successful you get, the less people care about how you actually feel. But you don't have the privilege to neglect your health and energy anymore.
              </p>

              <p className="text-gray-100 mb-4">
                Because without energy, you have <strong>NOTHING.</strong> Without energy, your relationships suffer, your work drops, your body deteriorates.
              </p>

              <p className="text-gray-100 mb-4">
                And You Will KEEP on waking up feeling Like This, Until You Change Your System.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Introducing The Limitless Protocol - WHITE background */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Introducing: The Limitless Protocol™
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              This is a never-seen system… designed to completely re-align your body, health and energy.
            </p>
          </div>

          <div className="text-lg md:text-xl space-y-6 mb-12">
            <p className="text-gray-800 mb-4">
              It's NOT Keto, carnivore or having to cut out any of your favorite foods.
            </p>

            <p className="text-gray-800 mb-4">
              It's NOT a strict, obsessive regiment that takes over your lifestyle. In fact, it Doesn't take more than 2 days of training per WEEK.
            </p>

            <p className="text-gray-800 mb-4">
              Because here's the problem: Most approaches just try to do more. More training. More supplements. More willpower. More misery.
            </p>

            <p className="text-gray-800 mb-4 font-bold text-xl">
              I Created a unique system that requires you to do 1 thing differently: <strong>Less.</strong>
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="mailto:marley@marleymcbride.co?subject=I'm%20in%20-%20Limitless%20BFO&body=I'm%20in%20for%20the%20Limitless%20Protocol%20Black%20Friday%20Founding%20Cohort"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
            >
              EMAIL "I'M IN" TO SECURE YOUR SPOT
            </a>
          </div>

          <div className="text-center mt-8 max-w-3xl mx-auto">
            <div className="bg-transparent bg-opacity-10 p-0">
              <p className="text-xl text-black mb-4 font-bold">
                10 spots. Doors close December 2nd. Starts January 1st.
              </p>
              <p className="text-gray-600 mb-4">
                I will send you a custom video within 24 hours. First call December 9th.
              </p>
              <p className="text-gray-600 mb-4">
                If you have any questions email me marley@marleymcbride.co
              </p>
              <p className="text-gray-600">
                Black Friday pricing expires December 2nd, 2025 at 11:59pm EST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Who This Is For - DARK background */}
      <div className="dark-section-with-grain">
        <div className="full-width-content py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
              Who This Is For:
            </h3>

            <div className="text-lg md:text-xl space-y-4">
              <div className="text-gray-100 mb-4">
                • You wake up exhausted every morning
              </div>
              <div className="text-gray-100 mb-4">
                • No matter how much you train your gut just won't budge
              </div>
              <div className="text-gray-100 mb-4">
                • You need multiple coffees to function and 2-3 drinks to wind down
              </div>
              <div className="text-gray-100 mb-4">
                • You have no energy left for people who matter most
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Timeline - WHITE background */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-black">
            The Timeline
          </h2>

          <div className="space-y-8">
            <div className="mb-6">
              <h3 className="font-bold text-xl mb-4 text-center text-black">Phase 1: The Foundations (Week 1-6)</h3>
              <p className="text-gray-800 mb-4">First thing we'll do is get crystal clear on your gameplan. Every situation, life, and journey to becoming Limitless is different. That's why we run you through The Bottleneck Test, then craft your Limitless Gameplan of:</p>
              <div className="space-y-2 text-gray-800">
                <p>• Your <strong>Rest-Focused Training™ Plan</strong>: We craft your elite body in just 2-3 days of training using <strong>Power Presence Method™</strong> to build muscle that creates masculine presence and aura</p>
                <p>• Your <strong>Metabolic Priming™ System</strong>: We use strategic nutrition to kickstart your metabolism so you can start eating more whilst burning fat simultaneously</p>
                <p>• Your <strong>First Visible Shifts</strong>: You'll notice your gut flattening, face leaning out, sleep improving, and your body finally responding to training because it's finally getting the recovery it needs.</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-xl mb-4 text-center text-black">Phase 2: Oscillating (Week 7-11)</h3>
              <p className="text-gray-800 mb-4">With foundations in place, we put our focus towards your lifestyle. We set a foundation for all the inner patterns keeping you stuck in a low frequency. We bring in <strong>The Limitless Morning</strong>, and your natural flow system - helping you feel more relaxed. By now you'll notice your natural energy rising consistently, visible muscle across your body taking place and booze starting to lose its grip.</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-xl mb-4 text-center text-black">Phase 3: Limitless (Week 12-17)</h3>
              <p className="text-gray-800 mb-4">Now it's time to <strong>Become Limitless</strong>. We go deep in to your health, running high level blood tests with <strong>The Hormone Reset</strong>, studying the data, and bringing in <strong>The Anti Stack</strong> to delete your caffeine and supplement needs. You'll start waking up every day with that infectious energy, Notice you're now hitting 20+ lbs of fat lost, and your testosterone increasing. Morning wood back, brain fog disappeared, your gut healed, all that good Stuff.</p>
              <p className="text-gray-800 mb-4">And by Month 4 you reach <strong>The Natty Sweet Spot™</strong> - Where your body, hormones, health, peace, energy and presence all align. Limitless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. What You Get - DARK background */}
      <div className="dark-section-with-grain">
        <div className="full-width-content py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
              What You Get:
            </h3>

            <div className="text-lg md:text-xl space-y-4 mb-12">
              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>17 Weeks of Coaching Calls</strong> - 2 calls per week in the cohort covering all topics of Limitless.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>Your Custom Limitless Gameplan</strong> - Built specifically for your body after <strong>The Bottleneck Test™</strong> identifies exactly where we should put our efforts.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>Your Complete Training Program</strong> - 2-3 days per week, full exercise library, using our training and nutrition app.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>Your Personalized Nutrition Protocol</strong> - Exactly how to eat to burn fat and build muscle (whilst still enjoying foods like burgers and pizzas)
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>24/7 Direct WhatsApp Access</strong> - Any questions, sticking points, and daily support.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>Form Checks & Lift Analysis</strong> - Get in-depth review videos of your training, get detailed feedback on what to fix.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>Hormone and health protocols</strong> - I analyze your labs and work with you to improve your hormones and key health markers.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>BLACK FRIDAY BONUS #1: December Kickoff</strong> - BONUS weekly calls starting December 9th. We start finding your constraints, and get a headstart on the year so when we kick off on January 1st hits you'll already be in motion.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-100 mb-4">
                  ✔ <strong>BLACK FRIDAY BONUS #2: Private calls</strong> - I didn't offer this before. But for <strong>FIRST 5</strong> to join Limitless you will get 3 one-to-one calls with me. No strings, just us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Investment & Final CTA - WHITE background */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-black">
            Your Investment
          </h2>

          <div className="text-lg md:text-xl space-y-4 mb-8">
            <p className="mb-4">
              You can get ALL of this at a Black Friday pricing of just <strong>$100 today</strong>, then <strong>$80 per week</strong> starting January 1st for 17 weeks.
            </p>

            <p>
              Or if you prefer to invest in yourself you can join for a 1-time payment of <strong>$1347</strong>.
            </p>
          </div>

          <div className="text-center">
            <a
              href="mailto:marley@marleymcbride.co?subject=I'm%20in%20-%20Limitless%20BFO&body=I'm%20in%20for%20the%20Limitless%20Protocol%20Black%20Friday%20Founding%20Cohort"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
            >
              EMAIL "I'M IN" TO SECURE YOUR SPOT
            </a>
          </div>

          <p className="text-center mt-6 text-gray-600 font-semibold">
            <strong>NOTE: Black Friday weekend is the ONLY time you can get in for this price. The offer will expire December 2nd, 2025 at 11:59pm EST.</strong>
          </p>
        </div>
      </section>
    </main>
  );
}