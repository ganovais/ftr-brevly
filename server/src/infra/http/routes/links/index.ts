import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { createLinkRouter } from './create'
import { deleteLinkRouter } from './delete'
import { exportLinksRoute } from './export'
import { listLinksRoute } from './list'
import { visitingLinkRouter } from './visiting-link'

export const linksRouter: FastifyPluginAsyncZod = async (server) => {
  await server.register(createLinkRouter)
  await server.register(deleteLinkRouter)
  await server.register(exportLinksRoute)
  await server.register(listLinksRoute)
  await server.register(visitingLinkRouter)
}
