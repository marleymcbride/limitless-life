'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  leadScore: number;
  leadTemperature: 'cold' | 'warm' | 'hot';
  tierInterest?: string;
  status: 'prospect' | 'lead' | 'customer';
  lastSeen: string;
  vslWatched: boolean;
  vslCompletionPercent: number;
  applicationStarted: boolean;
  pricingViewed: boolean;
  createdAt: string;
}

/**
 * LeadsTable - Hot leads feed for sales team
 * Shows high-priority leads (warm/hot) with key details
 * Sortable by score, temperature, last seen
 * Quick filters for engagement level
 */
export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'temperature' | 'lastSeen'>('score');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analytics/leads', {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const result = await response.json();
      // Flatten the structured response { hot, warm, cold } into a single array
      const allLeads = [
        ...(result.hot || []),
        ...(result.warm || []),
        ...(result.cold || []),
      ];
      setLeads(allLeads);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
      setLoading(false);
    }
  }

  const filteredLeads = leads.filter((lead) => {
    if (filter === 'all') return true;
    if (filter === 'hot') return lead.leadTemperature === 'hot';
    if (filter === 'warm') return lead.leadTemperature === 'warm';
    if (filter === 'cold') return lead.leadTemperature === 'cold';
    return false;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortBy === 'score') return b.leadScore - a.leadScore;
    if (sortBy === 'temperature') {
      const tempOrder = { 'hot': 3, 'warm': 2, 'cold': 1 };
      return tempOrder[a.leadTemperature as ('cold' | 'warm' | 'hot')] - tempOrder[b.leadTemperature as ('cold' | 'warm' | 'hot')];
    }
    if (sortBy === 'lastSeen') {
      const dateA = new Date(a.lastSeen);
      const dateB = new Date(b.lastSeen);
      return dateB.getTime() - dateA.getTime();
    }
    return 0;
  });

  const getLeadTemperatureColor = (temp: string) => {
    if (temp === 'hot') return 'bg-red-100 text-white';
    if (temp === 'warm') return 'bg-yellow-100 text-white';
    return 'bg-blue-100 text-white';
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-purple-300 font-bold';
    if (score >= 40) return 'text-blue-600 font-semibold';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Hot Leads Feed</h1>
          <p className="text-sm text-gray-600 mt-1">High-priority leads for sales outreach</p>
        </div>
        <div className="flex gap-4 items-center">
          {/* Filters */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'hot' | 'warm' | 'cold')}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Leads</option>
            <option value="hot">Hot Only (70+)</option>
            <option value="warm">Warm (40-69)</option>
            <option value="cold">Cold (0-39)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'score' | 'temperature' | 'lastSeen')}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="score">Sort by Score</option>
            <option value="temperature">Sort by Temperature</option>
            <option value="lastSeen">Sort by Last Seen</option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <div className="text-sm text-gray-600">
          Showing <strong>{filteredLeads.length}</strong> of {filter === 'all' ? 'all' : filter} leads
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading leads...</div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VSL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  App
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Seen
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.firstName && lead.lastName ? (
                      <div className="font-medium text-white">{lead.firstName} {lead.lastName}</div>
                    ) : (
                      <div className="text-gray-500 italic">No name</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-semibold ${getScoreColor(lead.leadScore)}`}>
                      {lead.leadScore}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeadTemperatureColor(lead.leadTemperature)}`}>
                      {lead.leadTemperature}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.tierInterest || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.vslWatched ? `${lead.vslCompletionPercent}%` : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.applicationStarted ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.pricingViewed ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(lead.lastSeen).toLocaleDateString()}
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

export default LeadsTable;
