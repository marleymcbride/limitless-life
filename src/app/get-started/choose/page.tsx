'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const WA_YES =
  'https://wa.me/13024800805?text=Hey+Marley%2C+just+checked+out+Limitless+Concierge.+Looks+good.+What%27s+the+process+to+join%2C+and+what+does+it+look+like%3F';
const WA_MAYBE =
  'https://wa.me/13024800805?text=Hey+Marley%2C+checked+out+Limitless+Concierge+but+got+a+few+questions%21+Could+you+send+me+some+more+details%3F';

type Choice = 'yes' | 'maybe' | 'no';

const MODAL_COPY: Record<'yes' | 'maybe', { heading: string; body: string; link: string; cta: string }> = {
  yes: {
    heading: "Let's get you started",
    body: "Click the button below and i'll shoot you over your invitation and full details:",
    link: WA_YES,
    cta: 'Send my invitation',
  },
  maybe: {
    heading: 'Get the full details',
    body: "Click the button below to drop me a message and i'll send over the full details with everything you need:",
    link: WA_MAYBE,
    cta: 'Send me the details',
  },
};

function ChoosePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const firstName = name.split(' ')[0];

  const [visible, setVisible] = useState(false);
  const [modalChoice, setModalChoice] = useState<'yes' | 'maybe' | null>(null);

  useEffect(() => {
    // Trigger fade-in after mount
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleChoice = (choice: Choice) => {
    if (choice === 'no') {
      const params = new URLSearchParams({ variant: 'C' });
      if (name) params.set('name', name);
      if (email) params.set('email', email);
      window.location.href = `/scorecard?${params.toString()}`;
      return;
    }

    setModalChoice(choice);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050A0F' }}>
      <div
        className="min-h-screen flex flex-col justify-center items-center py-12 px-4"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
        }}
      >
          <div
            className="w-full md:w-[420px] lg:w-[420px] shadow-2xl rounded-lg"
            style={{ backgroundColor: '#06090E' }}
          >
            <div className="py-12 px-4 md:px-10 lg:px-10">
              {/* Logo */}
              <div className="text-center mb-6">
                <img
                  src="/images/LIMITLESS LIFE LOGO 2026.png"
                  alt="Limitless Life"
                  className="h-8 mx-auto"
                />
              </div>

              <h2
                className="text-2xl font-medium text-white text-center mb-6 tracking-tight leading-snug"
                style={{ fontFamily: 'Neuemontreal, sans-serif' }}
              >
                {firstName ? `Hey ${firstName} are you ready to secure your spot?` : 'Are you ready to begin?'}
              </h2>


              <div className="space-y-3">
                {/* Yes */}
                <div
                  onClick={() => handleChoice('yes')}
                  className="w-full p-5 rounded-lg border-2 transition-all cursor-pointer text-center border-[#FFFFFF]/10 bg-[#141414]/40 hover:bg-red-700/60 hover:border-red-700/20"
                >
                  <div className="font-medium text-[17px] text-gray-100">
                    Yes, secure my spot!
                  </div>
                </div>

                {/* Maybe */}
                <div
                  onClick={() => handleChoice('maybe')}
                  className="w-full p-5 rounded-lg border-2 transition-all cursor-pointer text-center border-[#FFFFFF]/10 bg-[#141414]/40 hover:bg-red-700/60 hover:border-red-700/20"
                >
                  <div className="font-medium text-[17px] text-gray-100">
                    Maybe, I&apos;d like more details
                  </div>
                </div>

                {/* No
                <div
                  onClick={() => handleChoice('no')}
                  className="w-full p-5 rounded-lg border-2 transition-all cursor-pointer text-center border-[#FFFFFF]/10 bg-[#141414]/40 hover:bg-gray-700/40 hover:border-gray-600"
                >
                  <div className="font-medium text-[15px] text-gray-100">
                    I&apos;m not ready this cohort but keep me in the loop
                  </div>
                </div> */}
              </div>

              <div className="text-center mt-8 pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  🔒 Secure &bull; Private
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* WhatsApp modal */}
      {modalChoice && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <div
            className="w-full rounded-xl shadow-2xl pb-12 mb-4 pt-16 pl-12 pr-12 relative scale-[1.3]"
            style={{ backgroundColor: '#06090E', minHeight:'300px' , maxWidth: '532px' }}
          >

            {/* Logo */}
            <div className="text-center mb-6 -mt-6">
              <img
                src="/images/LIMITLESS LIFE LOGO 2026.png"
                alt="Limitless Life"
                className="h-10 mx-auto"
              />
            </div>

            <h3
              className="text-2xl font-bold text-white text-center mb-3 tracking-tight"
              style={{ fontFamily: 'Neuemontreal, sans-serif' }}
            >
              {MODAL_COPY[modalChoice].heading}
            </h3>

            <p className="text-gray-300 text-center text-sm mb-6 leading-relaxed mx-8">
              {MODAL_COPY[modalChoice].body}
            </p>

            <a
              href={MODAL_COPY[modalChoice].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center scale-[0.9] justify-center gap-2 mx-auto w-3/4 bg-[#940909] hover:bg-[#7b0707] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 01-1.925 3.546 5.974 5.974 0 01-2.133 1A3.75 3.75 0 0012 18z" />
              </svg>
              {MODAL_COPY[modalChoice].cta}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChoosePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#050A0F' }} />}>
      <ChoosePage />
    </Suspense>
  );
}
