import { Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  bgClasses,
  invertedGradientOverlay,
  strongRedAccent,
  vignetteEffect,
} from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function WhatsIncluded() {
  const features = [
    {
      title: "Weekly 1:1 Coaching",
      description:
        "Direct access to your dedicated coach for personalized guidance and accountability",
      highlight: true,
    },
    {
      title: "Metabolic Assessment",
      description:
        "Comprehensive analysis of your current metabolic function to create your custom plan",
      highlight: true,
    },
    {
      title: "Custom Nutrition Protocol",
      description:
        "Personalized eating plan based on your metabolic type and lifestyle",
      highlight: true,
    },
    {
      title: "Supplement Strategy",
      description:
        "Targeted supplement recommendations to accelerate your results",
      highlight: false,
    },
    {
      title: "Exercise Blueprint",
      description:
        "Time-efficient exercise protocols that deliver maximum results in 3-4 hours per week",
      highlight: false,
    },
    {
      title: "Sleep Optimization",
      description: "Customized strategies to improve deep sleep and recovery",
      highlight: false,
    },
    {
      title: "Stress Management",
      description:
        "Practical techniques to reduce stress hormones and improve resilience",
      highlight: false,
    },
    {
      title: "Travel & Restaurant Guides",
      description:
        "Maintain your progress even during business travel and dining out",
      highlight: false,
    },
    {
      title: "Unlimited Text Support",
      description:
        "Get answers to your questions within 24 hours, 7 days a week",
      highlight: true,
    },
    {
      title: "Biometric Tracking System",
      description:
        "Simple but powerful tools to track your progress and optimize results",
      highlight: false,
    },
    {
      title: "Private Client Portal",
      description:
        "Access all your materials, track progress, and communicate with your coach",
      highlight: false,
    },
    {
      title: "Lifetime Access",
      description:
        "Permanent access to all program materials and future updates",
      highlight: true,
    },
  ];

  return (
    <section className="w-full py-20 bg-black relative text-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#101035] to-[#000]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#940909]/30 via-[#940909]/10 to-transparent"></div>
      {vignetteEffect}
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-white/20 text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            THE PACKAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need For Success
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            The Limitless Program includes everything you need to transform your
            energy, body, and mind in just 12 weeks
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex p-4 rounded-lg border transform transition-none  ${
                feature.highlight
                  ? "bg-[#940909]/10 border-[#940909] hover:bg-[#940909]/15"
                  : "bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <div
                className={`mr-4 mt-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  feature.highlight ? "bg-[#940909]" : "bg-zinc-700"
                }`}
              >
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3
                  className={`font-bold mb-1 ${
                    feature.highlight ? "text-[#940909]" : "text-white"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-white">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add testimonial for social proof */}
        <div className="mb-12 max-w-4xl mx-auto">
          <MicroTestimonial
            quote="The lifetime access alone is worth the investment. Two years later, I still refer back to the materials when I need a reset."
            name="Mark D."
            title="Entrepreneur"
            metric="Still Going Strong"
          />
        </div>

        <div className="text-center mx-auto max-w-2xl rounded-lg bg-zinc-800 p-8 shadow-lg transform transition-none hover:shadow-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Transformation?
          </h3>
          <p className="mb-8 text-lg">
            Join over 200 executives who've reclaimed their energy, body, and
            mind
          </p>

          <Button
            size="lg"
            className="mx-auto w-full max-w-md bg-[#940909] py-6 text-xl font-bold hover:bg-[#7b0707] transition-none  uppercase tracking-wide"
            asChild
          >
            <a href="#application" id="application">
              Get Started Today
            </a>
          </Button>

          <p className="mt-6 text-sm flex items-center justify-center">
            <Check className="mr-2 h-5 w-5 text-[#940909]" />
            <span>Limited to just 10 spots this month</span>
          </p>
        </div>
      </div>
    </section>
  );
}
