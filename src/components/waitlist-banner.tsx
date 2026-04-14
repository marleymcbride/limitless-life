import { APPLICATIONS_OPEN } from '@/config/waitlist';

export default function WaitlistBanner() {
  return (
    <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
      <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
      ⚠️ Doors open <strong> {APPLICATIONS_OPEN}</strong>. <strong>Join the waitlist</strong> to be first in line.
      </p>

      <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
      ⚠️ Doors open <strong> {APPLICATIONS_OPEN}</strong>. <strong>Join the waitlist</strong> to be first in line.
      </p>
    </div>
  );
}
