'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilloutStandardEmbed } from '@fillout/react';

function WaitlistVariantCFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';

  const handleFormSubmit = () => {
    console.log('[VariantC Form] Form submitted at:', new Date().toISOString());

    // Show submitted state immediately
    setIsSubmitted(true);

    // Redirect to success page after 5 seconds
    setTimeout(() => {
      console.log('[VariantC Form] Redirecting to success page');
      router.push('/waitlist-variant-c-form-success');
    }, 5000);
  };

  const handleFormSuccess = () => {
    console.log('[VariantC Form] onSuccess fired at:', new Date().toISOString());
  };

  return (
    <div style={{ backgroundColor: '#0E0F12', minHeight: '100vh' }}>
      {/* Loading overlay shown after submission */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#0E0F12' }}>
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div
                className="rounded-full flex items-center justify-center animate-spin"
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  borderTopColor: '#851A10'
                }}
              />
            </div>
            <p
              className="text-xl"
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
                color: 'white'
              }}
            >
              Processing your responses...
            </p>
          </div>
        </div>
      )}

      <div className="py-4 md:py-16 px-4 md:px-20">
        <div className="h-12 md:h-24"></div>

        <div className="z-20 relative mt-0 mx-auto" style={{ width: '100%', maxWidth: '1000px', height:'50%', marginTop: '2rem' }}>
          <div className="relative z-20 mt-2 pl-0 md:pl-5 max-h-[400px] md:max-h-[400px] lg:max-h-[400px] overflow-hidden">
            <FilloutStandardEmbed
              filloutId="pb6W8WqeTPus"
              domain="limitless-life.fillout.com"
              parameters={{
                email: email || undefined,
                name: name || undefined,
              }}
              dynamicResize={true}
              onSuccess={handleFormSuccess}
              onSubmit={() => console.log('[VariantC Form] onSubmit fired')}
              onButtonClick={() => console.log('[VariantC Form] onButtonClick fired')}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WaitlistVariantCFormPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#0E0F12', minHeight: '100vh' }}>Loading...</div>}>
      <WaitlistVariantCFormContent />
    </Suspense>
  );
}
