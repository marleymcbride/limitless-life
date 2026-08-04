"use client";

import { useState } from 'react';

interface WaitlistInlineFormProps {
  /** Shown as the CTA label; the form reveals on click. */
  ctaText?: string;
  /** Optional source tag passed to the waitlist-join webhook. */
  source?: string;
}

/**
 * Click-to-reveal inline waitlist capture for the offer docs.
 * Used when the programme is OFF — visitors click the CTA, the form
 * expands in place, and submitting posts to /api/webhooks/waitlist-join
 * which writes them into Postgres (Leads + Admin Dash) and queues n8n.
 */
export default function WaitlistInlineForm({
  ctaText = 'Join the waitlist',
  source = 'offer-doc-waitlist',
}: WaitlistInlineFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim()) {
      setSubmitResult({ success: false, message: 'Please enter your name and email.' });
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email.trim())) {
      setSubmitResult({ success: false, message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch('/api/webhooks/waitlist-join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to join the waitlist');
      }

      setSubmitResult({
        success: true,
        message: "You're on the waitlist — we'll be in touch when doors reopen.",
      });
      setFirstName('');
      setEmail('');
    } catch (err) {
      console.error('[WaitlistInlineForm] Submit failed:', err);
      setSubmitResult({
        success: false,
        message: 'Something went wrong. Please try again or contact support.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="rounded-lg border border-green-700/40 bg-green-900/20 px-5 py-4 text-center">
        <p className="text-green-300 font-medium">{submitResult.message}</p>
      </div>
    );
  }

  if (!expanded) {
    return (
      <div className="text-center">
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="inline-block bg-[#940909] hover:bg-[#7b0707] text-white font-bold px-8 py-4 rounded-md text-lg transition-all cursor-pointer"
        >
          {ctaText}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white/5 px-6 py-5">
      <p className="text-gray-100 font-medium mb-4">Join the waitlist for the next cohort</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitResult?.success === false && (
          <div className="rounded border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-200">
            {submitResult.message}
          </div>
        )}
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#940909] outline-none"
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#940909] outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-4 px-6 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Joining...' : 'Join the waitlist'}
        </button>
      </form>
    </div>
  );
}
