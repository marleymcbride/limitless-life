# Intake Offer Document - Design

**Date:** 2025-03-06
**Route:** `/intake-open-doc`
**Purpose:** Detailed offer document for prospects to read after applying

## Overview

A clean, document-style offer page that mimics the authentic feel of a Basecamp article or Google Doc. The goal is to present the Limitless Life program offer in a professional, readable format that feels like a genuine document—not a marketing landing page.

## Design Philosophy

**Core Principle:** Less is more. The design should be invisible, letting the content shine. Any styling that draws attention to itself is removed.

**Anti-Patterns to Avoid:**
- No cards, shadows, or flashy effects
- No animations or transitions
- No modern "marketing" design patterns
- No AI-generated aesthetic

## Layout & Structure

### Container
- Max-width: 768px (centered)
- Full white background
- Auto-centered with horizontal margins
- Responsive padding: 4rem top/bottom, 2rem sides (desktop), 1.5rem (mobile)

### Content Flow
1. **Header:** Author avatar + metadata
2. **Main Headline:** Bold H1 with emphasis
3. **Body Content:** Paragraphs, lists, blockquotes
4. **Sections:** H2 headings with clear spacing
5. **Call-to-Action:** Simple text link at bottom
6. **P.S. Section:** Classic direct-response footer

## Typography System

### Font Families
- **Body:** Georgia or similar serif (document feel)
- **Headings:** System sans-serif (Inter/Helvetica)
- **UI elements:** System sans-serif

### Font Sizes
- **H1:** 32px (28px mobile)
- **H2:** 24px (20px mobile)
- **Body:** 18px (16px mobile)
- **Small/Metadata:** 14px

### Font Weights
- **Normal:** 400 (body text)
- **Bold:** 700 (headings, emphasis)
- **Italic:** Used sparingly for emphasis

### Line Heights
- **Body:** 1.6 (breathable)
- **Headings:** 1.2
- **Metadata:** 1.4

## Spacing System

### Vertical Spacing
- **Between paragraphs:** 1.5rem (24px)
- **Between sections:** 3rem (48px)
- **List items:** 0.75rem (12px)
- **Page padding:** 4rem (64px)

### Horizontal Spacing
- **Desktop sides:** 2rem (32px)
- **Mobile sides:** 1.5rem (24px)
- **Max-width:** 768px

## Color Palette

### Base Colors
- **Background:** `#ffffff` (pure white)
- **Text:** `#1a1a1a` (nearly black)
- **Metadata:** `#666666` (medium gray)
- **Links:** `#0066cc` (standard blue)

### Accent Colors
- **Blockquote background:** `#f5f5f5`
- **Blockquote border:** `#e0e0e0`
- **Text selection:** Light blue highlight

## Component Specifications

### Header Section
```
┌─────────────────────────────┐
│  [Avatar]  Author Name       │
│            Last updated [Date]│
└─────────────────────────────┘
```
- Avatar: Circular, 60px diameter
- Layout: Flex row, gap 1rem
- Metadata color: `#666666`

### Main Headline
- Size: 32px, bold
- May include italic/bold nested emphasis
- No subheadline (headline stands alone)

### Body Paragraphs
- Max-width: inherit from container
- 2-4 sentences per paragraph
- No line-height hacking (use 1.6)

### Blockquotes
- Background: `#f5f5f5`
- Left border: 3px solid `#e0e0e0`
- Padding: 1.5rem
- Border radius: 4px (subtle)
- Italic text

### Lists
- Bullet points (not styled)
- Left padding: 1.5rem
- Item spacing: 0.75rem

### Links
- Underline on hover only
- Color: `#0066cc`
- Text decoration: none by default
- Text decoration: underline on hover

### Call-to-Action
- Simple text link (no buttons)
- Bold text: "Click here to apply"
- Underlined

## Content Structure (Placeholder)

Based on Taki Moore's structure:

1. **Quote/Header Block** (blockquote)
   - Urgency/scarcity message
   - Key dates/deadlines

2. **Main Headline**
   - Bold promise statement
   - What we're doing

3. **Introduction**
   - Goal statement
   - Credibility elements
   - Social proof

4. **Who This Is For**
   - "This won't work if you..." (bullet list)
   - "But if you..." (bullet list)

5. **The Plan/Phases**
   - Phase 1: Quick wins
   - Phase 2: Strategy & growth
   - Phase 3: Scale

6. **Pricing/Investment**
   - Clear numbers
   - Payment structure
   - Guarantees

7. **Quick Facts**
   - Bullet points
   - Clear criteria

8. **Call-to-Action**
   - Step 1: Link
   - Step 2: What happens next

9. **P.S. Section**
   - Final urgency/scarcity
   - Bonus mention

## Responsive Behavior

### Desktop (>768px)
- Max-width: 768px
- Padding: 4rem vertical, 2rem horizontal
- Avatar + metadata: side by side

### Tablet (768px - 480px)
- Max-width: 100%
- Padding: 3rem vertical, 1.5rem horizontal
- Avatar + metadata: stack vertically

### Mobile (<480px)
- Font sizes scale down
- Padding: 2rem vertical, 1rem horizontal
- All single column

## Technical Implementation

### Component Structure
```
/src/app/intake-open-doc/page.tsx
  └── GammaArticle (reusable component)
      ├── GammaHeader
      ├── GammaHeadline
      ├── GammaContent
      │   ├── GammaParagraph
      │   ├── GammaList
      │   └── GammaBlockquote
      └── GammaCTA
```

### Styling Approach
- Use Tailwind CSS utilities
- Avoid custom CSS when possible
- Serive font via Google Fonts (Georgia)
- Ensure proper font loading

### Content Management
- Initial version: Hardcoded placeholder (Taki's content)
- Future: Could be pulled from CMS/Airtable
- Structure supports easy content updates

## Success Criteria

1. **Visual Authenticity:** Looks like a genuine document, not a marketing page
2. **Readability:** Comfortable reading at all screen sizes
3. **Load Performance:** Fast, minimal dependencies
4. **Accessibility:** Proper semantic HTML, keyboard navigable
5. **Content Clarity:** Easy to scan and understand the offer

## Next Steps

1. Implement GammaArticle component with placeholder content
2. Test responsive behavior across devices
3. Refine typography and spacing
4. Replace placeholder copy with actual Limitless Life content
5. Add smooth transition from application page (fade-in effect)
6. Integrate application form CTA at bottom
