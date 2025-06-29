import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const healthRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/health',
    {
      schema: {
        summary: 'Check if service is running',
        tags: ['health'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      return reply.status(200).send({ message: 'ok' })
    }
  )
}
