import { db } from '@/infra/db'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

import { schema } from '@/infra/db/schemas'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const shortLink = faker.string.alphanumeric(8)

  const result = await db
    .insert(schema.links)
    .values({
      originalLink: faker.internet.url(),
      shortLink,
      ...overrides,
    })
    .returning()

  return result[0]
}
