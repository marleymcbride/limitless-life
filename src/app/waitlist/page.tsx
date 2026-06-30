import { redirect } from 'next/navigation';
import { PROGRAMME_MODE } from '@/lib/door-state';
import WaitlistPageClient from './WaitlistPageClient';

/**
 * /waitlist routing:
 * - cohort-closed → show waitlist sales page (this is the main page)
 * - cohort-open   → redirect to /open (doors are open, send them to buy)
 * - evergreen     → redirect to / (cohort model is off)
 */
export default function WaitlistPage() {
  if (PROGRAMME_MODE === 'cohort-open') redirect('/open');
  if (PROGRAMME_MODE === 'evergreen') redirect('/');
  return <WaitlistPageClient />;
}
