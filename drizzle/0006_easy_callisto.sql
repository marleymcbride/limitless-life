CREATE TABLE "app_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dismissed_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"dismissed_at" timestamp DEFAULT now(),
	CONSTRAINT "dismissed_leads_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_date" timestamp;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "dismissed_leads" ADD CONSTRAINT "dismissed_leads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_dismissed_leads_user_id" ON "dismissed_leads" USING btree ("user_id");