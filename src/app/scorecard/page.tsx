import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Scorecard - Limitless Life',
  description: 'Discover your energy blockers and how to fix them.',
};

/**
 * Scorecard Page (Placeholder)
 *
 * This page is shown to users who select option C ("I'm not ready this cohort")
 * in the popup flow.
 *
 * TODO: Replace this with the actual scorecard experience.
 * For now, we'll redirect to the waitlist page with a scorecard flag.
 */
export default function ScorecardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // For now, redirect to waitlist with a scorecard flag
  // You can update this URL when you build the actual scorecard
  redirect('/waitlist?scorecard=true');
}
