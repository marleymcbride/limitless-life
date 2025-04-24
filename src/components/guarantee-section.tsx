import { Shield } from "lucide-react"
import { bgClasses } from "@/lib/utils"
import ApplyNowButton from "./apply-now-button"

export default function GuaranteeSection() {
  return (
    <section className={`w-full py-20 ${bgClasses.white}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 sm:p-12 rounded-lg border border-gray-200 shadow-xl">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-[#940909] p-5 rounded-full mb-6 md:mb-0 md:mr-8">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">100% Results Guarantee</h2>
              <p className="text-gray-600 text-center md:text-left">No risk, just transformation</p>
            </div>
          </div>

          <p className="text-lg mb-6">
            If you don't see significant energy improvements in 30 days, we refund every penny. No questions asked. No awkward conversations.
          </p>

          <p className="text-lg mb-6">
            We're so confident in the Limitless Protocol's effectiveness that we're willing to take on all the risk. You either experience the transformation, or you don't pay.
          </p>

          <div className="bg-[#940909]/5 p-6 rounded-lg border-l-4 border-[#940909] mb-8">
            <p className="text-lg font-semibold">
              This guarantee is simple. Follow the system for 30 days. If you don't feel dramatically better - more energy, improved focus, better sleep - just let us know and get a complete refund.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Why we can make this guarantee:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#940909] rounded-full p-1 mr-3 mt-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p>We've tested and refined this system with hundreds of high-performers</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[#940909] rounded-full p-1 mr-3 mt-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p>The Limitless Protocol is based on proven science, not trendy health fads</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[#940909] rounded-full p-1 mr-3 mt-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p>Our success rate is over 95% with committed participants</p>
              </li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <ApplyNowButton />
          </div>
        </div>
      </div>
    </section>
  )
}
