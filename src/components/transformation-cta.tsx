import { Button } from "./ui/button";

export default function TransformationCTA() {
  return (
    <section className="bg-white py-20 w-full">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 leading-tight">
          Reclaiming My Health Was The Hardest Thing I Ever Did... Until I
          Discovered This System
        </h2>

        <div className="text-center mb-12">
          <Button
            className="bg-[#940909] hover:bg-[#7d0808] text-white px-10 py-6 text-xl font-bold rounded-md transition-none duration-0 shadow-lg hover:shadow-xl transform 
            asChild
          >
            <a
              href="#application"
              id="application"
              className="uppercase tracking-wide"
            >
              JOIN NOW
            </a>
          </Button>
        </div>

        <div className="space-y-6 text-lg text-gray-700">
          <p>
            I was once a burned-out executive working 80-hour weeks, living on
            coffee and takeout, and watching my health deteriorate. Like many
            high-performers, I'd convinced myself this was the price of success.
          </p>

          <p>
            It started with minor issues that I dismissed. The afternoon energy
            crashes that required a third cup of coffee. The 15 pounds that
            somehow became 30. The stress that kept me awake at night, making me
            irritable with my family and less effective at work.
          </p>

          <p>
            I tried everything the conventional wisdom suggested. Crash diets
            that left me hungry and miserable. Brutal 5 AM workout routines I
            couldn't sustain with my schedule. Expensive supplements that
            promised miracles but delivered little. Each attempt ended the same
            way—initial enthusiasm followed by inevitable backsliding as the
            demands of work and life made these approaches unsustainable.
          </p>

          <p>
            Then came the wake-up call. During a routine physical, my doctor
            looked at my blood work with concern. "Your cortisol levels are
            through the roof, your testosterone has plummeted, and your
            inflammatory markers suggest you're heading toward serious health
            issues," he warned. "If you don't make changes now, we're looking at
            potential heart problems, diabetes, and cognitive decline."
          </p>

          <p>
            That moment changed everything. I realized I'd built a successful
            career at the expense of the very thing that would allow me to enjoy
            its fruits—my health. What good was professional achievement if I
            wouldn't be around or well enough to benefit from it?
          </p>

          <p>
            I became obsessed with finding a solution that would work for
            someone with my lifestyle and constraints. Not another quick fix or
            one-size-fits-all approach, but a comprehensive system designed
            specifically for high-performing executives.
          </p>

          <p>
            Through years of research, experimentation, and consulting with top
            health experts, I developed what eventually became the Limitless
            System—a methodical approach that addresses all aspects of executive
            health: energy management, physical performance, mental clarity, and
            sustainable habits.
          </p>

          <p>
            The results transformed my life. Within 8 weeks, I had more energy
            than I'd had in a decade. The stubborn weight began melting away
            without starvation diets. My focus and cognitive performance reached
            new heights. And most importantly, I accomplished all this while
            maintaining—even enhancing—my professional performance.
          </p>

          <p>
            Word spread among my executive network, and soon colleagues were
            asking for my help. I refined the system further as I coached other
            busy professionals through the same transformation. The pattern was
            consistent: when you address the root causes of executive health
            decline in a systematic way, remarkable results follow.
          </p>

          <p>
            Now I'm sharing this proven system with select executives who are
            ready to reclaim their peak performance. This isn't about fitness
            for its own sake—it's about optimizing your most valuable asset as a
            leader: your physical and mental capacity to perform at your best.
          </p>
        </div>
      </div>
    </section>
  );
}
