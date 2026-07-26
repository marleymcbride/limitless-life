'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LeadsTable from './admin/LeadsTable';
import TrafficSourcesTable from './admin/TrafficSourcesTable';
import FunnelAnalytics from './admin/funnel-analytics';
import VSLDropoffAnalytics from './admin/vsl-dropoff-analytics';
import ScrollDropoffAnalytics from './admin/scroll-dropoff-analytics';
import CustomerJourneyAnalytics from './admin/customer-journey-analytics';
import AbandonedFunnelAnalytics from './admin/abandoned-funnel-analytics';
import PaymentsAnalytics from './admin/payments-analytics';
import { RevenueIntelligence } from './admin/RevenueIntelligence';
import { CustomerLifetimeValue } from './admin/CustomerLifetimeValue';
import { RevtrackDashboard } from './admin/RevtrackDashboard';
import ApplicationsTable from './admin/ApplicationsTable';
import FormSubmissionsTable from './admin/FormSubmissionsTable';
import { WorkWithMeLeads } from './admin/WorkWithMeLeads';
import WaitlistDashboard from './admin/waitlist/WaitlistDashboard';

type Tab =
  | 'dashboard'
  | 'revtrack'
  | 'revenue'
  | 'clv'
  | 'applications'
  | 'formSubmissions'
  | 'leads'
  | 'traffic'
  | 'funnel'
  | 'vsl'
  | 'scroll'
  | 'journey'
  | 'abandoned'
  | 'payments'
  | 'workWithMe'
  | 'emailLeads'
  | 'waitlist';

interface HotLead {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  leadScore: number;
  leadTemperature: string;
  tierInterest: string | null;
  lastSeen: string | null;
  latestEvent: string | null;
  latestEventAt: string | null;
}

interface DashboardStats {
  revenue: { month: number; today: number };
  visitors: { total: number; today: number; last7Days: number };
  leads: { total: number; hot: number; warm: number };
  events: { last7Days: number; today: number };
  hotLeads: HotLead[];
}

const STAGE_LABELS: Record<string, string> = {
  concierge_deposit_paid: 'Paid deposit',
  checkout_initiated: 'Started checkout',
  pricing_plan_selected: 'Selected a plan',
  pricing_view: 'Viewed pricing',
  email_submit: 'Submitted email',
  vsl_complete: 'Watched entire VSL',
  payment_complete: 'Paid in full',
};

const WHATSAPP_BASE = 'https://wa.me/13024800805?text=';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Failed to load' }));
        throw new Error(err.error || `Error ${res.status}`);
      }
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setStatsError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setStatsLoading(false);
    }
  }

  const tabGroups = [
    {
      label: 'Revenue',
      tabs: [
        { key: 'revtrack' as Tab, label: 'Revtrack' },
        { key: 'revenue' as Tab, label: 'Revenue Intelligence' },
        { key: 'clv' as Tab, label: 'Customer LTV' },
        { key: 'payments' as Tab, label: 'Payments & Customers' },
      ]
    },
    {
      label: 'Prospects',
      tabs: [
        { key: 'leads' as Tab, label: 'Leads' },
        { key: 'applications' as Tab, label: 'Applications' },
        { key: 'waitlist' as Tab, label: 'Waitlist' },
        { key: 'funnel' as Tab, label: 'Funnel' },
        { key: 'vsl' as Tab, label: 'VSL' },
        { key: 'traffic' as Tab, label: 'Traffic Sources' },
      ]
    },
    {
      label: 'Other',
      tabs: [
        { key: 'formSubmissions' as Tab, label: 'Form Submissions' },
        { key: 'workWithMe' as Tab, label: '3weeks' },
        { key: 'emailLeads' as Tab, label: 'Email Course' },
        { key: 'scroll' as Tab, label: 'Scroll' },
        { key: 'journey' as Tab, label: 'Journey' },
        { key: 'abandoned' as Tab, label: 'Abandoned' },
      ]
    }
  ];

  const formatMoney = (cents: number) => {
    const pounds = cents / 100;
    return `£${pounds.toLocaleString()}`;
  };

  const timeAgo = (dateStr: string | null) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050A0F' }}>
      <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>Dashboard</h1>
          <button
            onClick={fetchStats}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        {!stats ? (
          <div className="text-gray-500 text-sm">Loading...</div>
        ) : (
          <>
            {/* Top row — big numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="rounded-lg p-5" style={{ backgroundColor: '#0A0D14' }}>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Revenue this month</div>
                <div className="text-white text-2xl font-bold">{formatMoney(stats.revenue.month)}</div>
                {stats.revenue.today > 0 && (
                  <div className="text-gray-500 text-xs mt-1">+{formatMoney(stats.revenue.today)} today</div>
                )}
              </div>
              <div className="rounded-lg p-5" style={{ backgroundColor: '#0A0D14' }}>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Hot leads</div>
                <div className="text-white text-2xl font-bold">{stats.leads.hot}</div>
                <div className="text-gray-500 text-xs mt-1">{stats.leads.warm} warm</div>
              </div>
              <div className="rounded-lg p-5" style={{ backgroundColor: '#0A0D14' }}>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Visitors (7 days)</div>
                <div className="text-white text-2xl font-bold">{stats.visitors.last7Days}</div>
                <div className="text-gray-500 text-xs mt-1">{stats.visitors.today} today</div>
              </div>
              <div className="rounded-lg p-5" style={{ backgroundColor: '#0A0D14' }}>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Events (7 days)</div>
                <div className="text-white text-2xl font-bold">{stats.events.last7Days}</div>
              </div>
            </div>

            {/* Hot leads section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>
                Hot leads
              </h2>
              {stats.hotLeads.length === 0 ? (
                <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#0A0D14' }}>
                  <p className="text-gray-500 text-sm">No hot leads yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {stats.hotLeads.map((lead) => {
                    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || lead.email;
                    const stage = lead.latestEvent ? STAGE_LABELS[lead.latestEvent] || lead.latestEvent : 'No activity';
                    const waMsg = encodeURIComponent(`Hey ${lead.firstName || 'there'}, saw you were checking out Limitless Concierge. Want to jump on a quick call?`);
                    return (
                      <div
                        key={lead.id}
                        className="rounded-lg px-5 py-4 flex items-center justify-between"
                        style={{ backgroundColor: '#0A0D14' }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="text-white text-sm font-medium truncate">{name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#940909', color: 'white' }}>
                              {lead.leadScore}
                            </span>
                            {lead.tierInterest === 'lhc' && (
                              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Concierge</span>
                            )}
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
                            {stage}
                            {lead.latestEventAt && <span className="ml-2">· {timeAgo(lead.latestEventAt)}</span>}
                          </div>
                        </div>
                        <a
                          href={`${WHATSAPP_BASE}${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 ml-4 text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          Message →
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation tabs */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-wrap gap-2">
                {tabGroups.map((group) => (
                  <div key={group.label} className="mr-6">
                    <div className="text-[10px] text-gray-600 mb-2 uppercase tracking-wider font-medium">
                      {group.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.tabs.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                            activeTab === tab.key
                              ? 'bg-[#940909] text-white'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'dashboard' && null}
              {activeTab === 'revtrack' && <RevtrackDashboard />}
              {activeTab === 'revenue' && <RevenueIntelligence />}
              {activeTab === 'clv' && <CustomerLifetimeValue />}
              {activeTab === 'funnel' && <FunnelAnalytics />}
              {activeTab === 'vsl' && <VSLDropoffAnalytics />}
              {activeTab === 'scroll' && <ScrollDropoffAnalytics />}
              {activeTab === 'journey' && <CustomerJourneyAnalytics />}
              {activeTab === 'abandoned' && <AbandonedFunnelAnalytics />}
              {activeTab === 'payments' && <PaymentsAnalytics />}
              {activeTab === 'applications' && <ApplicationsTable />}
              {activeTab === 'formSubmissions' && <FormSubmissionsTable />}
              {activeTab === 'leads' && <LeadsTable />}
              {activeTab === 'traffic' && <TrafficSourcesTable />}
              {activeTab === 'workWithMe' && <WorkWithMeLeads />}
              {activeTab === 'waitlist' && <WaitlistDashboard />}
              {activeTab === 'emailLeads' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Email Course Leads</h2>
                    <p className="text-gray-600 mb-6">View email engagement data from the 30-day course</p>
                    <Link
                      href="/admin/leads/email"
                      className="inline-block bg-[#940909] text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
                    >
                      Open Email Course Leads
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
