interface N8NWebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
  source: "limitless-sales-page";
}

const N8N_BASE_URL = "https://n8n.marleymcbride.co/webhook";

export const sendToN8N = async (
  event: string,
  data: Record<string, any>
): Promise<void> => {
  const webhookUrl = `${N8N_BASE_URL}/vsl-events`;

  const payload: N8NWebhookPayload = {
    event,
    data,
    timestamp: new Date().toISOString(),
    source: "limitless-sales-page",
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`N8N webhook failed: ${response.status}`);
    }

    console.log(`N8N event sent: ${event}`);
  } catch (error) {
    console.error("Failed to send to N8N:", error);
  }
};

export const n8nEvents = {
  vslPlayStarted: (data: { userId?: string; videoId: string }) =>
    sendToN8N("vsl_play_started", data),

  vslProgressMilestone: (data: {
    userId?: string;
    videoId: string;
    progress: number;
    watchDuration: number;
  }) => sendToN8N("vsl_progress_milestone", data),

  vslCompleted: (data: {
    userId?: string;
    videoId: string;
    totalWatchTime: number;
  }) => sendToN8N("vsl_completed", data),

  vslDroppedOff: (data: {
    userId?: string;
    videoId: string;
    dropOffPoint: number;
    lastProgress: number;
  }) => sendToN8N("vsl_dropped_off", data),

  vslReplayed: (data: {
    userId?: string;
    videoId: string;
    previousCompletionTime: number;
  }) => sendToN8N("vsl_replayed", data),
};
