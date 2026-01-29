"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestimonialSection from "@/components/waitlist-testimonial-section";
import The3TestimonialsBox from "@/components/[old] the-3-testimonials-box";

export default function WaitlistPage() {
  return (
    <main className="flex flex-col min-h-screen text-white bg-black mb-5">
      {/* ATF Waitlist Section */}
      <section className="flex items-start px-6 pt-0 pb-16 mt-0 min-h-screen lg:px-0 lg:pt-8 lg:pb-16 xl:px-20 xl:pb-16 relative w-full overflow-hidden">
        <div className="w-full">
          {/* Eyebrow */}
          <div className="mb-4 text-center">
            <div className="inline-block px-4 mt-8 mb-2 py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 rounded border border-red-700 bg-red-900/30">
              <span className="text-sm font-medium tracking-wide text-white uppercase">
                Next Cohort Opening Soon
              </span>
            </div>
          </div>

          {/* Main Headline - Full Width */}
          <div className="mb-0 mx-5 text-center">

          <p className="mb-6  text-white"
          style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
              <span className="mt-8 mb-1 text-4xl font-bold md:text-5xl lg:text-5xl capitalize leading-[1.2] text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
              Build Your Elite Body and Natural Energy After 30
              </span>
            </p>

            <p className="mb-6  text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
              <span className="text-2xl font-normal leading-tight md:text-4xl lg:text-4xl text-red-500">
                (without caffeine, alcohol or BS supplements)
              </span>
            </p>
            <div className="mx-2">
            <p className="mx-auto text-left mt-6 mb-6 max-w-4xl text-base leading-relaxed lg:text-xl text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
              The <span className="font-semibold text-white">Limitless Protocol™</span> is the <span className="font-semibold text-white">only</span> system that:
            </p>

            <div className="mx-auto text-left mt-0 mb-6 max-w-4xl text-xl leading-tight lg:text-xl text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
            ● builds an elite physique in just <span className="font-semibold text-white">2 days per week</span>,
            </div>

            <div className="mx-auto text-left mt-0 mb-6 max-w-4xl text-xl  leading-tight lg:text-xl text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
            ● boosts your <span className="font-semibold text-white">testosterone</span> naturally,
            </div>

            <div className="mx-auto text-left *:mt-0 mb-10 max-w-4xl text-xl leading-tight lg:text-xl text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
            ● and gets you{" "} <span className="font-semibold text-white">off alcohol and caffeine</span> permanently.
            </div>
          </div>
          </div>

          {/* Two Column Layout - 60/40 Split */}
          <div className="grid grid-cols-1 gap-16 items-start lg:grid-cols-5 lg:gap-12 xl:gap-20">
            {/* LEFT SIDE - Benefits (60%) */}
            <div className="space-y-6 px-6 mx-auto  lg:col-span-3">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold lg:text-xl text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  ✓ Wake up Feeling Naturally Energized Without Stimulants.
                </h3>
                <div className="leading-relaxed text-lg md:lg:text-lg lg:text-lg text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  Wake up beaming every morning. No more 3pm crashes. No more
                  feeling like shit without your caffeine fix. Elite energy
                  all-day without coffee or energy drinks, the way it should be.
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold lg:text-xl text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  ✓ Build your Best Body Ever Training Half as Much
                </h3>
                <div className="leading-relaxed text-lg md:lg:text-lg lg:text-lg text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  2-3 sessions per week maximum. No more grinding yourself into
                  the ground 6 days a week. Actually recover and grow muscle
                  like your body is designed to. Less work, better results.
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold lg:text-xl text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  ✓ Boost Testosterone 200-400 Points Naturally
                </h3>
                <div className="leading-relaxed text-lg md:lg:text-lg lg:text-lg text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  No needles, no pills, no weird supplements. Just your body
                  working like it should. Confidence back. Power back. The old
                  you, only better.
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold lg:text-xl text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  ✓ Feel Incredible without Alcohol
                </h3>
                <div className="leading-relaxed text-lg md:lg:text-lg lg:text-lg text-gray-300" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  You don&apos;t &apos;need a drink&apos; to unwind. You
                  don&apos;t &apos;need to &apos;quit&apos; &apos; anything. You
                  need to become the man energised, confident and relaxed in all
                  situations.
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Waitlist Form (40%) */}
            <div className="flex justify-center items-center px-6 lg:col-span-2 lg:justify-end">
              <div className="p-8 mt-0 px-6 w-full max-w-md rounded-lg border lg:p-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gray-700 shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="mb-4 text-4xl mx-0 font-bold text-white lg:text-2xl" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                    If You&apos;re Interested, Join the Waitlist
                  </div>
                  <p className="text-sm text-gray-300">
                    Enter your email to receive an exclusive waitlist-only deal,
                    enrollment dates and an early invite before spots fill.
                  </p>
                </div>

                <PremiumWaitlistForm />

                <div className="mt-4 text-xs text-center text-gray-400">
                  Cohort expected to fill, join the waitlist to not miss out.
                </div>
                <div className="mt-1 text-xs text-center text-gray-400">
                  Limited spots available.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <The3TestimonialsBox />

      <TestimonialSection />
      
      {/* Bottom Form Section */}
      <section className="py-20 bg-black">
        <div className="container px-8 mx-auto max-w-10">
          <div className="max-w-40">
            <div className="p-8 rounded-lg border lg:p-10 bg-zinc-900 border-zinc-700 shadow-2xl">
              <div className="mb-6 text-center">
                <div className="mb-4 text-4xl -px-0 font-bold text-white md:text-3xl lg:text-3xl" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>
                  If Interested, Join the Waitlist
                </div>
                <div className="text-lg md:text-xl lg:text-xl text-gray-300">
                  Enter your email to receive an exclusive waitlist-only deal,
                  enrollment dates and an early invite before spots fill.
                </div>
              </div>

              <PremiumWaitlistForm />

              <div className="mt-5 text-xs text-center text-gray-400">
                Limited spots available.
              </div>
            </div>
          </div>
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
      <div className="p-6 text-center rounded bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-700">
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
        <p className="font-semibold text-white" style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}>You&apos;re on the waitlist</p>
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
        className="p-3 w-full text-white rounded border lg:p-4 bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        required
      />

      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        placeholder="Email..."
        className="p-3 w-full text-white rounded border lg:p-4 bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-3 w-full font-bold text-white bg-red-700 rounded transition-colors hover:bg-red-700 lg:py-4 disabled:opacity-50 shadow-lg"
        style={{ fontFamily: "Neuemontreal, Arial, sans-serif" }}
      >
        {isSubmitting ? "I'M INTERESTED" : "I'M INTERESTED"}
      </button>
    </form>
  );
}
