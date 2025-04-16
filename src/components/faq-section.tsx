import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

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
      question: "Is there a guarantee?",
      answer:
        "Yes. We offer a 30-day money-back guarantee. If you follow the program as prescribed and don't experience significant improvements in your energy, body composition, or mental clarity within 30 days, we'll refund your investment in full.",
    },
  ]

  return (
    <section className="w-full bg-zinc-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-zinc-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
