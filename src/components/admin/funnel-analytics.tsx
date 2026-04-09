'use client';

import { useEffect, useState } from 'react';

interface FunnelStep {
  name: string;
  eventType: string;
  count: number;
  dropOff: number;
  dropOffPercentage: number;
  conversionRate: number;
}

interface FunnelMetrics {
  period: { start: string; end: string };
  steps: FunnelStep[];
  totalDropOff: number;
  overallConversionRate: number;
}

export default function FunnelAnalytics() {
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/admin/analytics/funnel');
      if (!response.ok) throw new Error('Failed to fetch funnel metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading funnel analytics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Drop-off</h3>
          <p className="text-3xl font-bold text-white">{metrics.totalDropOff.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Overall Conversion Rate</h3>
          <p className="text-3xl font-bold text-green-500">{metrics.overallConversionRate}%</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Starting Visitors</h3>
          <p className="text-3xl font-bold text-white">{metrics.steps[0]?.count.toLocaleString() || 0}</p>
        </div>
      </div>

      {/* Funnel Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Step
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Drop-off
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Drop-off %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Conversion Rate
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {metrics.steps.map((step, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{step.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{step.count.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                  {step.dropOff > 0 ? `-${step.dropOff.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {step.dropOffPercentage > 0 ? `${step.dropOffPercentage}%` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                  {step.conversionRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
