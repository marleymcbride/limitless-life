"use client";

import { CTAButton } from "./ui/cta-button";

export default function FAQSection() {
  return (
    <section className="bg-black py-20 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        <div className="prose prose-lg max-w-none mobile-text-large body-copy dark-mode-copy">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight"
              style={{ fontFamily: "Neuemontreal, sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                How much time does this actually take per week?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                The system is designed for busy high-performers. You'll need 2-3
                training sessions per week (45 minutes each), plus some meal
                prep and sleep optimization. Most clients spend 4-5 hours total
                per week.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                Do I need to buy expensive supplements or equipment?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                No. The system works with your body's natural processes. You may
                need basic gym access, but there are no required supplements.
                I'll show you how to get everything you need from real food.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                What if I travel frequently for work?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                The system is designed to travel with you. I'll teach you how to
                maintain your protocols whether you're in hotels, restaurants,
                or different time zones. Many clients are frequent travelers.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                How is this different from other programs I've tried?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                Most programs treat symptoms. We fix root causes. This isn't
                about willpower or motivation - it's about working with your
                body's natural intelligence instead of fighting it. Plus, you
                get personal coaching with me.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                What kind of results can I realistically expect?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                Based on current client data: 26 lbs average weight loss, 89%
                success staying alcohol-free, 94% success eliminating caffeine,
                and testosterone increases averaging 300+ points. Individual
                results vary.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                Do you offer a guarantee?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                Yes. If you follow the system completely and don't see results
                within 90 days, I'll refund your entire investment. The
                guarantee is simple: do the work, get the results, or don't pay.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                How do I know if I'm a good fit for this program?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-6">
                You're likely a good fit if you're successful on paper but feel
                like crap, you're tired of fighting your body, and you're ready
                to invest in a proven solution. The application process helps us
                both determine fit.
              </p>
            </div>

            <div className="text-left">
              <p className="mini-heading text-white leading-relaxed mb-6">
                What happens after I apply?
              </p>
              <p className="faq-answer text-gray-200 leading-relaxed mb-12">
                You'll schedule a 30-minute call with me to discuss your goals
                and challenges. If we both agree it's a good fit, I'll explain
                the investment and next steps. No pressure - this is about
                finding the right match.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Still Have Questions? Apply Now.
          </a>
        </div>
      </div>
    </section>
  );
}
