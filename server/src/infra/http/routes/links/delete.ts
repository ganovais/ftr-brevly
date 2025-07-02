import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { deleteLink } from "@/app/functions/delete-link";

export const deleteLinkRouter: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:shortLink",
    {
      schema: {
        summary: "Delete Link",
        tags: ["links"],
        params: z.object({
          shortLink: z.string(),
        }),
        response: {
          204: z.void()
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params;
      await deleteLink({ shortLink });

      return reply.status(204).send();
    }
  );
};
