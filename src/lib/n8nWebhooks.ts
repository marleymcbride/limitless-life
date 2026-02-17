import { queueWebhook } from './webhookQueue';

interface N8NWebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
  source: "limitless-sales-page";
}

// Base URL for n8n webhooks (from environment variable or default)
const N8N_WEBHOOK_BASE_URL = process.env.N8N_WEBHOOK_BASE_URL ||
  process.env.N8N_WEBHOOK_URL ||
  "https://n8n.marleymcbride.co";

/**
 * Send webhook to n8n (via queue for reliability)
 *
 * Webhooks are queued and delivered by a background process with automatic retries.
 * This ensures no events are lost even if n8n is temporarily unavailable.
 */
export const sendToN8N = async (
  event: string,
  data: Record<string, any>
): Promise<void> => {
  const webhookUrl = `${N8N_WEBHOOK_BASE_URL}/${event}`;

  const payload: N8NWebhookPayload = {
    event,
    data,
    timestamp: new Date().toISOString(),
    source: "limitless-sales-page",
  };

  try {
    // Queue webhook for delivery (reliable with retries)
    await queueWebhook({
      endpoint: webhookUrl,
      payload,
      maxAttempts: 3,
    });

    console.log(`[n8n] Event queued: ${event}`);
  } catch (error) {
    console.error("[n8n] Failed to queue webhook:", error);
    // Don't throw - we don't want webhook failures to break the app
  }
};

/**
 * Direct webhook send for n8n integration (fire-and-forget)
 * Based on n8n specialist's implementation requirements
 */
async function sendDirectWebhook(
  endpoint: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch(`${N8N_WEBHOOK_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`[n8n] Webhook failed to ${endpoint}:`, await response.text());
      return false;
    }

    console.log(`[n8n] Webhook sent successfully to ${endpoint}`);
    return true;
  } catch (error) {
    console.error(`[n8n] Webhook error for ${endpoint}:`, error);
    return false;
  }
}

/**
 * Sync payment data to Airtable via n8n
 * Workflow: https://n8n.marleymcbride.co/workflow/EGtmK61e7Cx5Ze7v
 * Webhook: https://n8n.marleymcbride.co/webhook/payment-complete-test
 *
 * This is a direct webhook call (fire-and-forget) that syncs:
 * - Leads table (create/update)
 * - Payments table (create payment record)
 * - HotLeads table (if score >= 70)
 */
export async function syncPaymentToAirtable(paymentData: {
  email: string;
  firstName?: string;
  lastName?: string;
  tier: 'Access' | 'Plus' | 'Premium' | 'Elite';
  amount: number; // in cents (e.g., 299700 for $2,997)
  stripePaymentId: string;
  paymentDate: string; // ISO format
  score: number;
  phone?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
}): Promise<boolean> {
  return sendDirectWebhook('/webhook/payment-complete-test', paymentData);
}

/**
 * Alert hot lead to Airtable via n8n
 * Workflow: https://n8n.marleymcbride.co/workflow/JwmunGjOnlynIaks
 * Webhook: https://n8n.marleymcbride.co/webhook/hot-lead
 *
 * This creates a record in the HotLeads table for immediate sales follow-up
 */
export async function alertHotLead(hotLeadData: {
  email: string;
  name: string;
  score: number;
  whatTheyDid: string;
  phone?: string;
  becameHotAt?: string; // ISO format, defaults to now if omitted
}): Promise<boolean> {
  return sendDirectWebhook('/webhook/hot-lead', hotLeadData);
}

/**
 * N8N Webhook Events
 *
 * These events trigger workflows in n8n for:
 * - Lead segmentation in Systeme.io
 * - Hot lead alerts to sales team
 * - Drop-off recovery emails
 * - Payment processing
 * - Daily/weekly reports
 */
export const n8nEvents = {
  // VSL Events
  vslPlayStarted: (data: {
    userId?: string;
    email?: string;
    videoId: string;
  }) => sendToN8N("vsl-play-started", data),

  vslProgressMilestone: (data: {
    userId?: string;
    email?: string;
    videoId: string;
    progress: number;
    watchDuration: number;
  }) => sendToN8N("vsl-progress-milestone", data),

  vslCompleted: (data: {
    userId?: string;
    email?: string;
    videoId: string;
    totalWatchTime: number;
  }) => sendToN8N("vsl-completed", data),

  vslDroppedOff: (data: {
    userId?: string;
    email?: string;
    videoId: string;
    dropOffPoint: number;
    lastProgress: number;
  }) => sendToN8N("vsl-dropped-off", data),

  // Email & Application Events (Systeme.io sync)
  emailSubmit: (data: {
    userId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }) => sendToN8N("email-submit", data),

  applicationStart: (data: {
    userId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }) => sendToN8N("application-start", data),

  applicationStep: (data: {
    userId?: string;
    email: string;
    step: string;
    stepNumber: number;
    stepData?: Record<string, any>;
  }) => sendToN8N("application-step", data),

  applicationComplete: (data: {
    userId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    applicationData?: Record<string, any>;
  }) => sendToN8N("application-complete", data),

  // Lead Temperature Changes (Critical - triggers segmentation & alerts)
  leadTemperatureChanged: (data: {
    userId?: string;
    email: string;
    previousTemperature: 'cold' | 'warm' | 'hot' | null;
    newTemperature: 'cold' | 'warm' | 'hot';
    score: number;
    firstName?: string;
    lastName?: string;
  }) => sendToN8N("lead-temperature-changed", data),

  // Hot Lead Alert (Critical - immediate sales notification)
  hotLeadAlert: (data: {
    userId?: string;
    email: string;
    score: number;
    firstName?: string;
    lastName?: string;
    lastActivity?: string;
    activitySummary?: {
      vslWatched?: boolean;
      vslCompletionPercent?: number;
      applicationStarted?: boolean;
      applicationCompleted?: boolean;
      pricingViewed?: boolean;
    };
  }) => sendToN8N("hot-lead-alert", data),

  // Payment Events
  paymentComplete: (data: {
    userId?: string;
    email: string;
    amount: number;
    currency: string;
    stripePaymentId: string;
    productName?: string;
    firstName?: string;
    lastName?: string;
  }) => sendToN8N("payment-complete", data),

  // Drop-off Recovery Triggers
  dropOffRecovery: (data: {
    userId?: string;
    email: string;
    dropOffPoint: string;
    recoveryAction: 'email' | 'sms' | 'both';
    metadata?: Record<string, any>;
  }) => sendToN8N("drop-off-recovery", data),

  // Daily/Weekly Report Triggers
  generateDailyReport: () =>
    sendToN8N("generate-daily-report", {
      reportType: "daily",
      date: new Date().toISOString().split('T')[0],
    }),

  generateWeeklyReport: () =>
    sendToN8N("generate-weekly-report", {
      reportType: "weekly",
      date: new Date().toISOString().split('T')[0],
    }),
};
