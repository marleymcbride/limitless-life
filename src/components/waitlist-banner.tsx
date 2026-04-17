"use client";

import { COHORT_CONFIG } from '@/config/waitlist';
import { getDoorState } from '@/lib/door-state';

export default function WaitlistBanner() {
  const doorState = getDoorState();
  const isOpen = doorState.isCurrentlyOpen;

  // When doors are OPEN, show "Doors are OPEN" message
  // When doors are CLOSED, show "Join the waitlist" message
  if (isOpen) {
    return (
      <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
        <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
        ⚠️ Doors close <strong>May 1st</strong>. <strong>Apply now</strong> to secure your spot.
        </p>
        <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
        ⚠️ Doors close <strong>May 1st</strong>. <strong>Apply now</strong>.
        </p>
      </div>
    );
  }

  // Doors are CLOSED - show waitlist message
  return (
    <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
      <p className="text-white hidden md:block lg:block font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
      ⚠️ Doors open <strong> {COHORT_CONFIG.DOORS_OPEN}</strong>. <strong>Join the waitlist</strong> to be first in line.
      </p>

      <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-lg lg:text-md tracking-wide font-sans">
      ⚠️ Doors open <strong> {COHORT_CONFIG.DOORS_OPEN}</strong>. <strong>Join the waitlist</strong> to be first in line.
      </p>
    </div>
  );
}
