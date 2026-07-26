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

type Tab = 'dashboard' | 'revtrack' | 'revenue' | 'clv' | 'applications' | 'formSubmissions' | 'leads' | 'traffic' | 'funnel' | 'vsl' | 'scroll' | 'journey' | 'abandoned' | 'payments' | 'workWithMe' | 'emailLeads' | 'waitlist';

const WHATSAPP_BASE = 'https://web.whatsapp.com';
const formatMoney = (cents: number) => `£${(cents / 100).toLocaleString()}`;
const timeAgo = (dateStr: string | null) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({ monthRevenue: 0, todayRevenue: 0, newCustomers: 0, readyToJoin: 0, newClients: 0, hotLeadsCount: 0 });
  const [hotLeads, setHotLeads] = useState<any[]>([]);

  useEffect(() => { fetchStats(); }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) return;
      const d = await res.json();
      setStats({
        monthRevenue: d.revenue?.month || 0,
        todayRevenue: d.revenue?.today || 0,
        newCustomers: d.counts?.newCustomers || 0,
        readyToJoin: d.counts?.readyToJoin || 0,
        newClients: d.counts?.newClients || 0,
        hotLeadsCount: d.counts?.hotLeads || 0,
      });
      setHotLeads(d.hotLeads || []);
    } catch (_) {}
  }

  const navItems: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: 'Overview' },
    { key: 'payments', label: 'Payments' },
    { key: 'leads', label: 'Leads' },
    { key: 'funnel', label: 'Funnel' },
    { key: 'revtrack', label: 'Revtrack' },
    { key: 'traffic', label: 'Traffic' },
    { key: 'vsl', label: 'VSL' },
    { key: 'waitlist', label: 'Waitlist' },
    { key: 'applications', label: 'Applications' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'clv', label: 'LTV' },
    { key: 'scroll', label: 'Scroll' },
    { key: 'journey', label: 'Journey' },
    { key: 'abandoned', label: 'Abandoned' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#050A0F' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>Limitless</span>
          <span className="text-gray-600 text-sm font-medium ml-2">/ admin</span>
        </div>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === item.key
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {activeTab === 'dashboard' ? (
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Revenue hero */}
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-3">Revenue this month</p>
              <div className="flex items-end gap-5">
                <span className="text-6xl font-bold text-white tracking-tight">{formatMoney(stats.monthRevenue)}</span>
                {stats.todayRevenue > 0 && (
                  <span className="text-green-500 text-lg font-medium mb-2">+{formatMoney(stats.todayRevenue)} today</span>
                )}
              </div>
            </div>

            {/* Pipeline cards */}
            <div className="grid grid-cols-4 gap-5">
              <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">New customers</p>
                <span className="text-4xl font-bold text-white">{stats.newCustomers}</span>
                <p className="text-gray-600 text-xs mt-2">Entered funnel, not paid yet</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">Ready to join</p>
                <span className="text-4xl font-bold text-white">{stats.readyToJoin}</span>
                <p className="text-gray-600 text-xs mt-2">Paid deposit</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">New clients</p>
                <span className="text-4xl font-bold text-white">{stats.newClients}</span>
                <p className="text-gray-600 text-xs mt-2">Full coaching purchase</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">Hot leads</p>
                <span className="text-4xl font-bold text-white">{stats.hotLeadsCount}</span>
                <p className="text-gray-600 text-xs mt-2">High score, not paid</p>
              </div>
            </div>

            {/* Hot leads section */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest">Hot leads — ready to close</h2>
                {stats.hotLeadsCount > 0 && (
                  <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#940909', color: 'white' }}>
                    {stats.hotLeadsCount} leads
                  </span>
                )}
              </div>

              {hotLeads.length === 0 ? (
                <div className="p-10 rounded-xl border border-gray-800 text-center" style={{ backgroundColor: '#0A0D14' }}>
                  <p className="text-gray-500">No hot leads yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {hotLeads.map((lead: any) => {
                    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || lead.email;
                    const initial = (lead.firstName || lead.email || '?').charAt(0).toUpperCase();
                    return (
                      <div key={lead.id} className="flex items-center justify-between p-5 rounded-xl border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 text-white" style={{ backgroundColor: '#940909' }}>
                            {initial}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-white text-base font-medium">{name}</span>
                              <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: '#940909' }}>{lead.leadScore}</span>
                              <span className="text-gray-600 text-sm">{lead.email}</span>
                            </div>
                            {lead.latestEvent && (
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                                <span>Latest: {lead.latestEvent === 'pricing_plan_selected' ? 'Selected a plan' : lead.latestEvent === 'checkout_initiated' || lead.latestEvent === 'stripe_checkout_initiated' ? 'Reached checkout' : lead.latestEvent === 'pricing_view' ? 'Viewed pricing' : lead.latestEvent}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <a href={WHATSAPP_BASE} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                          Message →
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
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
              <div className="p-10 rounded-xl border border-gray-800 text-center" style={{ backgroundColor: '#0A0D14' }}>
                <p className="text-white text-lg font-bold mb-2">Email Course Leads</p>
                <p className="text-gray-500 text-sm mb-5">View email engagement data from the 30-day course</p>
                <Link href="/admin/leads/email" className="inline-block bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium">Open Email Course Leads</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
