"use client";

import { CTAButton } from "./ui/cta-button";

export default function MoreClientTestimonials() {
  return (
    <section className="bg-white py-20 px-4 w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-8"
            style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
          >
            Real Transformations From High-Performers
          </h2>

          <p className="text-xl text-gray-700 mb-16 max-w-3xl mx-auto">
            These aren&apos;t testimonials. These are case studies of what
            happens when high-performers stop fighting their body and start
            working with it.
          </p>

          {/* Case Study 1 - Client L */}
          <div className="bg-white text-black rounded-lg shadow-lg p-12 mb-16 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">L</span>
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold text-black"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client L - Investment Banking
                    </h3>
                    <p className="text-lg text-gray-600">London, 16 weeks</p>
                  </div>
                </div>

                <blockquote className="text-2xl text-gray-800 font-medium italic mb-8 leading-relaxed">
                  &quot;I was drinking a bottle of wine a night, looked like
                  shit, and my job was genuinely on the line. Now I&apos;m in
                  the best shape I&apos;ve ever been, haven&apos;t touched a
                  drop in over a year, got promoted, and feel fucking
                  incredible. Marley, these energy systems are just
                  mindblowing.&quot;
                </blockquote>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg text-gray-700">
                      450+ Days Sober
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg text-gray-700">
                      Career Promotion
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg text-gray-700">
                      Complete Physical Transformation
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-gray-500 text-lg mb-4">
                  Client L Results
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-black">-24 lbs</div>
                  <div className="text-gray-600">Body Fat Lost</div>
                  <div className="text-3xl font-bold text-red-600 mt-6">
                    +200%
                  </div>
                  <div className="text-gray-600">Energy Increase</div>
                  <div className="text-3xl font-bold text-black mt-6">365+</div>
                  <div className="text-gray-600">Days Alcohol-Free</div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2 - Client R */}
          <div className="bg-white text-black rounded-lg shadow-lg p-12 mb-16 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">R</span>
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold text-black"
                      style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
                    >
                      Client R - Corporate Lawyer
                    </h3>
                    <p className="text-lg text-gray-600">
                      Manchester, 12 weeks
                    </p>
                  </div>
                </div>

                <blockquote className="text-2xl text-gray-800 font-medium italic mb-8 leading-relaxed">
                  &quot;The coffee and alcohol addiction was destroying my
                  career. I was falling asleep in meetings and my performance
                  review was brutal. Now I&apos;m closing cases I couldn&apos;t
                  handle before, my sex drive is back, and I actually look
                  forward to waking up. This program saved my career.&quot;
                </blockquote>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg text-gray-700">
                      90+ Days Alcohol-Free
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg text-gray-700">
                      No More Coffee Dependency
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg text-gray-700">
                      Career Performance Transformed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-gray-500 text-lg mb-4">
                  Client R Results
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-black">-18 lbs</div>
                  <div className="text-gray-600">Body Fat Lost</div>
                  <div className="text-3xl font-bold text-red-600 mt-6">
                    +150%
                  </div>
                  <div className="text-gray-600">Daily Energy</div>
                  <div className="text-3xl font-bold text-black mt-6">2.5x</div>
                  <div className="text-gray-600">Case Load Capacity</div>
                </div>
              </div>
            </div>
          </div>

          <CTAButton
            onClick={() => {
              window.location.href = "/application";
            }}
          >
            Start Your Case Study Today
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
