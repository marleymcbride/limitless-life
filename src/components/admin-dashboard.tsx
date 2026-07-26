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

const stageLabel = (event: string | null) => {
  if (!event) return '';
  if (event === 'pricing_plan_selected') return 'Selected a plan';
  if (event === 'checkout_initiated' || event === 'stripe_checkout_initiated') return 'Reached checkout';
  if (event === 'pricing_view') return 'Viewed pricing';
  if (event === 'email_submit') return 'Submitted email';
  if (event === 'vsl_start') return 'Started VSL';
  if (event === 'concierge_deposit_paid') return 'Paid deposit';
  if (event === 'payment_complete') return 'Paid in full';
  return event;
};

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

  const renderLeadRow = (lead: any) => {
    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || lead.email;
    const initial = (lead.firstName || lead.email || '?').charAt(0).toUpperCase();
    return (
      <div key={lead.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-800 last:border-0 hover:bg-gray-800/30" style={{ backgroundColor: '#0A0D14' }}>
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white" style={{ backgroundColor: '#940909' }}>
            {initial}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium truncate">{name}</span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#940909' }}>{lead.leadScore}</span>
            </div>
            <div className="text-xs text-gray-500 truncate">{lead.email}</div>
          </div>
        </div>
        {lead.latestEvent && (
          <div className="text-xs text-gray-400 shrink-0 mr-4">{stageLabel(lead.latestEvent)}</div>
        )}
        {lead.latestEventAt && (
          <div className="text-xs text-gray-600 shrink-0 w-12 text-right">{timeAgo(lead.latestEventAt)}</div>
        )}
        <a href={WHATSAPP_BASE} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 shrink-0 ml-3 font-medium">
          Message →
        </a>
      </div>
    );
  };

  const EmptyState = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center h-40 text-gray-600 text-xs">{text}</div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#050A0F' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-base" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>Limitless</span>
          <span className="text-gray-600 text-xs font-medium ml-2">/ admin</span>
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
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' ? (
          <div className="max-w-6xl mx-auto">

            {/* Revenue hero */}
            <div className="mb-8">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">Revenue this month</p>
              <div className="flex items-end gap-4">
                <span className="text-5xl font-bold text-white tracking-tight">{formatMoney(stats.monthRevenue)}</span>
                {stats.todayRevenue > 0 && (
                  <span className="text-green-500 text-base font-medium mb-1">+{formatMoney(stats.todayRevenue)} today</span>
                )}
              </div>
            </div>

            {/* Pipeline cards — compact row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'New customers', count: stats.newCustomers, desc: 'In funnel' },
                { label: 'Ready to join', count: stats.readyToJoin, desc: 'Deposit paid' },
                { label: 'New clients', count: stats.newClients, desc: 'Full purchase' },
                { label: 'Hot leads', count: stats.hotLeadsCount, desc: 'Score 70+' },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">{item.label}</p>
                  <span className="text-3xl font-bold text-white">{item.count}</span>
                  <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 2x2 grid of people sections */}
            <div className="grid grid-cols-2 gap-5">

              {/* Top-left: Hot leads (scored, not paid) */}
              <div className="rounded-xl border border-gray-800 overflow-hidden" style={{ backgroundColor: '#0A0D14' }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                  <div>
                    <h3 className="text-white text-sm font-semibold">Hot leads</h3>
                    <p className="text-gray-600 text-xs mt-0.5">High intent, not paid — ready to close</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ backgroundColor: '#940909' }}>{stats.hotLeadsCount}</span>
                </div>
                <div className="divide-y divide-gray-800">
                  {hotLeads.length === 0 ? <EmptyState text="No hot leads yet" /> : hotLeads.slice(0, 6).map(renderLeadRow)}
                </div>
              </div>

              {/* Top-right: Ready to join (deposit paid) */}
              <div className="rounded-xl border border-gray-800 overflow-hidden" style={{ backgroundColor: '#0A0D14' }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                  <div>
                    <h3 className="text-white text-sm font-semibold">Ready to join</h3>
                    <p className="text-gray-600 text-xs mt-0.5">Deposit paid — review and onboard</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#1a5c2a', color: 'white' }}>{stats.readyToJoin}</span>
                </div>
                <div className="divide-y divide-gray-800">
                  {stats.readyToJoin === 0 ? <EmptyState text="No deposits yet" /> : (
                    <div className="flex items-center justify-center h-40 text-gray-600 text-xs">Data incoming — requires deposit payments</div>
                  )}
                </div>
              </div>

              {/* Bottom-left: New clients */}
              <div className="rounded-xl border border-gray-800 overflow-hidden" style={{ backgroundColor: '#0A0D14' }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                  <div>
                    <h3 className="text-white text-sm font-semibold">New clients</h3>
                    <p className="text-gray-600 text-xs mt-0.5">Full coaching purchase</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#1a5c2a', color: 'white' }}>{stats.newClients}</span>
                </div>
                <div className="divide-y divide-gray-800">
                  {stats.newClients === 0 ? <EmptyState text="No full purchases yet" /> : (
                    <div className="flex items-center justify-center h-40 text-gray-600 text-xs">Data incoming — requires full payment</div>
                  )}
                </div>
              </div>

              {/* Bottom-right: New customers */}
              <div className="rounded-xl border border-gray-800 overflow-hidden" style={{ backgroundColor: '#0A0D14' }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                  <div>
                    <h3 className="text-white text-sm font-semibold">New customers</h3>
                    <p className="text-gray-600 text-xs mt-0.5">Entered funnel, no payment yet</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ backgroundColor: '#6366f1' }}>{stats.newCustomers}</span>
                </div>
                <div className="divide-y divide-gray-800">
                  {stats.newCustomers === 0 ? <EmptyState text="No new customers yet" /> : (
                    <div className="flex items-center justify-center h-40 text-gray-600 text-xs">Data incoming — requires user records with events</div>
                  )}
                </div>
              </div>

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
