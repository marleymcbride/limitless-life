"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OfferItem {
  value: string;
  title: string;
  content: string;
}

const offerItems: OfferItem[] = [
  {
    value: "what-you-get",
    title: "What You Get With The Limitless Protocol",
    content: `Complete access to our proven 4-step system designed specifically for high-performers. This isn't another generic fitness program - it's a complete lifestyle transformation system that addresses the root causes of low energy, poor performance, and health issues.

You'll receive:
• The complete 4-Step Protocol (video training + guides)
• Personalized nutrition protocols
• Recovery optimization strategies
• Lifetime access to all updates
• Mobile app for on-the-go access`
  },
  {
    value: "how-it-works",
    title: "How The System Works",
    content: `The Limitless Protocol is built on the understanding that high-performers have different needs than typical fitness programs. Our system works WITH your body, not against it.

The 4 Steps:
1. **Energy Restoration** - Fix the root causes of your morning fatigue
2. **Protocol Personalization** - Tailor the system to your specific body and lifestyle
3. **Implementation** - Simple daily actions that fit your busy schedule
4. **Optimization** - Continuous refinement based on your progress

This approach ensures sustainable results without requiring extreme diets or time-consuming workouts.`
  },
  {
    value: "results",
    title: "Real Results From High-Performers",
    content: `Our clients have achieved remarkable transformations:

**Physical Results:**
• 26 lbs average weight loss
• 89% success staying alcohol-free
• 94% success eliminating caffeine dependence
• 300+ point average testosterone increases

**Performance Results:**
• Consistent morning energy without stimulants
• Enhanced mental clarity and focus
• Better sleep quality and recovery
• Increased productivity at work

**Life Results:**
• Improved relationships and intimacy
• More confidence and self-esteem
• Better stress management
• Overall life satisfaction improvement`
  },
  {
    value: "who-its-for",
    title: "This Is For High-Performers Who:",
    content: `• Feel successful on paper but exhausted internally
• Rely on coffee or other stimulants to function
• Have tried other programs without lasting success
• Are busy professionals with limited time
• Want sustainable results without extreme measures
• Are ready to invest in themselves

**This is NOT for:**
• Beginners just starting their fitness journey
• People looking for quick fixes or magic pills
• Those unwilling to make lifestyle changes
• Individuals seeking professional medical treatment`
  },
  {
    value: "support",
    title: "Support & Community",
    content: `You're never alone on your transformation journey. Depending on your chosen tier, you'll receive:

**All Tiers Include:**
• Complete video training library
• Email support from our team
• Private community access
• Regular updates and improvements

**Higher Tiers Include:**
• Group coaching calls
• 1-on-1 personal coaching
• Direct messaging access
• Priority support
• Personal accountability

We believe that personal support is crucial for high-achievers who are used to excellence in all areas of life.`
  },
  {
    value: "guarantee",
    title: "90-Day Money-Back Guarantee",
    content: `We're so confident in The Limitless Protocol that we offer a full 90-day money-back guarantee.

**Here's how it works:**
• Follow the system completely for 90 days
• If you don't see significant results, we'll refund your entire investment
• No questions asked, no hassle required
• Keep any materials you've received

This guarantee ensures that you can invest in your transformation with complete peace of mind. We only succeed when you succeed.`
  }
];

export default function OfferAccordion() {
  return (
    <div className="max-w-3xl mx-auto">
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
        defaultValue="what-you-get"
      >
        {offerItems.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="border border-gray-200 bg-white rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}