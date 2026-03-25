import React from 'react';
import { Metadata } from 'next';
import {
  GammaArticle,
  GammaHeader,
  GammaHeadline,
  GammaParagraph,
  GammaList,
  GammaBlockquote,
  GammaSectionHeading,
  GammaCTA,
} from '@/components/gamma-article';
import IntakeDocClient from './IntakeDocClient';
import IntakeDocWrapper from './IntakeDocWrapper';
import { COHORT_CONFIG } from '@/config/waitlist';

export const metadata: Metadata = {
  title: 'Limitless 2026 Beta Launch',
  description: 'Join the Limitless Life beta program and create lasting change in 30 days.',
};

export default function IntakeOpenDoc() {
  return (
    <IntakeDocClient>
      <GammaArticle>
        {/* Page Title Heading */}
        <div className="mb-4 pb-4 text-center">
          <div
            className="font-bold text-white mb-2 text-[1.9rem] -mr-4 -ml-2 md:text-[2.25rem] lg:text-[2.25rem]"
          >
            THE LIFESTYLE ATHLETE 90-DAY RESET
          </div>
          <p className="text-1.5lg italic text-gray-300 mb-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
            Starting {COHORT_CONFIG.DATE_FULL}
          </p>
          <div className="w-1/6 mx-auto border-b border-gray-300"></div>
        </div>

        <GammaHeader
          authorName="Marley McBride"
          authorAvatar="/images/Offer doc/F2C9OR3X0AIuRPS copy 2.jpeg"
          lastUpdated="March 2026"
          className="pt-4 md:pt-2 lg:pt-2"
        />

        <GammaBlockquote>
          <div className="space-y-4">
            <div>
              The first public cohort officially kicks off this April.
            </div>
            <div>
              There will be <strong>only 10 spots available</strong> as i want to give my full attention to each member.
            </div>
            <div>
            If you think you&apos;re a fit you can <strong> apply now to get in early for April</strong>.
            </div>
            <div>
            — Marley
            </div>
          </div>
        </GammaBlockquote>

        <div className=" -mr-4 -ml-1 md:-ml-8 md:-mr-2 lg:-ml-2 lg:-mr-8" style={{ backgroundColor: '#204166' }}>
          <div className="text-2xl ml-2 md:text-2xl lg:text-2xl font-bold leading-relaxed mb-6 text-gray-100" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          I&apos;m working with a small group of men who are ready to be reborn in 2026.
          </div>
        </div>

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
