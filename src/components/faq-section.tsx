import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"
import { bgClasses } from "@/lib/utils"
import ApplyNowButton from "./apply-now-button"
import { Shield, Check } from "lucide-react"

export default function FaqSection() {
  const faqs = [
    {
      question: "How much time will this take each week?",
      answer:
        "The program is specifically designed for busy executives. You'll need about 3-4 hours per week for exercise, 30 minutes for weekly coaching, and about 15 minutes daily for tracking and habits. We focus on efficiency and results, not time-consuming activities.",
    },
    {
      question: "I've tried other programs before. How is this different?",
      answer:
        "Most programs focus on just one aspect—diet, exercise, or mindset. The Limitless Method addresses all four critical systems simultaneously: metabolic, physiological, cognitive, and behavioral. This integrated approach is why our clients see results when other programs have failed them.",
    },
    {
      question: "Do I need special equipment or a gym membership?",
      answer:
        "No. The exercise protocols can be done with minimal equipment at home or in a hotel room. If you have gym access, we'll incorporate that, but it's not required. We design everything to fit your lifestyle and available resources.",
    },
    {
      question: "I travel frequently for work. Will this still work for me?",
      answer:
        "Absolutely. The program is specifically designed for executives who travel. We provide travel protocols, restaurant guides, and strategies for maintaining progress no matter where you are in the world.",
    },
    {
      question: "How quickly will I see results?",
      answer:
        "Most clients report significant energy improvements within the first 7-10 days. Visible physical changes typically begin around week 3-4, with major transformations by week 8-12. The exact timeline depends on your starting point and consistency.",
    },
    {
      question: "Will this work with my medical condition?",
      answer:
        "We've worked successfully with clients managing various health conditions including high blood pressure, pre-diabetes, and thyroid issues. During our initial assessment, we'll review your medical history to ensure our approach is appropriate for your specific situation. In some cases, we may suggest working with your physician for monitoring as you progress.",
    },
  ]

  return (
    <section className={`w-full py-20 ${bgClasses.white}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#940909]/10 text-[#940909] text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Questions</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Everything you need to know about the Limitless program
          </p>
        </div>

        {/* 100% Results Guarantee Section */}
        <div className="max-w-4xl mx-auto mb-12 bg-gray-50 p-8 sm:p-10 rounded-lg border border-gray-200 shadow-xl">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-[#940909] p-5 rounded-full mb-6 md:mb-0 md:mr-8 flex-shrink-0">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left text-gray-900">100% Results Guarantee</h2>
              <p className="text-gray-600 text-center md:text-left">No risk, just transformation</p>
            </div>
          </div>

          <p className="text-lg mb-6 text-gray-700">
            If you don't see significant energy improvements in 30 days, we refund every penny. No questions asked. No awkward conversations.
          </p>

          <p className="text-lg mb-6 text-gray-700">
            We're so confident in the Limitless Protocol's effectiveness that we're willing to take on all the risk. You either experience the transformation, or you don't pay.
          </p>

          <div className="bg-[#940909]/5 p-6 rounded-lg border-l-4 border-[#940909] mb-8">
            <p className="text-lg font-semibold text-gray-800">
              This guarantee is simple. Follow the system for 30 days. If you don't feel dramatically better - more energy, improved focus, better sleep - just let us know and get a complete refund.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Why we can make this guarantee:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#940909] rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700">We've tested and refined this system with hundreds of high-performers</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[#940909] rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700">The Limitless Protocol is based on proven science, not trendy health fads</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[#940909] rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700">Our success rate is over 95% with committed participants</p>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Questions */}
        <div className="mx-auto max-w-3xl mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Questions</h3>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 transition-all hover:bg-gray-100"
              >
                <AccordionTrigger className="text-left text-lg font-medium px-6 py-4 text-gray-900 hover:bg-gray-100 hover:no-underline">
                  <span className="flex items-center">
                    <span className="text-[#940909] mr-3 font-bold">Q:</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 py-4 border-t border-gray-200">
                  <div className="flex">
                    <span className="text-[#940909] mr-3 font-bold">A:</span>
                    <span>{faq.answer}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mx-auto max-w-3xl bg-[#940909]/10 p-8 rounded-lg shadow-lg border border-[#940909]/30">
          <p className="mb-6 text-2xl font-bold text-gray-900">Ready to transform your energy, body, and mind?</p>
          <ApplyNowButton text="START YOUR TRANSFORMATION" />
          <p className="mt-6 text-sm text-gray-600">Have more questions? Email us at support@limitlesslife.com</p>
        </div>
      </div>
    </section>
  )
}
