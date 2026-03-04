'use client';

import { useEffect, useState } from 'react';

interface DropOffPoint {
  step: string;
  dropOffCount: number;
  dropOffPercentage: number;
  commonReasons?: string[];
}

export default function VSLDropoffAnalytics() {
  const [dropOffs, setDropOffs] = useState<DropOffPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDropOffs();
  }, []);

  const fetchDropOffs = async () => {
    try {
      const response = await fetch('/api/admin/analytics/vsl-dropoff');
      if (!response.ok) throw new Error('Failed to fetch VSL drop-off data');
      const data = await response.json();
      setDropOffs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading VSL drop-off analytics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Step
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Drop-off Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Drop-off %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Common Reasons
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {dropOffs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-400">
                  No VSL drop-off data available
                </td>
              </tr>
            ) : (
              dropOffs.map((point, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {point.step}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 font-semibold">
                    {point.dropOffCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {point.dropOffPercentage}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {point.commonReasons?.join(', ') || 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Insight Box */}
      {dropOffs.length > 0 && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">💡 Insight</h4>
          <p className="text-gray-300 text-sm">
            The biggest drop-off occurs at <strong>{dropOffs[0].step}</strong> with{' '}
            {dropOffs[0].dropOffPercentage}% of users leaving. Consider reviewing the content
            at this point to improve engagement.
          </p>
        </div>
      )}
    </div>
  );
}
