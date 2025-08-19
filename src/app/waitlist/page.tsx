"use client";

import React from "react";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      {/* ATF Waitlist Section */}
      <section className="h-screen flex items-center px-6 lg:px-12 xl:px-20">
        <div className="w-full">
          {/* Eyebrow */}
          <div className="text-center mb-6">
            <div className="inline-block bg-red-900/30 border border-red-700 rounded px-4 py-2">
              <span className="text-red-400 text-sm font-medium uppercase tracking-wide">
                Next Cohort Opening Soon
              </span>
            </div>
          </div>

          {/* Main Headline - Full Width */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
              Get Your Energy Back
              <br />
              <span className="text-red-500">Without Caffeine or Alcohol</span>
            </h1>
            <p className="text-base lg:text-lg text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-12">
              The Limitless Protocol™ is the only system that gets you off
              caffeine permanently, builds an elite physique training just 2-3x
              per week, and boosts your testosterone naturally.
            </p>
          </div>

          {/* Two Column Layout - 60/40 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20 items-start">
            {/* LEFT SIDE - Benefits (60%) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg lg:text-xl font-bold text-white">
                  ✓ Quit Caffeine in 14 Days Without Feeling Like Death
                </h3>
                <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
                  Wake up naturally energized before your alarm goes off. No
                  more 3pm crashes, no more being a zombie without your morning
                  fix. Your body learns to create real energy again.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg lg:text-xl font-bold text-white">
                  ✓ Build Elite Muscle Training Half as Much
                </h3>
                <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
                  2-3 sessions per week maximum. No more grinding yourself into
                  the ground 6 days a week. Actually recover and grow muscle
                  like your body is designed to. Less work, better results.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg lg:text-xl font-bold text-white">
                  ✓ Boost Testosterone 200-400 Points Naturally
                </h3>
                <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
                  No needles, no pills, no weird supplements. Just your body
                  working like it should. Morning wood returns, confidence
                  skyrockets, energy flows all day long.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg lg:text-xl font-bold text-white">
                  ✓ Ditch Alcohol and Still Handle Stress
                </h3>
                <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
                  No more needing wine to unwind. Feel confident and relaxed
                  without any chemical crutches. Your natural state becomes
                  calm, focused, and in control.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Waitlist Form (40%) */}
            <div className="lg:col-span-2 flex items-center justify-center lg:justify-end">
              <div className="bg-zinc-800 rounded-lg p-8 lg:p-10 border border-zinc-700 w-full max-w-md">
                <div className="text-center mb-6">
                  <h2 className="text-lg lg:text-xl font-bold mb-3 text-red-500">
                    If You're Serious, Join the Waitlist
                  </h2>
                  <p className="text-sm text-zinc-300">
                    Next cohort opens in 4-6 weeks. Limited spots available.
                  </p>
                </div>

                <PremiumWaitlistForm />

                <div className="mt-4 text-center text-xs text-zinc-500">
                  Previous cohort filled in under 12 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below Fold - Testimonials */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-6">Real Transformations</h3>
          </div>
          <SimpleTestimonials />
        </div>
      </section>

      <TestimonialSection />
    </main>
  );
}

function PremiumWaitlistForm() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email) return;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setSubmitResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const { submitToN8nWebhook } = await import(
        "../../lib/n8n-webhook-client"
      );

      await submitToN8nWebhook(
        formData.email,
        formData.firstName,
        "limitless-protocol-premium-waitlist"
      );

      setSubmitResult({
        success: true,
        message: "You're on the waitlist.",
      });

      setFormData({ firstName: "", email: "" });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitResult?.success) {
    return (
      <div className="text-center p-6 bg-zinc-900 rounded">
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-white"
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
        <p className="font-semibold text-white">You're on the waitlist</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitResult?.success === false && (
        <div className="bg-red-900/20 border border-red-800 text-red-200 p-3 rounded text-center text-sm">
          {submitResult.message}
        </div>
      )}

      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        placeholder="First name..."
        className="w-full p-3 lg:p-4 bg-zinc-700 border border-zinc-600 rounded text-white placeholder-zinc-400 focus:border-red-500 focus:outline-none"
        required
      />

      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        placeholder="Email..."
        className="w-full p-3 lg:p-4 bg-zinc-700 border border-zinc-600 rounded text-white placeholder-zinc-400 focus:border-red-500 focus:outline-none"
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 lg:py-4 rounded transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "I'M SERIOUS" : "I'M SERIOUS"}
      </button>
    </form>
  );
}
