import Image from "next/image";

export const PersonalStoryContent2 = () => (
  <>
    <p className="text-gray-800 leading-relaxed mb-2">
      But it hit me: there was ONE thing causing all of this...
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
    &apos;Train 4-6 times per week, restrict your eating, be more disciplined and use willpower&apos;
    </p>

    <p className="text-gray-800 leading-relaxed mb-6">
      I tried Keto, Intermittent Fasting, the &apos;Testosterone boosters&apos;..
    </p>

    <p className="text-gray-800 font-bold leading-relaxed mb-6">
    But when it comes to your energy, the typical methods <span className="underline font-bold">do not work.</span>
    </p>




    <p className="text-gray-800 leading-relaxed mb-6">
    The stress was piling on, my anxiety rising, and I started reaching for alcohol almost every night...
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

    <p className="text-gray-800 leading-relaxed mb-6">
    I looked at myself. Puffy face, a gut hanging over and dependent on caffeine and alcohol.
    </p>

    <p className="text-gray-800 font-bold font-black leading-relaxed mb-6"
    style={{ fontFamily: "Neuemontreal, !bold, sans-serif", lineHeight: "1.0", maxWidth:"100px"}}
    >
    <span className="font-bold">Rock. Bottom.</span>
    </p>

    <p className="text-gray-800 leading-relaxed mb-0">
    So I scrapped everything the &apos;fitness influencers&apos; said, and within months everything changed..
    </p>

    <p className="text-gray-800 leading-relaxed mb-6">

       </p>
  </>
);
