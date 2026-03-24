import { redirect } from 'next/navigation';

type HomePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function HomePage({ searchParams }: HomePageProps) {
  // Preserve query parameters when redirecting to waitlist
  // This ensures UTM tracking parameters like ?x=bio are not lost
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  const redirectUrl = queryString ? `/waitlist?${queryString}` : '/waitlist';

  redirect(redirectUrl);
}
