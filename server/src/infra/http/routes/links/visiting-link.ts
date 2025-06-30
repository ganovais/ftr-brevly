import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { visitingLink } from "@/app/functions/visiting-link";

export const visitingLinkRouter: FastifyPluginAsyncZod = async (
  server
) => {
  server.get(
    "/links/:shortLink",
    {
      schema: {
        summary: "Get Original Link from Short Link",
        tags: ["links"],
        params: z.object({
          shortLink: z.string(),
        }),
        response: {
          200: z.object({
            originalLink: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params;
      const result = await visitingLink({ shortLink });

      return reply.status(200).send({ originalLink: result });
    }
  );
};
