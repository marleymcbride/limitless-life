'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GammaHeadline, GammaParagraph, GammaCTA } from '@/components/gamma-article';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';

export default function VariantA() {
  const [showFilloutModal, setShowFilloutModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const { sessionId } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get user data from URL params (passed from waitlist signup)
  useEffect(() => {
    const email = searchParams.get('email') || '';
    const name = searchParams.get('name') || '';
    setUserEmail(email);
    setUserName(name);
  }, [searchParams]);

  const handleOpenApplication = async () => {
    // Track application started event
    await trackEvent({
      sessionId,
      eventType: 'waitlist_application_started',
      eventData: { source: 'variant_a_thank_you' },
    });

    // Navigate to Fillout form page with user data
    const params = new URLSearchParams();
    if (userEmail) params.set('email', userEmail);
    if (userName) params.set('name', userName);

    router.push(`/application-prep-waitlist-version?${params.toString()}`);
  };

  return (
    <>
    <div className="min-h-[200px]"></div>
      <div className="mx-24 items-center -mt-24 pb-24">
          
      <h1 className="text-4xl text-center md:text-5xl font-bold mb-8 -ml-2 leading-tight" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        Secure Your Spot Now
      </h1>

      <p className="text-center text-lg md:text-xl mb-6" style={{ color: '#FFFFFF', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', lineHeight: '1.728' }}>
        One final step and I&apos;ll send you through to the full offer.
      </p>

      <div className="flex justify-center my-8">
        <button
          onClick={handleOpenApplication}
          className="px-8 py-4 max-h-[80px] text-white font-bold text-lg rounded-lg transition-colors"
          style={{ backgroundColor: '#851910' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a140d'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#851910'}
        >
          Continue to the Offer →
        </button>
        <div className="mb-24 pb-24 h-24"></div>
      </div>

      </div>
    </>
    
  );
}
