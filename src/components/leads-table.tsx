'use client';

import { useState, useEffect } from 'react';

interface Lead {
  Email: string;
  Name: string;
  Score: number;
  Temperature: 'Hot' | 'Warm' | 'Cold';
  Phone?: string;
  UTMSource?: string;
  CreatedAt: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm'>('all');

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  async function fetchLeads() {
    try {
      const res = await fetch(`/api/admin/leads?filter=${filter}`);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    }
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-[#940909]' : 'bg-gray-800'
          }`}
        >
          All Leads
        </button>
        <button
          onClick={() => setFilter('hot')}
          className={`px-4 py-2 rounded ${
            filter === 'hot' ? 'bg-[#940909]' : 'bg-gray-800'
          }`}
        >
          Hot Only
        </button>
        <button
          onClick={() => setFilter('warm')}
          className={`px-4 py-2 rounded ${
            filter === 'warm' ? 'bg-[#940909]' : 'bg-gray-800'
          }`}
        >
          Warm Only
        </button>
      </div>

      <div className="bg-gray-900 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Temperature</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.Email} className="border-t border-gray-800">
                <td className="px-4 py-2">{lead.Email}</td>
                <td className="px-4 py-2">{lead.Name}</td>
                <td className="px-4 py-2">{lead.Score}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      lead.Temperature === 'Hot'
                        ? 'bg-red-600'
                        : lead.Temperature === 'Warm'
                        ? 'bg-yellow-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    {lead.Temperature}
                  </span>
                </td>
                <td className="px-4 py-2">{lead.UTMSource || '-'}</td>
                <td className="px-4 py-2">
                  {new Date(lead.CreatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
