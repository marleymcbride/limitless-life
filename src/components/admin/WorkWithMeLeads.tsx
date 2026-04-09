'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  sourceSite?: string | null;
  leadAction?: string | null;
  leadTemperature?: string;
  firstTouchDate?: string | null;
  lastSeen: string;
  createdAt: string;
}

/**
 * WorkWithMeLeads - Filtered view for hottest leads
 * Shows only leads with lead_action = 'work-with-me'
 * These are the hottest prospects who clicked "Work With Me" button
 */
export function WorkWithMeLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/leads/work-with-me');

      if (!response.ok) {
        throw new Error('Failed to fetch work with me leads');
      }

      const result = await response.json();
      setLeads(result.leads || []);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
      setLoading(false);
    }
  }

  const getSourceSiteColor = (site: string | null | undefined) => {
    if (!site) return 'text-gray-400';
    const colors: Record<string, string> = {
      '3weeks.co': 'text-purple-600 font-medium',
      'limitless-life.co': 'text-blue-600 font-medium',
      'marleymcbride.co': 'text-green-600 font-medium',
      'systeme.io': 'text-orange-600 font-medium',
      'other': 'text-gray-600 font-medium',
    };
    return colors[site] || 'text-gray-400';
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Work With Me Leads</h1>
        <p className="text-gray-600">Hot leads who clicked "Work With Me" button</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading leads...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  First Touch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Seen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No work with me leads found yet
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.firstName || lead.lastName ? (
                        <div className="font-medium text-gray-900">
                          {lead.firstName || ''} {lead.lastName || ''}
                        </div>
                      ) : (
                        <div className="text-gray-500 italic">No name</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={getSourceSiteColor(lead.sourceSite)}>
                        {lead.sourceSite || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.leadTemperature === 'hot'
                          ? 'bg-red-100 text-red-800'
                          : lead.leadTemperature === 'warm'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.leadTemperature || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.firstTouchDate
                        ? new Date(lead.firstTouchDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.lastSeen ? new Date(lead.lastSeen).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WorkWithMeLeads;
