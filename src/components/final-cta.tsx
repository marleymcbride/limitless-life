"use client"

import { Button } from "./ui/button"

export default function FinalCta() {
  return (
    <section className="w-full bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Stop Settling for Exhaustion, Weight Gain, and Brain Fog
          </h2>

          <p className="mb-8 text-xl">
            In just 12 weeks, you can transform your energy, body, and mind—without sacrificing your success or spending
            hours in the gym.
          </p>

          <div className="mb-8 rounded-lg bg-zinc-800 p-6 text-left">
            <h3 className="mb-4 text-center text-2xl font-bold">What Will Your Life Look Like 12 Weeks From Now?</h3>

            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-zinc-700 p-4">
                <h4 className="mb-2 font-bold">Do Nothing:</h4>
                <ul className="space-y-2">
                  <li>• Still exhausted every morning</li>
                  <li>• Still dependent on caffeine</li>
                  <li>• Still carrying extra weight</li>
                  <li>• Still struggling with stress and brain fog</li>
                  <li>• Still using alcohol to cope</li>
                </ul>
              </div>

              <div className="rounded-lg bg-green-900 p-4">
                <h4 className="mb-2 font-bold">Join Limitless:</h4>
                <ul className="space-y-2">
                  <li>• Wake up energized and clear-headed</li>
                  <li>• Look and feel 10 years younger</li>
                  <li>• Perform at your peak all day</li>
                  <li>• Feel confident in your body again</li>
                  <li>• Be fully present with your family</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            size="lg"
            className="mx-auto mt-6 w-full max-w-md bg-green-600 py-8 text-2xl font-bold hover:bg-green-700 hover:scale-105 transition-transform animate-pulse"
            onClick={() => alert('Application form would open here')}
          >
            Transform Your Life Now
          </Button>

          <p className="mt-4">
            <span className="font-bold">Limited Availability:</span> Only 10 spots open this month
          </p>

          <p className="mt-6 text-sm">
            100% Money-Back Guarantee: If you don't see significant improvements in 30 days, we'll refund your
            investment in full.
          </p>
        </div>
      </div>
    </section>
  )
}
