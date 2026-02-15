import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from '@/lib/analytics';

export default function WhatYouGetSection() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleEnrollClick = async (tier: string) => {
    // Save current scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
    }

    // Track tier selection event
    try {
      const sessionData = await fetch('/api/session').then(r => r.json());
      await trackEvent({
        sessionId: sessionData.sessionId,
        userId: sessionData.userId,
        eventType: `tier_select_${tier}` as any,
        eventData: { tier },
      });
    } catch (error) {
      console.error('Failed to track tier selection:', error);
    }

    router.push(`/application?enroll=true&tier=${tier}`);
  };

  const items = [
    {
      title: "1-on-1 Coaching & Support",
      description: "Direct access to me for the entire program. Get any question answered and feedback on your training, nutrition, and lifestyle. This isn't a group program. You work directly with me."
    },
    {
      title: "The Complete Limitless Systems",
      description: "All four systems laid out step-by-step. Morning Fuel System protocols. Exact training programs. Limitless Flow practices. Health optimization strategies. No guessing. Just follow the system."
    },
    {
      title: "Your Custom Limitless Gameplan",
      description: "Built specifically for your body after The Bottleneck Test™ identifies exactly where we should put our efforts. No cookie-cutter plans. Your gameplan is unique to you."
    },
    {
      title: "Complete Training Program",
      description: "2-3 day complete exercise library via our training and nutrition app. When your body is already fried, more training just burns you out faster. We target muscles that matter. We protect your CNS."
    },
    {
      title: "Personalized Nutrition Protocol",
      description: "Exactly how to eat to burn fat and build muscle whilst still enjoying foods like burgers and pizzas. No starvation. No restriction. Just smart nutrition that works with your life."
    },
    {
      title: "Weekly Check-Ins & Adjustments",
      description: "We track progress weekly and adjust as needed. Energy levels. Body composition. Sleep quality. Work performance. If something's not working, we fix it immediately."
    },
    {
      title: "Form Checks & Lift Analysis",
      description: "Get in-depth review videos of your training with detailed feedback on what to fix. You'll always know you're doing it right and getting the most from every session."
    },
    {
      title: "Hormone & Health Protocols",
      description: "I analyze your labs and work with you to improve your hormones and key health markers. We use Metabolic Priming™ and the Hormone Reset™ to fix what's actually broken."
    },
    {
      title: "Lifetime Access + Updates",
      description: "Keep all training materials forever. Get free updates as I refine the system. Your investment now covers you for life. This is the complete system. No upsells. No hidden costs."
    }
  ];

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 md:mb-6">
            What You Get With The Limitless Protocol
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Complete access to our proven 4-step system designed specifically for high-performers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 px-4 md:px-6 lg:px-8 rounded-lg p-4 md:p-6 lg:p-8 border border-gray-200"
            >
              <h3
                className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Three Tier Pricing Boxes */}
      <div className="mt-16 pt-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl text-gray-600">
            Here are your options:
          </h3>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
          You will receive branding, content, audience growth, marketing, and product creation systems that will run entirety of your business.<br/><br/>
          You will also receive confidence, clarity, and a 3-year action plan for growing your business in the digital economy.<br/><br/>
          This does take time. But you will receive success after 4 years in a fraction of that time.<br/><br/>
          So, what'll it be?
        </p>

        {/* Desktop Only */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 px-4 md:px-16 mx-0 md:mx-12 gap-0">

          {/* Tier 1: Protocol */}
          <div className="z-0">
          <div className="bg-white border-2 border-t-gray-300 overflow-hidden flex flex-col relative">

            <div className="h-2.5 bg-[#4A5568]"></div>
            <div className="flex-grow flex flex-col">
              <div className="pt-0 px-4 pb-0 border-[#4A5568]">
              <h4 className="text-xl md:text-2xl mt-0 pt-6 md:pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-black pb-4 md:pb-6">THE LIMITLESS PROTOCOL</h4>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-8"></p>
                <div className="w-full space-x-4 ml-0 md:ml-10"></div>
                <div className="text-lg md:text-lg lg:text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-extrabold">LIFESTYLE BODY DESIGN</div>
                <div className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</div>
              </div>

              <div className="space-y-0">
                <div className="w-full flex gap-3 py-4 border-y border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Complete 4-Step System Protocol</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Video Training Library</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Nutrition & Supplement Guides</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Mobile App Access</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Email Support</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                onClick={() => handleEnrollClick('protocol')}
                className="w-full bg-[#718096] text-white font-bold py-6 md:py-3 lg:py-5 px-4 md:px-6 lg:px-8 hover:bg-[#5a6a74] transition-colors text-base md:text-lg lg:text-xl"
              >
                Enroll Today
                </button>
              </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Limitless Life */}
          <div className="-mx-4 z-10">
          <div className="bg-white -mt-6 border-2 md:border-0 lg:border-0 border-[#940909] rounded-sm overflow-hidden flex flex-col relative] transition-all">
            <div className="h-3 bg-[#940909]"></div>
            <div className="flex-grow flex flex-col">
            <div className="pt-0 px-4 pb-0 border-[#940909]">
            <h4 className="text-xl md:text-2xl mt-0 pt-6 md:pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-[#940909] pb-4 md:pb-6">LIMITLESS LIFE</h4>
                <p className="text-5xl font-bold text-black mb-8"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <div className="text-lg md:text-lg lg:text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</div>
                <p className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</p>
              </div>
              <div className="space-y-0">
                <div className="w-full flex gap-3  py-4 border-y border-gray-200">
                  <div className="space-x-4 ml-8">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg font-bold flex-shrink-0">Everything in Protocol, plus:</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-8">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Weekly 1-on-1 coaching calls (4 total)</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-8">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Personalized nutrition protocol</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-8">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Workout plan customization</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-8">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Priority email support for customers in work hours</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4">
                  <div className="space-x-4 ml-8">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Priority email support</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                onClick={() => handleEnrollClick('life')}
                className="w-full bg-[#940909] text-white font-bold py-5 px-8 hover:bg-[#B90021] transition-colors text-xl"
              >
                Enroll Today
                </button>
              </div>
              </div>
            </div>
          </div>

          {/* Tier 3: Life + WhatsApp */}
          <div className="-mx-0 z-0 ">
          <div className="bg-white border-2 border-[#940909] mb-24 overflow-hidden flex flex-col relative] transition-all">
            <div className="h-2.5 bg-[#940909]"></div>
            <div className="flex-grow bg-blue flex flex-col">
            <div className="pt-0 bg-blue px-4 pb-0">
            <h4 className="text-xl md:text-2xl mt-0 pt-6 md:pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-[#940909] pb-4 md:pb-6">LIMITLESS LIFE + PRIVATE</h4>
                <p className="text-5xl font-bold text-white mb-4"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <div className="text-lg md:text-lg lg:text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</div>
                <p className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</p>
              </div>
              <div className="space-y-0">
              <div className="space-y-0">

              </div>
                <div className="w-full flex gap-3 py-4 border-y border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg font-bold flex-shrink-0">Everything in Limitless Life, plus:</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0"> Access to my private Whatsapp</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Same-day response guarantee</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Form check via video</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Real-time protocol adjustments</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                onClick={() => handleEnrollClick('life-whatsapp')}
                className="w-full bg-[#940909] text-white font-bold py-4 px-8 hover:bg-[#B90021] transition-colors text-xl"
              >
                Enroll Today
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>


        {/* Mob Only */}
        <div className="block md:hidden lg:hidden grid-cols-1 md:grid-cols-3 px-4 md:px-16 mx-0 md:mx-12 gap-2 space-y-2 md:gap-6 lg:gap-8">

          {/* Tier 1: Protocol */}
          <div className="bg-white border-2 border-t-gray-300 overflow-hidden flex flex-col relative">
            <div className="h-2.5 bg-[#4A5568]"></div>
            <div className="flex-grow flex flex-col">
              <div className="pt-0 px-3 md:px-4 pb-0">
              <h4 className="text-xl md:text-2xl mt-0 pt-6 md:pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-black pb-4 md:pb-6">THE LIMITLESS PROTOCOL</h4>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-8"></p>
                <div className="w-full space-x-4 ml-0 md:ml-10"></div>
                <div className="text-lg md:text-lg lg:text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-extrabold">LIFESTYLE BODY DESIGN</div>
                <div className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</div>
              </div>

              <div className="space-y-0 mx-4">
                <div className="w-full flex gap-2 md:gap-3 py-2 md:py-3 md:py-4 border-y border-gray-200">
                  <div className="ml-0 md:ml-10">
                  <span className="gray-700 flex-shrink-0 text-sm md:text-base">✓</span>
                  <span className="text-gray-700 flex-shrink-0 text-sm md:text-base md:text-lg">Complete 4-Step System Protocol</span>
                  </div>
                </div>
                <div className="w-full flex gap-2 md:gap-3 py-2 md:py-3 md:py-4 border-b border-gray-200">
                  <div className="ml-0 md:ml-10">
                  <span className="gray-700 flex-shrink-0 text-sm md:text-base">✓</span>
                  <span className="text-gray-700 flex-shrink-0 text-sm md:text-base md:text-lg">Video Training Library</span>
                  </div>
                </div>
                <div className="w-full flex gap-2 md:gap-3 py-2 md:py-3 md:py-4 border-b border-gray-200">
                  <div className="ml-0 md:ml-10">
                  <span className="gray-700 flex-shrink-0 text-sm md:text-base">✓</span>
                  <span className="text-gray-700 flex-shrink-0 text-sm md:text-base md:text-lg">Nutrition & Supplement Guides</span>
                  </div>
                </div>
                <div className="w-full flex gap-2 md:gap-3 py-2 md:py-3 md:py-4 border-b border-gray-200">
                  <div className="ml-0 md:ml-10">
                  <span className="gray-700 flex-shrink-0 text-sm md:text-base">✓</span>
                  <span className="text-gray-700 flex-shrink-0 text-sm md:text-base md:text-lg">Mobile App Access</span>
                  </div>
                </div>
                <div className="w-full flex gap-2 md:gap-3 py-2 md:py-3 md:py-4 border-b border-gray-200">
                  <div className="ml-0 md:ml-10">
                  <span className="gray-700 flex-shrink-0 text-sm md:text-base">✓</span>
                  <span className="text-gray-700 flex-shrink-0 text-sm md:text-base md:text-lg">Email Support</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 -mb-24">
                <button
                onClick={() => handleEnrollClick('protocol')}
                className="w-full bg-[#718096] text-white font-bold py-4 md:py-3 lg:py-5 px-4 md:px-6 lg:px-8 hover:bg-[#5a6a74] transition-colors text-base md:text-lg lg:text-xl"
              >
                Enroll Today
                </button>
              </div>
            </div>
          </div>

          {/* Tier 2: Limitless Life */}
          <div className="bg-white md:-mt-6 lg:-mt-6 border-2 md:border-0 lg:border-0 border-[#940909] rounded-sm overflow-hidden flex flex-col relative] transition-all">
            <div className="h-3 bg-[#940909]"></div>
            <div className="flex-grow flex flex-col">
            <div className="pt-0 px-4 pb-0 border-[#940909]">
            <h4 className="text-xl md:text-2xl mt-0 pt-6 md:pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-[#940909] pb-4 md:pb-6">LIMITLESS LIFE</h4>
                <p className="text-5xl font-bold text-black mb-8"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <div className="text-lg md:text-lg lg:text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</div>
                <p className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</p>
              </div>
              <div className="space-y-0">
                <div className="w-full flex gap-3 py-4 border-y border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg font-bold flex-shrink-0">Everything in Protocol, plus:</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Weekly 1-on-1 coaching calls (4 total)</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Personalized nutrition protocol</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Workout plan customization</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Priority email support for customers in work hours</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Priority email support</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                onClick={() => handleEnrollClick('life')}
                className="w-full bg-[#940909] text-white font-bold py-4 px-8 hover:bg-[#B90021] transition-colors text-xl"
              >
                Enroll Today
                </button>
              </div>
            </div>
          </div>

          {/* Tier 3: Life + WhatsApp */}
          <div className="bg-white border-2 border-[#940909] mb-24 overflow-hidden flex flex-col relative] transition-all">
            <div className="h-2.5 bg-[#940909]"></div>
            <div className="flex-grow bg-blue flex flex-col">
            <div className="pt-0 bg-blue px-4 pb-0">
            <h4 className="text-xl md:text-2xl mt-0 pt-6 md:pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-[#940909] pb-4 md:pb-6">LIMITLESS LIFE + PRIVATE</h4>
                <p className="text-5xl font-bold text-white mb-4"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <div className="text-lg md:text-lg lg:text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</div>
                <p className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</p>
              </div>
              <div className="space-y-0">
              <div className="space-y-0">

              </div>
                <div className="w-full flex gap-3 py-4 border-y border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg font-bold flex-shrink-0">Everything in Limitless Life, plus:</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0"> Access to my private Whatsapp</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Same-day response guarantee</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Form check via video</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4">
                  <div className="space-x-4 ml-10">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Real-time protocol adjustments</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                onClick={() => handleEnrollClick('life-whatsapp')}
                className="w-full bg-[#940909] text-white font-bold py-4 px-8 hover:bg-[#B90021] transition-colors text-xl"
              >
                Enroll Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
