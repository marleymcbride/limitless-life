import { redirect } from 'next/navigation';
import { PROGRAMME_MODE } from '@/lib/door-state';
import OpenPageClient from './OpenPageClient';

/**
 * /open routing:
 * - cohort-open   → show doors-open sales page (this is the main page)
 * - cohort-closed → redirect to /waitlist (doors are closed)
 * - evergreen     → redirect to / (cohort model is off)
 */
export default function OpenPage() {
  if (PROGRAMME_MODE === 'cohort-closed') redirect('/waitlist');
  if (PROGRAMME_MODE === 'evergreen') redirect('/');
  return <OpenPageClient />;
}
