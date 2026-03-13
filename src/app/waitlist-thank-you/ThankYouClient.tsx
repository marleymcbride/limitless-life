'use client';

import React, { useEffect } from 'react';
import { GammaArticle } from '@/components/gamma-article';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';
import VariantA from './components/VariantA';
import VariantB from './components/VariantB';
import VariantC from './components/VariantC';

interface ThankYouClientProps {
  variant: 'A' | 'B' | 'C';
}

export default function ThankYouClient({ variant }: ThankYouClientProps) {
  const { sessionId } = useSession();

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
    switch (variant) {
      case 'A':
        return <VariantA />;
      case 'B':
        return <VariantB />;
      case 'C':
      default:
        return <VariantC />;
    }
  };

  return (
    <GammaArticle>
      {renderVariant()}

      {/* Footer - outside article on dark background */}
      <div className="text-center py-8" style={{ backgroundColor: '#0B151B' }}>
        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          © EVLV Fitness LLC {new Date().getFullYear()}
        </p>
      </div>
    </GammaArticle>
  );
}
