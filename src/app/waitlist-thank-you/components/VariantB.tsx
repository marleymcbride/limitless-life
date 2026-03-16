'use client';

import React from 'react';
import { GammaHeadline, GammaParagraph, GammaCTA } from '@/components/gamma-article';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';

export default function VariantB() {
  const { sessionId } = useSession();

  const handleOptionalForm = async () => {
    // Track secondary CTA click
    await trackEvent({
      sessionId,
      eventType: 'waitlist_application_started',
      eventData: { source: 'variant_b_optional_cta' },
    });

    // TODO: Open Fillout modal or navigate to form
    alert('Optional application form - Coming soon!');
  };

  return (
    <>
    <div className="h-24"></div>
      <div className="mx-24">

      <h1 className="text-4xl md:text-5xl font-bold mb-8 -ml-2 leading-tight" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        You&apos;re officially on the waitlist.
      </h1>

      <p className="text-lg md:text-xl mb-6" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        Keep an eye open for your inbox where I&apos;ll send you the details in the coming weeks.
      </p>

      <p className="text-lg md:text-xl mb-6" style={{ color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        <strong>Want to jump to the front of the line?</strong> Tell me what you&apos;re looking for (takes 2 minutes) and I&apos;ll prioritize your spot.
      </p>

      <div className="my-8">
        <button
          onClick={handleOptionalForm}
          className="px-8 py-4 text-white font-bold text-lg rounded-lg transition-colors"
          style={{ backgroundColor: '#851910' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a140d'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#851910'}
        >
          Jump the Queue →
        </button>
      </div>
      </div>

    </>
  );
}
