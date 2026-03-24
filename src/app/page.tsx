import { redirect } from 'next/navigation';

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;

  // Debug logging to see what searchParams we receive
  console.log('[HomePage] Received searchParams:', JSON.stringify(params));

  // Build query string from params
  const queryString = Object.entries(params)
    .filter(([_, value]) => typeof value === 'string')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const redirectUrl = queryString ? `https://limitless-life.co/waitlist?${queryString}` : 'https://limitless-life.co/waitlist';

  console.log('[HomePage] Redirecting to:', redirectUrl);

  // Use absolute URL with redirect()
  redirect(redirectUrl);
}
