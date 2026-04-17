export default function WaitlistConfirmedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white bg-black">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Content */}
          <div className="space-y-6 text-xl lg:text-2xl leading-relaxed text-zinc-300">
            <p className="text-white font-medium">
              You&apos;re officially in the waitlist for the beta launch of Limitless.
            </p>
            <p>
              Keep an eye open for your inbox where I&apos;ll send you the details.
            </p>
          </div>

          {/* Brand Footer */}
          <div className="pt-8 border-t border-zinc-800">
            <img
              src="/images/LIMITLESS LIFE LOGO 2026.png"
              alt="Limitless Life"
              className="h-12 mx-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
