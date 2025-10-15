"use client";

export default function ExclusivityPersonalAttention() {
  return (
    <section className="bg-black relative py-20 px-4 w-full">
    <div className="absolute bottom-0 left-0 w-full h-[33vh]" style={{ background: "linear-gradient(to top, rgba(148, 9, 9, 0.30) 0%, rgba(148, 9, 9, 0.16) 50%, rgba(148, 9, 9, 0) 100%)" }}></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            This Isn't For Everyone. And That's Intentional.
          </h2>

          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            I work personally with every client. This means I can only accept a limited number of high-performers who are ready to transform.
          </p>

          <div className="space-y-8 mb-16">
            {/* Tier 1 */}
            <div className="bg-gray-900 rounded-lg p-8 text-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Limitless Access</h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Complete access to The Limitless Protocol system including all training modules, nutrition protocols, and recovery strategies.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Full 4-Step System Protocol</li>
                <li>• Video Training Library</li>
                <li>• Nutrition & Supplement Guides</li>
                <li>• Mobile App Access</li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-gray-800 rounded-lg p-8 text-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Limitless Plus</h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Everything in Limitless Access PLUS bi-weekly group coaching calls and personalized protocol adjustments.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Everything in Tier 1</li>
                <li>• Bi-Weekly Group Coaching Calls</li>
                <li>• Monthly Protocol Reviews</li>
                <li>• Private Community Access</li>
              </ul>
            </div>

            {/* Tier 3 */}
            <div className="bg-gray-700 rounded-lg p-8 text-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Limitless Premium</h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Everything in Limitless Plus PLUS weekly 1-on-1 calls and direct messaging access with me personally.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Everything in Tier 2</li>
                <li>• Weekly 1-on-1 Coaching Calls</li>
                <li>• Direct Messaging Access</li>
                <li>• Priority Protocol Adjustments</li>
              </ul>
            </div>

            {/* Tier 4 */}
            <div className="bg-red-900 bg-opacity-30 rounded-lg p-8 text-left border border-red-600">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Limitless Elite - 10 Spots Only</h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Everything in Limitless Premium PLUS in-person strategy session, full lifestyle integration, and lifetime access to all future updates.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Everything in Tier 3</li>
                <li>• In-Person Strategy Session</li>
                <li>• Full Lifestyle Integration</li>
                <li>• Lifetime Access Guarantee</li>
                <li>• First Priority for All New Features</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              Why I Only Accept 10 Elite Clients Per Month
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Personal attention is non-negotiable. Every client gets weekly 1-on-1 time with me, custom protocol adjustments, and priority support. This cannot be scaled.
            </p>
          </div>

          <button
            className="bg-red-600 text-white font-bold py-4 px-8 text-lg rounded-lg"
            onClick={() => {
              const element = document.getElementById("application");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Apply For One Of The 10 Elite Spots
          </button>
        </div>
      </div>
    </section>
  );
}