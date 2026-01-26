# Bunny.net VSL Integration - Setup Guide

## ✅ Completed Implementation

All code has been successfully created and committed:

- ✅ VSL TypeScript types (`src/types/vsl.types.ts`)
- ✅ Analytics utilities (`src/lib/vslAnalytics.ts`)
- ✅ N8N webhook utilities (`src/lib/n8nWebhooks.ts`)
- ✅ VSL tracking hook (`src/hooks/useVSLTracking.ts`)
- ✅ VSL Player component (`src/components/vsl-player.tsx`)
- ✅ VSL Hero Section component (`src/components/vsl-hero-section.tsx`)
- ✅ API analytics route (`src/app/api/analytics/vsl/route.ts`)

## 🔧 Setup Required

### Step 1: Create Environment Variables

Create a `.env.local` file in the project root:

```bash
# Bunny.net VSL Configuration
NEXT_PUBLIC_BUNNY_LIBRARY_ID=505300
NEXT_PUBLIC_BUNNY_VIDEO_ID=ae86338e-0493-4ff0-bca9-87f9ad98dd89
BUNNY_API_KEY=your-bunny-api-key-here
NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=vz-8f43891f-169.b-cdn.net

# N8N Webhook for VSL Analytics
NEXT_PUBLIC_N8N_VSL_WEBHOOK=https://your-n8n-instance.com/webhook/vsl-events
NEXT_PUBLIC_N8N_WAITLIST_WEBHOOK=https://your-n8n-instance.com/webhook/programme-waitlist-leads

# Analytics
NEXT_PUBLIC_ENABLE_VSL_ANALYTICS=true
```

# Security Notes:
# - Never commit your actual API keys to version control
# - Add .env.local to your .gitignore file
# - Rotate your API keys periodically

### Step 2: Integrate VSLHeroSection into Your Sales Page

Update `src/app/page.tsx`:

```typescript
import VSLHeroSection from '@/components/vsl-hero-section';

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-black">
      <VSLHeroSection
        libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID!}
        videoId={process.env.NEXT_PUBLIC_BUNNY_VIDEO_ID!}
      />

      {/* Rest of your sales page sections */}
    </main>
  );
}
```

### Step 3: Set Up N8N Workflow

Create a new workflow in N8N: https://n8n.marleymcbride.co

**Workflow Structure:**

```
[Webhook Trigger] → [Switch Node] → [Event Processors]
     ↓
  Path: /webhook/vsl-events
  Method: POST

     ↓
  [Switch on {{$json.event}}]
     ├─ vsl_play_started → Tag as "Engaged Lead" in CRM
     ├─ vsl_progress_milestone → Route by {{$json.data.progress}}
     │    ├─ 75%+ → Tag as "Hot Lead", send follow-up email
     │    └─ 50%+ → Tag as "Warm Lead"
     ├─ vsl_completed → Tag as "Ready to Buy", alert sales team
     └─ vsl_dropped_off → Add to retargeting sequence
```

**Webhook Node Configuration:**
- Path: `/webhook/vsl-events`
- Method: POST
- Authentication: None (or add if preferred)
- Response: `{ "success": true }`

**Switch Node Configuration:**
- Mode: Expression
- Value: `{{$json.event}}`
- Outputs: 4
  - Route 1: `vsl_play_started`
  - Route 2: `vsl_progress_milestone`
  - Route 3: `vsl_completed`
  - Route 4: `vsl_dropped_off`

**Example Code Node for Processing:**
```javascript
// Process Hot Lead (75%+ watched)
const event = $input.item.json;

if (event.event === 'vsl_progress_milestone' && event.data.progress >= 75) {
  return {
    userId: event.data.userId,
    videoId: event.data.videoId,
    progress: event.data.progress,
    action: 'tag_hot_lead',
    timestamp: event.timestamp
  };
}
```

### Step 4: Test the Integration

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:** `http://localhost:3001`

3. **Test VSL player:**
   - Click play button
   - Watch for 30 seconds (should trigger 25% milestone)
   - Check browser console for tracking events
   - Check N8N executions for webhook hits

4. **Verify N8N webhooks:**
   - Go to N8N dashboard
   - Check "Executions" tab
   - Look for incoming VSL events

### Step 5: Deploy to Production

1. **Update Vercel environment variables:**
   - Go to Vercel project settings
   - Add all environment variables from `.env.local`
   - Deploy

2. **Test production:**
   - Visit your production URL
   - Test VSL playback
   - Verify analytics are tracked

## 📊 Analytics Events Captured

| Event | When Fired | Data Sent |
|-------|-----------|-----------|
| `vsl_play_started` | User clicks play | userId, videoId, timestamp |
| `vsl_progress_milestone` | 25%, 50%, 75%, 90% watched | userId, videoId, progress, watchDuration |
| `vsl_completed` | 95%+ watched | userId, videoId, totalWatchTime |
| `vsl_dropped_off` | User leaves page/switches tab | userId, videoId, dropOffPoint, lastProgress |

## 🎨 Customization Options

### Change CTA Trigger Point
In `vsl-hero-section.tsx`, line 19:
```typescript
if (progress.percentage >= 50 && !showCTA) {  // Change 50 to desired %
  setShowCTA(true);
}
```

### Modify Player Settings
In your page, pass props:
```typescript
<VSLPlayer
  autoplay={false}    // Change to true for autoplay
  muted={false}       // Change to true for muted start
  controls={true}     // Change to false to hide controls
  preload={true}      // Change to false to lazy load
/>
```

### Style the Player Container
Add custom className:
```typescript
<VSLPlayer className="shadow-2xl border-4 border-red-600 rounded-xl" />
```

## 🚀 Next Steps

1. Monitor N8N executions for first 24 hours
2. Adjust milestone triggers based on data
3. Set up email sequences in N8N for each event type
4. Connect CRM integrations (HubSpot, Salesforce, etc.)
5. A/B test different VSL versions using the videoId prop

## 🐛 Troubleshooting

**Video doesn't load:**
- Check `.env.local` has correct BUNNY_LIBRARY_ID and BUNNY_VIDEO_ID
- Verify video is active in Bunny.net dashboard
- Check browser console for errors

**Analytics not tracking:**
- Check N8N webhook URL is correct
- Verify N8N workflow is active
- Check browser console for failed fetch requests
- Test N8N webhook with curl:
  ```bash
  curl -X POST https://n8n.marleymcbride.co/webhook/vsl-events \
    -H "Content-Type: application/json" \
    -d '{"event":"test","data":{}}'
  ```

**Player.js not loading:**
- Check network tab for CDN blocking
- Verify `assets.mediadelivery.net` is accessible
- Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

## 📝 Files Created

```
src/
├── types/vsl.types.ts                    # TypeScript definitions
├── lib/
│   ├── vslAnalytics.ts                   # Analytics utilities
│   └── n8nWebhooks.ts                    # N8N integration
├── hooks/useVSLTracking.ts               # Custom tracking hook
├── components/
│   ├── vsl-player.tsx                    # Main player component
│   └── vsl-hero-section.tsx              # Hero section wrapper
└── app/api/analytics/vsl/route.ts        # API endpoint
```

## 🎯 Success Metrics to Track

- **Play Rate:** % of visitors who click play
- **Avg Watch %:** Average percentage watched
- **Completion Rate:** % who watch 95%+
- **Drop-off Points:** Where people leave
- **Conversion by Watch %:** Sales correlation with watch percentage

All metrics available in N8N executions and can be exported to your analytics dashboard.

---

**Setup complete!** 🎉 Your VSL is now fully tracked and integrated with N8N automation.
