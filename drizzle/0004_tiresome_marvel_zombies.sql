ALTER TABLE "waitlist_signups" ADD COLUMN "application_fields" jsonb;--> statement-breakpoint
ALTER TABLE "waitlist_signups" ADD COLUMN "application_date" timestamp;--> statement-breakpoint
ALTER TABLE "waitlist_signups" ADD COLUMN "notes" text;