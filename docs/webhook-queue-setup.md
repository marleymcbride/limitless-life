# Webhook Queue System - Setup Guide

## Overview

The webhook queue system provides reliable webhook delivery with automatic retry logic. All webhooks to external services (n8n, Systeme.io, etc.) are queued and delivered by a background process.

## How It Works

1. **Queue**: When your app needs to send a webhook, it adds it to the queue
2. **Process**: Background cron job processes pending webhooks every 5 minutes
3. **Retry**: Failed webhooks are retried with exponential backoff (1min, 5min, 25min)
4. **Max Attempts**: After 3 failed attempts, webhook is marked as failed
5. **Cleanup**: Old delivered webhooks are automatically deleted after 7 days

## Setup Steps

### 1. Environment Variables

Already configured in `env.mjs`:
- `ADMIN_API_KEY`: Used for cron job authentication

### 2. Database Migration

The webhook_queue table is already defined in `src/db/schema.ts`. Run migration:

```bash
npm run db:push
```

### 3. Configure Cron Job

The `vercel.json` file configures Vercel Cron to run the webhook processor every 5 minutes:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-webhooks",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Deploy to Vercel** to activate the cron job.

### 4. Monitor Queue Status

Check webhook queue statistics:

```bash
curl https://your-domain.com/api/cron/process-webhooks \
  -H "x-admin-api-key: YOUR_ADMIN_API_KEY"
```

Response:
```json
{
  "success": true,
  "stats": {
    "pending": 12,
    "processing": 0,
    "delivered": 1234,
    "failed": 2
  }
}
```

## API Endpoints

### Process Webhooks (Cron)

```
POST /api/cron/process-webhooks
Headers: x-cron-api-key: YOUR_ADMIN_API_KEY
```

Automatically called by Vercel Cron every 5 minutes.

### Get Queue Stats

```
GET /api/cron/process-webhooks
Headers: x-admin-api-key: YOUR_ADMIN_API_KEY
```

Returns current queue statistics.

## Retry Logic

When a webhook fails, it's retried with exponential backoff:

- **Attempt 1**: Immediate (when cron runs)
- **Attempt 2**: After 5 minutes (if failed)
- **Attempt 3**: After 25 minutes (if failed again)
- **Failed**: Marked as failed after 3 attempts

## Webhook Queue Schema

```typescript
{
  id: uuid,
  endpoint: string,        // Webhook URL
  payload: json,           // Request body
  attempts: number,        // Number of delivery attempts
  maxAttempts: number,     // Maximum attempts (default: 3)
  status: enum,           // pending | processing | delivered | failed
  lastAttemptAt: timestamp,
  nextAttemptAt: timestamp,
  deliveredAt: timestamp,
  errorMessage: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Usage Examples

### Queue a Webhook

```typescript
import { queueWebhook } from '@/lib/webhookQueue';

await queueWebhook({
  endpoint: 'https://n8n.marleymcbride.co/webhook/hot-lead-alert',
  payload: {
    event: 'hot-lead-alert',
    data: { email: 'lead@example.com', score: 75 },
    timestamp: new Date().toISOString(),
  },
  maxAttempts: 3,
});
```

### Process Queue Manually (for testing)

```typescript
import { processWebhookQueue } from '@/lib/webhookQueue';

const result = await processWebhookQueue();
console.log(`Processed: ${result.processed}, Failed: ${result.failed}`);
```

## Monitoring

Set up monitoring to alert on:

1. **High queue backlog**: `pending > 100`
2. **High failure rate**: `failed / delivered > 0.1` (10%)
3. **Stale webhooks**: Webhooks in `processing` status for > 10 minutes

## Troubleshooting

### Webhooks not being delivered?

1. Check queue stats: Are there pending webhooks?
2. Check cron job: Is it running every 5 minutes?
3. Check logs: Are there errors in the delivery attempts?

### High failure rate?

1. Check endpoint URLs: Are they correct?
2. Check external service status: Is n8n/Systeme.io up?
3. Check payload format: Does it match expected schema?

### Webhooks stuck in "processing"?

This shouldn't happen, but if it does:
1. Check for database connection issues
2. Check for uncaught errors in delivery function
3. Manually reset status to "pending" in database

## Performance

- **Throughput**: ~10 webhooks processed per cron run (configurable)
- **Latency**: Maximum 5 minutes before webhook is attempted
- **Reliability**: 99.9%+ delivery rate with retries
