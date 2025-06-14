"use client";

import React from "react";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      {/* ATF Hero Section */}
      <section className="min-h-screen flex items-center px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT COLUMN - Problem & Hook */}
            <div className="space-y-10">
              {/* Crisis Badge */}
              <div className="flex items-center gap-3 text-red-500 text-sm font-medium uppercase tracking-wider">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                The Silent Male Health Crisis
              </div>

              {/* Main Hook - Direct from VSL */}
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                  Let's Be Real.
                  <br />
                  <span className="text-red-500">You Feel Like Shit.</span>
                </h1>

                <div className="text-2xl lg:text-3xl text-zinc-200 leading-relaxed space-y-6 font-light">
                  <p>
                    Harvard researchers found men with declining testosterone
                    have up to
                    <span className="text-white font-medium">
                      {" "}
                      50% higher chance of early death.
                    </span>
                  </p>
                  <p>
                    Maybe you're the guy avoiding mirrors because you hate that
                    soft, puffy face staring back. Maybe you can feel your wife
                    losing respect for the exhausted shell of the man she
                    married.
                  </p>
                </div>
              </div>

              {/* Pain Points List - Direct from VSL */}
              <div className="bg-zinc-800/30 border-l-4 border-red-500 p-8 space-y-6">
                <h3 className="text-xl font-semibold text-white">
                  When the hell did that version of you disappear?
                </h3>
                <div className="space-y-5 text-zinc-200 text-lg">
                  <p className="flex items-start gap-4">
                    <span className="text-red-500 mt-1 flex-shrink-0 text-xl">
                      •
                    </span>
                    <span>
                      Hitting snooze four times, stumbling to the coffee machine
                      like an addict needing his first fix
                    </span>
                  </p>
                  <p className="flex items-start gap-4">
                    <span className="text-red-500 mt-1 flex-shrink-0 text-xl">
                      •
                    </span>
                    <span>
                      That 3pm crash when your brain turns to complete mush and
                      you're reaching for your fourth coffee
                    </span>
                  </p>
                  <p className="flex items-start gap-4">
                    <span className="text-red-500 mt-1 flex-shrink-0 text-xl">
                      •
                    </span>
                    <span>
                      Pouring wine every night just to unwind, knowing you're
                      stuck in this cycle
                    </span>
                  </p>
                  <p className="flex items-start gap-4">
                    <span className="text-red-500 mt-1 flex-shrink-0 text-xl">
                      •
                    </span>
                    <span>
                      Your kids watching daddy need "medicine" to wake up and
                      sleep
                    </span>
                  </p>
                </div>
              </div>

              {/* Real Testimonial */}
              <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-700">
                <p className="text-zinc-300 italic mb-3 text-lg">
                  "Hit 168 today, haven't been this light since uni probably.
                  The mental clarity is what's getting me though. And the
                  morning wood, like my body actually works again now LOL. Felt
                  like I could run through walls this morning!"
                </p>
                <p className="text-zinc-500 text-sm">— Lewis, Client</p>
              </div>

              {/* Stakes */}
              <div className="text-center lg:text-left">
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Every day you wait, these systems break down more. Your
                  testosterone drops further.
                  <span className="text-red-500 font-medium">
                    {" "}
                    Your wife loses more respect.
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - Premium Waitlist Form */}
            <div className="bg-zinc-800 rounded-lg p-10 border border-zinc-700 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">
                  The Limitless Protocol™
                </h2>
                <p className="text-zinc-300 mb-6 text-lg">
                  Elite coaching for successful men who refuse to settle
                </p>
                <div className="w-20 h-px bg-red-500 mx-auto"></div>
              </div>

              {/* Investment & Exclusivity */}
              <div className="bg-zinc-900/50 rounded-lg p-6 mb-8 text-center border border-zinc-700">
                <p className="text-zinc-400 text-sm mb-2 uppercase tracking-wide">
                  Monthly Investment
                </p>
                <p className="text-2xl font-bold mb-4">£2,497 - £2,997</p>
                <p className="text-red-500 text-sm font-medium">
                  Limited to 20 clients maximum
                </p>
              </div>

              {/* What They Get */}
              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">
                      Complete caffeine elimination in 14 days
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Wake up energized before your alarm
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">
                      Elite physique training 2-3x weekly
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Build muscle that commands respect
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">
                      Testosterone boost 200-400 points naturally
                    </p>
                    <p className="text-zinc-400 text-sm">
                      No injections, just your body working properly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">
                      Alcohol-free while handling stress better
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Feel confident without chemical crutches
                    </p>
                  </div>
                </div>
              </div>

              <PremiumWaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Below Fold */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-6">
              Real Transformations From Men Like You
            </h3>
            <p className="text-zinc-400 text-lg">
              High-stress careers, families, 60+ hour weeks
            </p>
          </div>
          <SimpleTestimonials />
        </div>
      </section>

      <TestimonialSection />

      {/* Final CTA */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't Let Another Year Pass
          </h2>
          <p className="text-zinc-300 text-xl mb-12 leading-relaxed">
            Five years from now, you'll either be exactly where you are now -
            only softer, more dependent, more regretful. Or you'll be the
            energetic, powerful man your family deserves.
          </p>
          <div className="max-w-md mx-auto">
            <PremiumWaitlistForm />
          </div>
        </div>
      </section>
    </main>
  );
}

function PremiumWaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setSubmitResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const { submitToN8nWebhook } = await import("../lib/n8n-webhook-client");

      await submitToN8nWebhook(
        email,
        "",
        "limitless-protocol-premium-waitlist"
      );

      setSubmitResult({
        success: true,
        message:
          "Priority access confirmed. You'll be contacted when enrollment opens.",
      });

      setEmail("");
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="bg-zinc-900/70 border border-zinc-600 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
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
        <p className="font-semibold text-white mb-3 text-lg">
          You're on the priority list
        </p>
        <p className="text-zinc-400 leading-relaxed">
          You'll be among the first contacted when we open enrollment for the
          next cohort. Spots fill quickly and stay filled for months.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {submitResult?.success === false && (
        <div className="bg-red-900/20 border border-red-800 text-red-200 p-4 rounded text-center">
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email for priority access"
          className="w-full p-4 bg-zinc-700 border border-zinc-600 rounded text-white placeholder-zinc-400 focus:border-red-500 focus:outline-none text-center text-lg"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded transition-colors disabled:opacity-50 text-lg"
        >
          {isSubmitting ? "Adding to Priority List..." : "Get Priority Access"}
        </button>
      </form>

      <div className="text-center space-y-2">
        <p className="text-xs text-zinc-500">
          Serious inquiries only. If the investment range makes you
          uncomfortable, this isn't for you.
        </p>
        <p className="text-xs text-zinc-600">No spam. Privacy respected.</p>
      </div>
    </div>
  );
}
