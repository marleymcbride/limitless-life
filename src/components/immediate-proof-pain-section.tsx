import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function ImmediateProofPainSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Ed Lawrence Style Immediate Proof */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            When High-Performing Executives Ask For My Help, Results Like This Happen...
          </h2>

          {/* Client L Transformation */}
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#940909] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Client L - Investment Banking</h3>
                    <p className="text-gray-600">15 months sober • 35lbs fat loss</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-800 italic mb-4">
                  "I was drinking heavily after work, looked rough, my high-stakes job was tanking, split with my girlfriend, hormones were shot. Now I'm completely off alcohol and caffeine, down 35lbs, crushing it at work, new girlfriend, and over a year sober. This literally saved my life."
                </blockquote>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800">35lbs Fat Loss</Badge>
                  <Badge className="bg-green-100 text-green-800">15 Months Sober</Badge>
                  <Badge className="bg-green-100 text-green-800">Career Recovery</Badge>
                  <Badge className="bg-green-100 text-green-800">Relationship Success</Badge>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            But here's what most high-performing guys don't realize...
          </p>
        </div>

        {/* Salt in the Wound - Scott's Daily Hell */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Does This Sound Like You, Scott?
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <X className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">5:30 AM - Already Behind</h3>
                  <p className="text-gray-700">You wake up groggy despite 7 hours of sleep. First thing you reach for? Coffee. The first of many cups you'll need today just to function. By 6:30 AM, you're on your second coffee while forcing down a protein bar, checking 30-50 emails, already feeling behind.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <X className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">1:00 PM - The Afternoon Crash</h3>
                  <p className="text-gray-700">Post-lunch brain fog hits hard. Your mental processing slows to a crawl. By 3:30 PM, you're micro-sleeping at your desk, reaching for your fourth coffee of the day. You wonder if this is just what success costs.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <X className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">8:00 PM - The Escape</h3>
                  <p className="text-gray-700">Client dinner or you collapse at home. Either way, you pour 2-3 drinks just to "wind down." It's the only way you know how to switch off from work mode. By 11:00 PM, you're exhausted but your mind is racing, poor sleep quality guaranteed.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <X className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">The Hidden Damage</h3>
                  <p className="text-gray-700">You've gained 15-30 pounds around your midsection. Your clothes don't fit right. You avoid looking in the mirror after showers. Zero libido. Taking 12-18 supplements ($300-600/month) trying to fix what's broken, but nothing works.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three-Tier Classification - Polarizing */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            The Three Ways High-Performers Live
          </h2>

          <div className="space-y-6">
            {/* 95% - Typical */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-600 mr-4">95%</span>
                <h3 className="text-xl font-bold text-gray-900">The Typical Lifestyle</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Western diet, regular drinking, barely exercising. Constantly tired, wired on caffeine, dependent on alcohol to wind down.
              </p>
              <p className="text-gray-700">
                <span className="text-red-600 font-semibold">You're accessing maybe 20% of your potential</span>, wasting 80% in a fog of low energy and bad habits.
              </p>
            </div>

            {/* 4% - Health Conscious */}
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-blue-600 mr-4">4%</span>
                <h3 className="text-xl font-bold text-gray-900">The Health-Conscious (Where You Are Now)</h3>
              </div>
              <p className="text-gray-700 mb-2">
                You hit the gym, monitor your food, cut back on booze. But there's no real system, you're training and working too hard, always one bad week from burnout.
              </p>
              <p className="text-gray-700">
                <span className="text-blue-600 font-semibold">You're accessing 50-60% of your potential</span>, but it's a constant struggle.
              </p>
            </div>

            {/* 1% - Limitless */}
            <div className="bg-[#940909]/10 border-2 border-[#940909] rounded-lg p-6 transform hover:scale-[1.02] transition-all">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-[#940909] mr-4">1%</span>
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="bg-[#940909] text-white px-3 py-1 rounded">The Limitless Elite</span>
                </h3>
              </div>
              <p className="text-gray-700 mb-2">
                Intentional systems for energy, health, and performance. You understand your body on a deeper level, making optimal health effortless. No caffeine, no alcohol needed — just pure, natural Glide Energy.
              </p>
              <p className="text-gray-700">
                <span className="text-[#940909] font-semibold">You're unlocking 95-100% of your potential</span> daily.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-xl font-bold text-gray-900 mb-4">
              Most guys stay trapped in the 4% category their entire lives.
            </p>
            <p className="text-lg text-gray-700">
              They know something's wrong, they're trying to fix it, but they're missing the <span className="font-bold text-[#940909]">Limitless 1% path</span> that changes everything.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
