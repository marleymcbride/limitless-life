import { bgClasses } from "@/lib/utils";
import Image from "next/image";
import IntroSection from "./intro-section";

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.white} pt-12 pb-12 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          {/* THE ACTUAL STORY - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>
            <div className="text-center mb-6">
              <h2
                className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Three Years Ago I Was Blackout Drunk On A Mud-Stained Mattress
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
            Do you ever wake up feeling like complete shit?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            I know the feeling.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            From the outside everything looked great:
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I had the Masters degree on the wall, hitting the gym, earning decent money.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              People would say I &apos;had my shit together&apos;...
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              But the truth?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">

            </p>

            <p className="mini-heading text-gray-800 leading-relaxed mb-6">
            My life was hell.
            </p>

            <p className="text-gray-800 leading-relaxed">
             Falling asleep at my desk at 10am.
            </p>

            <p className="text-gray-800 leading-relaxed mb-0">
            Drinking a lot.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            And a gut hanging over my trousers.
            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
              What did I do?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Blamed it on everyone else of course!
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I blamed my job... quit engineering and became a Personal Trainer.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I blamed my genetics... and started buying all these &apos;testosterone booster&apos; supplements I saw online.
            </p>


            <p className="text-gray-800 leading-relaxed mb-6">
             But no matter what I did...
            </p>

            <p className="text-gray-800 text-center mini-heading leading-relaxed mt-6 mb-6">
              Every day I felt like ass.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Before even getting out of bed I was dreading the day.
            </p>

            <p className="text-gray-800 leading-relaxed">
            I was dragging myself through work.
            </p>

            <p className="text-gray-800 leading-relaxed mb-0">
            Ashamed of my own body.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            Then coming home and collapsing on the couch.
            </p>

            <p className="text-gray-800 underline font-bold leading-relaxed mb-6">
              So I doubled down on the quick fixes.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I went from three coffees, to four, to five, then energy drinks....
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              And before I knew it I was taking caffeine pills just to get through the day.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              The stress and anxiety was becoming unbearable.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              But I was already doing what every &apos;guru&apos; online said to do:
            </p>

            <p className="text-gray-800 formatted-quote leading-relaxed mb-6">
            &apos;Train 4-6 times per week, restrict your eating, be disciplined and use willpower&apos;
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            I tried Keto, Intermittent Fasting, about 50 different supplements..
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            <strong>And all this did was leave me with was a hole in my wallet and looking skinny-fat..</strong>
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            With the stress of trying to land clients, and my anxiety getting out of hand, I started reaching for alcohol almost every night...
            </p>

            <p className="text-gray-800 mini-heading font-bold leading-relaxed mb-6">
            Then Halloween came
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            October 2021.. it was a Halloween work party and I got BLACKOUT drunk.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            I woke up next day to my wallet missing, 15 missed calls and a full day&apos;s missed clients.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            My clothes and mattress on the floor covered in mud.
            </p>

            {/* Image space - mattress covered in mud */}
            <div className="my-8 flex justify-center">
              <figure className="relative w-full max-w-lg h-auto">
                <Image
                  src="/images/Me + jeans + bedroom.webp"
                  alt="Mud-stained mattress in bedroom"
                  width={512}
                  height={384}
                  className="rounded-lg shadow-lg w-full h-auto"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-center text-gray-600 italic text-md">
                  Puffy face, out of shape and letting alcohol ruin my life
                </figcaption>
              </figure>
            </div>

            <p className="text-gray-800 font-bold font-black leading-relaxed mb-6"
            style={{ fontFamily: "Neuemontreal, !bold, sans-serif", lineHeight: "1.0"}}
            >
            <span className="font-bold">Rock. Bottom.</span>
            </p>

            <p className="text-gray-800 leading-relaxed mb-0">
            So I scrapped everything the &apos;fitness influencers&apos; said and took a different approach..
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">

               </p>

          </div>
        </div>
      </div>
    </section>
  );
}
