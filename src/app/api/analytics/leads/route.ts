import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { sql, and, desc, or, eq, inArray } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * Funnel stage priority ranking (higher = further in funnel)
 */
const STAGE_PRIORITY: Record<string, number> = {
  'payment_complete': 100,
  'concierge_deposit_paid': 90,
  'checkout_initiated': 80,
  'pricing_plan_selected': 70,
  'pricing_view': 60,
  'email_submit': 50,
  'waitlist_join': 55,
  'application_complete': 45,
  'application_start': 40,
  'vsl_start': 20,
  'page_view': 10,
};

const STAGE_LABELS: Record<string, string> = {
  'payment_complete': 'Paid',
  'concierge_deposit_paid': 'Deposit Paid',
  'checkout_initiated': 'Checkout',
  'pricing_plan_selected': 'Plan Selected',
  'pricing_view': 'Pricing Viewed',
  'email_submit': 'Email Submitted',
  'waitlist_join': 'Joined Waitlist',
  'application_complete': 'Application Complete',
  'application_start': 'Application Started',
  'vsl_start': 'VSL Started',
  'page_view': 'Visited',
};

/**
 * Get the funnel stage for a set of userIds by finding their highest-priority event.
 */
async function getFunnelStages(userIds: string[]): Promise<Map<string, { stage: string; label: string }>> {
  if (userIds.length === 0) return new Map();

  const userEvents = await db
    .select({
      userId: events.userId,
      eventType: events.eventType,
    })
    .from(events)
    .where(
      and(
        inArray(events.userId, userIds),
        or(
          ...Object.keys(STAGE_PRIORITY).map(k => eq(events.eventType, k as any))
        )
      )
    );

  // Map each userId to their highest priority event
  const stageMap = new Map<string, { stage: string; label: string }>();
  for (const e of userEvents) {
    if (!e.userId) continue;
    const existing = stageMap.get(e.userId);
    const priority = STAGE_PRIORITY[e.eventType] || 0;
    if (!existing || priority > (STAGE_PRIORITY[existing.stage] || 0)) {
      stageMap.set(e.userId, { stage: e.eventType, label: STAGE_LABELS[e.eventType] || e.eventType });
    }
  }

  return stageMap;
}

/**
 * GET /api/analytics/leads
 *
 * Get all leads segmented by temperature (hot/warm/cold).
 * Each lead includes their current funnel stage.
 */
export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const hotLeads = await db
      .select()
      .from(users)
      .where(and(sql`${users.leadScore} >= 70`, sql`${users.email} IS NOT NULL`))
      .orderBy(desc(users.leadScore))
      .limit(100);

    const warmLeads = await db
      .select()
      .from(users)
      .where(and(sql`${users.leadScore} >= 40`, sql`${users.leadScore} < 70`, sql`${users.email} IS NOT NULL`))
      .orderBy(desc(users.leadScore))
      .limit(100);

    const coldLeads = await db
      .select()
      .from(users)
      .where(and(sql`${users.leadScore} < 40`, sql`${users.email} IS NOT NULL`))
      .orderBy(desc(users.leadScore))
      .limit(100);

    // Enrich all leads with funnel stage in one batch query
    const allUserIds = [...hotLeads, ...warmLeads, ...coldLeads].map(u => u.id);
    const stageMap = await getFunnelStages(allUserIds);

    const enrich = (lead: typeof hotLeads[0]) => ({
      ...lead,
      funnelStage: stageMap.get(lead.id)?.stage || null,
      funnelLabel: stageMap.get(lead.id)?.label || 'New',
      vslWatched: stageMap.get(lead.id)?.stage === 'vsl_start' || false,
      pricingViewed: stageMap.get(lead.id)?.stage === 'pricing_view' || 
                     (STAGE_PRIORITY[stageMap.get(lead.id)?.stage || ''] || 0) >= 60,
      applicationStarted: (STAGE_PRIORITY[stageMap.get(lead.id)?.stage || ''] || 0) >= 40,
    });

    return NextResponse.json({
      success: true,
      hot: hotLeads.map(enrich),
      warm: warmLeads.map(enrich),
      cold: coldLeads.map(enrich),
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
