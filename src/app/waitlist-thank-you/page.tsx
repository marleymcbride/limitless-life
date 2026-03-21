import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ThankYouClient from './ThankYouClient';

export const metadata: Metadata = {
  title: 'Waitlist Confirmed | Limitless-Life ',
  description: 'Thank you for joining the Limitless Life beta waitlist.',
};

async function WaitlistThankYouPageContent({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  // Await searchParams (Next.js 14+ requires this)
  const params = await searchParams;

  // Debug: Log raw searchParams
  console.log('[WaitlistThankYouPage] Raw params:', params);
  console.log('[WaitlistThankYouPage] params.variant:', params.variant);

  // Get variant from URL params, default to 'C' (safest option)
  const variant = (params.variant || 'C').toUpperCase();

  console.log('[WaitlistThankYouPage] Processed variant:', variant);

  // Validate variant
  const validVariants = ['A', 'B', 'C'];
  const safeVariant = validVariants.includes(variant) ? variant : 'C';

  console.log('[WaitlistThankYouPage] Safe variant:', safeVariant);

  return <ThankYouClient variant={safeVariant} />;
}

export default function WaitlistThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <WaitlistThankYouPageContent searchParams={searchParams} />
      </Suspense>

      {/* Footer - outside everything on dark background */}
      <div className="text-center py-8" style={{ backgroundColor: '#0B151B' }}>
        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          © EVLV Fitness LLC {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
}
