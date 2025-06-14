# Limitless Protocol™ Waitlist Landing Page

## Overview
A high-converting waitlist landing page for The Limitless Protocol™ - built with Next.js, TypeScript, and Tailwind CSS.

## Features
- **Above-the-fold (ATF)**: Clear value proposition, pain points, and email capture
- **Testimonials**: Authentic social proof from high-performing clients
- **Email Integration**: Bulletproof N8N webhook system with Systeme.io fallback
- **Responsive Design**: Optimized for desktop and mobile
- **Dark Theme**: Professional zinc/red color scheme

## Quick Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and configure your N8N webhook endpoints:
   ```bash
   cp .env.example .env.local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Waitlist Page**
   Navigate to: `http://localhost:3001/waitlist`

## Email Integration Setup

The waitlist uses a dual-endpoint N8N webhook system for maximum reliability:

### Required Environment Variables:
- `NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK` - Primary N8N webhook endpoint
- `NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK` - Fallback N8N webhook endpoint

### Webhook Payload:
```json
{
  "email": "user@example.com",
  "firstName": "",
  "source": "limitless-waitlist"
}
```

### N8N Workflow Setup:
1. Create N8N workflow that accepts webhook
2. Process email submission
3. Send to Systeme.io or your email provider
4. Return success/error response

## Components

### Core Components:
- `LimitlessEmailSignup` - Waitlist email capture form
- `SimpleTestimonials` - Clean testimonials grid
- `TestimonialSection` - WhatsApp-style authentic testimonials

### Infrastructure:
- `n8n-webhook-client.ts` - Bulletproof webhook integration
- Anti-stack styling system - Dark theme with zinc/red accents

## Deployment

### Vercel (Recommended):
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Manual Build:
```bash
npm run build
npm run start
```

## Success Metrics
- Email capture rate: Target 25-35%
- Mobile optimization: Fully responsive
- Error handling: Dual-endpoint fallback system
- Loading speed: Optimized for performance

## Support
For issues with email integration or deployment, check:
1. N8N webhook endpoints are accessible
2. Environment variables are correctly set
3. Network connectivity for webhook calls
