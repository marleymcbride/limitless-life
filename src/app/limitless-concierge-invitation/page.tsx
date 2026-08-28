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
import WhatsAppButton from '@/components/whatsapp-button';
import { isConciergeLive } from '@/lib/programme-state';

// Read the live flag from the DB on every request so the admin toggle
// takes effect immediately without a redeploy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Limitless Concierge Invitation',
  description: 'Your personal invitation to the Limitless Concierge experience.',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LimitlessConciergeInvitation({ searchParams }: Props) {
  const params = await searchParams;
  const name = typeof params.name === 'string' ? params.name : '';
  const email = typeof params.email === 'string' ? params.email : '';
  const live = await isConciergeLive();

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          #concierge-body article {
            max-width: 100% !important;
          }
          #concierge-body > div > div {
            background-color: #0B151B !important;
          }
        }
      `}</style>
    <div id="concierge-body">
    <IntakeDocClient name={name} email={email}>
      <GammaArticle>
        {/* Page Title Heading */}
        <div className="mb-4 pb-4 text-center">
          {!live && (
            <div
              className="text-base mb-2"
              style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', color: '#E1E5E8' }}
            >
              [NOW CLOSED]
            </div>
          )}
          <div
            className="font-bold text-white mb-2 text-[1.9rem] -mr-4 -ml-2 md:text-[2.25rem] lg:text-[2.25rem]"
          >
            {live
              ? name
                ? `${name}, your invitation to Limitless Concierge`
                : 'Your Invitation to Limitless Concierge'
              : 'Limitless Concierge Experience'}
          </div>
          <div className="w-1/6 mx-auto border-b border-gray-300"></div>
        </div>

        <GammaHeader
          authorName="Marley McBride"
          authorAvatar="/images/Offer doc/F2C9OR3X0AIuRPS copy 2.jpeg"
          lastUpdated="August 2026"
          className="pt-4 md:pt-2 lg:pt-2"
        />

        <GammaBlockquote>
          <div className="space-y-4">
          {live ? (
            <>
              <div>
                Hey{name ? ` ${name}` : ''}, quick FYI
              </div>
              <div>
                Have a read through your invitation for Limitless Concierge below, drop me a message on Whatsapp if you have any other questions.
              </div>
              <div>
                Marley
              </div>
            </>
          ) : (
            <>
              <div>
                Hey{name ? ` ${name}` : ''},
              </div>
              <div>
                This programme is currently closed to new clients. To be the first to hear when we re-open, go through the doc below to find out how to get on the waitlist.
              </div>
              <div>
                Marley
              </div>
            </>
          )}
          </div>
        </GammaBlockquote>

        <IntakeDocWrapper name={name} email={email} live={live}>
          {/* Body content loads dynamically */}
        </IntakeDocWrapper>
      </GammaArticle>
    </IntakeDocClient>
    </div>

      {/* Footer */}
      <div className="text-center py-8" style={{ backgroundColor: '#060A0E' }}>
        <div className="text-sm font-medium text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          © EVLV Fitness LLC {new Date().getFullYear()}
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <WhatsAppButton />

      {/* Spacer to ensure page is always scrollable on mobile */}
      <div style={{ height: '1px' }}></div>
    </>
  );
}