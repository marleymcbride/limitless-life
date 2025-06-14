import { Badge } from "@/components/ui/badge";

export default function ImmediateProofSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Clean testimonial section - JUST the proof */}
        <div className="text-center mb-8">
          {/* Client L Transformation - REAL STORY */}
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Client L - Investment Banking, London
                    </h3>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-800 italic mb-4">
                  ""I was drinking a bottle of wine a night, looked like shit,
                  and my job was genuinely on the line because I couldn't
                  perform. Now I'm in the best shape I've ever been, haven't
                  touched a drop in over a year, got promoted, and feel fucking
                  incredible. Marley, these energy systems are just mindblowing.
                </blockquote>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    35lbs Pure Fat Loss
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    450+ Days Sober
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Career Promotion
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Testosterone Fixed
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
