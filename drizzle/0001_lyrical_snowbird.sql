ALTER TABLE "events" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "tier" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "utm_content" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "utm_term" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "browser" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "ip_address" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "country_code" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "tier_interest" text;