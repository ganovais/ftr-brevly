import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";

import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { type Either, makeRight } from "@/shared/either";

type ExportLinkOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<never, ExportLinkOutput>> {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(1);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "original_link", header: "Original URL" },
      { key: "short_link", header: "Short URL" },
      { key: "access_count", header: "Access Count" },
      { key: "created_at", header: "Created At" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    folder: "downloads",
    fileName: `${new Date().toISOString()}-link.csv`,
    contentType: "text/csv",
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
