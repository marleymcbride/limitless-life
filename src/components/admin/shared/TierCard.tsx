'use client';

/**
 * TierCard - Displays customer lifetime value breakdown by purchased tier
 * Reusable across admin dashboards
 */

interface TierCardProps {
  tier: string;
  clv: number; // Customer Lifetime Value for this tier
  customerCount: number; // Number of customers in this tier
}

export function TierCard({ tier, clv, customerCount }: TierCardProps) {
  // Color coding by tier (from RevenueIntelligence.tsx)
  const tierColors: Record<string, string> = {
    'Access': 'bg-blue-100',
    'Plus': 'bg-blue-200',
    'Premium': 'bg-purple-600',
    'Elite': 'bg-purple-900',
  };

  const cardColor = tierColors[tier] || 'bg-gray-200';

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: cardColor }}
            >
              <span className="text-2xl font-bold text-white">{tier.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div>
                <div className="text-5xl font-bold text-gray-900">{clv.toLocaleString()}</div>
                <div className="text-sm text-gray-500">CLV</div>
              </div>
              <div className="flex-2 gap-4">
                <div className="text-sm text-gray-500">{customerCount.toLocaleString()} customers</div>
                <div className="text-xs text-gray-400">Avg: ${Math.round(clv / (customerCount || 1)).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-gray-900">{tier}</div>
        <div className="text-sm text-gray-500">Tier</div>
        <div className="flex-2">
          <div className="text-lg font-semibold text-green-600">{clv.toLocaleString()}</div>
          <div className="text-sm text-gray-500">value per customer</div>
        </div>
      </div>
    </div>
  );
}
