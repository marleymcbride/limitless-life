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
    content: `Complete access to our proven 4-step system designed specifically for high-performers. This isn't another generic fitness program - it's a complete lifestyle transformation system.

**Everything Included:**
• Your Custom Limitless Gameplan - Built after The Bottleneck Test™ identifies exactly where we focus
• Complete Training Program - 2-3 day system with full exercise library via our app
• Personalized Nutrition Protocol - Burn fat and build muscle while still enjoying foods you love
• 24/7 Direct WhatsApp Access - Daily support whenever you need it
• Form Checks & Lift Analysis - In-depth video reviews and feedback
• Hormone & Health Protocols - We analyze your labs and improve your key markers
• Weekly Coaching Calls - Cover all topics of Limitless with group support
• Lifetime Access - All future updates included

This is the complete system. No upsells. No hidden costs.`,
  },
  {
    value: "how-it-works",
    title: "How The System Works",
    content: `The Limitless Protocol™ uses 4 proven systems to transform your energy, body, and health:

**1. The Limitless Morning**
We use The Anti-Stack™ system to rewire your natural energy production. You'll wake up fired up without caffeine crashes or supplement dependence. Your body starts producing its own energy again.

**2. Rest-Focused Training**
Train 2-3 days per week using the Power Presence Method™. We build the muscles that create masculine presence and aura. Your body grows when it recovers, not when you grind yourself into the ground.

**3. Limitless Flow™**
We design your entire lifestyle, not just a fitness regime. You reduce stress to a minimum, become present and confident without needing alcohol, and radiate real energy without endless coffees.

**4. The Health Reset™**
The Bottleneck Test™ identifies your biggest constraints. We use Metabolic Priming™ and the Hormone Reset™ to fix what's actually broken. Your metabolism resets, your gut heals, your testosterone comes back.

This is the complete system. No hacks. No shortcuts. Just what actually works.`,
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
• Overall life satisfaction improvement`,
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
• Individuals seeking professional medical treatment`,
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

We believe that personal support is crucial for high-achievers who are used to excellence in all areas of life.`,
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

This guarantee ensures that you can invest in your transformation with complete peace of mind. We only succeed when you succeed.`,
  },
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
