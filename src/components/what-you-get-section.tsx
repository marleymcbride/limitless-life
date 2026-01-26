export default function WhatYouGetSection() {
  const items = [
    {
      title: "1-on-1 Coaching & Support",
      description: "Direct access to me for the entire program. Get any question answered and feedback on your training, nutrition, and lifestyle. This isn't a group program. You work directly with me."
    },
    {
      title: "The Complete Limitless Systems",
      description: "All four systems laid out step-by-step. Morning Fuel System protocols. Exact training programs. Limitless Flow practices. Health optimization strategies. No guessing. Just follow the system."
    },
    {
      title: "Your Custom Limitless Gameplan",
      description: "Built specifically for your body after The Bottleneck Test™ identifies exactly where we should put our efforts. No cookie-cutter plans. Your gameplan is unique to you."
    },
    {
      title: "Complete Training Program",
      description: "2-3 day complete exercise library via our training and nutrition app. When your body is already fried, more training just burns you out faster. We target muscles that matter. We protect your CNS."
    },
    {
      title: "Personalized Nutrition Protocol",
      description: "Exactly how to eat to burn fat and build muscle whilst still enjoying foods like burgers and pizzas. No starvation. No restriction. Just smart nutrition that works with your life."
    },
    {
      title: "Weekly Check-Ins & Adjustments",
      description: "We track progress weekly and adjust as needed. Energy levels. Body composition. Sleep quality. Work performance. If something's not working, we fix it immediately."
    },
    {
      title: "Form Checks & Lift Analysis",
      description: "Get in-depth review videos of your training with detailed feedback on what to fix. You'll always know you're doing it right and getting the most from every session."
    },
    {
      title: "Hormone & Health Protocols",
      description: "I analyze your labs and work with you to improve your hormones and key health markers. We use Metabolic Priming™ and the Hormone Reset™ to fix what's actually broken."
    },
    {
      title: "Lifetime Access + Updates",
      description: "Keep all training materials forever. Get free updates as I refine the system. Your investment now covers you for life. This is the complete system. No upsells. No hidden costs."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            What You Get With The Limitless Protocol
          </h2>
          <p className="text-lg text-gray-700">
            Complete access to our proven 4-step system designed specifically for high-performers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200"
            >
              <h3
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
