# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# code-style
See [code-style/taste.md](code-style/taste.md)
# writing-style
- Write content in a natural, flowing, human tone. Never use short, fragmented/staccato phrasing. Confidence: 0.90

# design-style
- For mobile responsive CSS: every element must have BOTH `md:` AND `lg:` prefixes to lock desktop values, with base class serving as the mobile value. If `md:`/`lg:` already exists, only change the base class and leave md/lg values untouched. When moving content up on mobile, prefer removing existing spacing classes (pt, mt, py, mb) rather than adding new mobile positioning classes like justify-start. Every CSS property with an `md:`/`lg:` variant must also have a non-prefixed base class — never set `md:text-lg lg:text-lg` without a base `text-*` class. Confidence: 0.95
See [design-style/taste.md](design-style/taste.md)

# code-style
- When applying responsive className changes to heading elements (h1, h2, h3, etc.), convert the tag to a `<div>` instead — headings in this project don't properly apply className styling changes. Confidence: 0.90

# pricing-display
- When displaying a discount in pricing breakdowns, show the original (strikethrough) and discounted price on the same line rather than creating a separate "discount" line item — separate discount lines look fabricated and forced. Confidence: 0.70

# lead-scoring
- Use a stage-based model where score = highest stage reached (not accumulated points), with granular stages for the sales funnel: sales page engagement, VSL engagement/completion, scrolling, CTA clicks, modal detail entry, 'ready to join', offer doc reading, checkout initiation, and concierge deposit paid. Confidence: 0.70

# stripe
- Distinguish between payment commitment durations (how long a program lasts) and payment split options (installment plans for the same program) — these are different concepts. Confidence: 0.75
- Use direct Stripe payment links (static URLs) for simple one-time deposits per product option, rather than the dynamic API checkout session system. Confidence: 0.60
- When replacing a checkout flow pattern, keep the old code annotated with '[OLD]' rather than deleting it. Confidence: 0.70

# environment-variables
- Before writing code that depends on a new environment variable, ask the user to add/set that variable first. Confidence: 0.80
