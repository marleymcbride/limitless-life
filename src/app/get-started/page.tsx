'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GetStartedPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    const params = new URLSearchParams({ name: name.trim(), email: email.trim() });
    router.push(`/get-started/choose?${params.toString()}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050A0F' }}>
      {/* Panel 1 — form, fills the viewport so choices are below the fold */}
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4">
        <div
          className="w-full md:w-[420px] lg:w-[420px] shadow-2xl rounded-lg"
          style={{ backgroundColor: '#06090E' }}
        >
          <div className="py-12 px-4 md:px-10 lg:px-10">
            {/* Logo */}
            <div className="text-center scale-[0.9] mb-2">
              <img
                src="/images/LIMITLESS LIFE LOGO 2026.png"
                alt="Limitless Life"
                className="h-12 mx-auto"
              />
            </div>

            {/* Heading */}
            <h1
              className="text-lg font-normal text-white text-center mb-10 tracking-tight leading-snug"
              style={{ fontFamily: 'Neuemontreal, sans-serif' }}
            >
              Just a few details to get started
            </h1>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>
                  Your Email
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#222223] px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>
                  Your Full Name
                </p>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and last name"
                  className="w-full bg-[#222223] px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:border-[#940909] focus:ring-2 focus:ring-[#940909]/10 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 uppercase tracking-wide shadow-lg"
              >
                Next
              </button>
            </form>

            {/* Trust line */}
            <div className="text-center mt-8 pt-4 border-t border-gray-800">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                🔒 Secure &bull; Private
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
