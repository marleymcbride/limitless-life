'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function EnrollmentPageContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');

  // Pre-fill from URL params
  useEffect(() => {
    setName(searchParams.get('name') || '');
    setEmail(searchParams.get('email') || '');
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with logo top right */}
      <div className="fixed top-0 right-0 p-6 z-10">
        <img
          src="/images/LIMITLESS LIFE LOGO 2026.png"
          alt="Limitless Life"
          className="h-12"
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Creator details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Limitless Life Course
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Transform your life with our comprehensive self-paced course.
              </p>
            </div>

            <div className="prose prose-gray">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About the Instructor
              </h2>
              <p className="text-gray-700 mb-4">
                Marley McBride has helped thousands of students transform their lives through proven methodologies and practical wisdom.
              </p>
              <p className="text-gray-700 mb-4">
                With years of experience in personal development and transformational coaching, this course distills the best practices into an easy-to-follow format.
              </p>
              <p className="text-gray-700">
                Join thousands of successful students who have changed their lives using these principles.
              </p>
            </div>

            {name && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>Enrolling as:</strong> {name}
                </p>
                {email && (
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {email}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right column - Purchase section */}
          <div className="lg:pl-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Enroll Now
              </h2>

              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $297
                </div>
                <p className="text-gray-600">
                  One-time payment • Lifetime access
                </p>
              </div>

              <button className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 text-lg uppercase tracking-wide shadow-lg">
                Buy Now
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 00016zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293 12.293a1 1 0 101.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lifetime access
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 00016zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293 12.293a1 1 0 101.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Self-paced learning
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 00016zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293 12.293a1 1 0 101.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant access
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Secure payment • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <EnrollmentPageContent />
    </Suspense>
  );
}
