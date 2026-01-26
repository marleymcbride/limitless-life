import { bgClasses } from "@/lib/utils";
import PersonalStorySection from "./personal-story-section";
import { ReactNode } from "react";

export default function PersonalStorySection1() {
  // Get the full personal story component
  const fullStory = PersonalStorySection();

  // Extract first part (lines 14-85: from headline to "supplements I saw online")
  return (
    <section className={`w-full ${bgClasses.white} pt-12 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="prose prose-lg max-w-none mobile-text-large body-copy">
            <div className="text-center mb-6">
              <h2
                className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Three Years Ago I Was Blackout Drunk On A Mud-Stained Mattress
              </h2>
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
            Do you ever wake up feeling like complete shit?


            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            I know the feeling.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I had the Masters degree on the wall, hitting the gym, earning decent money.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              People would say I &apos;had my shit together&apos;...
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              But the truth?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">

            </p>

            <p className="mini-heading text-gray-800 leading-relaxed mb-6">
            My life was hell.
            </p>

            <p className="text-gray-800 leading-relaxed">
             Falling asleep at my desk at 10am.
            </p>

            <p className="text-gray-800 leading-relaxed mb-0">
            Drinking every night.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
            And a gut hanging over my trousers.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              On top of this I was stressed out, anxious, and unhappy with my life.


            </p>

            <p className="text-gray-800 font-bold leading-relaxed mb-6">
              What did I do?
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              Blamed it on everyone else of course!
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I blamed my job... quit engineering and became a Personal Trainer.
            </p>

            <p className="text-gray-800 leading-relaxed mb-6">
              I blamed my genetics... and started buying all these supplements I saw online.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
