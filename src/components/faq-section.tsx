"use client";

export default function FAQSection() {
  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8 text-left">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                How much time does this actually take per week?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The system is designed for busy high-performers. You'll need 2-3 training
                sessions per week (45 minutes each), plus some meal prep and sleep
                optimization. Most clients spend 4-5 hours total per week.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Do I need to buy expensive supplements or equipment?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                No. The system works with your body's natural processes. You may need
                basic gym access, but there are no required supplements. I'll show you
                how to get everything you need from real food.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                What if I travel frequently for work?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The system is designed to travel with you. I'll teach you how to maintain
                your protocols whether you're in hotels, restaurants, or different time zones.
                Many clients are frequent travelers.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                How is this different from other programs I've tried?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Most programs treat symptoms. We fix root causes. This isn't about
                willpower or motivation - it's about working with your body's natural
                intelligence instead of fighting it. Plus, you get personal coaching with me.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                What kind of results can I realistically expect?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Based on current client data: 26 lbs average weight loss, 89% success
                staying alcohol-free, 94% success eliminating caffeine, and testosterone
                increases averaging 300+ points. Individual results vary.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Do you offer a guarantee?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Yes. If you follow the system completely and don't see results within
                90 days, I'll refund your entire investment. The guarantee is simple:
                do the work, get the results, or don't pay.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                How do I know if I'm a good fit for this program?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You're likely a good fit if you're successful on paper but feel like
                crap, you're tired of fighting your body, and you're ready to invest
                in a proven solution. The application process helps us both determine fit.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                What happens after I apply?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You'll schedule a 30-minute call with me to discuss your goals and challenges.
                If we both agree it's a good fit, I'll explain the investment and next steps.
                No pressure - this is about finding the right match.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-lg rounded-lg transition-none duration-0"
              onClick={() => {
                const element = document.getElementById("application");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Still Have Questions? Apply Now.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
