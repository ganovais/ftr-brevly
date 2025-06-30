ALTER TABLE "links" DROP CONSTRAINT "links_slug_unique";--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "access_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "links" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "links" DROP COLUMN "accesses_amount";