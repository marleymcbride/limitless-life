'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GetStartedPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setIsSubmitting(true);

    const firstName = name.trim().split(' ')[0];
    const lastName = name.trim().split(' ').slice(1).join(' ');

    try {
      await fetch('/api/webhooks/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({ email: email.trim(), firstName, lastName, source: 'limitless-concierge' }),
      });
    } catch (err) {
      console.error('[GetStarted] Save failed:', err);
    }

    const params = new URLSearchParams({ name: name.trim(), email: email.trim() });
    router.push(`/get-started/choose?${params.toString()}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050A0F' }}>
      {/* Panel 1 — form, fills the viewport so choices are below the fold */}
      <div className="min-h-screen flex flex-col items-center pt-4 px-4 md:justify-center md:py-12">
        <div
          className="w-full md:w-[420px] lg:w-[420px] shadow-2xl rounded-lg"
          style={{ backgroundColor: '#06090E' }}
        >
          <div className="md:py-12 py-10 px-4 md:px-10 lg:px-10">
            {/* Logo */}
            <div className="text-center mb-2">
              <img
                src="/images/LIMITLESS LIFE LOGO 2026.png"
                alt="Limitless Life"
                className="h-10 mx-auto"
              />
            </div>

            {/* Heading */}
            <h1
              className="text-base md:text-lg lg:text-lg font-normal text-white text-center md:mb-10 mb-8 md:leading-snug lg:leading-snug leading-none"
              style={{ fontFamily: 'Neuemontreal, sans-serif' }}
            >
              Just a few details to get started
            </h1>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="md:text-lg lg:text-lg font-bold text-white md:tracking-tight lg:tracking-tight tracking-normal" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>
                  Your Email
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#222223] md:px-4 md:py-3 lg:px-4 lg:py-3 px-3 py-2.5 rounded-xl text-white placeholder-gray-500 focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <p className="md:text-lg lg:text-lg font-bold text-white md:tracking-tight lg:tracking-tight tracking-normal" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>
                  Your Full Name
                </p>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and last name"
                  className="w-full bg-[#222223] md:px-4 md:py-3 lg:px-4 lg:py-3 px-3 py-2.5 rounded-xl text-white placeholder-gray-500 focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold md:py-3 md:px-6 lg:py-3 lg:px-6 py-2.5 px-5 rounded-xl transition-all duration-200 uppercase md:tracking-wide lg:tracking-wide tracking-normal shadow-lg"
              >
                Next
              </button>
            </form>

            {/* Trust line */}
            <div className="text-center md:mt-8 md:pt-4 mt-6 pt-3 border-t border-gray-800">
              <div className="md:text-xs lg:text-xs text-[10px] text-gray-500 uppercase md:tracking-wide lg:tracking-wide tracking-normal">
                🔒 Secure &bull; Private
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
