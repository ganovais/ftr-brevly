import { z } from "zod";
import { eq, sql } from "drizzle-orm";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

const visitingLinkInput = z.object({
  shortLink: z.string(),
});

type VisitingLinkInput = z.input<typeof visitingLinkInput>;

export async function visitingLink(input: VisitingLinkInput): Promise<string> {
  const { shortLink } = visitingLinkInput.parse(input);

  const link = await db.query.links.findFirst({
    where: eq(schema.links.shortLink, shortLink),
  });

  if (!link) {
    throw new Error("Link not found", { cause: 404 });
  }

  await db
    .update(schema.links)
    .set({
      accessCount: sql`${schema.links.accessCount} + 1`,
    })
    .where(eq(schema.links.shortLink, shortLink));

  return link.originalLink;
}
