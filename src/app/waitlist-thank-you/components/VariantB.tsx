'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';
import BetaWaitlistRedirect from '@/components/beta-waitlist-redirect';

export default function VariantB() {
  const { sessionId } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showRedirect, setShowRedirect] = useState(false);

  const handleOptionalForm = async () => {
    // Track secondary CTA click
    await trackEvent({
      sessionId,
      eventType: 'waitlist_application_started',
      eventData: { source: 'variant_b_secret_details_cta' },
    });

    // Show redirect screen
    setShowRedirect(true);
  };

  // If redirect was triggered, show the redirect screen
  if (showRedirect) {
    return <BetaWaitlistRedirect redirectTo="/intake-open-doc-beta-waitlist" />;
  }

  return (
    <>
    <div className="mt-12 md:h-24 pt-0 lg:h-24 min-h-[15vh]"></div>
      <div className="ml-6 md:ml-0 lg:ml-0 -mr-2 mx-0 md:mx-24 lg:mx-24">

      <h1 className="text-3xl -mt-24 md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        You&apos;re officially on the waitlist.
      </h1>

       {/*  <p className="text-base md:text-lg lg:text-xl mb-6" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        Keep an eye open for your inbox where I&apos;ll send you the details in the coming weeks.
      </p> */}

      <p className="text-thin md:text-lg lg:text-xl mb-6" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        Psst.. btw i may have the details for a few secret spots...
      </p>

      <p className="text-base md:text-lg lg:text-xl mb-6" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
      
      </p>

    
      <div className="my-8 flex justify-center md:justify-start lg:justify-start">
        <button
          onClick={handleOptionalForm}
          className="px-8 py-4 mr-6 md:mr-0 lg:mr-0 md:px-8 md:py-4 lg:px-8 lg:py-4 text-white font-bold rounded-lg transition-colors"
          style={{ backgroundColor: '#851910', fontSize: '1.125rem' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a140d'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#851910'}
        >
          Unlock the secret details
        </button>
      </div>
      </div>

    </>
  );
}
