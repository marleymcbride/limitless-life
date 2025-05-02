'use client'

import React from 'react'
import Image from 'next/image'
import testimonials, { Testimonial } from '@/data/testimonials'

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-transform duration-300 hover:scale-[1.02] flex flex-col h-full">
      <div className="flex items-start gap-3 mb-3">
        {testimonial.avatar ? (
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.username}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg`}
            style={{ backgroundColor: testimonial.color || '#940909' }}
          >
            {testimonial.initial}
          </div>
        )}
        <div>
          <p className="font-bold text-gray-900">{testimonial.username}</p>
          <p className="text-sm text-gray-500">{testimonial.handle}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm flex-grow">{testimonial.content}</p>
    </div>
  )
}

export default function TestimonialGrid() {
  // Distribute testimonials into 3 columns based on content length to create a balanced masonry effect
  const distributeTestimonials = () => {
    const sortedTestimonials = [...testimonials].sort((a, b) =>
      b.content.length - a.content.length
    );

    const columns: Testimonial[][] = [[], [], []];

    sortedTestimonials.forEach((testimonial, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push(testimonial);
    });

    return columns;
  };

  const columns = distributeTestimonials();

  return (
    <section className="w-full py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#940909]/10 text-[#940909] text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Real Results</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What People Are Saying
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Don't just take my word for it - see how Limitless is transforming lives every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
