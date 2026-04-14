/**
 * Waitlist & Cohort Configuration
 *
 * Auto-calculating system that determines:
 * - Current cohort (in progress)
 * - Next cohort (selling for)
 * - Door state (open/closed)
 * - All display dates
 *
 * CYCLE:
 * - Day 1-19: DOORS CLOSED (collecting waitlist for current month's cohort)
 * - Day 20-31: DOORS OPEN (still selling for current month's cohort)
 * - Day 1 of next month: Cycle repeats, start selling for that month
 *
 * BETA COHORT OVERRIDE:
 * - For the May 1st beta cohort, doors open April 15th instead of April 20th
 * - Set DOORS_OPEN_OVERRIDE to change the doors open date for specific cohorts
 */

// BETA COHORT: Override doors open date to April 15th (instead of default April 20th)
// Set to null to use default (20th of month)
const DOORS_OPEN_OVERRIDE = 'April 15th'; // null for default, or 'April 15th' for beta

// Helper function to get ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Helper function to calculate offset dates
function calculateOffsetDate(baseDate: string, baseYear: string, offset: number, unit: 'months' | 'weeks' | 'days' = 'months'): string {
  // Remove ordinal suffixes (1st, 2nd, 3rd, 4th, etc.)
  const cleanDate = baseDate.replace(/(\d+)(st|nd|rd|th)/, '$1');
  const date = new Date(`${cleanDate} ${baseYear}`);

  if (unit === 'weeks') {
    date.setDate(date.getDate() + (offset * 7));
  } else if (unit === 'days') {
    date.setDate(date.getDate() + offset);
  } else {
    date.setMonth(date.getMonth() + offset);
  }

  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

/**
 * Get cohort info for a given date
 * @param date - The date to calculate cohort for
 * @returns Cohort month, year, and start date
 *
 * We are ALWAYS selling for the NEXT month's cohort
 * Example: On April 14th or April 25th, we're selling for May 1st
 */
function getCohortForDate(date: Date): {
  month: string;
  year: string;
  startDate: Date;
} {
  // We're always selling for NEXT month's cohort (1st of next month)
  const cohortDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  // Handle year rollover
  if (cohortDate.getMonth() === 0 && date.getMonth() === 11) {
    // Rollover from December to January
    cohortDate.setFullYear(cohortDate.getFullYear() + 1);
  }

  return {
    month: cohortDate.toLocaleDateString('en-US', { month: 'long' }),
    year: cohortDate.getFullYear().toString(),
    startDate: cohortDate,
  };
}

// Get current date-based cohort info
const currentCohort = getCohortForDate(new Date());

// Manual override for testing - set this to override auto-calculations
// Set to null to use auto-calculation
const MANUAL_OVERRIDE: {
  DATE?: string;
  YEAR?: string;
} | null = null; // Set to null to use auto-calculation

// Use manual override if set, otherwise use auto-calculated values
const COHORT_DATE = MANUAL_OVERRIDE?.DATE || `${currentCohort.month} 1st`;
const COHORT_YEAR = MANUAL_OVERRIDE?.YEAR || currentCohort.year;

export const COHORT_CONFIG = {
  // Auto-calculated cohort info (can be manually overridden above)
  DATE: COHORT_DATE,
  YEAR: COHORT_YEAR,

  // Formatted versions
  DATE_FULL: `${COHORT_DATE}, ${COHORT_YEAR}`,

  // Door cycle dates (auto-calculated)
  // Doors open: Uses override if set, otherwise 20th of THIS month (11 days before cohort starts on 1st of next month)
  DOORS_OPEN: DOORS_OPEN_OVERRIDE || calculateOffsetDate(COHORT_DATE, COHORT_YEAR, -11, 'days'),
  // Doors close: Cohort start date (1st of next month)
  DOORS_CLOSE: COHORT_DATE,

  // Offset dates - use negative numbers for before, positive for after
  DEPOSIT_DEADLINE: calculateOffsetDate(COHORT_DATE, COHORT_YEAR, -2), // 2 months before
  EARLY_BIRD_DEADLINE: calculateOffsetDate(COHORT_DATE, COHORT_YEAR, -3), // 3 months before

  // Computed state (calculated at runtime)
  get isDoorsOpen(): boolean {
    // If override is set, check if we're at or past that date
    if (DOORS_OPEN_OVERRIDE) {
      const now = new Date();
      const overrideDate = new Date(DOORS_OPEN_OVERRIDE + (this.YEAR ? ` ${this.YEAR}` : ', 2026'));
      return now >= overrideDate;
    }
    // Default: doors open on the 20th
    const now = new Date();
    const dayOfMonth = now.getDate();
    return dayOfMonth >= 20;
  },

  get doorState(): 'OPEN' | 'CLOSED' {
    return this.isDoorsOpen ? 'OPEN' : 'CLOSED';
  },
} as const;

// Legacy support - keep old APPLICATIONS_OPEN name for compatibility
export const APPLICATIONS_OPEN = COHORT_CONFIG.DOORS_OPEN;
