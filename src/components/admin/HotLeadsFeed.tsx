'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  leadScore: number;
  leadTemperature?: 'cold' | 'warm' | 'hot';
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface HotLeadsData {
  hot: User[];
  warm: User[];
  cold: User[];
}

export function HotLeadsFeed() {
  const [data, setData] = useState<HotLeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/analytics/leads', {
        headers: {
          'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getTemperatureColor = (temperature?: string) => {
    switch (temperature) {
      case 'hot':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warm':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cold':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getFilteredLeads = () => {
    if (!data) return [];

    switch (filter) {
      case 'hot':
        return data.hot;
      case 'warm':
        return data.warm;
      case 'cold':
        return data.cold;
      default:
        return [...data.hot, ...data.warm, ...data.cold];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const filteredLeads = getFilteredLeads();

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-red-600 text-sm font-medium">Hot Leads</div>
          <div className="text-3xl font-bold text-red-700 mt-2">
            {data.hot.length}
          </div>
          <div className="text-sm text-red-600 mt-1">
            Score ≥ 70 - Ready to close
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="text-yellow-600 text-sm font-medium">Warm Leads</div>
          <div className="text-3xl font-bold text-yellow-700 mt-2">
            {data.warm.length}
          </div>
          <div className="text-sm text-yellow-600 mt-1">
            Score 40-69 - Nurture needed
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-blue-600 text-sm font-medium">Cold Leads</div>
          <div className="text-3xl font-bold text-blue-700 mt-2">
            {data.cold.length}
          </div>
          <div className="text-sm text-blue-600 mt-1">
            Score &lt; 40 - Early stage
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All ({data.hot.length + data.warm.length + data.cold.length})
        </button>
        <button
          onClick={() => setFilter('hot')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'hot'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 text-red-700'
          }`}
        >
          Hot ({data.hot.length})
        </button>
        <button
          onClick={() => setFilter('warm')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'warm'
              ? 'bg-yellow-600 text-white'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          Warm ({data.warm.length})
        </button>
        <button
          onClick={() => setFilter('cold')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'cold'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          Cold ({data.cold.length})
        </button>
      </div>

      {/* Leads List */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.firstName && lead.lastName
                            ? `${lead.firstName} ${lead.lastName}`
                            : lead.email}
                        </div>
                        {lead.firstName && lead.lastName && (
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.leadScore}
                        </div>
                        <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${Math.min(lead.leadScore, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getTemperatureColor(
                          lead.leadTemperature
                        )}`}
                      >
                        {lead.leadTemperature?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={fetchLeads}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
        <button
          onClick={() => {
            // Export functionality could be added here
            alert('Export feature coming soon!');
          }}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
