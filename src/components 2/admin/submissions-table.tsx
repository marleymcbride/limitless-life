// src/components/admin/submissions-table.tsx

'use client';

import { useEffect, useState } from 'react';
import type { Submission } from '@/types/submission';

interface SubmissionsTableProps {
  filters?: {
    type?: string;
    startDate?: string;
    endDate?: string;
    campaign?: string;
    email?: string;
  };
}

export default function SubmissionsTable({ filters }: SubmissionsTableProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
  });

  useEffect(() => {
    fetchSubmissions();
  }, [filters, pagination.page]);

  async function fetchSubmissions() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', pagination.page.toString());
      params.append('pageSize', pagination.pageSize.toString());
      if (filters?.type) params.append('type', filters.type);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.campaign) params.append('campaign', filters.campaign);
      if (filters?.email) params.append('email', filters.email);

      const response = await fetch(`/api/submissions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch submissions');

      const data = await response.json();
      setSubmissions(data.submissions);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function getTypeColor(type: Submission['type']) {
    switch (type) {
      case 'whale': return 'bg-purple-100 text-purple-800';
      case 'coaching': return 'bg-blue-100 text-blue-800';
      case 'course': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getTypeLabel(type: Submission['type']) {
    switch (type) {
      case 'whale': return 'Whale/LHC';
      case 'coaching': return 'Coaching';
      case 'course': return 'Course';
      default: return type;
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedSubmission(submission)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {submission.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {submission.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(submission.type)}`}>
                    {getTypeLabel(submission.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {submission.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {submission.tier.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {submission.utmCampaign || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                    submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    submission.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submission.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {submissions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No submissions found
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.total > pagination.pageSize && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} submissions
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page * pagination.pageSize >= pagination.total}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  );
}

function SubmissionDetailModal({
  submission,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Submission Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg">{submission.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{submission.email}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="text-lg capitalize">{submission.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Score</label>
                <p className="text-lg">{submission.score}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tier</label>
                <p className="text-lg">{submission.tier.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">UTM Source</label>
                <p className="text-sm">{submission.utmSource || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">UTM Medium</label>
                <p className="text-sm">{submission.utmMedium || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">UTM Campaign</label>
                <p className="text-sm">{submission.utmCampaign || '-'}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Submitted</label>
              <p className="text-sm">{new Date(submission.submittedAt).toLocaleString()}</p>
            </div>

            <div className="border-t pt-4">
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Full Submission Data
              </label>
              <pre className="bg-gray-50 p-4 rounded text-xs overflow-x-auto">
                {JSON.stringify(submission.fullData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
