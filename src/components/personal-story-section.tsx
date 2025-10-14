import { bgClasses } from "@/lib/utils";

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.white} py-16 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* IRRESISTIBLE HEADLINE - Can't help but read */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              I Was Drinking Wine At 11 AM Just To Get Through Client Meetings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Here's the embarrassing truth about how a successful guy can look
              like he has it all together while slowly destroying himself...
            </p>
          </div>

          {/* THE ACTUAL STORY - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Let me paint you a picture of what my life looked like three years
              ago.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              I'd wake up every morning feeling like I'd been hit by a truck.
              Before my feet even hit the floor, I was already thinking about
              coffee. Not because I enjoyed it, but because I literally couldn't
              function without it.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              By 8 AM, I'd already had two double espressos. By 10 AM, I was
              looking for my third. And when I had those brutal client meetings
              that made my stomach churn? I'd sneak a glass of wine beforehand
              just to take the edge off. At 11 in the morning.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              I told myself it was just "stress management." That successful
              people do whatever it takes to perform. But deep down, I knew I
              was lying to myself.
            </p>

            {/* Drop in some credibility naturally */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 my-8 rounded-r-lg">
              <p className="text-lg text-gray-700 italic">
                The wake-up call came when my doctor showed me my bloodwork.
                Testosterone: 346 ng/dl. For reference, that's what you'd expect
                from an 80-year-old man. I was 32.
              </p>
            </div>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              "You're heading for a heart attack before 40 if you don't change,"
              he said. I was carrying an extra 35 pounds, my energy was
              non-existent after 2 PM, and I couldn't sleep without wine.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              So I did what any rational person would do. I tried to fix it.
              Keto diet, intermittent fasting, more cardio, less cardio,
              expensive personal trainers, every supplement stack you can
              imagine. I probably spent £15,000 in six months trying everything.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Nothing worked. I'd see small improvements for a few weeks, then
              crash back to feeling like shit. The problem wasn't effort—I was
              putting in massive effort. The problem was I was treating symptoms
              instead of the root cause.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Then I discovered something that changed everything. I realized I
              was living on what I now call "Drag Energy"—forcing my body
              through each day with stimulants and depressants. What I needed
              was "Glide Energy"—natural, sustained power that flows
              effortlessly.
            </p>

            <div className="my-8">
              <p className="text-lg text-gray-800 font-bold mb-4">
                Here's what happened when I stopped fighting my body:
              </p>
              <ul className="mt-4 space-y-2 text-lg text-gray-800">
                <li>• Lost 35 lbs of pure fat (212 → 177 lbs)</li>
                <li>• 1000+ days alcohol-free (no willpower required)</li>
                <li>• 365+ days caffeine-free (wake up naturally energized)</li>
                <li>• Testosterone: 346 → 678 ng/dl (naturally, no TRT)</li>
                <li>• Energy flows steady from 6 AM to 10 PM</li>
              </ul>
            </div>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              The crazy part? I only train 2-3 times per week now. I eat more
              food than I used to. I sleep like a baby and wake up feeling
              electric. No supplements, no biohacks, no complicated routines.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              This isn't about willpower or motivation. It's about understanding
              how your body actually works and working WITH it instead of
              against it.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              The transformation was so dramatic that other guys started asking
              what I was doing. High-performers like yourself who were stuck in
              the same cycle I was. That's when I realized this needed to become
              a system that any guy could follow.
            </p>

            <div className="text-center mt-12 p-6 bg-gray-100 rounded-lg">
              <p className="text-xl font-bold text-gray-900 mb-4">
                If you're tired of feeling like shit despite doing "everything
                right," you're exactly where I was three years ago.
              </p>
              <p className="text-lg text-gray-700">
                The question is: Are you ready to stop fighting your body and
                start working with it?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
