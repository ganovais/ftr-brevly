import { pgTable, timestamp, integer, text } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

export const links = pgTable('links', {
  id: text('id').primaryKey().$defaultFn(uuidv7),
  originalLink: text('original_link').notNull(),
  shortLink: text('short_link').notNull().unique(),
  accessesAmount: integer('accesses_amount').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
