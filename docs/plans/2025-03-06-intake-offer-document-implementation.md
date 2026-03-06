# Intake Offer Document Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a clean, document-style offer page at `/intake-open-doc` that mimics Basecamp article aesthetics

**Architecture:** Single Next.js page with reusable GammaArticle component. Uses Tailwind CSS for styling, Georgia serif font for document feel. Placeholder content from Taki Moore example.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, TypeScript

---

## Task 1: Create GammaArticle Reusable Component

**Files:**
- Create: `src/components/gamma-article.tsx`

**Step 1: Create the component structure**

```typescript
import React from 'react';

interface GammaArticleProps {
  children: React.ReactNode;
}

export function GammaArticle({ children }: GammaArticleProps) {
  return (
    <article className="max-w-3xl mx-auto bg-white px-8 py-16 md:px-16">
      {children}
    </article>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/gamma-article.tsx
git commit -m "feat: add GammaArticle base component"
```

---

## Task 2: Create GammaHeader Component

**Files:**
- Create: `src/components/gamma-header.tsx`

**Step 1: Create header component with avatar and metadata**

```typescript
import React from 'react';

interface GammaHeaderProps {
  authorName: string;
  authorAvatar?: string;
  lastUpdated: string;
}

export function GammaHeader({ authorName, authorAvatar, lastUpdated }: GammaHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      {authorAvatar && (
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-16 h-16 rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-semibold text-lg">{authorName}</div>
        <div className="text-gray-600 text-sm">
          · Last updated <time>{lastUpdated}</time>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/gamma-header.tsx
git commit -m "feat: add GammaHeader component"
```

---

## Task 3: Create GammaHeadline Component

**Files:**
- Create: `src/components/gamma-headline.tsx`

**Step 1: Create headline component with emphasis support**

```typescript
import React from 'react';

interface GammaHeadlineProps {
  children: React.ReactNode;
}

export function GammaHeadline({ children }: GammaHeadlineProps) {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
      {children}
    </h1>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/gamma-headline.tsx
git commit -m "feat: add GammaHeadline component"
```

---

## Task 4: Create Content Helper Components

**Files:**
- Create: `src/components/gamma-content.tsx`

**Step 1: Create paragraph, list, and blockquote components**

```typescript
import React from 'react';

export function GammaParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-900 font-serif">
      {children}
    </p>
  );
}

export function GammaList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside mb-6 text-lg md:text-xl space-y-2 text-gray-900">
      {children}
    </ul>
  );
}

export function GammaBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="bg-gray-50 border-l-4 border-gray-200 p-6 my-8 rounded-r">
      <p className="text-lg md:text-xl italic text-gray-900 leading-relaxed">
        {children}
      </p>
    </blockquote>
  );
}

export function GammaSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900">
      {children}
    </h2>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/gamma-content.tsx
git commit -m "feat: add content helper components"
```

---

## Task 5: Create GammaCTA Component

**Files:**
- Create: `src/components/gamma-cta.tsx`

**Step 1: Create call-to-action link component**

```typescript
import React from 'react';

interface GammaCTAProps {
  href: string;
  children: React.ReactNode;
}

export function GammaCTA({ href, children }: GammaCTAProps) {
  return (
    <a
      href={href}
      className="text-blue-600 font-bold underline hover:text-blue-700 inline-block"
    >
      {children}
    </a>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/gamma-cta.tsx
git commit -m "feat: add GammaCTA component"
```

---

## Task 6: Add Georgia Font to Project

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add Google Fonts link for Georgia-like font**

Check existing layout file and add Google Fonts for Merriweather (Georgia-like serif):

```typescript
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Update globals.css to add serif font family**

Check if `.font-serif` utility exists in Tailwind config or add custom:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .font-serif-custom {
    font-family: 'Merriweather', Georgia, serif;
  }
}
```

**Step 3: Update content components to use serif class**

Modify `src/components/gamma-content.tsx`:

```typescript
export function GammaParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-900 font-serif-custom">
      {children}
    </p>
  );
}
```

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/gamma-content.tsx
git commit -m "feat: add Merriweather serif font"
```

---

## Task 7: Create Intake Offer Document Page

**Files:**
- Create: `src/app/intake-open-doc/page.tsx`

**Step 1: Create the page with placeholder content**

```typescript
import React from 'react';
import {
  GammaArticle,
  GammaHeader,
  GammaHeadline,
  GammaParagraph,
  GammaList,
  GammaBlockquote,
  GammaSectionHeading,
  GammaCTA,
} from '@/components/gamma-article';

export default function IntakeOpenDoc() {
  return (
    <GammaArticle>
      <GammaHeader
        authorName="Marley McBride"
        lastUpdated="March 2025"
      />

      <GammaBlockquote>
        <strong className="italic">
          "[The Limitless Life program has sold out 4-months in a row]"
        </strong>
        {" "}Applications are now open for the upcoming cohort.
        Apply now to get in early for the next intake.
      </GammaBlockquote>

      <GammaHeadline>
        I'm going to work with a handful of people to build a Limitless Life in 2025.
      </GammaHeadline>

      <GammaParagraph>
        Here's what we're doing...
      </GammaParagraph>

      <GammaParagraph>
        Our goal is simple: To help you create lasting change in just 30 days.
      </GammaParagraph>

      <GammaList>
        <li>Clarity every day</li>
        <li>Progress every week, and</li>
        <li>Habits that stay with you for years.</li>
      </GammaList>

      <GammaParagraph>
        Freedom. Growth. And lots of Momentum.
      </GammaParagraph>

      <GammaSectionHeading>
        The plan is simple:
      </GammaSectionHeading>

      <GammaParagraph>
        <strong>Phase 1: Foundation</strong>
        {" "}The first phase will be tactical — focused on building the habits and systems that will serve as the foundation for your transformation.
      </GammaParagraph>

      <GammaParagraph>
        We start with a personalized game plan to get clear on your 30-day goals and decide on the most important quick-win strategies.
      </GammaParagraph>

      <GammaParagraph>
        That's <strong>Phase 1</strong> — two weeks of stacking wins, building momentum, and creating habits that last.
      </GammaParagraph>

      <GammaParagraph>
        <strong>Phase 2: Momentum</strong>
        {" "}Now that you've got quick wins, it's time to accelerate.
      </GammaParagraph>

      <GammaParagraph>
        We'll identify your current constraints, select the next strategies to implement, and map out your plan so you continue to build momentum.
      </GammaParagraph>

      <GammaSectionHeading>
        Here's the Details:
      </GammaSectionHeading>

      <GammaList>
        <li>30-day program structure</li>
        <li>Weekly check-ins and guidance</li>
        <li>Community support and accountability</li>
      </GammaList>

      <GammaParagraph>
        <strong>Investment:</strong>
        {" "}Special pricing for early applicants.
      </GammaParagraph>

      <GammaParagraph>
        <strong>It pays for itself in the first 30-days.</strong>
      </GammaParagraph>

      <GammaParagraph>
        If something's not right, or either of us isn't feeling it, we'll just part ways as friends.
      </GammaParagraph>

      <GammaSectionHeading>
        Ready to get started?
      </GammaSectionHeading>

      <GammaParagraph>
        So if you...
      </GammaParagraph>

      <GammaList>
        <li>Are ready to commit to real change</li>
        <li>Have space to take on this program</li>
        <li>Are coachable and ready to grow</li>
      </GammaList>

      <GammaParagraph>
        We kick off soon, so if this sounds like you, and you'd like to work together:
      </GammaParagraph>

      <GammaParagraph>
        <strong>Step 1:</strong>{" "}
        <GammaCTA href="/beta-application">
          Click here to apply
        </GammaCTA>{" "}
        for one of the places in our upcoming cohort.
      </GammaParagraph>

      <GammaParagraph>
        <strong>Step 2:</strong> We'll review your application, and let you know within 72 hours.
      </GammaParagraph>

      <GammaParagraph>
        If your application is not accepted, we'll let you know what to work on and point you in the right direction.
      </GammaParagraph>

      <GammaParagraph>
        Marley
      </GammaParagraph>

      <GammaParagraph>
        <strong>P.S.</strong>{" "}
        As soon as you decide, we'll get you access to our welcome materials and quick-start guide.
      </GammaParagraph>
    </GammaArticle>
  );
}
```

**Step 2: Create barrel export for components**

Create: `src/components/gamma-article.tsx` (update with exports):

```typescript
export { GammaArticle } from './gamma-article';
export { GammaHeader } from './gamma-header';
export { GammaHeadline } from './gamma-headline';
export { GammaParagraph, GammaList, GammaBlockquote, GammaSectionHeading } from './gamma-content';
export { GammaCTA } from './gamma-cta';
```

**Step 3: Commit**

```bash
git add src/app/intake-open-doc/page.tsx src/components/gamma-article.tsx
git commit -m "feat: add intake offer document page with placeholder content"
```

---

## Task 8: Test Responsive Behavior

**Files:**
- No file creation needed

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Navigate to the page**

Open browser to: `http://localhost:3000/intake-open-doc`

**Step 3: Test responsive breakpoints**

- Desktop (>768px): Check max-width, spacing, layout
- Tablet (768px - 480px): Check padding adjustments
- Mobile (<480px): Check font sizes, single column

**Step 4: Verify visual elements**

Check:
- Serif font is rendering correctly
- Avatar is circular (if present)
- Blockquote has background and border
- Links underline on hover
- Spacing is consistent

**Step 5: Fix any issues**

If problems found, create hotfix commits:

```bash
git add src/components/gamma-*.tsx
git commit -m "fix: responsive spacing adjustments"
```

---

## Task 9: Add Page Metadata

**Files:**
- Modify: `src/app/intake-open-doc/page.tsx`

**Step 1: Add metadata export**

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Limitless Life - Program Offer',
  description: 'Join the Limitless Life program and create lasting change in 30 days.',
};

// Rest of component...
```

**Step 2: Commit**

```bash
git add src/app/intake-open-doc/page.tsx
git commit -m "feat: add page metadata"
```

---

## Task 10: Integration with Beta Flow

**Files:**
- Create: `src/app/beta-application/page.tsx` (modify existing)
- Modify: `src/components/beta-email-popup.tsx`

**Step 1: Update beta-application page to have video + CTA**

Check existing `src/app/beta-application/page.tsx` and add smooth transition to offer doc:

Add at bottom of application page:

```typescript
<Link href="/intake-open-doc" className="smooth-transition">
  View Full Offer Document
</Link>
```

**Step 2: Add smooth page transition**

Create: `src/components/smooth-page-transition.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SmoothPageTransition({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/beta-application/page.tsx src/components/smooth-page-transition.tsx
git commit -m "feat: add smooth transition to offer doc from beta application"
```

---

## Task 11: Final Testing and Polish

**Files:**
- No file creation needed

**Step 1: Test full beta flow**

1. Go to `/beta-access`
2. Click CTA button
3. Fill out Step 1 popup
4. Verify routing to `/beta-application` (when open)
5. Click through to `/intake-open-doc`
6. Verify smooth transition
7. Check offer document displays correctly

**Step 2: Test on mobile devices**

- iPhone (375px width)
- iPad (768px width)
- Desktop (1920px width)

**Step 3: Verify accessibility**

- Keyboard navigation works
- Screen reader reads content correctly
- Color contrast meets WCAG standards

**Step 4: Performance check**

Run Lighthouse audit:

```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Run audit
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+

**Step 5: Final commits for any fixes**

```bash
git add .
git commit -m "fix: final polish and accessibility improvements"
```

---

## Testing Checklist

After implementation, verify:

- [ ] Page renders at `/intake-open-doc`
- [ ] Georgia/serif font loads correctly
- [ ] Responsive on desktop, tablet, mobile
- [ ] Blockquote styling matches design
- [ ] Links have hover states
- [ ] Smooth transition from beta-application
- [ ] Metadata is set correctly
- [ ] Accessibility standards met
- [ ] Performance scores are good
- [ ] Content flows logically
- [ ] No console errors
- [ ] All components are reusable

## Next Steps After Implementation

1. Replace placeholder content with actual Limitless Life offer copy
2. Add actual author avatar image
3. Integrate with Airtable/backend for application tracking
4. Add payment form at bottom of offer doc
5. Create thank you page after application submission
6. Set up n8n automation triggers
7. Test closed flow (route to `/closed` page)
