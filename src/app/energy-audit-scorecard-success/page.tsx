'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function EnergyAuditScorecardSuccessPage() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: '#0E0F12', minHeight: '100vh' }}>
      <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: '85vh', paddingTop: '100px' }}>
        <div className="max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#851910'
              }}
            >
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1
            className="text-4xl md:text-4.5xl font-bold mb-6"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
              color: 'white'
            }}
          >
            Your energy audit is on the way.
          </h1>

          <p
            className="text-xl md:text-2xl mb-8"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
              color: '#d1d5db',
              lineHeight: '1.728'
            }}
          >
          </p>

          <p
            className="text-1.5xl font-normal"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
              color: '#FFFFFF'
            }}
          >
            Check your inbox in 2-3 minutes for your customized gameplan.
          </p>
        </div>
      </div>
    </div>
  );
}
