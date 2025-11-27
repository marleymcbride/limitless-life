import { Lightbulb, Check } from "lucide-react";
import { bgClasses } from "@/lib/utils";
import MicroTestimonial from "./ui/micro-testimonial";

export default function DiscoverySection() {
  return (
    <section className={`w-full ${bgClasses.white} py-20 px-4`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#940909] flex items-center justify-center mb-6 shadow-lg">
            <Lightbulb className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            The 80/20 Discovery That Changed Everything
          </h2>
          <div className="w-20 h-1 bg-[#940909] rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="mb-6 text-2xl font-medium text-center">
            The real problem wasn't motivation or discipline.
          </p>

          <p className="mb-6 text-xl">
            My body's energy systems were completely broken from years of stress
            - poor nutrition - substance dependency. Was trying to fix symptoms
            - should have been fixing systems.
          </p>

          <div className="bg-gray-100 p-8 rounded-lg shadow-inner my-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-[#940909] text-white p-4 rounded-lg font-bold text-3xl flex items-center justify-center w-full sm:w-auto">
                80/20
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  The Efficiency Principle
                </h3>
                <p className="text-gray-700">
                  Found 80% of results came from fixing 20% of issues. Not more
                  workouts - not another diet - not another productivity hack.
                  Needed total system reset of these key areas:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#940909] mr-2 flex-shrink-0" />
                    <span>Morning energy protocol</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#940909] mr-2 flex-shrink-0" />
                    <span>Metabolic rebalancing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#940909] mr-2 flex-shrink-0" />
                    <span>Recovery optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#940909] mr-2 flex-shrink-0" />
                    <span>Substance dependency elimination</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mb-6 text-lg">
            <span className="font-semibold">
              Your body isn't broken - just running the wrong program.
            </span>{" "}
            Coffee masking fatigue - not fixing it. Alcohol numbing stress - not
            releasing it. Exercise draining you - not energizing you.
          </p>

          <p className="mb-8 text-lg">
            Created The Limitless Protocol. Complete systems approach to restore
            natural energy state. Reset four critical systems - all working
            together to create effortless performance.
          </p>

          <div className="bg-[#940909]/10 p-6 rounded-lg border-l-4 border-[#940909] text-center">
            <p className="text-xl font-semibold italic">
              "Remember how it felt waking up as a kid. Pure energy. No coffee
              needed. This is what we restore. Not through quick fixes - through
              fundamental system recalibration."
            </p>
          </div>
        </div>

        {/* Micro-testimonial for social proof */}
        <div className="mt-14 max-w-3xl mx-auto">
          <MicroTestimonial
            quote="The system reset approach made perfect sense. I'd been trying to fix individual symptoms for years with no results."
            name="Robert K."
            title="Tech Executive"
            metric="Systems Rebalanced"
            isDarkBackground={false}
          />
        </div>
      </div>
    </section>
  );
}
