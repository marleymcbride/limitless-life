YouTube Views This Month — Dev Handoff
What's been built

An n8n workflow ([limitless-life] YouTube Daily Metrics → Postgres, ID: tbp8HWiTW68raRh9) runs every night at 1am. It pulls current view and click counts for all 14 YouTube campaigns from Airtable and writes a daily snapshot into the campaign_metrics table in Postgres. This gives you a cumulative view count per campaign per day, from which you can calculate the monthly delta.

Database tables involved

campaigns — one row per YouTube campaign

id (uuid, PK)
name (text)
utm_campaign (text, unique)
category (text) — all YouTube campaigns are video

campaign_metrics — one row per campaign per day

id (uuid, PK)
campaign_id (uuid, FK → campaigns.id)
metric_date (date)
views (int) — cumulative total views as of that date
clicks (int) — cumulative total clicks as of that date
The query for the dashboard
sql
SELECT 
  c.name,
  MAX(cm.views) - MIN(cm.views) AS views_this_month,
  MAX(cm.clicks) - MIN(cm.clicks) AS clicks_this_month
FROM campaign_metrics cm
JOIN campaigns c ON cm.campaign_id = c.id
WHERE cm.metric_date >= DATE_TRUNC('month', CURRENT_DATE)
AND c.utm_campaign != 'test-campaign-123'
GROUP BY c.id, c.name
ORDER BY views_this_month DESC;

This returns views and clicks gained this month per campaign, calculated as the difference between the earliest and latest snapshot in the current month.

Current data (July 27 2026)
Video	Views this month	Clicks this month
Lose 30 lbs	574	2
How I Went From Fat and Miserable to Feeling Electric Every Day	290	2
Alcohol 90-day timeline	222	2
Why Being Shredded Sucks	41	1
change your life 6-12m	39	5
2 Day Build System	26	13
My story	24	4
Can you get jacked training only twice a week?	23	2
Why Training 2 Days a Week Fixes Your Whole Life	20	7
My Secret Formula to Feel F*cking Great (Every Day)	11	6
stop intermittent fasting (do this instead)	10	0
Killing Your Gains	8	4
Geoff case study video	6	4
Case study: He dropped his body fat by 25% in 9 weeks	1	0
Chart spec
X axis: campaign name (shortened if needed)
Y axis: views_this_month
Optional secondary metric: clicks_this_month
Data refreshes automatically every night at 1am — no manual updates needed
From August 1st onwards the monthly baseline is written automatically on the 1st of each month
Cleanup

Delete the test campaign row:

sql
DELETE FROM campaigns WHERE utm_campaign = 'test-campaign-123';
Ongoing maintenance

None required. The n8n workflow handles everything automatically. If a new YouTube video is added to the Airtable Campaigns table with a valid SourceURL and UTM_Campaign, it will be picked up automatically on the next nightly run.