import TestimonialCard from "./testimonial-card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I was skeptical at first, but after just 4 weeks I had more energy than I'd had in years. By week 8, I'd lost 18 pounds and my team started commenting on how much more focused and present I was in meetings.",
      name: "Michael T.",
      title: "CFO, Healthcare",
      results:
        "18 lbs lost, eliminated afternoon crashes, reduced stress by 60%",
      imageSrc: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a 42-year-old CEO, I thought feeling tired and stressed was just part of the job. The Limitless Method showed me it doesn't have to be. I've lost 22 pounds, sleep better than I have in a decade, and have the energy to crush my workday AND be present with my family.",
      name: "David K.",
      title: "CEO, SaaS Company",
      results: "22 lbs lost, 90% reduction in caffeine, doubled productivity",
      imageSrc: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I tried every diet and workout program out there with minimal results. The difference with Limitless is they fixed my energy and metabolism first, then the weight loss and mental clarity followed naturally. Game changer for busy executives.",
      name: "Jason M.",
      title: "VP Sales, Technology",
      results: "15 lbs lost, eliminated brain fog, 3x energy levels",
      imageSrc: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "At 47, I thought my best days were behind me. After 12 weeks with Limitless, I'm in better shape than I was at 35, have more energy than my 20-something employees, and my business is thriving because I can think clearly again.",
      name: "Robert P.",
      title: "Founder, Marketing Agency",
      results:
        "26 lbs lost, eliminated blood pressure medication, 70% less stress",
      imageSrc: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section className="w-full bg-zinc-900 py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
          Real Results from Real Executives
        </h2>
        <p className="mb-12 text-center text-xl">
          Men just like you who transformed their energy, body, and mind
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              results={testimonial.results}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-bold">
            And dozens more success stories just like these...
          </p>
        </div>
      </div>
    </section>
  );
}
