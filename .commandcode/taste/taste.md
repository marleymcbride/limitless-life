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
- When applying responsive className changes to heading elements (h1, h2, h3, etc.), convert the tag to a `<div>` instead — headings in this project don't properly apply className styling changes. Confidence: 0.85

# stripe
- Distinguish between payment commitment durations (how long a program lasts) and payment split options (installment plans for the same program) — these are different concepts. Confidence: 0.65
- Use direct Stripe payment links (static URLs) for simple one-time deposits per product option, rather than the dynamic API checkout session system. Confidence: 0.60
- When replacing a checkout flow pattern, keep the old code annotated with '[OLD]' rather than deleting it. Confidence: 0.70
