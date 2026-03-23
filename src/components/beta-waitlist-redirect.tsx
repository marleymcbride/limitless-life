'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';

interface BetaWaitlistRedirectProps {
  redirectTo: string; // URL to redirect to
  delay?: number; // Delay in milliseconds (default: 2000)
}

export default function BetaWaitlistRedirect({ redirectTo, delay = 3000 }: BetaWaitlistRedirectProps) {
  const { sessionId } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auto-redirect after specified delay
  useEffect(() => {
    const redirectTimer = setTimeout(async () => {
      // Track redirect event
      await trackEvent({
        sessionId,
        eventType: 'beta_waitlist_auto_redirect',
        eventData: { destination: redirectTo },
      });

      // Preserve URL params during redirect
      const params = new URLSearchParams();
      const email = searchParams.get('email');
      const name = searchParams.get('name');
      if (email) params.set('email', email);
      if (name) params.set('name', name);

      router.push(`${redirectTo}?${params.toString()}`);
    }, delay);

    return () => clearTimeout(redirectTimer);
  }, [sessionId, router, searchParams, redirectTo, delay]);

  return (
    <div className="md:min-h-screen lg:min-h-screen min-h-[10px] flex items-start justify-center px-4 md:px-6 lg:px-8 pt-[10vh]">
      <div className="text-center max-w-md mx-0 md:mx-24 lg:mx-24">
        <div className="text-5xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-6 leading-tight" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          Secret spots being unlocked
        </div>

        <div className="text-2.5xl mt-12 md:text-xl lg:text-xl font-normal mb-4 md:mb-6 lg:mb-6 leading-tight" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
          Redirecting you to the full details...
        </div>

        {/* Loading Spinner */}
        <div className="mt-6 md:mt-8 lg:mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 md:h-13 md:w-13 lg:h-13 lg:w-13 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    </div>
  );
}
