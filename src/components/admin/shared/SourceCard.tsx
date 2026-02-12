export function SourceCard({
  source,
  revenue,
  count,
  percentage,
}: {
  source: string;
  revenue: number;
  count: number;
  percentage: number;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded border border-gray-200">
      <h4 className="font-semibold text-lg mb-2">{source || '(none)'}</h4>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-green-600">
          ${revenue.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">{count} payments</p>
        <p className="text-sm text-gray-500">{percentage.toFixed(1)}% of total</p>
      </div>
    </div>
  );
}
