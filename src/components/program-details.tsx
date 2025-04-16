import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProgramDetails() {
  return (
    <section className="w-full bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">The Limitless 12-Week Program</h2>
        <p className="mb-12 text-center text-xl">A Complete System for Total Transformation</p>

        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h3 className="mb-4 text-2xl font-bold">The 4-Phase Approach</h3>

            <div className="mb-8 space-y-6">
              <div className="rounded-lg bg-zinc-800 p-6">
                <h4 className="mb-2 text-xl font-bold">Phase 1: Assessment & Reset (Weeks 1-2)</h4>
                <p>
                  We begin with comprehensive metabolic and lifestyle profiling to identify your unique patterns and
                  blockers. Then we implement a precision reset protocol to prepare your body for rapid transformation.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-6">
                <h4 className="mb-2 text-xl font-bold">Phase 2: Foundation Building (Weeks 3-5)</h4>
                <p>
                  We establish your core energy, nutrition, and recovery protocols, customized to your unique metabolic
                  profile and lifestyle constraints. You'll experience the first major energy and clarity breakthroughs.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-6">
                <h4 className="mb-2 text-xl font-bold">Phase 3: Acceleration (Weeks 6-9)</h4>
                <p>
                  With your foundation in place, we implement advanced protocols to accelerate fat loss, energy
                  production, and cognitive enhancement. This is where the most visible physical changes occur.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-6">
                <h4 className="mb-2 text-xl font-bold">Phase 4: Integration & Mastery (Weeks 10-12)</h4>
                <p>
                  We fine-tune your systems and ensure complete lifestyle integration for lasting results. You'll
                  develop the skills to maintain and even enhance your transformation long after the program ends.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="mb-4 text-2xl font-bold">What's Included</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Personalized Metabolic Optimization Protocol</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Weekly 1:1 Coaching Calls</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Custom Nutrition & Supplement Plan</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Precision Exercise Protocols (3-4 hrs/week)</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Stress Management & Sleep Optimization</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Unlimited Text Support</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Biometric Tracking System</span>
              </div>

              <div className="flex items-start">
                <Check className="mr-2 mt-1 h-5 w-5 text-green-500" />
                <span>Lifetime Access to Program Materials</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">Investment: $2,000</h3>
            <p className="mb-6">Or 3 monthly payments of $700</p>
            <p className="mb-8 text-lg">Only 10 spots available this month</p>

            <Button className="mx-auto w-full max-w-md bg-green-600 py-6 text-xl font-bold hover:bg-green-700">
              Claim Your Spot Now
            </Button>

            <p className="mt-4 text-sm">100% Money-Back Guarantee for 30 Days</p>
          </div>
        </div>
      </div>
    </section>
  )
}
