'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

interface PaymentData {
  totalRevenue: number;
  totalPayments: number;
  averageOrderValue: number;
  refunds: number;
  refundRate: number;
  byTier: Array<{
    tier: string;
    count: number;
    revenue: number;
    percentage: number;
  }>;
  bySource: Array<{
    source: string;
    count: number;
    revenue: number;
  }>;
}

/**
 * PaymentsAnalytics - Shows payment and revenue metrics
 * Tracks total revenue, average order value, refunds
 * Breaks down payments by tier and traffic source
 */
export function PaymentsAnalytics() {
  const [data, setData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchPaymentsData();
  }, [dateRange]);

  async function fetchPaymentsData() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      startDate: dateRange === '7d' ? getDaysAgo(7) : dateRange === '30d' ? getDaysAgo(30) : getDaysAgo(90),
      endDate: dateRange === '7d' ? getDaysAgo(0) : dateRange === '30d' ? getDaysAgo(0) : getDaysAgo(0),
    });

    try {
      const response = await fetch(`/api/admin/payments?${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payments data');
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments data');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Revenue and payment metrics</p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading payments data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No payments data available</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Revenue"
              value={`$${data.totalRevenue.toLocaleString()}`}
              subtitle="All payments"
              change="neutral"
            />

            <MetricCard
              title="Total Payments"
              value={data.totalPayments.toLocaleString()}
              subtitle="Completed transactions"
              change="neutral"
            />

            <MetricCard
              title="Avg Order Value"
              value={`$${data.averageOrderValue.toFixed(0)}`}
              subtitle="Revenue per payment"
              change="neutral"
            />

            <MetricCard
              title="Refund Rate"
              value={`${data.refundRate.toFixed(1)}%`}
              subtitle={`${data.refunds} refunds`}
              change={data.refundRate > 5 ? 'red' : 'neutral'}
            />
          </div>

          {/* Revenue by Tier */}
          {data.byTier && data.byTier.length > 0 && (
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Revenue by Tier</h2>
              <div className="space-y-3">
                {data.byTier.map((tier, index) => (
                  <div key={index} className="py-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{tier.tier}</div>
                        <div className="text-xs text-gray-500">
                          {tier.count} purchases ({tier.percentage}%)
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${tier.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2 mt-2">
                      <div
                        className="bg-green-600 h-full"
                        style={{ width: `${tier.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Traffic Sources */}
          {data.bySource && data.bySource.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Revenue by Traffic Source</h2>
              <div className="space-y-2">
                {data.bySource.slice(0, 10).map((source, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{source.source || '(none)'}</div>
                      <div className="text-xs text-gray-500">
                        {source.count} payments
                      </div>
                    </div>
                    <div className="ml-4 text-right text-green-600">
                      <div className="text-lg font-bold">
                        ${source.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
