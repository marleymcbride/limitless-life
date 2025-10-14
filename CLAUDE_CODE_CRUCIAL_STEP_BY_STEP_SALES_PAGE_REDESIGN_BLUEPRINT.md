LIMITLESS SALES PAGE 2.0 REDESIGN - CLAUDE CODE INITIALIZATION.

Your Sales Page Revamp - inspired by Ed Lawrence's Sales Page META-PROMPT.

I. OPERATIONAL MISSION

Transform the Limitless sales page to EXACTLY REPLICATE the design designed laid out here's sales page while incorporating Scott's pain points and our solution. This is a MANDATE to match the visual style, layout, and design elements specified - NOT to create a new interpretation.

Your implementation must serve simultaneously: 4 Buyer Types (Neanderthal, Nerd, Hippie, Jobs Worth) 3 Visitor Types (Quick Deciders, Skimmers, Full Readers) 1 Core Avatar (Scott — high-earning executive, skeptical, burnt out)

This is a STRUCTURAL REPLICATION mandate. NO CREATIVE INFERENCE IS PERMITTED under any circumstances.

II. NON-NEGOTIABLE DESIGN MANDATE — EXACT REPLICATION REQUIRED

MANDATE: You must EXACTLY REPLICATE the design style described in this blueprint:

 COLOR SCHEME:
 70% white backgrounds, 30% black backgrounds
 Red used ONLY for CTA buttons and subtle accent elements (5-10% opacity)
 NO other colors permitted under any circumstances
 TYPOGRAPHY:
 Clean serif typography ONLY
 NO font changes, NO letter spacing adjustments, NO text effects
 Clear headline hierarchy with consistent sizing
 LAYOUT:
 Clean, minimal section layouts
 Consistent spacing, padding, and margins
 NO layout modifications beyond content replacement
 VISUAL ELEMENTS:
 Use ONLY real images, NO designed UI cards or fake representations
 Simple, clean testimonial and proof displays
 NO new visual elements beyond what's specified
 INTERACTIVITY:
 ZERO animations, transitions, or hover effects
 Static elements ONLY
 MANDATE: Every component, headline, and section must EXACTLY match the visual style described. NO DEVIATION permitted.

III. CORE DESIGN PRINCIPLES

Visual Style:

 70% white backgrounds, 30% black backgrounds
 Red used sparingly: only 5-10% opacity in hero section and CTA buttons
 Zero animations, transitions, or hover effects
 Maximum readability with strong contrast
 Real screenshots, no designed cards
 Typography:

 Maintain current typography and headline styles from hero section
 Apply these same styles consistently throughout new sections
 No changes to font choices, sizes, or weights
 Content Philosophy:

 Outcome language ONLY (no branded terminology)
 Every headline answers "So what?"
 Proof in EVERY section (not just testimonial blocks)
 Feature-Benefit-Context chains throughout
 Long-form content for serious buyers
 IV. WORKING STYLE DIRECTIVE — RESTRICTIVE IMPLEMENTATION

You are:

 Strictly replicating the specified design style
 Replacing content ONLY, not design elements
 Maintaining exact visual consistency
 Focused on conversion psychology within the established design
 You are NOT:

 Changing ANY design elements
 Adding ANY new visual components
 Modifying typography or spacing
 Using ANY creative interpretation
 Implementing ANY design suggestions beyond exact replication
 V. SCOTT'S PAIN FRAMEWORK (For Content Integration)

ULTIMATE WANTS (Deep-seated desires he's almost given up on):

 "I just want to wake up with actual, real energy. Not the fake, coffee-fueled kind."
 "I want to be present. Truly present. For my kids, my wife, my friends."
 "I want to feel proud of my body again. Not just 'not fat,' but strong, capable."
 "I want to reclaim my vitality, that spark I used to have."
 "I want to be free from this constant craving for coffee, for a drink."
 "I want to perform at my absolute peak, consistently, without the crashes."
 BLEEDING NECK PAINS (Daily, grinding realities):

 "Why do I wake up stressed as soon as my eyes open?"
 "I drag myself out of bed every morning, already wondering how the hell I'm going to get through another day."
 "I'm successful on paper, but inside, I feel like absolute shit. Like I'm ruined."
 "That subtle tightness in my chest... that's anxiety, isn't it?"
 "My body feels like it's betraying me. The gut, the love handles, the bags under my eyes."
 "I'm stuck in this cycle: need coffee to start, drink to unwind, sleep like crap, repeat."
 SELF-DISAPPOINTMENT (Internal shame and lies):

 "I know I need to get control of my drinking. Every Friday, I promise myself it'll be different, and every Friday, I fail."
 "I'm a successful man... why can't I just 'willpower' my way out of this? Am I weak?"
 "Maybe this is just 'getting older.' Everyone says it's downhill after 30."
 "I'm ashamed to take my shirt off. I used to be proud of my body."
 "I've read all the books, tried all the diets. Why can't I figure this out?"
 FUTURE PACING (Terrifying visions if nothing changes):

 "What will happen if I don't sort this out? Will I end up like my dad?"
 "Will my energy just keep declining? Will I lose my edge at work?"
 "Will my relationships suffer? My wife deserves better."
 "When I look in the mirror, do I see the man I thought I'd become?"
 "I don't want to just 'manage' my energy. I want to remove the constraints entirely."
 DEEPEST FRUSTRATION (Existential dread):

 "Why does it feel like the more successful I get, the worse I feel inside?"
 "I'm tired of feeling like a fraud. Successful on the outside, crumbling on the inside."
 "Is this just my life now? This constant battle, this low-level anxiety?"
 "I used to be full of life, full of drive. Where did that man go?"
 "I'm operating at a fraction of what I know I'm capable of."
 VI. SECTION-BY-SECTION BLUEPRINT

**SECTION 1: HERO SECTION - MINIMAL ADJUSTMENTS ONLY

File: /src/components/hero-section.tsx

KEEP UNCHANGED: Overall layout and structure All content and copy Typography and styling Audio waveform element and ENTIRE VSL section must stay UNTOUCHED

 In the gradient definition section (around line 15-20), reduce red gradient opacity to 5-10% Change from-red-900/30 to from-red-900/5 or similar Ensure red only appears in bottom 1/3 with subtle fade

 ADD the current first testimonial content (that's currently in 'immediate-proof-section') to the bottom of the hero section: Simple thin text font in quotes Same avatar underneath the quote, with AVI on the left, name to the right Five-star rating below the name (on the right too) Keep super centred and not wide Contents/text of current testimonial quote without any modifications

 DO NOT CHANGE: Headlines or copy Any other design elements Typography

**SECTION 2: DOES THIS SOUND LIKE YOU? - NEW SECTION

File: /src/components/does-this-sound-like-you.tsx (create new)

IMPLEMENTATION REQUIREMENTS:

 Dark background (bg-black) Headline: "Does This Sound Like You?" Four bullet points with orange checkmarks describing Scott's pain points in raw, authentic language: "You're successful on paper but feel like absolute shit inside." "You drag yourself out of bed wondering how you'll get through the day." "You're stuck in the cycle: coffee to start, alcohol to unwind." "No matter how hard you work at your health, the results don't match the effort." Text: "You're not alone. This is happening to thousands of successful men just like you." Remove all animations, transitions, and hover effects Structure should match the "Does This Sound Like You?" section exactly

**SECTION 3: PERSONAL STORY & AUTHORITY BUILDING - SLIGHT TWEAK

File: /src/components/my-story-section.tsx

KEEP UNCHANGED: All content and copy All design elements All styling and layout

 CHANGE: Remove the green from the green highlighted 'Here's what happened when I stopped fighting my body:' part, so it doesn't look like AI - it doesn't need colour / UI

**SECTION 4: CORE VALUE PROPOSITION - REBUILD EXISTING

File: /src/components/core-value-proposition.tsx (replace existing)

IMPLEMENTATION REQUIREMENTS: Keep White background following Section 3 (bg-white) Headline: "After Working With Countless Exhausted Men, I Realised There Are Only 3 Things You Need To Restore Your Energy" Text explaining the framework discovery First point highlighted: "Fix why you wake up feeling rough every day" Simple text layout with NO design elements Remove all animations, transitions, and hover effects Structure should match the three-point framework exactly Write it super simple, AI-less text - just like Section 3 Red CTA button "See If This Is Right For You" button (bg-red-600 text-white)

**SECTION 5: VIDEO TESTIMONIAL & CALL-TO-ACTION - REBUILD EXISTING

File: /src/components/video-testimonial-cta.tsx (replace existing)

IMPLEMENTATION REQUIREMENTS: All Black section (bg-black) Testimonial text: "i haven't felt this good in years." [Video player for testimonial, using same hosting setup as the VSL (using Bunny.net integration)] Use same video as VSL for now as placeholder Red CTA button "See If This Is Right For You" button (bg-red-600 text-white) below video Remove any animations, transitions, and hover effects Structure should match the quote & CTA section exactly

**SECTION 6: SYSTEM BENEFITS & PROOF - REBUILD EXISTING

File: /src/components/system-benefits-proof.tsx (replace existing)

IMPLEMENTATION REQUIREMENTS: Dark background (bg-gray-900) Headline: "Why This System Will Works for You Even if You Don't Have time and nothing's worked before" Below, thin text saying ""It works because..." Three columns with icons and text: "It fixes your body's natural energy production" "It's designed to maximise your time you do have" "You aren't expected to use 'willpower', because we fix your body at the root" Simple, clean layout with NO animations Remove all animations, transitions, and hover effects Structure should match the three-column feature section exactly

**SECTION 7: RESULTS & PROOF - REBUILD EXISTING

File: /src/components/results-proof.tsx (replace existing)

IMPLEMENTATION REQUIREMENTS: White background (bg-white) Headline: "See some of our Client Results" Student average data: "26 lbs weight loss • 89% alcohol-free • 94% caffeine-free" Health stats: "2-3 training days per week • 1000+ days alcohol-free • Testosterone from 346 to 678 ng/dl" Red "See If This Is Right For You" button Two-column layout below: Client screenshots with transformations, use placeholders for now Remove all animations, transitions, gimicks and hover effects

**SECTION 8: PROCESS EXPLANATION - REBUILD EXISTING

File: /src/components/process-explanation.tsx (replace existing)

IMPLEMENTATION REQUIREMENTS: White background (bg-white) Headline: "The Only System that Helps You Restore Your Energy, Transform Your Body & Get off Alcohol" Subheadline: "by actually fixing your body, health and brain from the inside" Four steps with brief descriptions: "Step 1: Fix your morning energy system" "Step 2: Go to the gym for only 2-3 days a week" "Step 3: Delete your need for booze, caffeine and any substances" "Step 4: Get back your real health with personalized testing"

**SECTION 9: Video testimonials (add new section)

 White background (bg-white) Headline: What clients are saying

 Client testimonials section at bottom "See If This Is Right For You" button No animations, transitions, or hover effects 2 columns Left: Videos on the left of testimonails (again use VSL Bunny.net implementation here again, with VSL video as placeholder) Right: Show before and after text of client's changes (make them up for now)

**SECTION 10: The Big Idea section (add new section)

 Black with background (like the hero section) Headline: "Everything Comes Down To One Thing: Energy" [section guide: go in to presenting The Big Idea of how imporatnt energy is, use the VSL for guidance] Text content: "What would help you grow your business? More energy. What do your family need from you to be a great husband and father? More energy. What would give you the willpower, the tenacity to get your body? More energy. Just imagine what you could do with 4 extra hours of pure energy every day." Subheadline: "I'm operating at a fraction of what's actually possible." [again, mention no AI desing to be used, copy hero section typography etc] No animations, transitions, or hover effects Simple, clean layout matching hero section typography

**SECTION 11: Introducing Limitless (add new section)

 White with background (like the hero section) Headline: "Introducing Limitless Life" [guide: use the VSL here, for where i show them 'living a Limitless Life' Text content: "Picture this - It's a Tuesday morning: You wake up happy, energetic, full of life. You jump out of bed, and feel zero stress. There's this feeling you haven't had in years: you're actually looking forward to the day. Because you have the energy. You finish work, have time for your family, your friends. You go to the gym and only training for 2 days a week, but your arms are getting bigger and your belly's getting smaller." Subheadline: "This was my realisation watching the movie 'Limitless' about 5 years ago." [again, mention no AI desing to be used, copy hero section typography etc] No animations, transitions, or hover effects Simple, clean layout matching hero section typography

**SECTION 12: What's Inside The Limitless Protocol (add new section)

 Black with background (like the hero section) Headline: "The 4 Step System" [presenting the offer here - the 4 methods in a bit more 'sales' / 'here's what you are buying' manner] Four system sections with:

 THE LIMITLESS MORNING SYSTEM
 What it is: Fixes why you wake up feeling rough every day
 Why you need it: Replaces stimulants with natural energy activation
 What you get: The Anti-Stack™, Circadian Re-alignment System, Energy Leak Analysis
 THE LIMITLESS TRAINING SYSTEM
 What it is: Maximum results from 2 days/week training
 Why you need it: Strategic muscle targeting for visual authority
 What you get: Rest-Focused Training™, Power Presence Method™, The Natty Sweet Spot™
 THE LIMITLESS FLOW SYSTEM
 What it is: Eliminates dependency without withdrawal hell
 Why you need it: Restores dopamine/energy systems without stimulants
 What you get: Alcohol-Free Lifestyle System, Natural Energy Protocol, Social Integration
 THE LIMITLESS HEALTH SYSTEM
 What it is: Reverses insulin resistance through strategic nutrient timing
 Why you need it: Restores cortisol dominance to restore testosterone
 What you get: Metabolic Priming™, Hormone Reset™, Peptide Bio-Stacking™ Red "See If This Is Right For You" button [again, mention no AI desing to be used, copy hero section typography etc] No animations, transitions, or hover effects Simple, clean layout matching hero section typography
 **SECTION 13: more testimonials (add new section)

IMPLEMENTATION REQUIREMENTS: White background (bg-white) Headline: "Real results, real people" 2 columns Left: [insert client result like - "Meet Stephen He's a 61-year-old surgeon who struggled with excess body fat, a lack of confidence and low energy."] Right: [video again, using Bunny.net integration] [again, mention no AI desing to be used, copy hero section typography etc] Red "See If This Is Right For You" button No animations, transitions, or hover effects Simple, clean layout matching hero section typography

**SECTION 14: EXCLUSIVITY / PERSONAL ATTENTION & FAQ - REBUILD EXISTING

File: /src/components/exclusivity-personal-attention.tsx (replace existing)

Working with clients: IMPLEMENTATION REQUIREMENTS: Black background (bg-black) Headline: "Why I Only Work With A Small Number Of New Clients Each Month" Text explaining limited client approach for personalized service Benefits of joining: Direct team access 24/7 chat support Close executive community System improvements based on feedback Red "See If This Is Right For You" button Community member feedback section Remove all animations, transitions, and hover effects Structure should match the client limitation section exactly

**SECTION 15: - FAQ (add new section)

IMPLEMENTATION REQUIREMENTS: White background (bg-white) Headline: "FAQs" [All the MAIN questions they will have, according to the questions and thoughts we earlier identified] Questions to include: "Will this work if I travel constantly for work?" "I've tried everything before - why would this be different?" "How much time do I actually need to commit?" "Do I have to give up coffee and alcohol forever?" "What if I don't see results?" "Is this suitable for my age?" "How is this different from other programs?" "What kind of support do I get?" INTERACTIVE ELEMENT: make these clickable questions that drop down super smooth and simply - but minimalistically underneath, thin text saying "A Healthy Person Has A Thousand Wishes, A Sick Person Just One" No animations, transitions, or hover effects Simple, clean layout matching hero section typography

**SECTION 16: URGENCY & FINAL CALL-TO-ACTION - REBUILD EXISTING

File: /src/components/urgency-final-cta.tsx (replace existing)

IMPLEMENTATION REQUIREMENTS: Black background with red (matching the hero section) Headline: "What Is Your Other Option?" [text section - to pain out the question of 'what else?' future pace the guaranteed situation of if they don't act, they'll be exactly where they are still in 6 months. Must truly evoke emotion here by speaking to their associate deepest pain, to get them to act NOW] Text content: "Option 1: Do nothing. Stay exactly where you are. Keep waking up exhausted, keep needing coffee and alcohol, keep feeling ashamed when you look in the mirror. Option 2: Try to figure this out yourself. You go try to piece together everything over the next 6-12 months. But if that was true, you wouldn't even be here. Option 3: Get started today. This is your time - right now - to make a change. Picture this - six months from now. You wake up and for the first time in years, you feel like your old self again. Your mind's clear. You feel 25 again. You look in the mirror and see a body you're genuinely proud of. That's how you SHOULD feel. But without action, nothing changes." [to fill in] Remove all animations, transitions, and hover effects Red CTA button again here with text "See If This Is Right For You"

**SECTION 17: - FAQ (add new section) Big wall of client testimonials section at bottom, that goes on and on [just use some placeholder images for now, 2 columns to fit 2 images at a time, repeat for 10 rows] IMPLEMENTATION REQUIREMENTS: White background (bg-white) Headline: "More Transformations" 2 columns with 2 images per row, repeat for 10 rows Use placeholder images for client transformations No animations, transitions, or hover effects Simple, clean layout matching hero section typography

VII. MAIN PAGE RESTRUCTURE

File: /src/app/page.tsx

UPDATE the component imports and order:

 Keep existing imports for first three sections
 Add imports for all new components
 In the return statement, maintain first three sections in their current order
 Replace all subsequent sections with new components in specified order
 Ensure 70% white, 30% black background ratio
 VIII. DESIGN SYSTEM CLEANUP

File: /src/lib/utils.ts

UPDATE the bgClasses to ensure proper color distribution:

 Keep existing white, black, and lightGrey classes
 In the red gradient function, reduce opacity to 5-10%
 Remove any excessive red gradient functions
 Ensure only minimal red usage in hero section
 IX. COMPONENT DELETION

Files to delete completely:

 Any existing components after the first three sections that are being replaced
 Any components with excessive red styling or animations
 Any components with branded terminology that doesn't match outcome language
 X. CONTENT REPLACEMENT GUIDELINES

 OUTCOME LANGUAGE ONLY:
 Replace ALL branded terminology with outcome-focused language
 Examples:
 "Limitless Morning™" → "Wake up with sustained energy"
 "Anti-Stack™" → "Simple, effective approach"
 "Natty Sweet Spot™" → "Optimal balance without extremes"
 PROOF INTEGRATION:
 Add specific numbers and results throughout
 Include real testimonials with specific outcomes
 Use before/after data where applicable
 BUYER TYPE TARGETING:
 Neanderthal: Big, results-driven headlines
 Nerd: Specific numbers and case studies
 Hippie: Personal transformation stories
 Jobs Worth: Risk reversal and guarantees
 SCOTT'S LANGUAGE:
 Use Scott's exact internal monologue and pain points
 Mirror his questions, frustrations, and desires
 Address both surface pains and core emotional pains
 Create urgency through consequence visualization
 OFFER PRESENTATION:
 Focus on "wow" factor of proprietary systems without revealing how
 For each system, include: what it is, why they need it, what they get
 Always relate back to how it can help them specifically
 Keep it intriguing but not overly detailed (save details for Google Doc)
 XI. TECHNICAL IMPLEMENTATION PLAN

PHASE 0: SETUP & PREPARATION

 Create backup of current implementation
 Set up branch for new implementation
 Prepare all necessary assets (images, videos)
 PHASE 1: HERO SECTION ADJUSTMENT

 In /src/components/hero-section.tsx, reduce red gradient opacity to 5-10%
 ADD the current testimonial content to the bottom of the hero section
 Keep all other elements unchanged
 PHASE 2: DOES THIS SOUND LIKE YOU? SECTION CREATION

 Create does-this-sound-like-you.tsx with dark background and clean layout
 Replace content with Scott's exact language and pain points in raw, authentic style
 Ensure exact visual match to the style
 PHASE 3: FIRST THREE SECTIONS - KEEP UNCHANGED

 Verify my story section remains exactly as is
 No changes to these components
 PHASE 4: CORE VALUE PROPOSITION IMPLEMENTATION

 Implement core-value-proposition.tsx with white background and simple text layout
 Replace content with relevant framework points
 Ensure exact visual match to the style
 PHASE 5: REMAINING SECTIONS IMPLEMENTATION

 Implement video-testimonial-cta.tsx with white/black contrast and video player
 Implement system-benefits-proof.tsx with dark background and icons
 Implement results-proof.tsx with data displays and screenshots
 Implement process-explanation.tsx with 4 steps and testimonials
 Implement exclusivity-personal-attention.tsx explaining limited approach
 Implement urgency-final-cta.tsx with enrollment closing message
 Ensure exact visual match to the style for all sections
 PHASE 6: MAIN PAGE RESTRUCTURE

 Update imports and component order in page.tsx
 Ensure 70% white, 30% black background ratio
 PHASE 7: FINAL REVIEW & OPTIMIZATION

 Review all sections for exact visual match to the style
 Test responsiveness across devices
 Optimize loading speed
 Ensure all CTAs are properly linked
 XII. EXECUTION COMMAND — LOCKDOWN

You have fully internalized the MANDATE to EXACTLY REPLICATE the design designed laid out here's sales page while incorporating Scott's pain points and our solution.

You will begin implementation at PHASE 1, following the section-by-section blueprint exactly.

NO CREATIVE INTERPRETATION. NO DESIGN EXPERIMENTS. NO DEVIATION from the specifications.

REPLICATE EXACTLY. MAINTAIN DESIGN. REPLACE CONTENT ONLY.

BEGIN EXACT REPLICATION IMPLEMENTATION.