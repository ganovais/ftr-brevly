import { z } from 'zod'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

const createLinkInput = z.object({
  originalLink: z.string().url(),
  shortLink: z.string().nonempty()
})

type CreateLinkInput = z.input<typeof createLinkInput>
type CreateLinkOutput = {
  id: string
  originalLink: string
  shortLink: string
  accessCount: number
  createdAt: Date
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<never, CreateLinkOutput>> {
  const { originalLink, shortLink } = createLinkInput.parse(input)

  const existingLink = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortLink, shortLink),
  })

  if (existingLink) {
    throw new Error('Short link already exists', { cause: 409 })
  }

  const result = await db.insert(schema.links).values({
    originalLink,
    shortLink,
  }).returning()

  return makeRight(result[0])
}