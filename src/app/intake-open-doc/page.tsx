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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            THE LIFESTYLE ATHLETE 90-DAY RESET
          </h1>
          <p className="text-1.5lg italic text-gray-700 mb-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
            Starting {COHORT_CONFIG.DATE_FULL}
          </p>
          <div className="w-1/6 mx-auto border-b border-gray-300"></div>
        </div>

        <GammaHeader
          authorName="Marley McBride"
          authorAvatar="/images/Offer doc/F2C9OR3X0AIuRPS copy 2.jpeg"
          lastUpdated="March 2026"
        />

        <GammaBlockquote>
          <div className="space-y-4">
            <p>
              The first public cohort officially kicks off this April.
            </p>
            <p>
              There will be <strong>only 10 spots available</strong> as i want to give my full attention to each member.
            </p>
            <p>
            If you think you&apos;re a fit you can <strong> apply now to get in early for April</strong>.
            </p>
            <p>
            — Marley
            </p>
          </div>
        </GammaBlockquote>

        <div className="" style={{ backgroundColor: '#204166' }}>
          <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-6 text-gray-100" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
            I'm going to work with a handful of coaches to build a 7-figure Lifestyle Empire™ in 2026.
          </p>
        </div>

        <IntakeDocWrapper>
          {/* Body content loads dynamically */}
        </IntakeDocWrapper>
      </GammaArticle>

      {/* Footer - outside article on dark background */}
      <div className="text-center py-8" style={{ backgroundColor: '#0B151B' }}>
        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          © EVLV Fitness LLC {new Date().getFullYear()}
        </p>
      </div>
    </IntakeDocClient>
  );
}
