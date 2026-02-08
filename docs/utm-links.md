# UTM Link Documentation - Limitless Life

## Table of Contents
1. [Introduction](#introduction)
2. [Base URL](#base-url)
3. [UTM Parameter Structure](#utm-parameter-structure)
4. [Complete Link List](#complete-link-list)
   - [YouTube Links](#youtube-links)
   - [Email List Links](#email-list-links)
   - [Lead Magnet Links](#lead-magnet-links)
   - [Twitter/X Links](#twitterx-links)
   - [marleymcbride.co Blog Links](#marleymcbrideco-blog-links)
   - [Ads Links](#ads-links)
5. [Usage Guidelines](#usage-guidelines)
6. [Implementation Notes](#implementation-notes)

---

## Introduction

**What is UTM Tracking?**

UTM (Urchin Tracking Module) parameters are tags added to URLs to track the effectiveness of marketing campaigns across different traffic sources. When a user clicks a link with UTM parameters, the tracking information is captured and stored.

**Why We Use UTM Tracking**

- **Attribution**: Know exactly where each conversion comes from
- **Optimization**: Identify which channels perform best
- **ROI Calculation**: Measure return on investment for each marketing effort
- **Data-Driven Decisions**: Base marketing decisions on actual data, not assumptions

**How It Works on Limitless Life**

1. User clicks a UTM-tagged link
2. Session API (`/api/session`) captures UTM parameters
3. Parameters stored in 30-day cookie
4. All actions attributed to original traffic source
5. Conversion data tracked across entire funnel

---

## Base URL

All UTM links use the following base URL:

```
https://www.limitless-life.co
```

**Note**: Always use the `https://` protocol to ensure security and proper tracking.

---

## UTM Parameter Structure

### Standard Format

```
https://www.limitless-life.co?utm_source={source}&utm_campaign={campaign}&utm_medium={medium}
```

### Parameter Definitions

| Parameter | Purpose | Examples |
|-----------|---------|----------|
| `utm_source` | Where the traffic comes from | `youtube`, `email`, `twitter`, `blog` |
| `utm_campaign` | Specific campaign or promotion | `3wtjoob_day1`, `anti_stack_video`, `vsl_launch` |
| `utm_medium` | Marketing medium or channel | `video`, `email`, `post`, `banner`, `bio` |

### Parameter Order

Always maintain this order for consistency:
1. `utm_source`
2. `utm_campaign`
3. `utm_medium`

### Encoding Special Characters

If campaign names contain spaces or special characters, use URL encoding:
- Space → `%20`
- Example: `?utm_campaign=welcome%20sequence`

---

## Complete Link List

### YouTube Links

**Source**: `youtube` | **Campaign**: Various | **Medium**: Various

All YouTube links use `utm_source=youtube`

| Placement | Campaign Name | Medium | Full URL |
|-----------|---------------|--------|----------|
| Video Description | `youtube_description` | `video` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_description&utm_medium=video` |
| Pinned Comment | `youtube_pinned_comment` | `comment` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_pinned_comment&utm_medium=comment` |
| Comment Link | `youtube_comment_link` | `comment` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_comment_link&utm_medium=comment` |
| Channel Banner | `youtube_channel_banner` | `banner` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_channel_banner&utm_medium=banner` |
| Community Post | `youtube_community_post` | `post` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_community_post&utm_medium=post` |
| Shorts Description | `youtube_shorts_description` | `video` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_shorts_description&utm_medium=video` |
| End Screen | `youtube_end_screen` | `end_screen` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_end_screen&utm_medium=end_screen` |
| Info Card | `youtube_info_card` | `info_card` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_info_card&utm_medium=info_card` |

**Total YouTube Links**: 8

---

### Email List Links

**Source**: `email` | **Campaign**: Various | **Medium**: `email`

All email links use `utm_source=email` and `utm_medium=email`

#### Welcome Sequence (2 emails)

| Email Name | Campaign Name | Full URL |
|------------|---------------|----------|
| Welcome Email 1 | `welcome_sequence_1` | `https://www.limitless-life.co?utm_source=email&utm_campaign=welcome_sequence_1&utm_medium=email` |
| Welcome Email 2 | `welcome_sequence_2` | `https://www.limitless-life.co?utm_source=email&utm_campaign=welcome_sequence_2&utm_medium=email` |

#### "What to Join Instead of Oxford Bootcamp" - Day 0 (2 emails)

| Email Name | Campaign Name | Full URL |
|------------|---------------|----------|
| Day 0 Email 1 | `3wtjoob_day0_1` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day0_1&utm_medium=email` |
| Day 0 Email 2 | `3wtjoob_day0_2` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day0_2&utm_medium=email` |

#### 3WTJOOB Daily Sequence (30 emails)

| Email Name | Campaign Name | Full URL |
|------------|---------------|----------|
| Day 1 | `3wtjoob_day1` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day1&utm_medium=email` |
| Day 2 | `3wtjoob_day2` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day2&utm_medium=email` |
| Day 3 | `3wtjoob_day3` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day3&utm_medium=email` |
| Day 4 | `3wtjoob_day4` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day4&utm_medium=email` |
| Day 5 | `3wtjoob_day5` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day5&utm_medium=email` |
| Day 6 | `3wtjoob_day6` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day6&utm_medium=email` |
| Day 7 | `3wtjoob_day7` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day7&utm_medium=email` |
| Day 8 | `3wtjoob_day8` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day8&utm_medium=email` |
| Day 9 | `3wtjoob_day9` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day9&utm_medium=email` |
| Day 10 | `3wtjoob_day10` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day10&utm_medium=email` |
| Day 11 | `3wtjoob_day11` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day11&utm_medium=email` |
| Day 12 | `3wtjoob_day12` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day12&utm_medium=email` |
| Day 13 | `3wtjoob_day13` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day13&utm_medium=email` |
| Day 14 | `3wtjoob_day14` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day14&utm_medium=email` |
| Day 15 | `3wtjoob_day15` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day15&utm_medium=email` |
| Day 16 | `3wtjoob_day16` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day16&utm_medium=email` |
| Day 17 | `3wtjoob_day17` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day17&utm_medium=email` |
| Day 18 | `3wtjoob_day18` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day18&utm_medium=email` |
| Day 19 | `3wtjoob_day19` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day19&utm_medium=email` |
| Day 20 | `3wtjoob_day20` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day20&utm_medium=email` |
| Day 21 | `3wtjoob_day21` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day21&utm_medium=email` |
| Day 22 | `3wtjoob_day22` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day22&utm_medium=email` |
| Day 23 | `3wtjoob_day23` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day23&utm_medium=email` |
| Day 24 | `3wtjoob_day24` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day24&utm_medium=email` |
| Day 25 | `3wtjoob_day25` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day25&utm_medium=email` |
| Day 26 | `3wtjoob_day26` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day26&utm_medium=email` |
| Day 27 | `3wtjoob_day27` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day27&utm_medium=email` |
| Day 28 | `3wtjoob_day28` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day28&utm_medium=email` |
| Day 29 | `3wtjoob_day29` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day29&utm_medium=email` |
| Day 30 | `3wtjoob_day30` | `https://www.limitless-life.co?utm_source=email&utm_campaign=3wtjoob_day30&utm_medium=email` |

**Total Email Links**: 34 (2 welcome + 2 day0 + 30 daily)

**Note**: Task specification mentioned 32 emails. This document includes all 34 emails:
- 2 welcome sequence emails
- 2 day 0 emails (3WTJOOB introductory)
- 30 daily sequence emails (Day 1-30)
- Total: 34 email campaigns

---

### Lead Magnet Links

**Source**: `lead_magnet` | **Campaign**: Various | **Medium**: Various

| Lead Magnet | Campaign Name | Medium | Full URL |
|-------------|---------------|--------|----------|
| Anti-Stack Video | `anti_stack_video` | `video` | `https://www.limitless-life.co?utm_source=lead_magnet&utm_campaign=anti_stack_video&utm_medium=video` |
| 3WTJOOB Course | `3wtjoob_course` | `course` | `https://www.limitless-life.co?utm_source=lead_magnet&utm_campaign=3wtjoob_course&utm_medium=course` |

**Total Lead Magnet Links**: 2

---

### Twitter/X Links

**Source**: `twitter` | **Campaign**: Various | **Medium**: Various

| Placement | Campaign Name | Medium | Full URL |
|-----------|---------------|--------|----------|
| General Posts | `twitter_posts` | `post` | `https://www.limitless-life.co?utm_source=twitter&utm_campaign=twitter_posts&utm_medium=post` |
| Bio Link | `twitter_bio` | `bio` | `https://www.limitless-life.co?utm_source=twitter&utm_campaign=twitter_bio&utm_medium=bio` |

**Total Twitter/X Links**: 2

---

### marleymcbride.co Blog Links

**Source**: `blog` | **Campaign**: Various | **Medium**: Various

| Placement | Campaign Name | Medium | Full URL |
|-----------|---------------|--------|----------|
| Homepage | `blog_homepage` | `link` | `https://www.limitless-life.co?utm_source=blog&utm_campaign=blog_homepage&utm_medium=link` |
| More Offerings Page | `blog_more_offerings` | `link` | `https://www.limitless-life.co?utm_source=blog&utm_campaign=blog_more_offerings&utm_medium=link` |
| Article CTA | `blog_article_cta` | `cta` | `https://www.limitless-life.co?utm_source=blog&utm_campaign=blog_article_cta&utm_medium=cta` |

**Total Blog Links**: 3

---

### Ads Links (Future)

**Source**: Platform name | **Campaign**: Various | **Medium**: `paid`

These links are prepared for future paid advertising campaigns.

| Platform | Campaign Name | Medium | Full URL |
|----------|---------------|--------|----------|
| Facebook Ads | `facebook_ads` | `paid` | `https://www.limitless-life.co?utm_source=facebook&utm_campaign=facebook_ads&utm_medium=paid` |
| Google Ads | `google_ads` | `paid` | `https://www.limitless-life.co?utm_source=google&utm_campaign=google_ads&utm_medium=paid` |
| YouTube Ads | `youtube_ads` | `paid` | `https://www.limitless-life.co?utm_source=youtube&utm_campaign=youtube_ads&utm_medium=paid` |
| Twitter Ads | `twitter_ads` | `paid` | `https://www.limitless-life.co?utm_source=twitter&utm_campaign=twitter_ads&utm_medium=paid` |
| TikTok Ads | `tiktok_ads` | `paid` | `https://www.limitless-life.co?utm_source=tiktok&utm_campaign=tiktok_ads&utm_medium=paid` |
| LinkedIn Ads | `linkedin_ads` | `paid` | `https://www.limitless-life.co?utm_source=linkedin&utm_campaign=linkedin_ads&utm_medium=paid` |

**Total Ad Links (Future)**: 6

---

## Usage Guidelines

### Best Practices

1. **Always Use UTM Links**
   - Never use plain links in marketing materials
   - Every external link should be trackable

2. **Use the Correct Link for Each Context**
   - YouTube descriptions → `youtube_description`
   - Email campaigns → Use specific day/sequence name
   - Social posts → Platform-specific links

3. **Case Sensitivity**
   - Use lowercase for all parameter values
   - Example: `utm_source=youtube` (not `YouTube` or `YOUTUBE`)

4. **Link Testing**
   - Test all links before publishing
   - Verify tracking parameters are preserved
   - Check that redirects maintain UTM parameters

5. **Consistency**
   - Use the exact links documented here
   - Don't create custom UTM parameters without updating this document

### Common Mistakes to Avoid

- ❌ Using `&` instead of `?` for the first parameter
- ❌ Mixing up parameter order
- ❌ Using spaces without URL encoding
- ❌ Creating custom campaign names without documentation
- ❌ Forgetting UTM parameters in hurry

### Link Placement Checklist

**YouTube Video:**
- [ ] Description link
- [ ] Pinned comment
- [ ] End screen element
- [ ] Info card
- [ ] Community post (if applicable)

**Email Campaign:**
- [ ] Primary CTA button
- [ ] Secondary links (if different destination)
- [ ] Use day-specific campaign name

**Social Media:**
- [ ] Bio link (permanent)
- [ ] Post links (track individual campaigns)

---

## Implementation Notes

### Technical Architecture

**Session Tracking API**
- Location: `/api/session`
- File: `src/app/api/session/route.ts`
- Captures: `utm_source`, `utm_medium`, `utm_campaign`

**Cookie Duration**
- Length: 30 days
- Purpose: Attribute conversions to original traffic source
- Scope: Entire domain (`limitless-life.co`)

**Data Capture Flow**

```
User Clicks UTM Link
        ↓
Session API Called (/api/session)
        ↓
Parameters Extracted from URL
        ↓
Session Created/Updated in Database
        ↓
30-Day Cookie Set
        ↓
All Future Actions Attributed to Original Source
```

### Captured Data Points

The session tracking captures:
1. **UTM Source** (`utm_source`) - Traffic origin platform
2. **UTM Medium** (`utm_medium`) - Marketing channel
3. **UTM Campaign** (`utm_campaign`) - Specific campaign identifier
4. **Referrer** (`referrer`) - HTTP referrer header
5. **Device Type** (`deviceType`) - Mobile or desktop
6. **Session ID** (`sessionId`) - Unique identifier

### Attribution Model

**First-Touch Attribution**
- The first UTM parameters a user arrives with are stored
- All subsequent actions are attributed to this original source
- Attribution window: 30 days from first click

**Override Conditions**
- New UTM parameters within 30 days update the session
- Direct access without UTM parameters maintains original attribution
- After 30 days, new UTM parameters create new attribution

### Data Privacy

- No personally identifiable information (PII) captured
- Cookies used only for attribution purposes
- Compliant with GDPR and privacy regulations
- Users can clear cookies to reset tracking

### Monitoring and Analytics

**What Gets Tracked**
- Page views
- VSL views (Video Sales Letter)
- Form submissions
- Email signups
- Purchases/conversions

**Reporting Metrics**
- Traffic by source (YouTube, email, Twitter, etc.)
- Campaign performance (which emails/videos convert best)
- Medium effectiveness (video vs. post vs. comment)
- Device type breakdown
- Conversion rate by traffic source

---

## Quick Reference Card

### URL Template
```
https://www.limitless-life.co?utm_source={source}&utm_campaign={campaign}&utm_medium={medium}
```

### Common Sources
- `youtube` - YouTube platform
- `email` - Email campaigns
- `twitter` - Twitter/X platform
- `blog` - marleymcbride.co blog
- `lead_magnet` - Lead magnet delivery
- `facebook` - Facebook ads (future)
- `google` - Google ads (future)

### Common Mediums
- `video` - Video content
- `email` - Email message
- `post` - Social media post
- `comment` - Comment section
- `banner` - Banner graphic
- `bio` - Profile bio link
- `paid` - Paid advertisement

### Total Links by Category
| Category | Count |
|----------|-------|
| YouTube | 8 |
| Email List | 34 |
| Lead Magnets | 2 |
| Twitter/X | 2 |
| Blog | 3 |
| Ads (Future) | 6 |
| **Total** | **55** (49 active + 6 future ads) |

---

## Document Maintenance

### Version History
- **v1.0** (2026-02-08) - Initial documentation with all tracking links

### Update Process
1. Add new traffic sources to appropriate section
2. Update "Total Links" count
3. Add version history entry
4. Notify team of changes

### Questions?
For questions about UTM tracking or to request new links, contact the development team.

---

**Last Updated**: February 8, 2026
**Document Version**: 1.0
**Next Review**: March 8, 2026
