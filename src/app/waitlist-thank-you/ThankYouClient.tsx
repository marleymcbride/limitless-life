'use client';

import React, { useEffect } from 'react';
import { VariantArticle } from '@/components/variant-article';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';
import VariantA from './components/VariantA';
import VariantB from './components/VariantB';
import VariantC from './components/VariantC';

interface ThankYouClientProps {
  variant: 'A' | 'B' | 'C';
  backgroundColor?: string;
}

export default function ThankYouClient({ variant, backgroundColor = '#000000' }: ThankYouClientProps) {
  const { sessionId } = useSession();

  // Debug: Log variant value
  useEffect(() => {
    console.log('[ThankYouClient] Variant prop:', variant);
    console.log('[ThankYouClient] Variant type:', typeof variant);
  }, [variant]);

  useEffect(() => {
    // Track page view with variant
    const trackThankYouView = async () => {
      const variantEventMap = {
        'A': 'waitlist_variant_A_viewed',
        'B': 'waitlist_variant_B_viewed',
        'C': 'waitlist_variant_C_viewed',
      } as const;

      // Track general thank you page view
      await trackEvent({
        sessionId,
        eventType: 'waitlist_thank_you_viewed',
        eventData: { variant },
      });

      // Track variant-specific view
      await trackEvent({
        sessionId,
        eventType: variantEventMap[variant],
        eventData: { variant },
      });
    };

    trackThankYouView();
  }, [variant, sessionId]);

  // Render appropriate variant component
  const renderVariant = () => {
    console.log('[renderVariant] Switch variant:', variant, 'Type:', typeof variant);

    switch (variant) {
      case 'A':
        console.log('[renderVariant] Rendering VariantA');
        return <VariantA />;
      case 'B':
        console.log('[renderVariant] Rendering VariantB');
        return <VariantB />;
      case 'C':
        console.log('[renderVariant] Rendering VariantC');
        return <VariantC />;
      default:
        console.log('[renderVariant] Default case - rendering VariantC');
        return <VariantC />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor }}>
      <VariantArticle backgroundColor={backgroundColor}>
        {renderVariant()}
      </VariantArticle>
    </div>
  );
}
