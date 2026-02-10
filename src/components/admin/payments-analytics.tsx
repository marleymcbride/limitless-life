'use client';

import { useState, useEffect } from 'react';

interface Payment {
  id: string;
  userId: string;
  stripePaymentIntentId: string | null;
  amount: number | null;
  currency: string | null;
  status: string;
  paymentDate: string;
  userEmail: string;
  userFirstName: string | null;
  userLastName: string | null;
  userLeadScore: number | null;
  tier: string | null;
}

interface RevenueByTier {
  [tier: string]: { count: number; revenue: number };
}

interface Summary {
  totalRevenue: number;
  totalPayments: number;
  uniqueCustomers: number;
  revenueByTier: RevenueByTier;
  currency: string;
}

interface PaymentsResponse {
  success: boolean;
  payments: Payment[];
  summary: Summary;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export default function PaymentsAnalytics() {
  const [data, setData] = useState<PaymentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const limit = 50;

  useEffect(() => {
    fetchPayments();
  }, [page]);

  async function fetchPayments() {
    try {
      setLoading(true);
      const offset = page * limit;
      const res = await fetch(`/api/admin/analytics/payments?limit=${limit}&offset=${offset}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch payments');
      }

      setData(json);
      setError(null);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !data) {
    return (
      <div className="bg-gray-900 p-6 rounded border border-gray-800">
        <p className="text-gray-400">Loading payments data...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-red-900/20 p-6 rounded border border-red-800">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { summary, payments, pagination } = data;
  const averageOrderValue = summary.totalPayments > 0
    ? Math.round(summary.totalRevenue / summary.totalPayments)
    : 0;

  const tierColors: Record<string, string> = {
    'Access': 'bg-gray-700',
    'Plus': 'bg-blue-700',
    'Premium': 'bg-purple-700',
    'Elite': 'bg-[#940909]',
    'Unknown': 'bg-gray-600',
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wide">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-400">
            ${(summary.totalRevenue / 100).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">{summary.currency}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wide">Total Customers</h3>
          <p className="text-3xl font-bold text-[#940909]">
            {summary.uniqueCustomers}
          </p>
          <p className="text-xs text-gray-500 mt-2">Unique customers</p>
        </div>

        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wide">Avg Order Value</h3>
          <p className="text-3xl font-bold text-blue-400">
            ${(averageOrderValue / 100).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">Per customer</p>
        </div>

        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wide">Top Revenue Tier</h3>
          <p className="text-3xl font-bold text-purple-400">
            {Object.keys(summary.revenueByTier).length > 0
              ? Object.entries(summary.revenueByTier).sort((a, b) => b[1].revenue - a[1].revenue)[0][0]
              : 'N/A'}
          </p>
          <p className="text-xs text-gray-500 mt-2">Most revenue generated</p>
        </div>
      </div>

      {/* Revenue by Tier Breakdown */}
      <div className="bg-gray-900 p-6 rounded border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Revenue by Tier</h2>
        <div className="space-y-3">
          {Object.entries(summary.revenueByTier)
            .sort((a, b) => b[1].revenue - a[1].revenue)
            .map(([tier, data]) => {
              const maxRevenue = Math.max(...Object.values(summary.revenueByTier).map(d => d.revenue));
              const percentage = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
              const tierName = tier === 'Unknown' ? 'Unknown Tier' : `${tier} Tier`;

              return (
                <div key={tier}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{tierName}</span>
                    <span className="text-sm text-gray-400">
                      {data.count} customers • ${(data.revenue / 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`${tierColors[tier] || 'bg-gray-600'} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gray-900 p-6 rounded border border-gray-800">
        <h2 className="text-xl font-bold mb-4">All Payments</h2>

        {payments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No payments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Tier</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const customerName = payment.userFirstName && payment.userLastName
                    ? `${payment.userFirstName} ${payment.userLastName}`
                    : payment.userEmail;

                  return (
                    <tr key={payment.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{customerName}</div>
                          <div className="text-xs text-gray-500">{payment.userEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {payment.tier ? (
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${tierColors[payment.tier] || 'bg-gray-600'}`}>
                            {payment.tier}
                          </span>
                        ) : (
                          <span className="text-gray-500">Unknown</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {payment.amount !== null ? `$${(payment.amount / 100).toLocaleString()}` : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          payment.status === 'succeeded'
                            ? 'bg-green-900 text-green-300'
                            : payment.status === 'pending'
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.total > limit && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Showing {page * limit + 1}-{Math.min((page + 1) * limit, pagination.total)} of {pagination.total}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasMore}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
