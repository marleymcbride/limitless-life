export default function WaitlistConfirmedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white bg-zinc-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black text-white">
              Waitlist confirmed.
            </h1>
            <p className="text-xl lg:text-2xl text-zinc-300 font-medium">
              You&apos;re on the waitlist.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-base lg:text-lg leading-relaxed text-zinc-300">
            <p>
              When the next cohort for{" "}
              <span className="text-red-500 font-semibold">Limitless</span>{" "}
              opens,
              <br />
              you&apos;ll be one of the first notified.
            </p>

            <p>
              In the meantime, I&apos;ll be sending you
              <br />
              important info and insights to your email.
            </p>

            <div className="py-4">
              <p className="font-semibold text-white">
                Go check your inbox now for details on
                <br />
                next steps, as well as a gift.
              </p>
              <p className="text-sm text-zinc-400 mt-2">
                (check &apos;Updates&apos; or Spam folder if not there)
              </p>
            </div>

            <p>
              Looking forward to welcoming you in the
              <br />
              near future brother.
            </p>
          </div>

          {/* Signature */}
          <div className="space-y-2 pt-4">
            <p className="text-lg text-white">
              To your{" "}
              <span className="text-red-500 font-semibold italic">
                Limitless Life
              </span>
              .
            </p>
            <p className="text-lg text-white font-medium">—Marley</p>
          </div>

          {/* Brand Footer */}
          <div className="pt-8 border-t border-zinc-800">
            <p className="text-sm tracking-wider font-medium text-zinc-500">
              <span className="text-red-500">LIMITLESS</span>{" "}
              <span className="text-white font-bold">LIFE</span>™
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
