import Image from "next/image";
import { colorStrategy, buyerTypeUtils } from "@/lib/utils";

interface SocialProofItem {
  name: string;
  result: string;
  time: string;
  image: string;
  quote: string;
}

export default function TitledSocialProofSection({
  title = "What Clients Achieve in 8-12 Weeks",
}: {
  title?: string;
}) {
  const socialProofData: SocialProofItem[] = [
    {
      name: "Michael R.",
      result: "Lost 32 lbs, quit alcohol completely",
      time: "10 weeks",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "I went from 3 coffees before noon to waking up with natural energy. My business performance has never been better.",
    },
    {
      name: "James K.",
      result: "26 lbs lost, back to college weight",
      time: "8 weeks",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "The most surprising part wasn't the weight loss. It was the mental clarity and confidence that came with it.",
    },
    {
      name: "David S.",
      result: "Alcohol-free, 18 lbs of muscle gained",
      time: "12 weeks",
      image: "/placeholder.svg?height=400&width=400",
      quote:
        "As a CEO, I need to be sharp. This system delivered exactly that - better focus, better decisions, better results.",
    },
  ];

  return (
    <section className={`${colorStrategy.whiteSections} py-20`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`${buyerTypeUtils.neanderthal.headlineClasses} mb-6 ${colorStrategy.blackSections}`}
          >
            {title}
          </h2>
          <p
            className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-serif`}
          >
            Real high-performers. Real results. No BS.
          </p>
        </div>

        {/* Social Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {socialProofData.map((item, index) => (
            <div
              key={index}
              className={`${colorStrategy.whiteAccent} rounded-lg p-6 border border-gray-200`}
            >
              <div className="relative mb-6 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.name} transformation`}
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </div>

              <div className="text-center">
                <h3
                  className={`text-xl font-black mb-2 ${colorStrategy.blackSections} font-serif`}
                >
                  {item.name}
                </h3>

                <div
                  className={`text-lg font-bold ${colorStrategy.redCTA} mb-3 font-serif`}
                >
                  {item.result}
                </div>

                <div
                  className={`text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider`}
                >
                  {item.time}
                </div>

                <blockquote
                  className={`text-lg text-gray-700 italic font-serif leading-relaxed`}
                >
                  "{item.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Bar - NERD Appeal */}
        <div
          className={`${colorStrategy.blackSections} rounded-lg p-8 text-center`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div
                className={`${buyerTypeUtils.nerd.statClasses} ${colorStrategy.redCTA}`}
              >
                26 lbs
              </div>
              <div className={`${buyerTypeUtils.nerd.labelClasses} mt-2`}>
                Average Weight Lost
              </div>
            </div>

            <div>
              <div
                className={`${buyerTypeUtils.nerd.statClasses} ${colorStrategy.redCTA}`}
              >
                89%
              </div>
              <div className={`${buyerTypeUtils.nerd.labelClasses} mt-2`}>
                Alcohol-Free
              </div>
            </div>

            <div>
              <div
                className={`${buyerTypeUtils.nerd.statClasses} ${colorStrategy.redCTA}`}
              >
                94%
              </div>
              <div className={`${buyerTypeUtils.nerd.labelClasses} mt-2`}>
                Quit Caffeine
              </div>
            </div>

            <div>
              <div
                className={`${buyerTypeUtils.nerd.statClasses} ${colorStrategy.redCTA}`}
              >
                2-3 days
              </div>
              <div className={`${buyerTypeUtils.nerd.labelClasses} mt-2`}>
                Gym Per Week
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
