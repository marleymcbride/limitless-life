import React from 'react';
import { betaUnifiedGradientWithSpotlightDesktopNoBottomRed, betaUnifiedGradientWithSpotlightMobileNoBottomRed, vignetteEffect } from '@/lib/utils';

export const metadata = {
  title: 'ATF Background',
  description: 'Clean ATF background for course modules',
};

export default function ATFBackgroundPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: '#050A0F' }}>
      {/* Hero Section - Background Only (No Content) */}
      <section
        id="atf-background-section"
        className={`pt-2 md:pt-6 pb-16 px-4 min-h-[100vh] sm:pb-16 flex flex-col relative w-full overflow-hidden bg-black`}
      >
        {/* Background Layers - Exact Match to ATF (No Bottom Red) */}
        <div className="hidden md:block">{betaUnifiedGradientWithSpotlightDesktopNoBottomRed}</div>
        <div className="block md:hidden">{betaUnifiedGradientWithSpotlightMobileNoBottomRed}</div>
        <div className="hero-grain-overlay"></div>
        <div className="hero-darkening-overlay"></div>
        {vignetteEffect}

        {/* Empty container - Just the height, no content */}
        <div className="flex relative z-30 flex-col mx-auto h-full" aria-hidden="true" />
      </section>
    </main>
  );
}
