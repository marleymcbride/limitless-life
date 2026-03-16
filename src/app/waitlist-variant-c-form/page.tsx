'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilloutStandardEmbed } from '@fillout/react';

function WaitlistFormContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSuccess = () => {
    console.log('[VariantCForm] Form submitted');
    setIsSubmitted(true);

    // Redirect to VariantC thank you page with form_submitted flag
    const params = new URLSearchParams();
    params.set('variant', 'C');
    params.set('form_submitted', 'true');
    if (email) params.set('email', email);
    if (name) params.set('name', name);

    setTimeout(() => {
      window.location.href = `/waitlist-thank-you?${params.toString()}`;
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thanks for sharing!
          </h2>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>
        <div className="py-16" style={{ paddingLeft: 'calc(3rem + 90px)', paddingRight: 'calc(3rem + 90px)' }}>

          <div className="h-24"></div>

          <div className="mt-4 mx-12">
            <h1 className="text-4xl md:text-2.5xl font-normal z-10 ml-20 mr-8 pr-24 text-left mb-4" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
              No problem.
            </h1>

            <h1 className="text-4xl md:text-2.5xl font-normal z-10 ml-20 mr-8 pr-24 text-left mb-0" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
              In a few sentences let me know what your biggest problem is right now and i&apos;ll see how i can help you:
            </h1>
          </div>

          <div className="z-20 relative" style={{ width: '80%', height: '500px', marginTop: '0rem' }}>
            <div className="relative z-20 -mt-4 ml-20 pl-5"
              style={{ maxHeight: '170px', marginTop: '0px', overflow: 'hidden' }}>
              <FilloutStandardEmbed
                filloutId="pb6W8WqeTPus"
                domain="forms.fillout.com"
                parameters={{
                  email: email,
                  name: name,
                }}
                onSubmit={() => {
                  console.log('[VariantCForm] Form submitted');
                  handleFormSuccess();
                }}
                onReady={() => {
                  console.log('[VariantCForm] Form ready');
                  console.log('[VariantCForm] Pre-filling with:', { email, name });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WaitlistVariantCFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <WaitlistFormContent />
    </Suspense>
  );
}
