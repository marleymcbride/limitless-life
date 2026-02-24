import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import WorkWithMeLeads from '@/components/admin/WorkWithMeLeads';

export default async function WorkWithMeLeadsPage() {
  // Check authentication on server side
  const auth = await isAuthenticated();

  if (!auth) {
    redirect('/admin/login');
  }

  return <WorkWithMeLeads />;
}
