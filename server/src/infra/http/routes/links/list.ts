import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { listLinks } from "@/app/functions/list-links";
import { unwrapEither } from "@/shared/either";

export const listLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get Links",
        tags: ["links"],
        response: {
          200: z.object({
            total: z.number(),
            links: z.array(
              z.object({
                id: z.string(),
                shortLink: z.string(),
                originalLink: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await listLinks();

      const { links, total } = unwrapEither(result);
      return reply.status(200).send({ links, total });
    }
  );
};
