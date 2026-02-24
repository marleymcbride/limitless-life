import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';

export default async function EmailLeadsPage() {
  // Check authentication on server side
  const auth = await isAuthenticated();

  if (!auth) {
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Email Course Leads</h1>
        <p className="text-gray-600">Track engagement from 30-day email course</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex">
          <svg className="h-6 w-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-lg font-medium text-yellow-800">Coming Soon</h3>
            <p className="text-yellow-700 mt-1">
              This section will display email engagement data from Systeme.io once Workflow 4 is activated.
              Features will include:
            </p>
            <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
              <li>Tag history timeline per contact</li>
              <li>Email course progress tracking</li>
              <li>Engagement metrics and open/click tracking</li>
              <li>Lead magnet source attribution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
