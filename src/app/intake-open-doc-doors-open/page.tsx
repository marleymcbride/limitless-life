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
import { isProgrammeLive } from '@/lib/programme-state';

// Read the live flag from the DB on every request so the admin toggle
// takes effect immediately without a redeploy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Join The Lifestyle Athlete 90-Day Reset',
  description: 'Secure your spot in The Limitless Life program and create lasting change.',
};

export default async function IntakeOpenDoc() {
  const live = await isProgrammeLive();

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
            {live ? `Starting ${COHORT_CONFIG.DATE_FULL}` : 'This programme is now closed.'}
          </p>
          <div className="w-1/6 mx-auto border-b border-gray-300"></div>
        </div>

        <GammaHeader
          authorName="Marley McBride"
          authorAvatar="/images/Offer doc/F2C9OR3X0AIuRPS copy 2.jpeg"
              lastUpdated="May 2026"
          className="pt-4 md:pt-2 lg:pt-2"
        />

        <GammaBlockquote>
          {live ? (
            <div className="space-y-4">
              <div>
                Doors are <strong>OPEN NOW</strong> for the upcoming cohort.
              </div>
              <div>
                Secure your spot today and join the next cohort starting {COHORT_CONFIG.DATE}.
              </div>
              <div>
                <strong>Apply now to lock in your position</strong> before doors close.
              </div>
              <div>
                — Marley
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                This programme is currently <strong>closed</strong> for new applicants.
              </div>
              <div>
                Join the waitlist below and you&apos;ll be first in line when doors reopen.
              </div>
              <div>
                — Marley
              </div>
            </div>
          )}
        </GammaBlockquote>

        <div className=" -mr-4 -ml-1 md:-ml-8 md:-mr-2 lg:-ml-2 lg:-mr-8" style={{ backgroundColor: '#204166' }}>
          <div className="text-2xl ml-2 md:text-2xl lg:text-2xl font-bold leading-relaxed mb-6 text-gray-100" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          I&apos;m working with a select group of men who are ready to be reborn.
          </div>
        </div>

        <IntakeDocWrapper live={live}>
          {/* Body content loads dynamically */}
        </IntakeDocWrapper>
      </GammaArticle>

      {/* Footer - outside article on dark background */}
      <div className="text-center py-8" style={{ backgroundColor: '#060A0E' }}>
        <div className="text-sm font-medium text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          © EVLV Fitness LLC {new Date().getFullYear()}
        </div>
      </div>

      {/* Spacer to ensure page is always scrollable on mobile */}
      <div style={{ height: '1px' }}></div>
    </IntakeDocClient>
  );
}
