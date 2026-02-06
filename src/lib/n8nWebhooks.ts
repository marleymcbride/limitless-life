import { queueWebhook } from './webhookQueue';

interface N8NWebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
  source: "limitless-sales-page";
}

const N8N_BASE_URL = process.env.N8N_WEBHOOK_URL ||
  "https://n8n.marleymcbride.co/webhook";

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
  const webhookUrl = `${N8N_BASE_URL}/${event}`;

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

    console.log(`N8N event queued: ${event}`);
  } catch (error) {
    console.error("Failed to queue N8N webhook:", error);
    // Don't throw - we don't want webhook failures to break the app
  }
};

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
