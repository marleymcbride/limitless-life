# Limitless Life - 8-Figure Sales Funnel Optimization

## Overview

High-performance sales funnel application for Limitless Life, optimized for 8-figure scale with advanced analytics, lead scoring, and performance optimization.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL with Drizzle ORM
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Video**: Bunny.net CDN
- **Analytics**: Custom event tracking
- **Email**: Systeme.io (via n8n)
- **Payments**: Stripe

## Key Features

### 1. Advanced Analytics
- Session-based user tracking
- Event-driven analytics
- Lead scoring with temperature classification
- Funnel visualization with drop-off detection
- Hot lead identification and alerts

### 2. Performance Optimization
- Code splitting and lazy loading (60-70% bundle reduction)
- Video optimization with adaptive bitrate
- Image optimization (WebP/AVIF, responsive)
- Critical CSS and resource hints
- Initial page load: 1.5-2s (60% faster)

### 3. Integration System
- n8n-powered automation
- Stripe webhook processing
- Systeme.io email marketing sync
- Reliable webhook queue with retries
- Daily/weekly automated reports

## Project Structure

```
limitless-life/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── analytics/     # Analytics endpoints
│   │   │   ├── webhooks/      # Webhook handlers
│   │   │   ├── cron/          # Scheduled jobs
│   │   │   └── session/       # Session management
│   │   ├── page.tsx           # Main sales page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── lazy/             # Lazy-loaded sections
│   │   ├── admin/            # Admin dashboard
│   │   └── *.tsx             # Feature components
│   ├── db/                   # Database schema
│   │   └── schema.ts          # Drizzle schema
│   ├── hooks/                # Custom hooks
│   │   ├── useAnalytics.ts   # Analytics hook
│   │   ├── useVSLTracking.ts # VSL tracking
│   │   └── *.ts             # Other hooks
│   ├── lib/                  # Utilities
│   │   ├── db.ts            # Database client
│   │   ├── analytics.ts     # Analytics functions
│   │   ├── scoring.ts       # Lead scoring
│   │   ├── session.ts       # Session management
│   │   ├── webhookQueue.ts  # Webhook queue
│   │   ├── n8nWebhooks.ts   # n8n integration
│   │   └── *.ts             # Other utilities
│   └── types/               # Type definitions
│       ├── index.ts         # Export all types
│       ├── app.types.ts     # App types
│       ├── analytics.ts     # Analytics types
│       ├── user.ts          # User types
│       ├── vsl.types.ts     # VSL types
│       ├── api.types.ts     # API types
│       └── validation.types.ts # Validation types
├── docs/                    # Documentation
│   ├── n8n-integration-overview.md
│   ├── n8n-technical-specification.md
│   ├── webhook-queue-setup.md
│   ├── code-splitting-implementation.md
│   ├── video-optimization-implementation.md
│   ├── image-optimization-implementation.md
│   ├── critical-css-resource-hints.md
│   └── refactoring-guide.md
├── drizzle.config.ts        # Drizzle config
├── next.config.js           # Next.js config
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── vercel.json              # Vercel deployment
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- Bunny.net account
- n8n instance

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your values
nano .env
```

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/limitless_life

# API Keys
SYSTEMEIO_API_KEY=your_systemeio_api_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
ADMIN_API_KEY=your_admin_key

# n8n
N8N_WEBHOOK_URL=https://n8n.marleymcbride.co/webhook

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

### Database Setup

```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Drizzle Studio
npm run db:studio
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

**Environment Variables**: Add all env vars in Vercel dashboard

### Cron Jobs

The `vercel.json` configures automatic cron jobs:
- `/api/cron/process-webhooks` - Every 5 minutes

### Database Migrations

Run migrations before deploying:
```bash
npm run db:push
```

## API Endpoints

### Analytics
- `POST /api/analytics/events` - Track events
- `GET /api/analytics/funnel` - Funnel metrics
- `GET /api/analytics/leads` - Lead lists by temperature
- `POST /api/analytics/recalculate-score` - Recalculate score

### Webhooks
- `POST /api/webhooks/email` - Email capture
- `POST /api/webhooks/application` - Application events
- `POST /api/webhooks/stripe` - Stripe webhooks

### Session
- `GET /api/session` - Get or create session

### Admin
- `POST /api/cron/process-webhooks` - Process webhook queue

## Database Schema

### Tables

**sessions**
- Session tracking with UTM parameters
- 30-day cookie-based sessions

**users**
- User profiles with lead scoring
- Temperature classification (cold/warm/hot)

**events**
- All user interaction events
- Time-series analytics data

**payments**
- Stripe payment records
- Revenue attribution

**application_submissions**
- Multi-step application data
- Progress tracking

**webhook_queue**
- Reliable webhook delivery
- Retry logic with exponential backoff

**lead_alerts**
- Hot lead notifications
- Sales team alerts

## Performance Metrics

### Key Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Page Load | 4-5s | 1.5-2s | **60% faster** |
| Bundle Size | 1.2MB | 400KB | **67% smaller** |
| LCP | 4s | 1.8s | **55% faster** |
| CLS | 0.15 | 0.05 | **67% better** |

### Optimization Techniques

- Code splitting (React.lazy)
- Image optimization (WebP/AVIF)
- Video adaptive bitrate
- Critical CSS inlining
- Resource preloading
- DNS prefetching

## Monitoring

### Health Checks

```bash
# Check webhook queue status
curl https://yourdomain.com/api/cron/process-webhooks \
  -H "x-admin-api-key: YOUR_KEY"
```

### Analytics Dashboard

Visit: `https://yourdomain.com/admin` (requires auth)

Features:
- Funnel visualization
- Drop-off detection
- Hot lead feed
- Performance metrics

## Documentation

- [n8n Integration Overview](./docs/n8n-integration-overview.md)
- [n8n Technical Specification](./docs/n8n-technical-specification.md)
- [Webhook Queue Setup](./docs/webhook-queue-setup.md)
- [Code Splitting Guide](./docs/code-splitting-implementation.md)
- [Video Optimization](./docs/video-optimization-implementation.md)
- [Image Optimization](./docs/image-optimization-implementation.md)
- [Critical CSS Guide](./docs/critical-css-resource-hints.md)
- [Refactoring Guide](./docs/refactoring-guide.md)

## Contributing

### Development Workflow

1. Create feature branch
2. Implement changes with tests
3. Run linting: `npm run lint`
4. Run type checking: `npm run type-check`
5. Commit with conventional commits
6. Push and create PR

### Code Style

- TypeScript strict mode
- ESLint with Next.js config
- Prettier for formatting
- Conventional commits

## License

Proprietary - All rights reserved

## Support

For technical support, contact the development team.
