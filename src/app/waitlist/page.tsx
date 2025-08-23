"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen text-white bg-zinc-900">
      {/* ATF Waitlist Section */}
      <section className="flex items-start px-6 pt-8 pb-0 h-screen lg:px-0 lg:pt-12 xl:px-20">
        <div className="w-full">
          {/* Eyebrow */}
          <div className="mb-4 text-center">
            <div className="inline-block px-4 py-2 rounded border border-red-700 bg-red-900/30">
              <span className="text-sm font-medium tracking-wide text-red-400 uppercase">
                Next Cohort Opening Soon
              </span>
            </div>
          </div>

          {/* Main Headline - Full Width */}
          <div className="mb-0 text-center">
            <h1 className="mb-6 text-3xl font-black leading-tight lg:text-5xl">
              Get Your Energy Back
              <br />
              <span className="text-red-500">Without Caffeine or Alcohol</span>
            </h1>
            <p className="mx-auto mb-12 max-w-4xl text-base leading-relaxed lg:text-lg text-zinc-300">
              The Limitless Protocol™ is the only system that gets you off
              caffeine permanently, builds an elite physique training just 2-3x
              per week, and boosts your testosterone naturally.
            </p>
          </div>

          {/* Two Column Layout - 60/40 Split */}
          <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-5 xl:gap-20">
            {/* LEFT SIDE - Benefits (60%) */}
            <div className="space-y-6 lg:col-span-3">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white lg:text-xl">
                  ✓ Quit Caffeine in 14 Days Without Feeling Like Death
                </h3>
                <p className="text-base leading-relaxed lg:text-lg text-zinc-300">
                  Wake up naturally energized before your alarm goes off. No
                  more 3pm crashes, no more being a zombie without your morning
                  fix. Your body learns to create real energy again.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white lg:text-xl">
                  ✓ Build Elite Muscle Training Half as Much
                </h3>
                <p className="text-base leading-relaxed lg:text-lg text-zinc-300">
                  2-3 sessions per week maximum. No more grinding yourself into
                  the ground 6 days a week. Actually recover and grow muscle
                  like your body is designed to. Less work, better results.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white lg:text-xl">
                  ✓ Boost Testosterone 200-400 Points Naturally
                </h3>
                <p className="text-base leading-relaxed lg:text-lg text-zinc-300">
                  No needles, no pills, no weird supplements. Just your body
                  working like it should. Morning wood returns, confidence
                  skyrockets, energy flows all day long.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white lg:text-xl">
                  ✓ Ditch Alcohol and Still Handle Stress
                </h3>
                <p className="text-base leading-relaxed lg:text-lg text-zinc-300">
                  No more needing wine to unwind. Feel confident and relaxed
                  without any chemical crutches. Your natural state becomes
                  calm, focused, and in control.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Waitlist Form (40%) */}
            <div className="flex justify-center items-center lg:col-span-2 lg:justify-end">
              <div className="p-8 w-full max-w-md rounded-lg border bg-zinc-800 lg:p-10 border-zinc-700">
                <div className="mb-6 text-center">
                  <h2 className="mb-3 text-lg font-bold text-red-500 lg:text-xl">
                    If You&apos;re Serious, Join the Waitlist
                  </h2>
                  <p className="text-sm text-zinc-300">
                    Next cohort opens in 4-6 weeks. Limited spots available.
                  </p>
                </div>

                <PremiumWaitlistForm />

                <div className="mt-4 text-xs text-center text-zinc-500">
                  Previous cohort filled in under 12 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below Fold - Testimonials */}
      <TestimonialSection />
      <section className="py-20 bg-zinc-800">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h3 className="mb-6 text-3xl font-bold">Real Transformations</h3>
          </div>
          <SimpleTestimonials />
        </div>
      </section>
    </main>
  );
}

function PremiumWaitlistForm() {
  const router = useRouter();
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

      // Wait 2 seconds then redirect to confirmation page
      setTimeout(() => {
        router.push("/waitlist/confirmed");
      }, 2000);
    } catch {
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
      <div className="p-6 text-center rounded bg-zinc-900">
        <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-red-600 rounded-full">
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
        <p className="font-semibold text-white">You&apos;re on the waitlist</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitResult?.success === false && (
        <div className="p-3 text-sm text-center text-red-200 rounded border border-red-800 bg-red-900/20">
          {submitResult.message}
        </div>
      )}

      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        placeholder="First name..."
        className="p-3 w-full text-white rounded border lg:p-4 bg-zinc-700 border-zinc-600 placeholder-zinc-400 focus:border-red-500 focus:outline-none"
        required
      />

      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        placeholder="Email..."
        className="p-3 w-full text-white rounded border lg:p-4 bg-zinc-700 border-zinc-600 placeholder-zinc-400 focus:border-red-500 focus:outline-none"
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-3 w-full font-bold text-white bg-red-600 rounded transition-colors hover:bg-red-700 lg:py-4 disabled:opacity-50"
      >
        {isSubmitting ? "I'M SERIOUS" : "I'M SERIOUS"}
      </button>
    </form>
  );
}
