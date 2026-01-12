import { bgClasses } from "@/lib/utils";
import Image from "next/image";

export default function IntroSection() {
  return (
    <section className={`w-full bg-black pt-12 pb-12 text-white relative`}>
      {/* Black background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            {/* Image */}
            <div className="my-8 flex justify-center items-center">
              <div className="relative w-1/2 max-w-md h-auto mx-auto">
                <Image
                  src="/images/IMG_4432.png"
                  alt="Intro image"
                  width={256}
                  height={192}
                  className="rounded-lg shadow-lg mx-auto"
                  loading="lazy"
                  style={{ width: '50%', height: 'auto' }}
                />
              </div>
            </div>

            <div className="text-center mb-6 w-full">
              <h2
                className="font-bold mb-4 leading-tight"
                style={{ fontSize: "3rem", color: "#ffffff", lineHeight: "1.2" }}
              >
                If we haven't met, I'm Marley.
              </h2>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              The first thing you should know about me is...
            </p>

            <p className="text-gray-300 leading-relaxed mb-1">
              I&apos;m not a doctor.
            </p>

            <p className="text-gray-300 leading-relaxed mb-1">
              I&apos;m not a certified dietician.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              And I don&apos;t have some fancy degree in exercise science.
            </p>



            <p className="text-gray-300 leading-relaxed mb-6">
              In fact I prided myself on being a &apos;Bro Scientist&apos; for years..
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              But fast-forward today I&apos;m over 3 years sober, built my dream body and feel pretty fucking good most days.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Plus I only train twice a week, and spend most of my time out in nature, with friends, or relaxing.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Now if you&apos;re thinking:
            </p>

            <p className="text-gray-300 italic leading-relaxed mb-6">
            &apos;&apos;No one gets those results training twice a week!&apos;&apos;
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
            I thought the same thing.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
            But I discovered something even doctors won&apos;t tell you...
            </p>

            <p className="text-gray-300 text-center leading-relaxed mb-0">
              ⬇
            </p>


          </div>
        </div>
      </div>
    </section>
  );
}
