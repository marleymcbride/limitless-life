import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { shouldRedirectToWaitlist } from '@/lib/door-state';

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Homepage with Door State Logic
 *
 * - DOORS CLOSED (Days 1-19): Redirects to /waitlist
 * - DOORS OPEN (Days 20-31): Shows sales page (waitlist content)
 *
 * This allows the same URL to serve different purposes based on the monthly cycle.
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;

  // Debug logging
  console.log('[HomePage] Received searchParams:', JSON.stringify(params));
  console.log('[HomePage] Door state check - should redirect to waitlist:', shouldRedirectToWaitlist());

  // If doors are closed, redirect to waitlist
  if (shouldRedirectToWaitlist()) {
    // Get the current host to use in redirect (works for localhost and production)
    const headersList = await headers();
    const host = headersList.get('host') || 'limitless-life.co';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // Build query string from params
    const queryString = Object.entries(params)
      .filter(([_, value]) => typeof value === 'string')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const redirectUrl = queryString ? `${baseUrl}/waitlist?${queryString}` : `${baseUrl}/waitlist`;

    console.log('[HomePage] Doors CLOSED - Redirecting to:', redirectUrl);
    redirect(redirectUrl);
  }

  // Doors are OPEN - show the sales page
  // We'll import and render the waitlist page content here
  // This is done dynamically to avoid circular dependencies
  const WaitlistPage = (await import('./waitlist/page')).default;
  return <WaitlistPage />;
}
