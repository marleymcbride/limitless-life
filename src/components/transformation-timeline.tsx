import Image from "next/image";

export default function TransformationTimeline() {
  const timelinePoints = [
    {
      week: "Week 2",
      changes: [
        "Energy levels begin to noticeably increase",
        "Initial improvements in sleep quality",
        "Reduced cravings for sugar and processed foods",
      ],
    },
    {
      week: "Week 4",
      changes: [
        "First 5-10 pounds of weight loss",
        "Morning brain fog eliminated",
        "Natural energy without caffeine dependence",
      ],
    },
    {
      week: "Week 8",
      changes: [
        "15-20 pounds of fat loss for most clients",
        "Significant improvement in muscle tone",
        "Stress levels reduced by 40-60%",
        "Mental clarity and focus throughout the day",
      ],
    },
    {
      week: "Week 12",
      changes: [
        "Complete transformation for most clients",
        "Sustainable habits fully integrated",
        "Optimal energy and performance levels",
        "Complete metabolic reset achieved",
      ],
    },
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Your Transformation Journey
        </h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12">
          Here's what to expect during your 12-week health transformation
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Before & After Showcase */}
          <div className="rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Typical Results
              </h3>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-700">
                      <div className="absolute bottom-0 left-0 w-full bg-black/70 py-2 px-4">
                        <p className="text-white text-center font-bold">
                          BEFORE
                        </p>
                      </div>
                      <Image
                        src="/placeholder.svg?height=400&width=240"
                        alt="Before transformation"
                        width={240}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-700">
                      <div className="absolute bottom-0 left-0 w-full bg-[#940909]/70 py-2 px-4">
                        <p className="text-white text-center font-bold">
                          AFTER
                        </p>
                      </div>
                      <Image
                        src="/placeholder.svg?height=400&width=240"
                        alt="After transformation"
                        width={240}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* Divider line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2 z-10"></div>
              </div>
            </div>
            <div className="p-6 bg-zinc-900 border-t border-zinc-700">
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#940909]">18.5</p>
                  <p className="text-sm text-gray-300">Average lbs lost</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#940909]">53%</p>
                  <p className="text-sm text-gray-300">Energy increase</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#940909]">67%</p>
                  <p className="text-sm text-gray-300">Stress reduction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-12 bottom-0 w-0.5 bg-[#940909] ml-4 md:ml-6"></div>

            <div className="space-y-10">
              {timelinePoints.map((point, index) => (
                <div key={index} className="relative pl-14 md:pl-16">
                  {/* Timeline circle */}
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-[#940909] border-4 border-black flex items-center justify-center z-10">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6 border-l-4 border-[#940909]">
                    <h4 className="text-xl font-bold mb-3">{point.week}</h4>
                    <ul className="space-y-2">
                      {point.changes.map((change, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#940909] mr-2">•</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
