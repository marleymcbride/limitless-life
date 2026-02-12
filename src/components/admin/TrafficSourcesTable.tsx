'use client';

import { useState } from 'react';

interface TrafficSource {
  source: string; // utm_source
  visitors: number;
  sessions: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
}

interface TrafficSourcesTableProps {
  data: TrafficSource[];
  loading: boolean;
}

/**
 * TrafficSourcesTable - Shows traffic source breakdown from UTM parameters
 * Helps identify which channels drive best conversions
 */
export function TrafficSourcesTable({ data, loading = false }: TrafficSourcesTableProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Traffic Sources</h2>
        <div className="text-sm text-gray-600">
          Showing visitor counts and conversion rates by UTM source
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading traffic data...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitors
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unique Visitors
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conv. Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((source, index) => (
                <tr key={source.source + index}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {source.source || '(none)'}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    {source.visitors.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    {source.uniqueVisitors.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    {source.sessions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    {source.conversions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">
                    <div className={`text-sm font-bold ${source.conversionRate >= 3 ? 'text-green-600' : 'text-gray-900'}`}>
                      {source.conversionRate}%
                    </div>
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
