"use client"

import { Button } from "./ui/button"

export default function ApplyNowButton() {
  return (
    <div className="w-full flex justify-center my-8">
      <Button
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-12 rounded-lg text-xl sm:text-2xl transition-all"
        asChild
      >
        <a href="#application">Apply Now</a>
      </Button>
    </div>
  )
}
