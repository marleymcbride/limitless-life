'use client';

import { useEffect, useState } from 'react';

interface AbandonedLead {
  email: string;
  firstName?: string;
  tierInterest?: string;
  leadScore: number;
  temperature: 'Hot' | 'Warm' | 'Cold';
  utmSource?: string;
  utmCampaign?: string;
  tierClickTime?: string;
  lastSeen: string;
}

export default function AbandonedFunnelAnalytics() {
  const [leads, setLeads] = useState<AbandonedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/analytics/abandoned', {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });
      if (!response.ok) throw new Error('Failed to fetch abandoned leads');
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading abandoned funnel analytics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Calculate stats
  const hotLeads = leads.filter((l) => l.temperature === 'Hot').length;
  const warmLeads = leads.filter((l) => l.temperature === 'Warm').length;
  const totalRevenuePotential = leads.length * 997; // Assuming average $997 purchase

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
          <h3 className="text-red-400 text-sm font-medium mb-2">Hot Leads (Score ≥70)</h3>
          <p className="text-3xl font-bold text-white">{hotLeads}</p>
          <p className="text-xs text-gray-400 mt-1">Ready for immediate follow-up</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6">
          <h3 className="text-yellow-400 text-sm font-medium mb-2">Warm Leads (Score 40-69)</h3>
          <p className="text-3xl font-bold text-white">{warmLeads}</p>
          <p className="text-xs text-gray-400 mt-1">Need nurturing</p>
        </div>
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h3 className="text-blue-400 text-sm font-medium mb-2">Revenue Potential</h3>
          <p className="text-3xl font-bold text-white">${totalRevenuePotential.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{leads.length} leads × ~$997</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tier Interest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Temperature
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Seen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-400">
                  No abandoned leads in this time period
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {lead.firstName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white capitalize">
                    {lead.tierInterest || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {lead.leadScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        lead.temperature === 'Hot'
                          ? 'bg-red-900 text-red-300'
                          : lead.temperature === 'Warm'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-blue-900 text-blue-300'
                      }`}
                    >
                      {lead.temperature}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {lead.utmSource || 'Direct'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(lead.lastSeen).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Action Items */}
      {leads.length > 0 && (
        <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-2">🎯 Recommended Actions</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {hotLeads > 0 && (
              <li>• Reach out to {hotLeads} hot leads immediately via email/phone</li>
            )}
            {warmLeads > 0 && (
              <li>• Add {warmLeads} warm leads to an automated nurture sequence</li>
            )}
            <li>• Set up n8n automation to trigger email campaigns based on tier interest</li>
          </ul>
        </div>
      )}
    </div>
  );
}
