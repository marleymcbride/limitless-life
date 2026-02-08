'use client';

import { useState, useEffect } from 'react';

interface TrafficSource {
  source: string;
  campaign: string;
  visitors: number;
  hotLeads: number;
  payments: number;
  roi: number;
}

export default function TrafficSourcesTable() {
  const [sources, setSources] = useState<TrafficSource[]>([]);

  useEffect(() => {
    fetchSources();
  }, []);

  async function fetchSources() {
    try {
      const res = await fetch('/api/admin/traffic-sources');
      const data = await res.json();
      setSources(data);
    } catch (error) {
      console.error('Failed to fetch traffic sources:', error);
    }
  }

  return (
    <div className="bg-gray-900 rounded overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Source</th>
            <th className="px-4 py-2 text-left">Campaign</th>
            <th className="px-4 py-2 text-left">Visitors</th>
            <th className="px-4 py-2 text-left">Hot Leads</th>
            <th className="px-4 py-2 text-left">Payments</th>
            <th className="px-4 py-2 text-left">ROI</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source, index) => (
            <tr key={index} className="border-t border-gray-800">
              <td className="px-4 py-2">{source.source}</td>
              <td className="px-4 py-2">{source.campaign}</td>
              <td className="px-4 py-2">{source.visitors}</td>
              <td className="px-4 py-2">{source.hotLeads}</td>
              <td className="px-4 py-2">{source.payments}</td>
              <td className="px-4 py-2">{source.roi}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
