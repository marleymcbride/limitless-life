"use client";

import { CTAButton } from "./ui/cta-button";

export default function BigIdeaSection() {
  return (
    <section className="bg-black py-20 px-4 w-full">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            className="text-3xl md:text-4xl font-semi-bold text-white mb-16"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            But it all made sense when I realised...
          </h2>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.4]"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Energy Is The Foundation Of Everything
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6" style={{ fontSize: "28px" }}>
            You can be successful on paper, but if you wake up feeling stressed,
            drag yourself through the day, and need substances just to function
            - you&apos;re living a lie. The gap between your external success
            and internal reality is eating you alive.
          </p>

          <div className="bg-gray-900 bg-opacity-50 rounded-lg p-8 mb-12">
            <h3
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
            >
              The Limitless Life: Waking Up With Natural Energy
            </h3>

            <p className="text-2xl md:text-2xl md:text-lg text-gray-300 leading-relaxed mb-6">
              Imagine waking up before your alarm feeling energized. Going
              through your day with sustained focus and clarity. Being present
              with your family instead of mentally checked out. Feeling proud of
              your body instead of ashamed of it.
            </p>

            <p className="text-2xl md:text-lg text-gray-300 leading-relaxed">
              This isn&apos;t a fantasy. This is what happens when you stop
              fighting your body and start working with its natural
              intelligence. Energy becomes the foundation that transforms your
              business, your relationships, and your entire life.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="text-left">
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                The Disconnect That&apos;s Destroying You
              </h3>
              <p className="text-2xl md:text-lg text-gray-300 leading-relaxed">
                You look successful to everyone else, but inside you feel like a
                fraud. You&apos;re pushing harder, using more coffee, more
                alcohol, more willpower - just to maintain the appearance of
                having it all together.
              </p>
            </div>

            <div className="text-left">
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                The Roadblocks You Face Every Day
              </h3>
              <p className="text-2xl md:text-lg text-gray-300 leading-relaxed">
                Restrictive diets that fail. Overtraining that leaves you
                exhausted. Using willpower to quit substances, only to cave
                under pressure. Winging it because no system seems to work for
                someone like you.
              </p>
            </div>

            <div className="text-left">
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                What If Nothing Changes?
              </h3>
              <p className="text-2xl md:text-lg text-gray-300 leading-relaxed">
                Another year passes. Your health gets worse. Your relationships
                suffer. Your business plateaus because you don&apos;t have the
                energy to take it to the next level. The gap between who you are
                and who you could be becomes permanent.
              </p>
            </div>
          </div>

          <CTAButton
            onClick={() => {
              window.location.href = "/application";
            }}
          >
            Start Living The Limitless Life
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
