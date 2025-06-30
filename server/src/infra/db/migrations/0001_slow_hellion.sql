ALTER TABLE "links" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_slug_unique" UNIQUE("slug");