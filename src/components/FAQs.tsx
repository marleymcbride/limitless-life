"use client";

import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FinalFAQsV2() {
  const [scrollY, setScrollY] = useState(0);
  const accordionRef = useRef<HTMLDivElement>(null);

  // Restore scroll position after collapse animation
  useEffect(() => {
    if (scrollY > 0) {
      const timer = setTimeout(() => {
        window.scrollTo(0, scrollY);
        setScrollY(0);
      }, 300); // Wait for animation to complete
      return () => clearTimeout(timer);
    }
  }, [scrollY]);

  const faqs = [
    {
      question: "What does the program look like?",
      answer: "Most guys see results within the first 30 days, with the full duration starting at 90 days to see life-changing results. \n\n We will craft your Limitless Blueprint based on where you're at and what you want to achieve, to see the best plan for you."
    },
    {
      question: "How much does it cost?",
      answer: "Your investment varies based on your situation. We have multiple tiers of access, so you can choose what works best for you. \n\n When you click the 'Apply Now' button you will get a quick breakdown of each tier so you can choose the best level for your situation."
    },
    {
      question: "Do I really have to quit alcohol?",
      answer: "I'm not here to tell you how to live your life. But if you've got this far, that tells me you're serious about changing your life. \n\n  Whilst not a dealbreaker, the best fit for the programme will want to get off alcohol, as it is the single GREATEST thing you can do to achieve a new reality."
    },
    {
      question: "I've tried a plan before, what makes this different?",
      answer: "The Limitless Protocol isn't a plan, it's a new way of living.  \n\n This is the only health programme that will get you off alcohol easily, help you lose your gut in 2 days of training, and give you natural energy for life."
    },
    {
      question: "Do I need a gym membership?",
      answer: "Yes. This programme is for getting real results. Whilst you only need a couple days of training, you will need access to some gym equipment and machines."
    },
    {
      question: "Can I train more than 2-3 days per week?",
      answer: "You can.. but your results will be worse. Our Rest-Focused Training system is designed to maximise minimal time spent in the gym, and focusses on the 'rest and recovery' outside the gym so you feel great every day."
    },
  
    {
      question: "What if I travel a lot for work?",
      answer: "Limitless has been carefully designed to work with travel, busy work schedules and your personal life. \n\n With only 2-3 days of training and our simple daily systems, you can keep following your plan and stay on track no matter your location or schedule."
    },
    {
      question: "I'm older, will this still work?",
      answer: "I made Limitless with the goal of creating a simple, easy system that can be repeated forever. So whether you're 35 or 65 you will get great results with this system."
    },
    {
      question: "Is this better than typical training?",
      answer: "Our systems deliver genuinely life-changing results in your work, your family & relationships, and all aspects of your health, peace and happiness. \n\n Unlike typical coaching and in-person trainers, The Limitless Protocol has been intentionally crafted to deliver a complete holistic experience with your life. We work with you 24/7, don't require you to be at the gym at a certain time each week to get your reps counted, and keep you accountable every day."
    },
    {
      question: "Will this work for me?",
      answer: "This system is completely tailor-designed for you, your schedule and your social and family life. I have no doubt you will get your dream body and health like the testimonials below if you follow it."
    }
  ];

  return (
    <>
      <div className="dark-section-with-grain">
        <section className="py-16 px-4 w-full relative overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-30">

        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-0"
            style={{ fontFamily: "Neuemontreal, sans-serif", lineHeight: "1.1" }}
          >
            FAQs
          </h2>
        </div>

        <div className="mb-12 mx-auto px-4" style={{ maxWidth: "750px" }} ref={accordionRef}>
          <Accordion
            collapsible
            className="w-full"
            type="single"
            onValueChange={(value) => {
              // Store scroll position before collapse
              if (!value) {
                setScrollY(window.scrollY);
              }
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                className="border-b border-white/20 overflow-hidden"
                key={index}
                value={`item-${index}`}
                style={{ scrollMarginTop: "100px" }}
              >
                <AccordionTrigger className="hover:no-underline py-2 text-white [&[data-state=open]>svg]:rotate-180">
                  <span className="text-2xl font-medium" style={{ fontFamily: "Neuemontreal, sans-serif" }}>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed pb-4 text-base pl-8">
                  <div
                    className="animate-faq-slide space-y-3"
                    style={{
                      animationDuration: "0.3s",
                      animationTimingFunction: "ease-out",
                      animationFillMode: "forwards"
                    }}
                  >
                    {faq.answer.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
        @keyframes faq-slide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-faq-slide {
          animation-name: faq-slide;
        }

        /* Prevent accordion from jumping the page */
        html {
          scroll-behavior: smooth;
        }

        [data-state="open"] > div[data-radix-accordion-content] {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
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
