import { Check, Zap } from "lucide-react";
import { bgClasses } from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function ResultsSection() {
  const results = [
    // Body results
    {
      category: "BODY",
      result:
        "Transform to ideal 11-14% body fat without extreme dieting - look lean and powerful without sacrificing performance",
    },
    {
      category: "HORMONES",
      result:
        "Optimize testosterone naturally - eliminate fatigue - restore masculine energy - reclaim your primal drive without TRT",
    },
    {
      category: "HEALTH",
      result:
        "Strengthen immune system - normalize blood pressure - optimize cholesterol - reduce inflammation - prevent disease",
    },
    {
      category: "PEACE",
      result:
        "Eliminate anxiety - banish racing thoughts - feel deep calm throughout your day - end dependence on alcohol to relax",
    },
    {
      category: "ENERGY",
      result:
        "Wake up fully charged before your alarm - maintain peak energy all day - never crash - zero caffeine dependency",
    },
    {
      category: "MENTAL HEALTH",
      result:
        "Reclaim mental clarity - eliminate brain fog - sharpen focus - make better decisions - lead with confidence and power",
    },
    {
      category: "HAPPINESS",
      result:
        "Experience natural joy daily - feel fulfilled - find purpose - enjoy life without substances or external validation",
    },
    {
      category: "INTEGRATION",
      result:
        "All systems working together in perfect harmony - the complete optimization of male existence - The Natty Sweet Spot",
    },
  ];

  return (
    <section className={`w-full py-20 px-4 ${bgClasses.white}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            THE TRANSFORMATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            The 7 Components of Your Limitless Transformation
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              BODY
            </span>
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              HORMONES
            </span>
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              HEALTH
            </span>
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              PEACE
            </span>
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              ENERGY
            </span>
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              MENTAL HEALTH
            </span>
            <span className="bg-[#940909]/10 text-[#940909] px-3 py-1 rounded-full text-sm font-bold">
              HAPPINESS
            </span>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Complete optimization in every domain of male existence - here's
            what happens when you implement The Limitless Protocol:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {results.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
            >
              <div className="bg-[#940909] text-white text-sm font-bold px-5 py-2">
                {item.category}
              </div>
              <div className="flex items-start p-5">
                <div className="p-2 bg-[#940909]/10 rounded-full flex-shrink-0 mr-4">
                  <Zap className="w-5 h-5 text-[#940909]" />
                </div>
                <p className="text-xl md:text-base text-gray-800 font-medium">
                  {item.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mt-16 max-w-5xl mx-auto">
          <MicroTestimonial
            quote="I'm performing at levels I never thought possible at 42. My team has noticed, my family has noticed, everyone's noticed."
            name="Thomas B."
            title="Regional Manager"
            metric="15 Years Younger"
            isDarkBackground={false}
          />
        </div>

        <div className="mt-12 bg-gray-100 p-8 rounded-lg max-w-3xl mx-auto border border-[#940909]/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Achieve Your Natty Sweet Spot
            </h3>
            <p className="text-lg">
              I help high-performing men quit alcohol permanently - eliminate
              fake energy crutches - drop the 20-40 lbs of stress weight. Here's
              what you get when you reach The Natty Sweet Spot:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="p-1 bg-[#940909] rounded-full mr-2">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <h4 className="font-bold">Career Dominance</h4>
              </div>
              <p className="text-sm">
                Command any room - inspire your team - make sharper decisions -
                close bigger deals - accelerate promotion timeline
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="p-1 bg-[#940909] rounded-full mr-2">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <h4 className="font-bold">Family Leadership</h4>
              </div>
              <p className="text-sm">
                Be fully present with kids - energetic, engaged father -
                thoughtful partner - set powerful example - lead your household
                properly
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="p-1 bg-[#940909] rounded-full mr-2">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <h4 className="font-bold">Social Power</h4>
              </div>
              <p className="text-sm">
                Command respect everywhere - stand out at events - confidence
                without alcohol - magnetic presence - authentic connections
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="p-1 bg-[#940909] rounded-full mr-2">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <h4 className="font-bold">Complete Freedom</h4>
              </div>
              <p className="text-sm">
                Free from substance dependency - free from energy crashes - free
                from weakness - truly powerful, truly in command
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
