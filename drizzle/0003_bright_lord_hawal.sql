CREATE TABLE "contact_tag_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"email" text NOT NULL,
	"tag_id" integer NOT NULL,
	"tag_name" text NOT NULL,
	"detected_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "waitlist_signups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"created_at" timestamp DEFAULT now(),
	"cohort_launch_date" timestamp DEFAULT now(),
	"interest_level" text NOT NULL,
	"choice" text NOT NULL,
	"choice_description" text,
	"lead_score" integer DEFAULT 50,
	"lead_temperature" text DEFAULT 'warm',
	"flow_type" text DEFAULT 'waitlist',
	"source_site" text DEFAULT 'limitless-life.co',
	"tier" text,
	"status" text DEFAULT 'waitlist',
	"ip_address" text,
	"user_agent" text,
	"referrer" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_term" text,
	"utm_content" text,
	"first_seen" timestamp DEFAULT now(),
	"last_seen" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "waitlist_signups_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "source_site" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lead_action" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_action" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_seen_site" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_touch_date" timestamp;--> statement-breakpoint
ALTER TABLE "contact_tag_events" ADD CONSTRAINT "contact_tag_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_tag_events_email" ON "contact_tag_events" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_tag_events_tag_id" ON "contact_tag_events" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_tag_events_detected_at" ON "contact_tag_events" USING btree ("detected_at");--> statement-breakpoint
CREATE INDEX "idx_waitlist_signups_email" ON "waitlist_signups" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_waitlist_signups_interest_level" ON "waitlist_signups" USING btree ("interest_level");--> statement-breakpoint
CREATE INDEX "idx_waitlist_signups_lead_score" ON "waitlist_signups" USING btree ("lead_score");--> statement-breakpoint
CREATE INDEX "idx_waitlist_signups_status" ON "waitlist_signups" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_waitlist_signups_created_at" ON "waitlist_signups" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_users_source_site" ON "users" USING btree ("source_site");--> statement-breakpoint
CREATE INDEX "idx_users_lead_action" ON "users" USING btree ("lead_action");--> statement-breakpoint
CREATE INDEX "idx_users_lead_temperature" ON "users" USING btree ("lead_temperature");