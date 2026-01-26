# Sales Page Playwright Optimization

This file provides guidance for optimizing Playwright performance specifically for the Limitless Life sales page project.

## Quick Visual Testing Workflow

**After implementing ANY front-end change, execute this workflow:**

### 1. Critical Sales Page Testing
```javascript
// Navigate to page
mcp__playwright__browser_navigate('http://localhost:3001');

// Check for console errors (CRITICAL)
mcp__playwright__browser_console_messages({ onlyErrors: true });

// Take full page screenshot for evidence
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'sales-page-desktop-check',
  fullPage: true
});
```

### 2. Mobile Conversion Testing
```javascript
// Test mobile viewport (most important for sales pages)
mcp__playwright__browser_resize(375, 812);
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'sales-page-mobile-check',
  fullPage: true
});

// Test tablet viewport
mcp__playwright__browser_resize(768, 1024);
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'sales-page-tablet-check',
  fullPage: true
});
```

### 3. Key Sales Page Elements Testing
```javascript
// Test primary CTA buttons
mcp__playwright__browser_click({ element: 'JOIN NOW button', ref: 'button-cta-primary' });
mcp__playwright__browser_navigate_back(); // Go back to continue testing

// Test secondary CTAs
mcp__playwright__browser_click({ element: 'See If This Is Right For You link', ref: 'cta-secondary' });
mcp__playwright__browser_navigate_back();

// Test video player loading
mcp__playwright__browser_snapshot(); // Check video player states
```

## Sales Page Specific Checklist

### Conversion Critical Elements
- [ ] **Hero Section Loads First** - Above-the-fold content priority
- [ ] **VSL Player Loads** - Video sales letter functionality
- [ ] **Primary CTA Visible** - JOIN NOW button placement
- [ ] **Mobile Optimized** - Touch targets >44px, readable text
- [ ] **No Console Errors** - Critical for user trust

### Performance Requirements
- [ ] **Loading Speed** - Hero section loads in <2 seconds
- [ ] **Video Performance** - VSL player initializes smoothly
- [ ] **Button Responsiveness** - Click feedback <150ms
- [ ] **Smooth Scrolling** - No layout shifts during load

### Visual Hierarchy
- [ ] **Clear Call-to-Action** - Primary button stands out
- [ ] **Readability** - Text contrast ratios >4.5:1
- [ ] **Mobile First** - Content adapts properly on small screens
- [ ] **Consistent Spacing** - Visual rhythm maintained

## Automated Testing Commands

### Quick Health Check
```bash
# Run after any changes
mcp__playwright__browser_navigate('http://localhost:3001')
mcp__playwright__browser_console_messages({ onlyErrors: true })
mcp__playwright__browser_take_screenshot({ type: 'png', filename: 'health-check', fullPage: true })
```

### Video Player Testing
```javascript
// Test VSL functionality
mcp__playwright__browser_navigate('http://localhost:3001');
mcp__playwright__browser_wait_for('Loading video...', { textGone: true });

// Check video player states
mcp__playwright__browser_snapshot();
```

### CTA Conversion Testing
```javascript
// Test all conversion paths
const ctas = [
  'JOIN NOW',
  'See If This Is Right For You',
  'Apply To Transform Your Life Today',
  'Become The Next Success Story'
];

for (const ctaText of ctas) {
  mcp__playwright__browser_navigate('http://localhost:3001');
  mcp__playwright__browser_click({ element: ctaText, ref: `cta-${ctaText.toLowerCase().replace(/\s+/g, '-')}` });
  mcp__playwright__browser_take_screenshot({ filename: `conversion-${ctaText.toLowerCase().replace(/\s+/g, '-')}` });
  mcp__playwright__browser_navigate_back();
}
```

## Error Monitoring

### Critical Console Errors to Watch
- **Hydration mismatches** - React SSR issues
- **Video player failures** - VSL loading errors
- **Network failures** - API request errors
- **JavaScript errors** - Any uncaught exceptions

### Performance Monitoring
```javascript
// Check loading performance
mcp__playwright__browser_network_requests(); // Analyze network requests

// Monitor Core Web Vitals
mcp__playwright__browser_evaluate(() => {
  // Performance observer code here
  return performance.getEntriesByType('navigation')[0];
});
```

## Sales Page Specific Agents

### Conversion Optimization Agent
Create a specialized agent focused on:
- Above-the-fold testing
- Mobile conversion optimization
- CTA button effectiveness
- Loading performance impact

### Video Player Specialist
Focus on:
- VSL loading performance
- Player state consistency
- Mobile video optimization
- Error handling effectiveness

## Integration with Existing Tools

### Error Boundary Testing
The original project uses ErrorBoundary components. For your sales page:
```javascript
// Test error states
mcp__playwright__browser_evaluate(() => {
  // Trigger error conditions to test fallbacks
  throw new Error('Test error for boundary testing');
});
```

### Design System Compliance
- **Typography Hierarchy** - Headings, body text, button text
- **Color Consistency** - Brand colors throughout
- **Spacing Rules** - Consistent margins/padding
- **Button States** - Hover, active, disabled states

## When to Use Enhanced Testing

### Use Full Workflow For:
- CTA button changes
- Video player updates
- Mobile layout adjustments
- Performance optimizations
- New section implementations

### Use Quick Check For:
- Text content updates
- Minor styling changes
- Bug fixes
- Configuration updates

This sales page specific optimization ensures your landing page maintains high conversion potential while providing excellent user experience across all devices.