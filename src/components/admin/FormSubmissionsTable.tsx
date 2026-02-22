'use client';

import { useState, useEffect } from 'react';

interface FormSubmission {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  leadScore: number;
  tierInterest?: string;
  submittedAt: string;
  fullName: string;
  lookingFor?: string[];
  howToGetHere?: string;
  currentSituation?: string;
  problemsToSolve?: string;
  whatWellInstall?: string;
  desiredResult?: string;
  filloutScore?: number;
}

export default function FormSubmissionsTable() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 0,
  });

  useEffect(() => {
    fetchSubmissions();
  }, [page]);

  async function fetchSubmissions() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/form-submissions?page=${page}&pageSize=50`,
        {
          headers: {
            'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const result = await response.json();
      setSubmissions(result.submissions);
      setPagination(result.pagination);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
      setLoading(false);
    }
  }

  function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  function truncate(text: string | null | undefined, maxLength: number = 50): string {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Form Submissions</h2>
          <p className="text-sm text-gray-400 mt-1">
            All Fillout form submissions (one row per email)
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
        <div className="text-sm text-gray-400">
          Showing <strong>{submissions.length}</strong> of{' '}
          <strong>{pagination.total}</strong> submissions
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading submissions...</div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-lg">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Looking For
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Situation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Problems
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Goal
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {submission.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatTimeAgo(submission.submittedAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {submission.fullName || submission.firstName + ' ' + submission.lastName || '-'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300">
                    {submission.lookingFor && Array.isArray(submission.lookingFor)
                      ? submission.lookingFor.join(', ')
                      : truncate(String(submission.lookingFor), 30)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300" title={submission.currentSituation || ''}>
                    {truncate(submission.currentSituation)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300" title={submission.problemsToSolve || ''}>
                    {truncate(submission.problemsToSolve)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300" title={submission.desiredResult || ''}>
                    {truncate(submission.desiredResult)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {submission.leadScore}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {submission.tierInterest || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-400">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
