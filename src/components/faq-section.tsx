import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"
import { bgClasses } from "@/lib/utils"
import ApplyNowButton from "./apply-now-button"

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
    {
      question: "Is there a guarantee?",
      answer:
        "Yes. We offer a 30-day money-back guarantee. If you follow the program as prescribed and don't experience significant improvements in your energy, body composition, or mental clarity within 30 days, we'll refund your investment in full.",
    },
  ]

  return (
    <section className={`w-full py-20 ${bgClasses.grey} text-white`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-white/20 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Questions</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Everything you need to know about the Limitless program
          </p>
        </div>

        <div className="mx-auto max-w-3xl mb-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-800/50 transition-all hover:bg-zinc-800/80"
              >
                <AccordionTrigger className="text-left text-lg font-medium px-6 py-4 hover:bg-zinc-800 hover:no-underline">
                  <span className="flex items-center">
                    <span className="text-[#940909] mr-3 font-bold">Q:</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-300 px-6 py-4 border-t border-zinc-700">
                  <div className="flex">
                    <span className="text-[#940909] mr-3 font-bold">A:</span>
                    <span>{faq.answer}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mx-auto max-w-3xl bg-zinc-800 p-8 rounded-lg shadow-lg">
          <p className="mb-6 text-xl">Ready to transform your energy, body, and mind?</p>
          <ApplyNowButton text="START YOUR TRANSFORMATION" />
          <p className="mt-6 text-sm text-zinc-400">Have more questions? Email us at support@limitlesslife.com</p>
        </div>
      </div>
    </section>
  )
}
