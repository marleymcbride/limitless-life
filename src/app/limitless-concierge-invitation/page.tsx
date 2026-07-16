import React from 'react';
import { Metadata } from 'next';
import {
  GammaArticle,
  GammaHeader,
  GammaParagraph,
  GammaList,
  GammaBlockquote,
  GammaSectionHeading,
} from '@/components/gamma-article';
import IntakeDocClient from './IntakeDocClient';
import IntakeDocWrapper from './IntakeDocWrapper';

export const metadata: Metadata = {
  title: 'Limitless Concierge Invitation',
  description: 'Your personal invitation to the Limitless Concierge experience.',
};

export default function LimitlessConciergeInvitation() {
  return (
    <IntakeDocClient>
      <GammaArticle>
        {/* Page Title Heading */}
        <div className="mb-4 pb-4 text-center">
          <div
            className="font-bold text-white mb-2 text-[1.9rem] -mr-4 -ml-2 md:text-[2.25rem] lg:text-[2.25rem]"
          >
            Here's your invite to Limitless Concierge:
          </div>
          <div className="w-1/6 mx-auto border-b border-gray-300"></div>
        </div>

        <GammaHeader
          authorName="Marley McBride"
          authorAvatar="/images/Offer doc/F2C9OR3X0AIuRPS copy 2.jpeg"
          lastUpdated="July 2026"
          className="pt-4 md:pt-2 lg:pt-2"
        />

        <GammaBlockquote>
          <div className="space-y-4">
          <div>
              Hey quick FYI
            </div>           
            <div>
              Have a read through your invitation for Limitless Concierge below, and let me know if you're in or not.
            </div>
            <div>
            Cheers, Marley
            </div>
          </div>
        </GammaBlockquote>

        <IntakeDocWrapper>
          {/* Body content loads dynamically */}
        </IntakeDocWrapper>
      </GammaArticle>

      {/* Footer - outside article on dark background */}
      <div className="text-center py-8" style={{ backgroundColor: '#0B151B' }}>
        <div className="text-sm font-medium text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          © EVLV Fitness LLC {new Date().getFullYear()}
        </div>
      </div>

      {/* Spacer to ensure page is always scrollable on mobile */}
      <div style={{ height: '1px' }}></div>
    </IntakeDocClient>
  );
}
