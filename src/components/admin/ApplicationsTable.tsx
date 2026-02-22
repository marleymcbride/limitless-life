'use client';

import { useState, useEffect } from 'react';

interface Application {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  leadScore: number;
  leadTemperature: 'cold' | 'warm' | 'hot';
  tierInterest?: string;
  vslWatched: boolean;
  vslCompletionPercent: number;
  interestType?: string;
  pricingPlanSelected?: string;
  checkoutInitiated: boolean;
  purchased: boolean;
  problemsToSolve?: string;
  desiredResult?: string;
  lastSeen: string;
  createdAt: string;
}

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  async function fetchApplications() {
    setLoading(true);
    setError(null);

    try {
      const url = new URL('/api/admin/applications', window.location.origin);
      if (filter !== 'all') {
        url.searchParams.set('temperature', filter);
      }

      const response = await fetch(url.toString(), {
        headers: {
          'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const result = await response.json();
      setApplications(result.applications);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      setLoading(false);
    }
  }

  function getTemperatureColor(temp: string) {
    switch (temp) {
      case 'hot':
        return 'bg-red-900/50 text-red-300 border-red-700';
      case 'warm':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'cold':
        return 'bg-blue-900/50 text-blue-300 border-blue-700';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  }

  function getInterestBadge(interest: string | undefined) {
    if (!interest) return null;

    let colors = '';
    switch (interest) {
      case 'Coaching':
        colors = 'bg-green-900/50 text-green-300 border-green-700';
        break;
      case 'Course':
        colors = 'bg-blue-900/50 text-blue-300 border-blue-700';
        break;
      case 'Self-paced':
        colors = 'bg-gray-700/50 text-gray-300 border-gray-600';
        break;
      default:
        colors = 'bg-gray-800 text-gray-400 border-gray-700';
    }

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${colors}`}>
        {interest}
      </span>
    );
  }

  function getPricingPlanBadge(plan: string | undefined) {
    if (!plan) return <span className="text-gray-500">-</span>;

    const colors = 'bg-purple-900/50 text-purple-300 border-purple-700';
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${colors}`}>
        {plan}
      </span>
    );
  }

  function getCheckoutBadge(initiated: boolean) {
    if (!initiated) return <span className="text-gray-500">-</span>;

    return (
      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border bg-blue-900/50 text-blue-300 border-blue-700">
        ✓ Started
      </span>
    );
  }

  function getPurchasedBadge(purchased: boolean) {
    if (!purchased) return <span className="text-gray-500">-</span>;

    return (
      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border bg-green-900/50 text-green-300 border-green-700">
        💰 Yes
      </span>
    );
  }

  function truncate(text: string | null | undefined, maxLength: number = 60): string {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.leadTemperature === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Applications</h2>
          <p className="text-sm text-gray-400 mt-1">
            Leads who submitted Fillout forms with full journey data
          </p>
        </div>

        {/* Filters */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'hot' | 'warm' | 'cold')}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#940909]"
        >
          <option value="all">All Temperatures</option>
          <option value="hot">Hot Only (70+)</option>
          <option value="warm">Warm (40-69)</option>
          <option value="cold">Cold (0-39)</option>
        </select>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
        <div className="text-sm text-gray-400">
          Showing <strong>{filteredApplications.length}</strong> applications
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading applications...</div>
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
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Temp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Looking For
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Problems
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Goal
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pricing Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Checkout
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Purchased
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  VSL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    {app.firstName && app.lastName ? (
                      <div className="font-medium text-white">
                        {app.firstName} {app.lastName}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">No name</div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {app.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-semibold ${
                        app.leadScore >= 70
                          ? 'text-purple-400 font-bold'
                          : app.leadScore >= 40
                          ? 'text-blue-400 font-semibold'
                          : 'text-gray-500'
                      }`}
                    >
                      {app.leadScore}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTemperatureColor(
                        app.leadTemperature
                      )}`}
                    >
                      {app.leadTemperature}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {app.tierInterest || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getInterestBadge(app.interestType)}
                  </td>
                  <td
                    className="px-4 py-4 text-sm text-gray-300"
                    title={app.problemsToSolve || ''}
                  >
                    {truncate(app.problemsToSolve)}
                  </td>
                  <td
                    className="px-4 py-4 text-sm text-gray-300"
                    title={app.desiredResult || ''}
                  >
                    {truncate(app.desiredResult)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getPricingPlanBadge(app.pricingPlanSelected)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getCheckoutBadge(app.checkoutInitiated)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getPurchasedBadge(app.purchased)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {app.vslWatched ? `${app.vslCompletionPercent}%` : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
