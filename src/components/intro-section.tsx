import Image from "next/image";

export default function IntroSection() {
  return (
    <section className={`w-full bg-black pt-12 pb-12 text-white relative`}>
      {/* Black background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

      {/* Grain overlay - using hero opacity (0.10) to prevent lightening */}
      <div className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" seed=\"1\"/><feColorMatrix type=\"saturate\" values=\"0\"/></filter><rect width=\"100\" height=\"100\" fill=\"%23141414\" filter=\"url(%23noise)\" opacity=\"1.0\"/></svg>')",
          opacity: 0.10,
          zIndex: 25,
          mixBlendMode: 'hard-light'
        }}
      ></div>

      {/* Darkening overlay - compensates for grain lightening while preserving texture */}
      <div className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          zIndex: 26,
          mixBlendMode: 'saturation'
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-30 hero-full-width">
        <div className="w-full max-w-7xl mx-auto">
          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            {/* Image - Original IMG_4432.png */}
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
                If we haven&apos;t met, I&apos;m Marley.
              </h2>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              The first thing you should know about me is:
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
              But drinking since 13, I found myself addicted to alcohol for 10 years.
            </p>


            <p className="text-gray-300 leading-relaxed mb-6">
              Fast-forward today I&apos;m over 3 years sober, built my dream body and feel pretty fucking good most days.
            </p>

          </div>
        </div>
      </div>

            {/* Elite Photoshoot Photo - Desktop (hidden on mobile) */}
            <div className="my-8 hidden md:block lg:block justify-center items-center">
              <div className="grid grid-cols-2 gap-0 w-[60%] mx-auto">
                <div className="relative w-full h-auto">
                  <Image
                    src="/images/Testimonials/Photoshoot pics/DSC08783_5-edited.png"
                    alt="Marley McBride - Elite Photoshoot"
                    width={600}
                    height={800}
                    className="rounded-l-lg shadow-lg w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div className="relative w-full h-auto">
                  <Image
                    src="/images/Testimonials/Me/Sober - 3yrz singular.png"
                    alt="Sober 3 Years"
                    width={600}
                    height={800}
                    className="rounded-r-lg shadow-lg w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Elite Photoshoot Photo - Mobile (hidden on desktop) */}
            <div className="my-8 flex md:hidden justify-center items-center">
              <div className="grid grid-cols-1 gap-6 w-[80%]">
                <div className="relative w-full h-auto">
                  <Image
                    src="/images/Testimonials/Photoshoot pics/DSC08783_5-edited.png"
                    alt="Marley McBride - Elite Photoshoot"
                    width={600}
                    height={800}
                    className="rounded-l-lg shadow-lg w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div className="relative w-full h-auto">
                  <Image
                    src="/images/Testimonials/Me/Sober - 3 yrz singular.png"
                    alt="Sober 3 Years"
                    width={600}
                    height={800}
                    className="rounded-r-lg shadow-lg w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 relative z-30 hero-full-width">
        <div className="w-full max-w-7xl mx-auto">
          <div className="prose prose-lg max-w-none mobile-text-large body-copy" style={{ fontSize: "1.3rem" }}>

            <p className="text-gray-300 leading-relaxed mb-6">
              Plus I only train twice a week, and spend most of my time out in nature, with friends, or relaxing.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Now you&apos;re probably thinking:
            </p>

            <p className="text-gray-300 italic leading-relaxed mb-6">
            &apos;&apos;No one gets those results training twice a week!&apos;&apos;
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
            I thought the same thing.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
             But after helping men for over half a decade (in spheres such as banking, sales and entrepreneurship)..
            </p>


            <p className="text-gray-300 leading-relaxed mb-6">
            I began to truly understand what keeps men stuck with whilst juggling a hectic work and family life.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
            And I discovered something even doctors won&apos;t tell you...
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
