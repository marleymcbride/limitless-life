// Funnel analytics and utilities

export interface FunnelStage {
  name: string;
  description: string;
  order: number;
}

export interface FunnelMetrics {
  stage: string;
  count: number;
  dropoffRate?: number;
}

export const FUNNEL_STAGES: FunnelStage[] = [
  { name: 'page_view', description: 'Visited landing page', order: 1 },
  { name: 'vsl_start', description: 'Started VSL', order: 2 },
  { name: 'email_submit', description: 'Submitted email', order: 3 },
  { name: 'application_start', description: 'Started application', order: 4 },
  { name: 'application_complete', description: 'Completed application', order: 5 },
  { name: 'pricing_view', description: 'Viewed pricing', order: 6 },
  { name: 'payment_complete', description: 'Completed payment', order: 7 },
];

export function getNextStage(currentStage: string): string | null {
  const currentIndex = FUNNEL_STAGES.findIndex(s => s.name === currentStage);
  if (currentIndex === -1 || currentIndex === FUNNEL_STAGES.length - 1) {
    return null;
  }
  return FUNNEL_STAGES[currentIndex + 1].name;
}

export function calculateDropoffRate(currentCount: number, previousCount: number): number {
  if (previousCount === 0) return 0;
  return ((previousCount - currentCount) / previousCount) * 100;
}

// TODO: Implement database queries to get actual funnel metrics
export async function getFunnelMetrics(startDate?: Date, endDate?: Date, timeframe?: string): Promise<FunnelMetrics[]> {
  // Placeholder - would query database in production
  return FUNNEL_STAGES.map(stage => ({
    stage: stage.name,
    count: 0,
  }));
}

export interface DropOffPoint {
  stage: string;
  dropOffCount: number;
  dropOffRate: number;
}

export async function getDropOffPoints(startDate: Date, endDate: Date): Promise<DropOffPoint[]> {
  // Placeholder - would query database in production
  return FUNNEL_STAGES.slice(0, -1).map(stage => ({
    stage: stage.name,
    dropOffCount: 0,
    dropOffRate: 0,
  }));
}

export async function getFunnelBySource(startDate: Date, endDate: Date): Promise<Record<string, FunnelMetrics[]>> {
  // Placeholder - would query database in production
  return {
    direct: [],
    organic: [],
    referral: [],
    social: [],
  };
}

export async function getFunnelByDevice(startDate: Date, endDate: Date): Promise<Record<string, FunnelMetrics[]>> {
  // Placeholder - would query database in production
  return {
    desktop: [],
    mobile: [],
    tablet: [],
  };
}
