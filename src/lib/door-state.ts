/**
 * Door State Utility
 *
 * Calculates the current door state (OPEN/CLOSED) and provides routing logic
 * for the unified popup flow.
 *
 * CYCLE:
 * - Day 1-19: DOORS CLOSED (collecting waitlist for next month)
 * - Day 20-31: DOORS OPEN (selling for next month)
 * - Day 1 of next month: Cycle repeats
 *
 * BETA COHORT SPECIAL CASE (April-May 2026):
 * - Apr 1-14: CLOSED → beta waitlist (deposit)
 * - Apr 15-May 1: OPEN → beta buy (not waitlist)
 * - May 1-19: CLOSED → main waitlist (deposit)
 * - May 20-31: OPEN → main buy (not waitlist)
 */

export type DoorState = 'OPEN' | 'CLOSED';
export type InterestChoice = 'yes' | 'maybe' | 'no';
export type Variant = 'A' | 'B' | 'C';
export type CohortType = 'beta' | 'main';

export interface DoorStateInfo {
  state: DoorState;
  cohortType: CohortType;
  cohortMonth: string;
  cohortYear: string;
  cohortStartDate: string;
  cohortStartFull: string;
  doorsOpenDate: string;
  doorsCloseDate: string;
  daysUntilOpen: number;
  daysUntilClose: number;
  isCurrentlyOpen: boolean;
}

/**
 * Get cohort info for a given date
 * @param date - The date to calculate cohort for
 * @returns Cohort month, year, and start date
 */
function getCohortForDate(date: Date): {
  month: string;
  year: string;
  startDate: Date;
} {
  const dayOfMonth = date.getDate();

  let cohortMonth: number;
  let cohortYear: number;

  if (dayOfMonth >= 20) {
    // Days 20-31: Selling for NEXT month
    cohortMonth = date.getMonth() + 2; // +2 because 0-indexed + 1 month ahead
    cohortYear = date.getFullYear();
    if (cohortMonth > 12) {
      cohortMonth = 1;
      cohortYear++;
    }
  } else {
    // Days 1-19: Still selling for current month (which opened last month on the 20th)
    cohortMonth = date.getMonth() + 1; // +1 because 0-indexed
    cohortYear = date.getFullYear();
  }

  return {
    month: new Date(cohortYear, cohortMonth - 1, 1).toLocaleDateString('en-US', { month: 'long' }),
    year: cohortYear.toString(),
    startDate: new Date(cohortYear, cohortMonth - 1, 1),
  };
}

/**
 * Get ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

/**
 * Format a date as "Month Dayst" (e.g., "April 20th")
 */
function formatDate(date: Date): string {
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  return `${month} ${day}${suffix}`;
}

/**
 * Calculate days until a target date
 */
function calculateDaysUntil(targetDate: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Check if we're currently in the beta cohort period (April-May 2026)
 * Beta cohort runs from April 1, 2026 through May 1, 2026
 * @returns true if in beta cohort period
 */
export function isBetaCohort(): boolean {
  const now = new Date();

  // Beta cohort: April 1, 2026 00:00:00 to May 2, 2026 00:00:00 (exclusive of May 2)
  const betaStart = new Date(2026, 3, 1); // April 1, 2026 (month is 0-indexed)
  const betaEnd = new Date(2026, 4, 2);   // May 2, 2026 (exclusive)

  return now >= betaStart && now < betaEnd;
}

/**
 * Get the current cohort type (beta or main)
 * @returns CohortType
 */
export function getCohortType(): CohortType {
  return isBetaCohort() ? 'beta' : 'main';
}

/**
 * Get current door state and cohort information
 * @returns DoorStateInfo with all relevant dates and state
 */
export function getDoorState(): DoorStateInfo {
  const now = new Date();
  const dayOfMonth = now.getDate();

  // Beta cohort special door state: doors open April 15th (not 20th)
  let state: DoorState;
  if (isBetaCohort() && now.getMonth() === 3 && now.getFullYear() === 2026) {
    // April 2026: doors open on the 15th
    state = dayOfMonth >= 15 ? 'OPEN' : 'CLOSED';
  } else {
    // Normal cycle: doors open on the 20th
    state = dayOfMonth >= 20 ? 'OPEN' : 'CLOSED';
  }

  // Get cohort info
  const cohort = getCohortForDate(now);

  // Calculate doors open date (15th for April beta, 20th otherwise)
  const doorsOpen = new Date(cohort.startDate);
  if (isBetaCohort() && cohort.month === 'April') {
    doorsOpen.setDate(15); // Beta cohort: April 15th
  } else {
    doorsOpen.setDate(doorsOpen.getDate() - 11); // Go back to 20th of previous month
  }

  return {
    state,
    cohortType: getCohortType(),
    cohortMonth: cohort.month,
    cohortYear: cohort.year,
    cohortStartDate: `${cohort.month} 1st`,
    cohortStartFull: `${cohort.month} 1st, ${cohort.year}`,
    doorsOpenDate: formatDate(doorsOpen),
    doorsCloseDate: `${cohort.month} 1st`,
    daysUntilOpen: calculateDaysUntil(doorsOpen),
    daysUntilClose: calculateDaysUntil(cohort.startDate),
    isCurrentlyOpen: state === 'OPEN',
  };
}

/**
 * Map popup choice to variant
 */
export function choiceToVariant(choice: InterestChoice): Variant {
  const variantMap: Record<InterestChoice, Variant> = {
    yes: 'A',
    maybe: 'B',
    no: 'C',
  };
  return variantMap[choice];
}

/**
 * Map popup choice to interest type (for webhook/Airtable)
 */
export function choiceToInterestType(
  choice: InterestChoice
): 'tire_kicker' | 'course' | 'coaching' {
  const interestTypeMap: Record<InterestChoice, 'tire_kicker' | 'course' | 'coaching'> = {
    no: 'tire_kicker',
    maybe: 'course',
    yes: 'coaching',
  };
  return interestTypeMap[choice];
}

/**
 * Get redirect URL based on door state, cohort type, and user choice
 *
 * 4-Way Routing Matrix:
 * - Beta + CLOSED (Apr 1-14): /intake-open-doc-beta-waitlist (deposit)
 * - Beta + OPEN (Apr 15-May 1): /intake-open-doc-beta (buy)
 * - Main + CLOSED (May 1-19): /intake-open-doc-main-waitlist (deposit)
 * - Main + OPEN (May 20+): /intake-open-doc-doors-open (buy)
 *
 * @param choice - The user's popup choice (yes/maybe/no)
 * @param doorState - Current door state (OPEN/CLOSED)
 * @param userData - Optional user data (name, email) to pass through
 * @returns The URL to redirect to
 */
export function getRedirectUrl(
  choice: InterestChoice,
  doorState: DoorState,
  userData?: { name: string; email: string }
): string {
  const params = new URLSearchParams();
  const variant = choiceToVariant(choice);

  if (userData?.name) params.set('name', userData.name);
  if (userData?.email) params.set('email', userData.email);
  params.set('variant', variant);

  // Choice C always goes to scorecard
  if (choice === 'no') {
    return `/scorecard?${params.toString()}`;
  }

  // A and B: 4-way routing based on cohort type and door state
  const cohortType = getCohortType();

  if (cohortType === 'beta') {
    // Beta cohort routing
    if (doorState === 'OPEN') {
      // Beta + OPEN: buy (not deposit)
      return `/intake-open-doc-beta?${params.toString()}`;
    } else {
      // Beta + CLOSED: waitlist with deposit
      return `/intake-open-doc-beta-waitlist?${params.toString()}`;
    }
  } else {
    // Main cohort routing
    if (doorState === 'OPEN') {
      // Main + OPEN: buy (not deposit)
      return `/intake-open-doc-doors-open?${params.toString()}`;
    } else {
      // Main + CLOSED: waitlist with deposit
      return `/intake-open-doc-main-waitlist?${params.toString()}`;
    }
  }
}

/**
 * Check if homepage should redirect to waitlist
 * @returns true if doors are closed (should redirect), false if open
 */
export function shouldRedirectToWaitlist(): boolean {
  const { state } = getDoorState();
  return state === 'CLOSED';
}

/**
 * Get the appropriate CTA text for the current door state
 * @returns CTA button text
 */
export function getCTAText(doorState?: DoorState): string {
  const state = doorState || getDoorState().state;
  if (state === 'OPEN') {
    return 'View Offer & Secure Your Spot';
  } else {
    return 'Join Waitlist & Secure Early Access';
  }
}

/**
 * Get the popup heading text for the current door state
 * @returns Heading text for popup
 */
export function getPopupHeading(doorState?: DoorState): string {
  const state = doorState || getDoorState().state;
  const { cohortStartDate } = getDoorState();

  if (state === 'OPEN') {
    return `We kick off ${cohortStartDate}. Are you ready to secure your spot?`;
  } else {
    return `We kick off ${cohortStartDate}. Are you interested in joining?`;
  }
}

/**
 * Get the main page heading for step 1 of popup
 * @returns Main heading text
 */
export function getMainPopupHeading(): string {
  const { state } = getDoorState();
  if (state === 'OPEN') {
    return 'Secure Your Spot';
  } else {
    return 'Join the waitlist';
  }
}
