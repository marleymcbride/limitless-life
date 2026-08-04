# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# code-style
See [code-style/taste.md](code-style/taste.md)
# writing-style
- Write content in a natural, flowing, human tone. Never use short, fragmented/staccato phrasing. Confidence: 0.90
- Avoid AI-sounding "slop" — no introspective "here's why it's messy" meta-commentary, no fluff buildup, no corporate/chatbot tone, no pithy metaphors or sayings ("I focused on making the pipes work, I never built the tap"), and no clinical/business jargon ("funnel health"). Get straight to the point with direct, honest, human delivery. Confidence: 0.96

# design-style
- For mobile responsive CSS: every element must have BOTH `md:` AND `lg:` prefixes to lock desktop values, with base class serving as the mobile value. If `md:`/`lg:` already exists, only change the base class and leave md/lg values untouched. When moving content up on mobile, prefer removing existing spacing classes (pt, mt, py, mb) rather than adding new mobile positioning classes like justify-start. Every CSS property with an `md:`/`lg:` variant must also have a non-prefixed base class — never set `md:text-lg lg:text-lg` without a base `text-*` class. Confidence: 0.95
- Build admin dashboards as expansive, full-page, notion-style layouts with large 2x2 grid sections that fill the page, not compact metric boxes. Confidence: 0.80
- In admin dashboard layouts, include a top stats/metrics row (with key counts like revenue and lead numbers) positioned above the main dashboard content sections. Confidence: 0.65
See [design-style/taste.md](design-style/taste.md)

# code-style
- When applying responsive className changes to heading elements (h1, h2, h3, etc.), convert the tag to a `<div>` instead — headings in this project don't properly apply className styling changes. Confidence: 0.95

# pricing-display
- When displaying a discount in pricing breakdowns, show the original (strikethrough) and discounted price on the same line rather than creating a separate "discount" line item — separate discount lines look fabricated and forced. Confidence: 0.70

# lead-scoring
- Use a stage-based model where score = highest stage reached (not accumulated points), with granular stages for the sales funnel: sales page engagement, VSL engagement/completion, scrolling, CTA clicks, modal detail entry, 'ready to join', offer doc reading, checkout initiation, and concierge deposit paid. Confidence: 0.70

# terminology
- In admin dashboard sections, don't label non-paying users as "customers" or "clients" — reserve those terms only for people who have actually paid money. Non-paying users should be labeled as "leads". Confidence: 0.70
- Use plain, human-readable language for lead stage labels (e.g., "Leads", "Hot Leads", "Ready to Join", "New Clients") rather than internal/backend jargon terms in the admin dashboard. Confidence: 0.80
- Distinguish three paid tiers in the business model: "Applicants" (deposit paid for a programme), "New Clients" (paid in full for a coaching programme), and "New Customers" (paid for something below coaching — e.g., a standalone course or event ticket, not a programme or deposit). Don't conflate these three groups. Confidence: 0.85

# stripe
- Distinguish between payment commitment durations (how long a program lasts) and payment split options (installment plans for the same program) — these are different concepts. Confidence: 0.75
- Use direct Stripe payment links (static URLs) for simple one-time deposits per product option, rather than the dynamic API checkout session system. Confidence: 0.60
- When replacing a checkout flow pattern, keep the old code annotated with '[OLD]' rather than deleting it. Confidence: 0.70
- Sells in £GBP but tracks/reports all payment and revenue data in USD — every payment row, total, and every money figure on the sales pages AND admin dashboard should display as USD only, never a mix of symbols/currencies; any £ amount, whether newly arriving via Stripe or already sitting in Postgres, must show as USD "in EVERY aspect". Confidence: 0.95
- Currency should be normalized via a live GBP→USD conversion: when a GBP payment comes in via Stripe/Postgres it should already be stored and shown as USD (so downstream displays never have to guess), and the admin dashboard should show a converting USD amount rather than the raw stored value. Confidence: 0.75

# environment-variables
- Before writing code that depends on a new environment variable, ask the user to add/set that variable first. Confidence: 0.80

# analytics-and-tracking
- Capture leads into the database at the earliest funnel step (e.g., email submission on the signup form) by calling a webhook that immediately creates the user record and event — don't rely on URL query params alone for data you need. Confidence: 0.7
- Log funnel events (page views, plan selection, checkout initiation, payment) against a session ID even when the visitor is anonymous, so top-of-funnel data is never lost. Confidence: 0.7

# automation-and-integrations
- Keep business automation (follow-up sequences, notifications, Airtable/CRM sync) in n8n — the app's job is to emit events/webhooks and queue payloads, not implement the automation itself. Confidence: 0.7
- When delegating integration work to an external specialist (e.g., an n8n developer), provide a complete handoff document with exact endpoints, auth headers, payload shapes, and SQL. Confidence: 0.7
- A lead-capture path must land in the canonical internal store (Postgres → Leads → Admin Dash); a path that only reaches external tools (n8n/Airtable) or stubbed code is a gap, not a working capture — audit the real data flow before assuming capture works. Confidence: 0.7

# workflow
See [workflow/taste.md](workflow/taste.md)
