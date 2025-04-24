import { Shield } from "lucide-react"

export default function GuaranteeSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-[#940909]/5 p-8 rounded-lg border border-[#940909]/20">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="w-24 h-24 rounded-full bg-[#940909] flex items-center justify-center">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2 text-center md:text-left">100% Results Guarantee</h2>
              <p className="text-xl text-gray-700 text-center md:text-left">
                Your success is guaranteed or your money back
              </p>
            </div>
          </div>

          <div className="space-y-4 text-lg">
            <p>
              If you don't see significant energy improvements in 30 days, we refund every penny. No questions asked. No awkward conversations.
            </p>

            <p>
              This program works when you follow it. We've helped hundreds of high-performers escape drag energy - reclaim natural vitality - transform their bodies. Not through magic pills or dangerous strategies. Through proven systems that fix your fundamentals.
            </p>

            <p>
              We're so confident in our method that if you don't experience:
            </p>

            <ul className="list-disc pl-8 space-y-2">
              <li>Noticeable increase in morning energy without caffeine</li>
              <li>Improved focus and mental clarity throughout the day</li>
              <li>Enhanced sleep quality and recovery</li>
              <li>Initial body composition changes</li>
            </ul>

            <p className="font-bold">
              Within the first 30 days, just let us know and we'll refund 100% of your investment.
            </p>

            <p className="italic">
              No other program offers this guarantee because no other program delivers these results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
