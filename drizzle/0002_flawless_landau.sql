CREATE TABLE "campaign_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" uuid NOT NULL,
	"metric_date" timestamp NOT NULL,
	"views" integer DEFAULT 0,
	"clicks" integer DEFAULT 0,
	"emails" integer DEFAULT 0,
	"sales" integer DEFAULT 0,
	"revenue" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"utm_campaign" text NOT NULL,
	"source_url" text,
	"published_at" timestamp,
	"first_event_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "campaigns_utm_campaign_unique" UNIQUE("utm_campaign")
);
--> statement-breakpoint
ALTER TABLE "campaign_metrics" ADD CONSTRAINT "campaign_metrics_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_campaign_metrics_campaign_id" ON "campaign_metrics" USING btree ("campaign_id");--> statement-breakpoint
CREATE INDEX "idx_campaign_metrics_metric_date" ON "campaign_metrics" USING btree ("metric_date");--> statement-breakpoint
CREATE INDEX "idx_campaign_metrics_campaign_date" ON "campaign_metrics" USING btree ("campaign_id","metric_date");--> statement-breakpoint
CREATE INDEX "idx_campaigns_utm_campaign" ON "campaigns" USING btree ("utm_campaign");--> statement-breakpoint
CREATE INDEX "idx_campaigns_category" ON "campaigns" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_campaigns_published_at" ON "campaigns" USING btree ("published_at");