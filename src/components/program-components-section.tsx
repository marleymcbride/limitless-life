import { Check, Sunrise, Dumbbell, Coffee, BookOpen } from "lucide-react";
import {
  bgClasses,
  invertedGradientOverlay,
  strongRedAccent,
  vignetteEffect,
} from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function ProgramComponentsSection() {
  return (
    <section className="w-full py-20 px-4 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-[#940909]/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            THE METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            The Limitless Systems
          </h2>
          <p className="text-center text-xl mb-4 mx-auto max-w-3xl text-gray-800">
            Systematic approach to create natural energy - elite physique -
            razor-sharp mind
          </p>
          <p className="text-center text-lg mx-auto max-w-3xl text-gray-700">
            No willpower. No starvation. No bullshit 6-day gym routines.
          </p>
        </div>

        <div className="mx-auto grid gap-8 md:grid-cols-3 max-w-6xl">
          <div className="rounded-lg bg-gray-50 p-6 border-l-4 border-[#940909] shadow-md transform transition hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Sunrise className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Limitless Morning
              </h3>
            </div>
            <p className="mb-4 text-gray-700">
              Exact, systemized routine of specific foods and actions in precise
              order. Pure natural energy without caffeine or supplements. Mental
              clarity from dawn to dusk.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Strategic nutrition timing for steady energy
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Precision hydration protocol for mental clarity
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Maintains steady energy after midday meals
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Takes under 20 minutes total to implement
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 border-l-4 border-[#940909] shadow-md transform transition hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                The Limitless Training
              </h3>
            </div>
            <p className="mb-4 text-gray-700">
              Train just 2-3 times per week max. Focus on aesthetics and total
              body health. Protects CNS from overtaxing, prevents burnout,
              builds the "Natty Sweet Spot" physique.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Strategic compound and isolation exercises
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  No endless cardio or daily gym sessions
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Preserves muscle while accelerating fat loss
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Time-efficient workouts with maximum results
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 border-l-4 border-[#940909] shadow-md transform transition hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-[#940909] flex items-center justify-center mr-4">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Limitless Flow
              </h3>
            </div>
            <p className="mb-4 text-gray-700">
              Natural high state - free from caffeine, alcohol or substances.
              Inner game focused, prioritizing mindset over trackers or
              willpower. Returns to childlike state of peace and joy.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Strategic caffeine elimination protocol
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Natural alcohol reduction system
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Mindset restructuring for natural relaxation
                </span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 mt-1 h-4 w-4 text-[#940909] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Brain-based stress elimination techniques
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 bg-gray-100 p-4 rounded-lg shadow-sm">
          <MicroTestimonial
            quote="The Limitless Morning protocol alone was worth the entire investment. I haven't touched coffee in 4 months and have more energy than ever."
            name="Eric W."
            title="Sales Director"
            metric="120 Days Caffeine-Free"
          />
        </div>
      </div>
    </section>
  );
}
