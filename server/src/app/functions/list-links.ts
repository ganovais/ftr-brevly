import { count } from "drizzle-orm";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/shared/either";

type ListLinksOutput = {
  links: {
    id: string;
    originalLink: string;
    shortLink: string;
    accessCount: number;
    createdAt: Date;
  }[];
  total: number;
};

export async function listLinks(): Promise<Either<never, ListLinksOutput>> {
  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        originalLink: schema.links.originalLink,
        shortLink: schema.links.shortLink,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links),
    db.select({ total: count(schema.links.id) }).from(schema.links),
  ]);

  return makeRight({ links, total });
}
