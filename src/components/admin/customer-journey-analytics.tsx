'use client';

import { useEffect, useState } from 'react';

interface JourneyEvent {
  type: string;
  timestamp: string;
  data?: any;
}

interface UserJourney {
  userId?: string;
  email?: string;
  events: JourneyEvent[];
  outcome: 'converted' | 'abandoned' | 'active';
  tierInterest?: string;
}

interface AggregateJourney {
  source: string;
  totalUsers: number;
  avgEvents: number;
  conversionRate: number;
  commonPath: string[];
}

export default function CustomerJourneyAnalytics() {
  const [journeys, setJourneys] = useState<UserJourney[]>([]);
  const [aggregate, setAggregate] = useState<AggregateJourney[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'individual' | 'aggregate'>('aggregate');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, [view, outcomeFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        aggregate: view === 'aggregate' ? 'true' : 'false',
        ...(outcomeFilter !== 'all' && { outcome: outcomeFilter }),
        limit: '20',
      });

      const response = await fetch(`/api/admin/analytics/journey?${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });
      if (!response.ok) throw new Error('Failed to fetch journey data');
      const data = await response.json();

      if (view === 'aggregate') {
        setAggregate(data);
      } else {
        setJourneys(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading customer journey analytics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setView('aggregate')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            view === 'aggregate'
              ? 'bg-[#940909] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          By Traffic Source
        </button>
        <button
          onClick={() => setView('individual')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            view === 'individual'
              ? 'bg-[#940909] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Individual Journeys
        </button>

        {view === 'individual' && (
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
          >
            <option value="all">All Outcomes</option>
            <option value="converted">Converted</option>
            <option value="abandoned">Abandoned</option>
            <option value="active">Still Active</option>
          </select>
        )}
      </div>

      {/* Aggregate View */}
      {view === 'aggregate' && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Traffic Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Avg Events
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Common Path
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {aggregate.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {item.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.totalUsers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.avgEvents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                    {item.conversionRate}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.commonPath.join(' → ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Individual View */}
      {view === 'individual' && (
        <div className="space-y-4">
          {journeys.map((journey, index) => (
            <div key={index} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-white font-medium">{journey.email || 'Anonymous'}</p>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      journey.outcome === 'converted'
                        ? 'bg-green-900 text-green-300'
                        : journey.outcome === 'abandoned'
                        ? 'bg-red-900 text-red-300'
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {journey.outcome}
                    </span>
                    {journey.tierInterest && (
                      <span className="text-xs px-2 py-1 rounded bg-blue-900 text-blue-300">
                        {journey.tierInterest}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {journey.events.length} events
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {journey.events.map((event, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    title={new Date(event.timestamp).toLocaleString()}
                  >
                    {event.type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
