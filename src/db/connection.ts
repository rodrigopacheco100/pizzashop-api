import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import config from '../../drizzle.config'
import * as schema from './schemas'

const connectionString = config.dbCredentials.connectionString

const connection = postgres(connectionString)

export const db = drizzle(connection, { schema })
