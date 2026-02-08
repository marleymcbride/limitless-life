import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import AdminDashboard from '@/components/admin-dashboard';

export default async function AdminPage() {
  // Check authentication on server side
  const auth = await isAuthenticated();

  if (!auth) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
