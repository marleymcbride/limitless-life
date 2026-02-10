'use client';

import { useEffect, useState } from 'react';

interface ScrollMetrics {
  threshold: number;
  users: number;
  dropOffFromPrevious: number;
  dropOffPercentage: number;
}

export default function ScrollDropoffAnalytics() {
  const [metrics, setMetrics] = useState<ScrollMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/admin/analytics/scroll-dropoff');
      if (!response.ok) throw new Error('Failed to fetch scroll drop-off data');
      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading scroll drop-off analytics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Scroll Depth
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Users Reached
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Drop-off from Previous
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Drop-off %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {metrics.map((metric, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                  {metric.threshold}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {metric.users.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                  {metric.dropOffFromPrevious > 0 ? `-${metric.dropOffFromPrevious.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {metric.dropOffPercentage > 0 ? `${metric.dropOffPercentage}%` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight Box */}
      {metrics.length > 0 && (
        <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-2">📊 Scroll Engagement</h4>
          <p className="text-gray-300 text-sm">
            {metrics[metrics.length - 1].users > 0
              ? `${metrics[metrics.length - 1].users.toLocaleString()} users (${Math.round((metrics[metrics.length - 1].users / metrics[0].users) * 100)}%) scrolled to the bottom of the page. `
              : ''}
            {metrics[2]?.dropOffPercentage > 50
              ? `Consider adding more engaging content around the 50% mark where ${metrics[2].dropOffPercentage}% of users drop off.`
              : 'Scroll engagement is healthy throughout the page.'}
          </p>
        </div>
      )}
    </div>
  );
}
