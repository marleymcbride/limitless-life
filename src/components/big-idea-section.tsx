export default function BigIdeaSection() {
  return (
    <section className="w-full bg-black text-white relative pt-10 pb-20">
      {/* Dark gradient overlay - made darker and more black */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="prose prose-lg max-w-none mobile-text-large body-copy dark-mode-copy">
            {/* Main headline - matching Personal Story structure */}
            <div className="text-center mb-6">
              <p
                className="text-4xl md:text-3xl lg:text-4xl mb-4 text-white leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif", fontWeight: "400" }}
              >
                It All Made Sense When I Realised...
              </p>
            </div>

            <div className="text-center mb-8">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight"
                style={{ fontFamily: "Neuemontreal, sans-serif" }}
              >
                Energy Is The Foundation Of Everything
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">
              You can be successful on paper, but if you wake up feeling stressed,
              drag yourself through the day, and need substances just to function
              - you&apos;re living a lie.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              The gap between your external success and internal reality is eating you alive.
            </p>

            <p className="mini-heading text-white leading-relaxed mb-6">
              The Limitless Life: Waking Up With Natural Energy
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Imagine waking up before your alarm feeling energized.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Going through your day with sustained focus and clarity.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Being present with your family instead of mentally checked out.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Feeling proud of your body instead of ashamed of it.
            </p>

            <p className="text-gray-200 font-bold leading-relaxed mb-6">
              This isn&apos;t a fantasy.
            </p>

            <p className="text-gray-200 leading-relaxed mb-10">
              This is what happens when you stop fighting your body and start working with its natural intelligence.
            </p>

            <p className="dark-mode-formatted-quote text-gray-50 leading-relaxed">
              Energy becomes the foundation that transforms your business, your relationships, and your entire life.
            </p>

            <p className="mini-heading text-white leading-relaxed mt-8 mb-6">
              The Disconnect That&apos;s Destroying You
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              You look successful to everyone else, but inside you feel like a fraud.
            </p>

            <p className="text-gray-200 leading-relaxed mb-0">
              You&apos;re pushing harder, using more coffee, more alcohol, more willpower
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              just to maintain the appearance of having it all together.
            </p>

            <p className="mini-heading text-white leading-relaxed mb-6">
              The Roadblocks You Face Every Day
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Restrictive diets that fail.
            </p>

            <p className="text-gray-200 leading-relaxed mb-0">
              Overtraining that leaves you exhausted.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Using willpower to quit substances, only to cave under pressure.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Winging it because no system seems to work for someone like you.
            </p>

            <p className="mini-heading text-white leading-relaxed mb-6">
              What If Nothing Changes?
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Another year passes.
            </p>

            <p className="text-gray-200 leading-relaxed mb-0">
              Your health gets worse.
            </p>

            <p className="text-gray-200 leading-relaxed mb-0">
              Your relationships suffer.
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">
              Your business plateaus because you don&apos;t have the energy to take it to the next level.
            </p>

            <p className="text-gray-200 font-bold leading-relaxed mb-6">
              The gap between who you are and who you could be becomes permanent.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/application"
              className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-3 px-12 text-lg rounded-md inline-block relative z-30"
            >
              Start Living The Limitless Life
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
