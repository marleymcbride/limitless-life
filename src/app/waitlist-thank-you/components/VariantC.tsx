'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VariantC() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';

  const handleQuizClick = () => {
    // Navigate to the form page with email and name parameters
    const params = new URLSearchParams();
    if (email) params.set('email', email);
    if (name) params.set('name', name);

    router.push(`/waitlist-variant-c-form?${params.toString()}`);
  };

  return (
    <>
      <div className="-mt-6 md:mt-0 lg:mt-0 h-0 md:h-24 lg:h-24"></div>

      <div className="px-4 mx-auto md:px-20">
        <h1 className="text-4xl text-center md:text-5xl font-bold mb-8 leading-tight text-white" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          You&apos;re officially on the waitlist.
        </h1>

        <p className="text-lg block md:hidden lg:hidden text-center mx-4 md:mx-20 lg:mx-20 md:text-lg mb-6 text-gray-300" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        I&apos;ve crossed you off for the next cohort, but I might have something else.
        </p>

        <p className="text-lg block md:hidden lg:hidden text-center mx-4 md:mx-20 lg:mx-20 md:text-lg mb-6 text-gray-300" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        Take a short quiz below and I&apos;ll send you a custom scorecard with exactly what&apos;s draining your energy.
        </p>

        <p className="text-lg hidden md:block lg:block text-center mx-4 md:mx-20 lg:mx-20 md:text-lg mb-6 text-gray-300" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        I&apos;ve crossed you off for the next cohort, but I might have something else. Take a short quiz below and I&apos;ll send you a custom scorecard with exactly what&apos;s draining your energy.
        </p>

        </div>


      {/* CTA Button Section */}
      <div className="mt-10 scale-[1.2] md:scale-[1.0] lg:scale-[1.0] px-4 md:px-20 flex justify-center">
        <button
          onClick={handleQuizClick}
          className="font-bold text-white transition-all duration-200 hover:opacity-90 focus:outline-none py-4 px-12 text-lg rounded-md inline-block relative z-30"
          style={{ backgroundColor: '#851A10', fontFamily: 'Inter, sans-serif' }}
        >
          Take the quiz
        </button>
      </div>
    </>
  );
}
