/**
 * Waitlist & Cohort Configuration
 * Single source of truth for cohort dates
 * Update the date below and it will update everywhere
 */

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

export const COHORT_CONFIG = {
  // UPDATE THIS DATE - changes everywhere:
  DATE: 'May 1st',
  YEAR: '2026',

  // Formatted versions
  DATE_FULL: 'May 1st, 2026',

  // Offset dates - use negative numbers for before, positive for after
  APPLICATIONS_OPEN: calculateOffsetDate('May 1st', '2026', -17, 'days'), // April 14th
  DEPOSIT_DEADLINE: calculateOffsetDate('May 1st', '2026', -2), // 2 months before
  EARLY_BIRD_DEADLINE: calculateOffsetDate('May 1st', '2026', -3), // 3 months before
} as const;
