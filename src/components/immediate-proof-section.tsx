import { Badge } from "@/components/ui/badge";

export default function ImmediateProofSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Clean testimonial section - JUST the proof */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            When Burned-Out Executives Stop Bullshitting Themselves And Actually
            Ask For Help, This Happens...
          </h2>

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
                    <p className="text-gray-600">
                      450+ days sober • 35lbs pure fat • Career saved
                    </p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-800 italic mb-4">
                  "Mate, I was fucked. Drinking a bottle of wine every night,
                  looked like absolute shit, my £200k job was about to
                  disappear, girlfriend left me, couldn't get it up anymore. I
                  was dying slowly and everyone could see it except me. Now?
                  450+ days off everything - booze, caffeine, the lot. Lost
                  35lbs of pure gut. Got promoted. New bird who actually
                  respects me. This didn't just save my career - it saved my
                  fucking life."
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
