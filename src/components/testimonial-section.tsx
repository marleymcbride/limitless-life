export default function TestimonialSection() {
  return (
    <section className="w-full text-black bg-white">
      <div className="container px-4 py-12 mx-auto max-w-5xl">
        <h2 className="mb-10 text-3xl font-bold text-center">
          What Guys Like You Are Saying
        </h2>

        {/* WhatsApp Screenshots - More authentic, messy layout with 6 testimonials */}
        <div className="grid grid-cols-1 gap-4 mx-auto max-w-5xl md:grid-cols-2 md:gap-6">
          {/* Testimonial 1 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[-0.5deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Lewis</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  &quot;Felt like I could run through walls this morning!&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">10:42</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.3deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Luke</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  &quot;I&apos;ve noticed and felt a significant step change in
                  my strength, mental health and overall appearance since
                  starting!&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">08:32</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.7deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Rob</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  &quot;I don&apos;t feel I&apos;ve ever had this much natural
                  energy before than in the last few weeks. But yeah I&apos;m
                  doing a lot but shit man my energy is good&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">14:15</p>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[-0.3deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Aaron</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">&quot;Man, I feel fucking great&quot;</p>
                <p className="text-[10px] text-gray-500 text-right">06:50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
