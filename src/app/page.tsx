import { redirect } from 'next/navigation';
import { PROGRAMME_MODE } from '@/lib/door-state';

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Homepage routing:
 * - cohort-open / cohort-closed → redirect to /waitlist (which then routes further)
 * - evergreen → render the evergreen sales page directly
 */
export default async function HomePage(_props: HomePageProps) {
  if (PROGRAMME_MODE === 'cohort-open' || PROGRAMME_MODE === 'cohort-closed') {
    redirect('/waitlist');
  }

  // evergreen
  const DoorsOpenMain = (await import('./doors-open-main/page')).default;
  return <DoorsOpenMain />;
}
