export type EventType =
  | 'page_view'
  | 'vsl_start'
  | 'vsl_milestone'
  | 'vsl_complete'
  | 'email_submit'
  | 'application_start'
  | 'application_step'
  | 'application_complete'
  | 'pricing_view'
  | 'cta_click'
  | 'payment_complete'
  | 'scroll_depth'
  | 'tier_click'
  // NEW: Tier selection events
  | 'tier_view'
  | 'tier_select_protocol'
  | 'tier_select_life'
  | 'tier_select_whatsapp'
  | 'tier_select_concierge'
  | 'payment_plan_select'
  | 'stripe_checkout_initiated';

export interface Event {
  id: string;
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
  createdAt: Date;
}

export interface FunnelMetrics {
  visitors: number;
  vslStarted: number;
  vsl95Plus: number;
  emailCaptured: number;
  applicationStarted: number;
  applicationComplete: number;
  payments: number;
}
