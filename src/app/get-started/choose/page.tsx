'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const WA_YES =
  'https://wa.me/13024800805?text=Hey+Marley%2C+just+checked+out+Limitless.+I%27m+in.+What%27s+the+process+to+join%2C+and+what+does+it+look+like%3F';
const WA_MAYBE =
  'https://wa.me/13024800805?text=Hey+Marley%2C+I%27m+interested+in+Limitless+but+have+a+few+questions.+Can+you+send+me+some+more+details%3F';

type Choice = 'yes' | 'maybe' | 'no';

const MODAL_COPY: Record<'yes' | 'maybe', { heading: string; body: string; link: string; cta: string }> = {
  yes: {
    heading: "Let's get you started",
    body: "Click the button below and i'll shoot over your invitation and the full details:",
    link: WA_YES,
    cta: 'Send my invitation',
  },
  maybe: {
    heading: 'Got questions?',
    body: "Click the button below to drop me a message and i'll send over the full details:",
    link: WA_MAYBE,
    cta: 'Shoot me the details',
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
                  className="h-10 mx-auto"
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
          onClick={() => setModalChoice(null)}
        >
          <div
            className="w-full rounded-xl shadow-2xl pb-12 mb-4 pt-16 pl-12 pr-12 relative scale-[1.2]"
            style={{ backgroundColor: '#06090E', minHeight:'300px' , maxWidth: '532px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalChoice(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="text-center mb-6 -mt-6">
              <img
                src="/images/LIMITLESS LIFE LOGO 2026.png"
                alt="Limitless Life"
                className="h-8 mx-auto"
              />
            </div>

            <h3
              className="text-xl font-bold text-white text-center mb-3 tracking-tight"
              style={{ fontFamily: 'Neuemontreal, sans-serif' }}
            >
              {MODAL_COPY[modalChoice].heading}
            </h3>

            <p className="text-gray-300 text-center text-sm mb-6 leading-relaxed">
              {MODAL_COPY[modalChoice].body}
            </p>

            <a
              href={MODAL_COPY[modalChoice].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center scale-[1] justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.78.466 3.45 1.282 4.897L2 22l5.222-1.27A9.94 9.94 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.06c-1.609 0-3.121-.43-4.426-1.182l-.318-.188-3.094.752.78-3.013-.207-.327A8.025 8.025 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8.001-8 8.001z"/>
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
