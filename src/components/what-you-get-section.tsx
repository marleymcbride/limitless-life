import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WhatYouGetSection() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleEnrollClick = (tier: string) => {
    // Save current scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            What You Get With The Limitless Protocol
          </h2>
          <p className="text-lg text-gray-700">
            Complete access to our proven 4-step system designed specifically for high-performers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 px-12 md:px-12 lg:px-12 rounded-lg p-8 border border-gray-200"
            >
              <h3
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
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

        <div className="grid md:grid-cols-3 px-16 mx-12">
          {/* Tier 1: Protocol */}
          <div className="bg-white border-2 border-t-gray-300 mb-24 overflow-hidden flex flex-col relative">
            <div className="h-2.5 bg-[#4A5568]"></div>
            <div className="flex-grow flex flex-col">
              <div className="pt-0 px-4 pb-0">
              <h4 className=" text-2xl pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-black pb-6">THE LIMITLESS PROTOCOL</h4>
                <p className="text-5xl font-bold text-black mb-8"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <p className="text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</p>
                <p className="text-lg text-black mb-5 font-['Open Sans'] text-center font-normal">Get the Bachelors Degree curriculum to learn how to build an authentic brand while posting about your interests.</p>
              </div>

              <div className="space-y-0">
                <div className="w-full flex gap-3 py-4 border-y border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Complete 4-Step System Protocol</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Video Training Library</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Nutrition & Supplement Guides</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4 border-b border-gray-200">
                  <div className="space-x-4 ml-10">
                  <span className="gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Mobile App Access</span>
                  </div>
                </div>
                <div className="w-full flex gap-3 py-4">
                  <div className="space-x-4 ml-10">
                  <span className="gray-700 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-lg flex-shrink-0">Email Support</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                onClick={() => handleEnrollClick('protocol')}
                className="w-full bg-[#718096] text-white font-bold py-5 px-8 hover:bg-[#5a6a74] transition-colors text-xl"
              >
                Enroll Today
                </button>
              </div>
            </div>
          </div>

          {/* Tier 2: Limitless Life */}
          <div className="bg-white border-0 -mt-6 border-[#940909] rounded-sm overflow-hidden flex flex-col relative hover:border-[#B90021] transition-all">
            <div className="h-3 bg-[#940909]"></div>
            <div className="flex-grow flex flex-col">
            <div className="pt-6 px-4 pb-0 border-[#940909]">
            <h4 className=" text-2xl pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-[#940909] pb-6">LIMITLESS LIFE</h4>
                <p className="text-5xl font-bold text-black mb-8"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <p className="text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</p>
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
                className="w-full bg-[#940909] text-white font-bold py-6 px-8 hover:bg-[#B90021] transition-colors text-xl"
              >
                Enroll Today
                </button>
              </div>
            </div>
          </div>

          {/* Tier 3: Life + WhatsApp */}
          <div className="bg-white border-2 border-[#940909] mb-24 overflow-hidden flex flex-col relative hover:border-[#B90021] transition-all">
            <div className="h-2.5 bg-[#940909]"></div>
            <div className="flex-grow bg-blue flex flex-col">
            <div className="pt-0 bg-blue px-4 pb-0">
                <h4 className=" text-2xl pt-6 text-center font-['Open Sans'] font-extrabold -mx-4 -mb-3 bg-slate-300/10 text-[#940909] pb-6">LIMITLESS LIFE + PRIVATE</h4>
                <p className="text-5xl font-bold text-white mb-8"></p>
                <div className="w-full space-x-4 ml-10"></div>
                <p className="text-lg italic text-black-600 mb-5 font-['Open Sans'] text-center font-bold">LIFESTYLE BODY DESIGN</p>
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
                className="w-full bg-[#940909] text-white font-bold py-5 px-8 hover:bg-[#B90021] transition-colors text-xl"
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
