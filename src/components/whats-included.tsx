import { Check } from "lucide-react"
import { Button } from "./ui/button"

export default function WhatsIncluded() {
  const features = [
    {
      title: "Weekly 1:1 Coaching",
      description: "Direct access to your dedicated coach for personalized guidance and accountability",
      highlight: true
    },
    {
      title: "Metabolic Assessment",
      description: "Comprehensive analysis of your current metabolic function to create your custom plan",
      highlight: true
    },
    {
      title: "Custom Nutrition Protocol",
      description: "Personalized eating plan based on your metabolic type and lifestyle",
      highlight: true
    },
    {
      title: "Supplement Strategy",
      description: "Targeted supplement recommendations to accelerate your results",
      highlight: false
    },
    {
      title: "Exercise Blueprint",
      description: "Time-efficient exercise protocols that deliver maximum results in 3-4 hours per week",
      highlight: false
    },
    {
      title: "Sleep Optimization",
      description: "Customized strategies to improve deep sleep and recovery",
      highlight: false
    },
    {
      title: "Stress Management",
      description: "Practical techniques to reduce stress hormones and improve resilience",
      highlight: false
    },
    {
      title: "Travel & Restaurant Guides",
      description: "Maintain your progress even during business travel and dining out",
      highlight: false
    },
    {
      title: "Unlimited Text Support",
      description: "Get answers to your questions within 24 hours, 7 days a week",
      highlight: true
    },
    {
      title: "Biometric Tracking System",
      description: "Simple but powerful tools to track your progress and optimize results",
      highlight: false
    },
    {
      title: "Private Client Portal",
      description: "Access all your materials, track progress, and communicate with your coach",
      highlight: false
    },
    {
      title: "Lifetime Access",
      description: "Permanent access to all program materials and future updates",
      highlight: true
    },
  ]

  return (
    <section className="w-full bg-zinc-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Everything You Need For Success</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          The Limitless Program includes everything you need to transform your energy, body, and mind in just 12 weeks
        </p>

        <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex p-4 rounded-lg border ${feature.highlight 
                ? 'bg-[#940909]/10 border-[#940909]' 
                : 'bg-zinc-800/50 border-zinc-700'}`}
            >
              <div className={`mr-4 mt-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                feature.highlight ? 'bg-[#940909]' : 'bg-zinc-700'
              }`}>
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className={`font-bold mb-1 ${feature.highlight ? 'text-[#940909]' : 'text-white'}`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mx-auto max-w-2xl rounded-lg bg-zinc-800 p-6">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Transformation?</h3>
          <p className="mb-8">Join over 200 executives who've reclaimed their energy, body, and mind</p>
          
          <Button
            size="lg"
            className="mx-auto w-full max-w-md bg-[#940909] py-6 text-xl font-bold hover:bg-[#7b0707] transition-all hover:scale-105"
            asChild
          >
            <a href="#application" id="application">Get Started Today</a>
          </Button>
        </div>
      </div>
    </section>
  )
}