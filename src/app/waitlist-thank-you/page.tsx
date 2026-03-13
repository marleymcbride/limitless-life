import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ThankYouClient from './ThankYouClient';

export const metadata: Metadata = {
  title: 'Thank You - Limitless Life Beta Waitlist',
  description: 'Thank you for joining the Limitless Life beta waitlist.',
};

function WaitlistThankYouPageContent({
  searchParams,
}: {
  searchParams: { variant?: string };
}) {
  // Get variant from URL params, default to 'C' (safest option)
  const variant = (searchParams.variant || 'C').toUpperCase();

  // Validate variant
  const validVariants = ['A', 'B', 'C'];
  const safeVariant = validVariants.includes(variant) ? variant : 'C';

  return <ThankYouClient variant={safeVariant} />;
}

export default function WaitlistThankYouPage({
  searchParams,
}: {
  searchParams: { variant?: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaitlistThankYouPageContent searchParams={searchParams} />
    </Suspense>
  );
}
