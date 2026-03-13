'use client';

import React, { useState } from 'react';
import { GammaHeadline, GammaParagraph, GammaCTA } from '@/components/gamma-article';
import { trackEvent } from '@/lib/analytics';
import { useSession } from '@/hooks/useSession';

export default function VariantA() {
  const [showFilloutModal, setShowFilloutModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const { sessionId } = useSession();

  const handleOpenApplication = async () => {
    setShowFilloutModal(true);

    // Track application started event
    await trackEvent({
      sessionId,
      eventType: 'waitlist_application_started',
      eventData: { source: 'variant_a_thank_you' },
    });
  };

  const handleApplicationSubmit = async () => {
    setApplicationSubmitted(true);
    setShowFilloutModal(false);

    // Track application completed event
    await trackEvent({
      sessionId,
      eventType: 'waitlist_application_completed',
      eventData: { source: 'variant_a_thank_you' },
    });
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

      {!applicationSubmitted ? (
        <div className="my-8">
          <button
            onClick={handleOpenApplication}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-colors"
          >
            Continue to Application →
          </button>
        </div>
      ) : (
        <div className="my-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Application Received!
          </h3>
          <p className="text-green-700 mb-4">
            Thank you for completing your application. I'll review it and get back to you soon.
          </p>

          <div className="space-y-4">
            <div>
              <GammaCTA href="/intake-open-doc">
                → View the full beta program details
              </GammaCTA>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-600 mb-2">Ready to secure your spot?</p>
              <button
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                onClick={() => {
                  // TODO: Implement deposit payment flow
                  console.log('Deposit payment clicked');
                  alert('Deposit payment flow - Coming soon!');
                }}
              >
                Secure Your Spot with a Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fillout Modal Placeholder */}
      {showFilloutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Application Form</h2>
              <button
                onClick={() => setShowFilloutModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>TODO:</strong> Embed Fillout form here. Add your form via:
              </p>
              <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
                <li>Create form in Fillout.com</li>
                <li>Get embed code</li>
                <li>Replace this div with Fillout component</li>
                <li>Set up webhook to /api/webhooks/fillout-application</li>
              </ol>
            </div>

            {/* Placeholder for form submission */}
            <button
              onClick={handleApplicationSubmit}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Submit Application (Demo)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
