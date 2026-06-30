type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Homepage now serves the Always-Open experience.
 * The cohort-style waitlist remains available at `/waitlist` and
 * the cohort "ready to join" flow is duplicated under `/open`.
 */
export default async function HomePage(_props: HomePageProps) {
  // Render the doors-open-main content on the root path as the
  // 'always open' experience. Using dynamic import to keep parity
  // with previous pattern and avoid any circular/import issues.
  const DoorsOpenMain = (await import('./doors-open-main/page')).default;
  return <DoorsOpenMain />;
}
