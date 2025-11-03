import { bgClasses } from "@/lib/utils";

export default function PersonalStorySection() {
  return (
    <section className={`w-full ${bgClasses.white} py-20 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* THE ACTUAL STORY - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                Three Years Ago I Was Blackout Drunk On A Mud-Stained Mattress
              </h2>
            </div>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Right so back in 2021 I looked great from the outside. Masters degree. Working in London. Social life was good. Dating life was decent.
              But I was falling apart and no one knew.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              I&apos;d wake up every morning and before I&apos;d even opened my eyes I was already stressed. Already thinking about coffee. Not because I liked it but because I genuinely couldn&apos;t function without it.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Most mornings I&apos;d think &quot;I can&apos;t do this&quot; but I&apos;d drag myself up anyway. Look in the mirror and barely recognize myself. Bags under my eyes. Bit of a gut. Used to bounce out of bed. Now I was wondering how I&apos;d make it through.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Get to work and I&apos;d need coffee. Then another. Then another. By 2pm I&apos;d hit this wall where nothing was going in. Just staring at my screen reading the same email four times.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Come home absolutely wiped and I&apos;d pour a drink. One becomes two. Two becomes three. Telling myself I&apos;m unwinding but really I&apos;m just trying to shut my brain off because I felt like shit every single day.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              And the thing is I was doing everything right. Training four or five times a week. Eating healthy. Getting seven hours sleep.
              Went to my doctor. Got bloodwork. He said I was normal. Just stressed. Cut back on caffeine.
              Everyone thought I had it together.
            </p>

            <div className="text-center mb-12 mt-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
                style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
              >
                Then Halloween 2021 happened.
              </h2>
            </div>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Went out drinking. Got blackout drunk. Don&apos;t remember anything after 10pm.
              Woke up the next morning in my tiny Gregorian flat and the mattress had mud stains all over it. My jeans were still on also covered in mud. No idea how I got home.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Checked my phone and I&apos;d missed my afternoon client. Just completely no-showed.
              I sat there on that mud-stained mattress staring at my phone thinking this is it. Life couldn&apos;t get any lower.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              I looked around that box room and thought I want to carry myself at a high standard but I&apos;m living like this is normal. Like everyone does this. Like you&apos;re supposed to.
              I couldn&apos;t keep going.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Took me about a year to properly sort it but once I did everything changed.
              May 2022 I saw a picture of myself and felt genuinely sick. That was it. Next twelve months I devoted to fixing this properly.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              July I came back from Ibiza. Big trip with the lads. Got home and felt done. Done with drinking. Done with feeling like shit.
              Decided to take a month off.
              One month became two. Two became three. Three became six.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              And through those first six months I made more progress with my body and mental health than I had in years. It was mad how fast things changed once I stopped fighting my body.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              April 2023 I was traveling the world completely unrecognizable. Different body. Different energy. Different person.
              Today I haven&apos;t drank in over three years. Haven&apos;t touched caffeine in eighteen months.
              I wake up naturally energized. No alarm. No coffee.
              Best shape of my life training twice a week. Feel incredible every day.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              But I didn&apos;t get here through superhuman discipline.
              I was the guy on the mud-stained mattress. Anxiety every day. Drinking every night. Training hard but getting nowhere.
              If I sorted this you can too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
