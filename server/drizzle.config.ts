import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: './src/infra/db/schemas/*',
  dialect: 'postgresql',
  out: './src/infra/db/migrations/*',
} satisfies Config
