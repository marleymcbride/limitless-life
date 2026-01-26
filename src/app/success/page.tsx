"use client";

import { CTAButton } from "../../components/ui/cta-button";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#940909] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Welcome to The Limitless Protocol
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your payment was successful and your transformation journey begins
            now.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">
            What Happens Next?
          </h2>
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#940909] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-1">
                  Check Your Email
                </h3>
                <p className="text-gray-700">
                  You'll receive a welcome email with your login credentials and
                  immediate next steps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#940909] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-1">
                  Access Your Portal
                </h3>
                <p className="text-gray-700">
                  Get immediate access to the training materials and your
                  personalized protocol setup.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#940909] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-1">
                  Schedule Your Onboarding
                </h3>
                <p className="text-gray-700">
                  Depending on your tier, you'll receive instructions to
                  schedule your coaching calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CTAButton
            onClick={() =>
              (window.location.href = "mailto:contact@limitlessprotocol.com")
            }
            className="w-full md:w-auto"
          >
            Contact Support
          </CTAButton>
          <p className="text-gray-600">
            For any questions or support, email us at{" "}
            <a
              href="mailto:contact@limitlessprotocol.com"
              className="text-[#940909] font-semibold"
            >
              contact@limitlessprotocol.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
