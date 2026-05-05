"use client";

import { COHORT_CONFIG } from '@/config/waitlist';
import { getDoorState } from '@/lib/door-state';

export default function WaitlistBanner() {
  const MANUAL_BANNER_OVERRIDE = false;

  if (MANUAL_BANNER_OVERRIDE) {
    return (
      <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
        <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
          ⚠️ We kick off in <strong>May</strong>. <strong>Apply now</strong> to join the beta round.
        </p>
        <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
          ⚠️ We kick off in <strong>May</strong>. <strong>Apply now</strong> to join the beta round.
        </p>
      </div>
    );
  }

  // Normal dynamic door-state banner (OPEN/CLOSED)
  const doorState = getDoorState();
  const isOpen = doorState.isCurrentlyOpen;

  if (isOpen) {
    return (
      <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
        <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
          ⚠️ Doors close <strong>{COHORT_CONFIG.DOORS_CLOSE}</strong>. <strong>Apply now</strong> to secure your spot.
        </p>
        <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
          ⚠️ Doors close <strong>{COHORT_CONFIG.DOORS_CLOSE}</strong>. <strong>Apply now</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
      <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
        ⚠️ Doors open <strong>{COHORT_CONFIG.DOORS_OPEN}</strong>. <strong>Join the waitlist</strong> to be first in line.
      </p>
      <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
        ⚠️ Doors open <strong>{COHORT_CONFIG.DOORS_OPEN}</strong>. <strong>Join the waitlist</strong> to be first in line.
      </p>
    </div>
  );
}
