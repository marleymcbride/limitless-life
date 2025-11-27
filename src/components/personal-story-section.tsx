import { bgClasses } from "@/lib/utils";
import Image from "next/image";

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.white} pt-10 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* THE ACTUAL STORY - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none mobile-text-large body-copy">
            <div className="text-center mb-6">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Three Years Ago I Was Blackout Drunk On A Mud-Stained Mattress
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
              Do you ever feel like your body and energy keeps on declining, year after year.. no matter what you do?
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
              
            </p>

            <p className="mini-heading text-gray-800 leading-relaxed mb-6">
            But in reality my life was hell
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

            <p className="text-gray-800 leading-relaxed mb-2">
              But it dawned on me there was ONE thing causing all of this...
            </p> 

            <p className="text-gray-800 text-center mini-heading leading-relaxed mt-6 mb-6">
              I woke up every morning with no energy
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Before even getting out of bed I was dreading the day.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            This caused me to suffer in my work, my relationships, and just about every area of my life.
            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
              So.. I doubled down on the quick fixes.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I went from three coffees, to four, to five, then energy drinks....
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And before I knew it I was taking caffeine pills just to get through the day.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              As you can imagine, the stress and anxiety was getting out of hand.
            </p>  

            <p className="text-gray-800 leading-relaxed mb-6">
              But without knowing where else to turn, and already doing what every coach online said to do..
            </p>

            <p className="text-gray-800 formatted-quote leading-relaxed mb-6">
              Train 4-5 times per week, restrict your eating, &apos;be disciplined&apos; and use willpower
            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
            But I found when it comes to your energy, the typical methods <span className="underline font-bold">do not work.</span>
            </p>

            <p className="text-gray-800 italic leading-relaxed mb-6">
              (I tried Keto, Intermittent Fasting, T-boosters, all of it..)
            </p>


            <p className="text-gray-800 leading-relaxed mb-6">
            This went on for years feeling stressed and anxious, unhappy and reaching for alcohol every night...
            </p>

            <p className="text-gray-800 mini-heading font-bold leading-relaxed mb-6">
            Then Halloween came
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            October 2021.. it was a Halloween work party and I got BLACKOUT drunk...
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            I woke up next day to my wallet missing, 15 missed calls and a full day&apos;s missed clients.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            My clothes and mattress on the floor covered in mud.
            </p>

            <p>
            {/* Image space - mattress covered in mud */}
            <div className="my-8 flex justify-center">
              <div className="relative w-full max-w-lg h-auto">
                <Image
                  src="/images/Me + jeans + bedroom.webp"
                  alt="Mud-stained mattress in bedroom"
                  width={512}
                  height={384}
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            I looked at myself. Puffy face, a gut hanging over and dependant on caffeine and alcohol.
            </p>

            <p className="text-gray-800 !italic leading-relaxed mb-6">
            Rock bottom.
            </p>

            <p className="text-gray-800 leading-relaxed mb-0">
            So I scrapped everything the &apos;fitness influencers&apos; said to do and used a new approach.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
