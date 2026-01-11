import { bgClasses } from "@/lib/utils";
import { ResultCard } from "./ui/result-card";
import ApplyNowButton from "./apply-now-button";

export default function SuccessStoriesSection() {
  const successStories = [
    {
      name: "Mark Stevens",
      title: "Finance Director",
      before: "210 lbs",
      after: "175 lbs",
      description:
        "Lost 35lbs, eliminated caffeine completely, increased sales performance by 32%. Energy levels through the roof.",
      imageSrc: "/placeholder.svg?height=200&width=400",
    },
    {
      name: "Jason Miller",
      title: "Tech Executive",
      before: "224 lbs",
      after: "192 lbs",
      description:
        "32lbs down, no more 3pm crashes, sleeping 7 hours instead of 9 and waking refreshed. No caffeine for 60+ days.",
      imageSrc: "/placeholder.svg?height=200&width=400",
    },
    {
      name: "Robert Thomas",
      title: "Agency Owner",
      before: "194 lbs",
      after: "172 lbs",
      description:
        "22lbs lighter, alcohol-free for 90 days, doubled business revenue. 'I feel 10 years younger and twice as focused.'",
      imageSrc: "/placeholder.svg?height=200&width=400",
    },
    {
      name: "Chris Anderson",
      title: "Real Estate Developer",
      before: "230 lbs",
      after: "200 lbs",
      description:
        "Lost 30lbs while closing the biggest deal of his career. Blood pressure normalized. No more anxiety attacks.",
      imageSrc: "/placeholder.svg?height=200&width=400",
    },
  ];

  return (
    <section className={`w-full py-20 px-4 ${bgClasses.white}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            Real Results For Real Men
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            The Limitless Transformation
          </h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            These high-performers were once exactly where you are now. Here's
            what happened after implementing The Limitless Protocol:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {successStories.map((story, index) => (
            <ResultCard
              key={index}
              name={story.name}
              title={story.title}
              before={story.before}
              after={story.after}
              description={story.description}
              imageSrc={story.imageSrc}
            />
          ))}
        </div>

        <div className="mx-auto max-w-5xl mt-12 bg-gray-100 p-8 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">
              Not Just Physical Transformation
            </h3>
            <p className="text-lg text-gray-700">
              Our clients don't just transform their bodies - they transform
              their entire lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold text-3xl text-[#940909] mb-2">95%</div>
              <p className="text-gray-800">
                Report significantly higher energy levels throughout the day
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold text-3xl text-[#940909] mb-2">89%</div>
              <p className="text-gray-800">
                Break their caffeine dependency within 30 days
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold text-3xl text-[#940909] mb-2">92%</div>
              <p className="text-gray-800">
                Report improved performance at work or in their business
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-gray-800 mb-8">
            Ready to create your own transformation story?
          </p>
          <ApplyNowButton />
        </div>
      </div>
    </section>
  );
}
