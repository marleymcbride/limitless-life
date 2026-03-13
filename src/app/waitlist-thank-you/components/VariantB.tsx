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
      <GammaHeadline level={1}>
        Thank You for Your Interest
      </GammaHeadline>

      <GammaParagraph>
        We'll send you the full details to your email in the coming weeks. Keep a lookout!
      </GammaParagraph>

      <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Want to guarantee a spot when details come out?
        </h3>
        <p className="text-blue-800 mb-4">
          Fill in this quick form to jump the queue when we open applications.
        </p>

        <button
          onClick={handleOptionalForm}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Fill in Quick Form (Optional)
        </button>

        <p className="text-sm text-blue-700 mt-3 italic">
          No pressure - just a way to jump the queue if you're excited.
        </p>
      </div>

      <GammaParagraph>
        In the meantime, you'll be first to know when cohort details are announced.
      </GammaParagraph>
    </>
  );
}
