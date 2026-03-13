'use client';

import React from 'react';
import { GammaHeadline, GammaParagraph } from '@/components/gamma-article';

export default function VariantC() {
  return (
    <>
      <GammaHeadline level={1}>
        Thank You for Joining the Waitlist
      </GammaHeadline>

      <GammaParagraph>
        We'll get in touch once the next cohort dates are announced.
      </GammaParagraph>

      <GammaParagraph>
        If we have any other offerings that might be a better fit, we'll be in touch.
      </GammaParagraph>

      <div className="my-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          What Happens Next?
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>You're on our exclusive waitlist</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>We'll email you when cohort dates are set</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>You'll get early access to applications</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>We'll share other relevant opportunities</span>
          </li>
        </ul>
      </div>

      <GammaParagraph>
        Thanks for your interest in the Limitless Life program!
      </GammaParagraph>
    </>
  );
}
