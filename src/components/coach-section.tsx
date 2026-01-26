import Image from "next/image";
import { bgClasses } from "@/lib/utils";

export default function CoachSection() {
  return (
    <section className={`w-full ${bgClasses.white} py-20 px-4 text-black`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#940909] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
            Your Coach
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet Your Coach
          </h2>
          <p className="text-2xl md:text-lg text-gray-700 max-w-3xl mx-auto">
            Expert guidance from someone who's been where you are and knows
            exactly how to get you to where you want to be
          </p>
        </div>

        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12 max-w-5xl mx-auto">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Marley McBride"
                width={400}
                height={600}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-[#940909] text-white p-3 text-center rounded-b-lg">
                <p className="font-bold">Marley McBride</p>
                <p className="text-sm">Founder, Limitless Life</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <h3 className="mb-4 text-xl font-bold text-[#940909]">
              From Burnout Executive to Energy Systems Expert
            </h3>

            <p className="mb-4 text-gray-800">
              After transforming my own life from caffeine-dependent burnout to
              natural vitality, I've spent the last 5 years helping
              high-performing men achieve the same transformation through the
              Limitless Protocol.
            </p>

            <p className="mb-4 text-gray-800">
              I've now helped hundreds of executives and entrepreneurs achieve
              similar transformations. My unique approach combines metabolic
              optimization, minimalist training, and brain-based energy
              restoration to deliver results that no other program can match.
            </p>

            <p className="mb-4 text-gray-800">
              What makes my approach different is that I understand the unique
              challenges you face as a high-performer. The constant pressure.
              The never-ending to-do list. The feeling that you need to
              sacrifice your health for success.
            </p>

            <p className="mb-6 text-gray-800 font-medium">
              My clients don't just lose weight and gain energy - they transform
              their entire relationship with their bodies and unlock levels of
              performance they didn't know were possible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="rounded-lg bg-gray-100 p-5 border-l-4 border-[#940909]">
                <p className="font-bold text-lg mb-3">
                  Professional Credentials
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Certified Performance Coach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Metabolic Optimization Specialist</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Stress Physiology Expert</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Behavioral Change Master</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Former Fortune 500 Executive</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-100 p-5 border-l-4 border-[#940909]">
                <p className="font-bold text-lg mb-3">
                  Personal Transformation
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Lost 35 pounds of stubborn fat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>1000+ days caffeine-free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>350+ days alcohol-free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Optimized all health markers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] mr-2">•</span>
                    <span>Peak performance at 40+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
