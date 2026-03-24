import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;

  // Debug logging to see what searchParams we receive
  console.log('[HomePage] Received searchParams:', JSON.stringify(params));

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

  console.log('[HomePage] Redirecting to:', redirectUrl);

  // Use absolute URL with redirect()
  redirect(redirectUrl);
}
