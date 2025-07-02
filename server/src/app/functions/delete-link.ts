import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

const deleteLinkInput = z.object({
  shortLink: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(input: DeleteLinkInput): Promise<void> {
  const { shortLink } = deleteLinkInput.parse(input);

  const link = await db.query.links.findFirst({
    where: eq(schema.links.shortLink, shortLink),
  });

  if (!link) {
    throw new Error("Link not found", { cause: 404 });
  }

  await db.delete(schema.links).where(eq(schema.links.id, link.id));
}
