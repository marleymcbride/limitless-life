"use client";

import { useState } from "react";

export default function FinalFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does it cost?",
      answer: "Pricing is discussed on your application call. Investment varies based on your situation. What I can tell you: most clients see ROI within 90 days through improved performance, reduced alcohol/coffee spend, and avoided healthcare costs."
    },
    {
      question: "How long is the program?",
      answer: "Most guys see dramatic results in 30-60 days. Full transformation takes 90-180 days. You get lifetime access to all materials and ongoing support."
    },
    {
      question: "Do I really have to quit caffeine and alcohol?",
      answer: "Yes - and I know that sounds scary if you've tried before and failed. The Caffeine Exit Strategy and Alcohol Elimination Protocol are designed specifically for people who've failed using willpower. 94% stay caffeine-free. 89% stay alcohol-free."
    },
    {
      question: "What if I've tried quitting before and failed?",
      answer: "Perfect. That means you already know willpower doesn't work. You need a system. That's what we give you."
    },
    {
      question: "Can I train more than 2-3 days per week?",
      answer: "You can. But you won't get better results. You'll get worse. When your nervous system is already fried, recovery is where you transform. Not more training."
    },
    {
      question: "What if I travel a lot for work?",
      answer: "The system is built for guys who travel constantly. Morning Fuel System works in any hotel. Training is only 2-3 days per week. Most of my clients travel weekly. It's not an issue."
    },
    {
      question: "Will this work if I'm [specific age/situation]?",
      answer: "If you're a high-performer dealing with burnout, exhaustion, and reliance on caffeine/alcohol... yes. Age doesn't matter. Industry doesn't matter. The biology is the same. I've worked with guys from 32 to 55. They all transform."
    },
    {
      question: "What if I don't see results?",
      answer: "Follow the system and you will. If you're not seeing results, we adjust something. That's what weekly check-ins are for."
    },
    {
      question: "Do I need a gym membership?",
      answer: "Ideally, yes. But if you have basic equipment at home (barbell, dumbbells, bench) we can make it work."
    },
    {
      question: "What time zone are you in?",
      answer: "UK. But I work with clients globally and we make it work."
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            FAQs
          </h2>
        </div>

        <div className="mb-12">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left py-4 flex items-start gap-4 hover:opacity-80 transition-opacity"
              >
                <span
                  className="text-white mt-1 flex-shrink-0 transition-transform duration-200"
                  style={{
                    transform: openIndex === index ? "rotate(90deg)" : "rotate(0deg)",
                    fontSize: "0.875rem"
                  }}
                >
                  ▶
                </span>
                <span
                  className="text-lg text-white font-medium"
                  style={{ fontFamily: "Neuemontreal, sans-serif" }}
                >
                  {faq.question}
                </span>
              </button>

              {openIndex === index && (
                <div
                  className="pl-8 pb-4 text-gray-300 leading-relaxed"
                  style={{
                    animation: "slideDown 0.3s ease-out"
                  }}
                >
                  {faq.answer}
                </div>
              )}

              {index < faqs.length - 1 && (
                <div className="ml-8 border-t border-white/20"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
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

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
