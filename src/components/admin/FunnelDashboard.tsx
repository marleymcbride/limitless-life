'use client';

import { useState, useEffect } from 'react';

interface FunnelStep {
  name: string;
  eventType: string;
  count: number;
  dropOff: number;
  dropOffPercentage: number;
  conversionRate: number;
}

interface FunnelMetrics {
  period: {
    start: string;
    end: string;
  };
  steps: FunnelStep[];
  totalDropOff: number;
  overallConversionRate: number;
}

interface DropOffPoint {
  step: string;
  dropOffCount: number;
  dropOffPercentage: number;
  commonReasons?: string[];
}

interface FunnelData {
  metrics: FunnelMetrics;
  dropOffs: DropOffPoint[];
  bySource?: Array<{ source: string; count: number; conversionRate: number }>;
  byDevice?: Array<{ device: string; pageViews: number; conversions: number; conversionRate: number }>;
}

export function FunnelDashboard() {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [breakdown, setBreakdown] = useState<'none' | 'source' | 'device'>('none');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchFunnelData();
  }, [breakdown, dateRange]);

  const fetchFunnelData = async () => {
    try {
      setLoading(true);
      setError(null);

      const endDate = new Date();
      const startDate = new Date();

      switch (dateRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
      }

      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        breakdown,
      });

      const response = await fetch(`/api/analytics/funnel?${params}`, {
        headers: {
          'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch funnel data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading funnel data...</div>
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

  const { metrics, dropOffs, bySource, byDevice } = data;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setDateRange('7d')}
            className={`px-4 py-2 rounded-lg ${
              dateRange === '7d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`px-4 py-2 rounded-lg ${
              dateRange === '30d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setDateRange('90d')}
            className={`px-4 py-2 rounded-lg ${
              dateRange === '90d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            90 Days
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setBreakdown('none')}
            className={`px-4 py-2 rounded-lg ${
              breakdown === 'none'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setBreakdown('source')}
            className={`px-4 py-2 rounded-lg ${
              breakdown === 'source'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Source
          </button>
          <button
            onClick={() => setBreakdown('device')}
            className={`px-4 py-2 rounded-lg ${
              breakdown === 'device'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Device
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-gray-500 text-sm">Total Visitors</div>
          <div className="text-3xl font-bold text-gray-900">
            {metrics.steps[0]?.count.toLocaleString() || 0}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-gray-500 text-sm">Conversions</div>
          <div className="text-3xl font-bold text-green-600">
            {metrics.steps[metrics.steps.length - 1]?.count.toLocaleString() || 0}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-gray-500 text-sm">Conversion Rate</div>
          <div className="text-3xl font-bold text-blue-600">
            {metrics.overallConversionRate}%
          </div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Sales Funnel</h2>
        <div className="space-y-3">
          {metrics.steps.map((step, index) => {
            const maxCount = metrics.steps[0].count;
            const widthPercent = (step.count / maxCount) * 100;
            const isLast = index === metrics.steps.length - 1;

            return (
              <div key={step.eventType} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{step.name}</span>
                  <div className="flex gap-4">
                    <span>{step.count.toLocaleString()}</span>
                    {!isLast && (
                      <span className="text-red-600">
                        -{step.dropOffPercentage}% drop-off
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-8 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-sm font-medium">
                    {step.conversionRate}% conversion
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drop-off Analysis */}
      {dropOffs.length > 0 && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Biggest Drop-off Points</h2>
          <div className="space-y-3">
            {dropOffs.slice(0, 5).map((dropOff, index) => (
              <div
                key={index}
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{dropOff.step}</h3>
                    {dropOff.commonReasons && (
                      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                        {dropOff.commonReasons.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">
                      {dropOff.dropOffCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {dropOff.dropOffPercentage}% drop-off
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source Breakdown */}
      {breakdown === 'source' && bySource && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Performance by Traffic Source</h2>
          <div className="space-y-3">
            {bySource.map((source) => (
              <div key={source.source} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">{source.source}</div>
                  <div className="text-sm text-gray-500">{source.count.toLocaleString()} visitors</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{source.conversionRate}%</div>
                  <div className="text-sm text-gray-500">conv. rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device Breakdown */}
      {breakdown === 'device' && byDevice && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Performance by Device</h2>
          <div className="space-y-3">
            {byDevice.map((device) => (
              <div key={device.device} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium capitalize">{device.device}</div>
                  <div className="text-sm text-gray-500">{device.pageViews.toLocaleString()} page views</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{device.conversionRate}%</div>
                  <div className="text-sm text-gray-500">{device.conversions} conversions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
