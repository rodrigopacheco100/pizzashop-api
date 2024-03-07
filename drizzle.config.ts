import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/db/schemas/index.ts',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DB_URL,
  },
} satisfies Config
