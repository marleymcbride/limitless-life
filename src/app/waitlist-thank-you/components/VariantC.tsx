'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COHORT_CONFIG } from '@/config/waitlist';

export default function VariantC() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if form was already submitted
    const formSubmitted = searchParams.get('form_submitted');

    // If not submitted, redirect to the form page
    if (formSubmitted !== 'true') {
      const params = new URLSearchParams();
      const email = searchParams.get('email');
      const name = searchParams.get('name');
      if (email) params.set('email', email);
      if (name) params.set('name', name);

      router.push(`/waitlist-variant-c-form?${params.toString()}`);
    }
  }, [router, searchParams]);

  const formSubmitted = searchParams.get('form_submitted') === 'true';

  // If form was submitted, show the actual thank you content
  if (formSubmitted) {
    return (
      <>
        <div className="h-24"></div>

        <div className="mx-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 -ml-2 leading-tight" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
            You&apos;re officially on the waitlist.
          </h1>

          <p className="text-lg md:text-xl mb-6" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
            The next cohort will be starting on {COHORT_CONFIG.DATE}. Once the next cohort dates open up you&apos;ll be the first to know.
          </p>

          <p className="text-lg md:text-xl mb-12" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
            If i have any other offerings that might be a better fit i&apos;ll let you know before anyone.
          </p>
        </div>
      </>
    );
  }

  // Show loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg" style={{ color: '#111827' }}>Loading...</p>
    </div>
  );
}
