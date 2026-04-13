'use client';

import React, { useState, useEffect } from 'react';

interface WaitlistSignup {
  id: string;
  email: string;
  firstName: string | null;
  choice: 'yes' | 'maybe' | 'no';
  choiceDescription: string;
  interestLevel: 'cohort-hot' | 'cohort-warm' | 'cohort-future';
  leadScore: number;
  leadTemperature: 'cold' | 'warm' | 'hot';
  status: 'waitlist' | 'applied' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: string;
  notes?: string;
}

type FilterTab = 'all' | 'hot' | 'warm' | 'cold';

export default function WaitlistDashboard() {
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [filteredSignups, setFilteredSignups] = useState<WaitlistSignup[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<{ id: string; note: string } | null>(null);

  useEffect(() => {
    fetchSignups();
  }, []);

  useEffect(() => {
    filterSignups();
  }, [signups, activeTab]);

  async function fetchSignups() {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/waitlist');

      if (!res.ok) {
        throw new Error('Failed to fetch waitlist signups');
      }

      const data = await res.json();
      setSignups(data.signups || []);
    } catch (err) {
      console.error('Error fetching waitlist signups:', err);
      setError('Failed to load waitlist signups');
    } finally {
      setLoading(false);
    }
  }

  function filterSignups() {
    if (activeTab === 'all') {
      setFilteredSignups(signups);
    } else if (activeTab === 'hot') {
      setFilteredSignups(signups.filter(s => s.choice === 'yes'));
    } else if (activeTab === 'warm') {
      setFilteredSignups(signups.filter(s => s.choice === 'maybe'));
    } else if (activeTab === 'cold') {
      setFilteredSignups(signups.filter(s => s.choice === 'no'));
    }
  }

  async function updateStatus(id: string, status: WaitlistSignup['status']) {
    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      // Update local state
      setSignups(signups.map(s =>
        s.id === id ? { ...s, status } : s
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  }

  async function updateNote(id: string, notes: string) {
    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) throw new Error('Failed to update note');

      // Update local state
      setSignups(signups.map(s =>
        s.id === id ? { ...s, notes } : s
      ));
      setEditingNote(null);
    } catch (err) {
      console.error('Error updating note:', err);
      alert('Failed to update note');
    }
  }

  async function deleteSignup(id: string, email: string) {
    if (!confirm(`Delete waitlist signup for ${email}?`)) return;

    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error', message: `Status ${res.status}` }));
        throw new Error(errorData.error || errorData.message || `Failed to delete (Status ${res.status})`);
      }

      // Update local state
      setSignups(signups.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting signup:', err);
      alert(`Failed to delete signup: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  function getInterestBadge(interestLevel: string) {
    const badges = {
      'cohort-hot': 'bg-green-100 text-green-800 border-green-300',
      'cohort-warm': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'cohort-future': 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return badges[interestLevel as keyof typeof badges] || badges['cohort-future'];
  }

  function getStatusBadge(status: string) {
    const badges = {
      'waitlist': 'bg-blue-100 text-blue-800 border-blue-300',
      'applied': 'bg-purple-100 text-purple-800 border-purple-300',
      'accepted': 'bg-green-100 text-green-800 border-green-300',
      'rejected': 'bg-red-100 text-red-800 border-red-300',
      'withdrawn': 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return badges[status as keyof typeof badges] || badges['waitlist'];
  }

  function getLeadScoreColor(score: number) {
    if (score >= 70) return 'text-green-600 font-bold';
    if (score >= 50) return 'text-yellow-600 font-semibold';
    return 'text-gray-600';
  }

  const tabCounts = {
    all: signups.length,
    hot: signups.filter(s => s.choice === 'yes').length,
    warm: signups.filter(s => s.choice === 'maybe').length,
    cold: signups.filter(s => s.choice === 'no').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading waitlist signups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Waitlist Management</h2>
        <button
          onClick={fetchSignups}
          className="px-4 py-2 bg-[#940909] text-white rounded-lg hover:bg-red-800 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2">Total Signups</h3>
          <p className="text-3xl font-bold">{tabCounts.all}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2">Ready for Cohort</h3>
          <p className="text-3xl font-bold text-green-500">{tabCounts.hot}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2">Interested (Warm)</h3>
          <p className="text-3xl font-bold text-yellow-500">{tabCounts.warm}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <h3 className="text-gray-400 mb-2">Not Ready</h3>
          <p className="text-3xl font-bold text-gray-400">{tabCounts.cold}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-[#940909] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All ({tabCounts.all})
        </button>
        <button
          onClick={() => setActiveTab('hot')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'hot'
              ? 'bg-[#940909] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Ready for Cohort ({tabCounts.hot})
        </button>
        <button
          onClick={() => setActiveTab('warm')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'warm'
              ? 'bg-[#940909] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Interested ({tabCounts.warm})
        </button>
        <button
          onClick={() => setActiveTab('cold')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'cold'
              ? 'bg-[#940909] text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Not Ready ({tabCounts.cold})
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Interest
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Choice
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Lead Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredSignups.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No waitlist signups found
                  </td>
                </tr>
              ) : (
                filteredSignups.map((signup) => (
                  <React.Fragment key={signup.id}>
                    <tr
                      className="hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => setExpandedRow(expandedRow === signup.id ? null : signup.id)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {signup.firstName || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{signup.email}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getInterestBadge(signup.interestLevel)}`}>
                          {signup.interestLevel.replace('cohort-', '').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-300">{signup.choiceDescription}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`text-sm ${getLeadScoreColor(signup.leadScore)}`}>
                          {signup.leadScore}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusBadge(signup.status)}`}>
                          {signup.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                        {new Date(signup.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <select
                            value={signup.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStatus(signup.id, e.target.value as WaitlistSignup['status']);
                            }}
                            className="text-xs bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="waitlist">Waitlist</option>
                            <option value="applied">Applied</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="withdrawn">Withdrawn</option>
                          </select>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSignup(signup.id, signup.email);
                            }}
                            className="text-xs bg-red-900 hover:bg-red-800 text-red-200 px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === signup.id && (
                      <tr>
                        <td colSpan={8} className="px-4 py-4 bg-gray-800/50">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Notes</h4>
                              {editingNote?.id === signup.id ? (
                                <div className="flex gap-2">
                                  <textarea
                                    value={editingNote.note}
                                    onChange={(e) => setEditingNote({ ...editingNote, note: e.target.value })}
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                                    rows={3}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateNote(signup.id, editingNote.note);
                                    }}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingNote(null);
                                    }}
                                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <p className="text-sm text-gray-400 flex-1">
                                    {signup.notes || 'No notes'}
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingNote({ id: signup.id, note: signup.notes || '' });
                                    }}
                                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded"
                                  >
                                    Edit Note
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Lead Temperature:</span>{' '}
                                <span className="text-white capitalize">{signup.leadTemperature}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">ID:</span>{' '}
                                <span className="text-white text-xs">{signup.id}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
