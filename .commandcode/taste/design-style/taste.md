# design-style
- When making background or layout width changes on mobile, preserve existing text sizing and positioning — do not modify font sizes, margins, padding, or text positioning. Confidence: 0.70
- When creating new UI components, match the existing project's design system and color palette exactly, rather than using generic/styled-by-AI defaults. Confidence: 0.80
- For selectable plan/pricing options, use clickable cards with selection highlighting instead of dropdown/select elements. Confidence: 0.65
- Use minimal text-only treatment for badges and banners (no pill/button styling), keeping only the primary CTA button bold and prominent. Confidence: 0.70
- Keep font styles (size, weight, family, color) as consistent as possible across all elements on a page — minimize differences in typography. If a user points out a style mismatch, match the precise existing font/size/color exactly. Confidence: 0.80
- Keep styling "basic, normal, simple" — avoid anything that looks AI-generated (fancy containers, pill badges, overly designed elements). If a user says something looks "AI-like", simplify it to plain text with minimal or no container styling. Confidence: 0.80
- When standardizing page typography, prefer larger font sizes and more white text color. Confidence: 0.75
- When standardizing typography on a page, maintain clear visual hierarchy between headings and body text — don't make everything the same size; keep distinguishable heading/subheading/body levels. Confidence: 0.75
- Never use inline `style={{}}` with Tailwind responsive prefixes (`md:`, `lg:`), because inline styles have higher CSS specificity than Tailwind classes and will override the responsive variants on all screen sizes. Always use Tailwind utility classes instead (e.g., `bg-[#...] md:bg-[#...]` not `style={{ backgroundColor: ... }}` with responsive classes). Confidence: 0.70
