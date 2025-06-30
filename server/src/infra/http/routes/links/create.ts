import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { unwrapEither } from '@/shared/either'
import { createLink } from '@/app/functions/create-link'

export const createLinkRouter: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create Link',
        tags: ['links'],
        body: z.object({
          originalLink: z.string().url(),
          shortLink: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            originalLink: z.string(),
            shortLink: z.string(),
            accessCount: z.number(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body
      const result = await createLink({
        originalLink,
        shortLink
      })

      const link = unwrapEither(result)
      return reply.status(201).send(link)
    }
  )
}