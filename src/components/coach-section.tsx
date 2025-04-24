import Image from "next/image"

export default function CoachSection() {
  return (
    <section className="w-full bg-white py-16 text-black">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-center">Meet Your Coach</h2>

        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Coach"
                width={400}
                height={600}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-[#940909] text-white p-3 text-center rounded-b-lg">
                <p className="font-bold">Marley McBride</p>
                <p className="text-sm">Founder, Limitless Life</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <h3 className="mb-4 text-xl font-bold text-[#940909]">From Burnout Executive to Energy Systems Expert</h3>

            <p className="mb-4 text-gray-800">
              After transforming my own life from caffeine-dependent burnout to natural vitality, I've spent the last 5 years helping high-performing men achieve the same transformation through the Limitless Protocol.
            </p>

            <p className="mb-4 text-gray-800">
              I've now helped hundreds of executives and entrepreneurs achieve similar transformations. My unique approach combines metabolic optimization, minimalist training, and brain-based energy restoration to deliver results that no other program can match.
            </p>

            <p className="mb-4 text-gray-800">
              What makes my approach different is that I understand the unique challenges you face as a high-performer. The constant pressure. The never-ending to-do list. The feeling that you need to sacrifice your health for success.
            </p>

            <p className="mb-4 text-gray-800 font-medium">
              My clients don't just lose weight and gain energy - they transform their entire relationship with their bodies and unlock levels of performance they didn't know were possible.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-100 p-4 border-l-4 border-[#940909]">
                <p className="font-bold">Professional Background</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>• Certified Performance Coach</li>
                  <li>• Metabolic Optimization Specialist</li>
                  <li>• Stress Physiology Expert</li>
                  <li>• Behavioral Change Master</li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-100 p-4 border-l-4 border-[#940909]">
                <p className="font-bold">Personal Transformation</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>• Lost 35 pounds of stubborn fat</li>
                  <li>• 1000+ days caffeine-free</li>
                  <li>• 350+ days alcohol-free</li>
                  <li>• Peak performance at 40+</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
