import { COHORT_CONFIG } from '@/config/waitlist';

export default function WaitlistBanner() {
  return (
    <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
      <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-['-apple-system']">
      ⚠️ Doors open <strong> {COHORT_CONFIG.APPLICATIONS_OPEN}</strong>. <strong>Join the waitlist</strong> now to be the first in line.
      </p>

      <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-['-apple-system']">
      ⚠️ Doors open <strong> {COHORT_CONFIG.APPLICATIONS_OPEN}</strong>. <strong>Join the waitlist</strong> now to be the first in line.
      </p>
    </div>


  );
}
