import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await isAuthenticated();

  if (!auth) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
