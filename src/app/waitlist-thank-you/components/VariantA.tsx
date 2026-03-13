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
      <GammaHeadline level={1}>
        Thank You for Your Interest
      </GammaHeadline>

      <GammaParagraph>
        Please enter a few details now to help me customise the cohort specifically for you.
      </GammaParagraph>

      <GammaParagraph>
        This helps me ensure you're the right fit for the cohort.
      </GammaParagraph>

      <div className="my-8">
        <button
          onClick={handleOpenApplication}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-colors"
        >
          Continue to Application →
        </button>
      </div>

      <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          What happens next?
        </h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 font-bold">1.</span>
            <span>Complete your application (2 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 font-bold">2.</span>
            <span>Review the full beta program details</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 font-bold">3.</span>
            <span>Secure your spot with a deposit (optional)</span>
          </li>
        </ol>
      </div>
    </>
  );
}
