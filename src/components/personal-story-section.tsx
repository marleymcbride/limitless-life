import { bgClasses } from "@/lib/utils";

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.white} py-20 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* THE ACTUAL STORY - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none mobile-text-large body-copy">
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                Three Years Ago I Was Blackout Drunk On A Mud-Stained Mattress
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
              Do you ever feel like your physique and energy are declining, year after year.. no matter what you do?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              That&apos;s exactly how I felt.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              See.. just a few years back my life looked great.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I had the Masters degree on the wall, training hard, earning decent money.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              People would say I &apos;had my shit together&apos;...
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              But the truth was.
            </p>

            <p className="mini-heading text-gray-800 leading-relaxed mb-6">
              My life was hell.
            </p>

            <p className="text-gray-800 leading-relaxed">
             Falling asleep at my desk at 10am.
            </p>

            <p className="text-gray-800 leading-relaxed mb-0">
            Not proud of my body.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            Drinking every night.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Plus feeling constantly stressed out, anxious, and unhappy.
            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
              So what did I do?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Blamed it on everyone else of course!
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I blamed my job... quit engineering and became a Personal Trainer.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I blamed my genetics... and started buying all these supplements I saw online.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              But I NEEDED energy.. for my work, my relationships (and just to feel like myself again..)
            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
              So I doubled down on the quick fixes.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I went from three coffees, to four, five, then energy drinks....
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And before I knew it I was taking caffeine pills just to get through the day.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              
              As you can imagine, the stress and anxiety was getting out of hand.
            </p>  

            <p className="text-gray-800 leading-relaxed mb-2">
              But already training 5-6 times per week, and &apos;eating well&apos; 
            </p>

            <p className="text-gray-800 italic leading-relaxed mb-6">
              (I tried Keto, Intermittent Fasting, T-boosters, all that shit..)
            </p>


            <p className="text-gray-800 leading-relaxed mb-6">
            But I still woke up feeling like shit.
            </p>

            <p className="text-gray-800 mini-heading font-bold leading-relaxed mb-6">
              Then Halloween came.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            October 2021.. it was a work party and  I got BLACKOUT drunk.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I woke up next day to my wallet missing, 15 missed calls and a full day&apos;s missed clients.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I looked across my mattress on the floor in my little box room completely covered in mud.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And was met with an inflamed face and gut, sex drive non-existent, dependant on caffeine and alcohol.

            </p>

            {/* Image space - mattress covered in mud */}
            <div className="my-8 flex justify-center">
              <img
                src="/images/Me + bedroom.webp"
                alt="Mud-stained mattress in bedroom"
                className="w-full max-w-lg h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>

            <p className="text-gray-800 leading-relaxed mb-0">
              Rock bottom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
