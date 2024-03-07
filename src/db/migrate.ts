import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import config from '../../drizzle.config'
import chalk from 'chalk'

const connectionString = config.dbCredentials.connectionString

const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)
await migrate(db, { migrationsFolder: config.out })
console.log(chalk.greenBright('✅ Migrations applied successfully! 🫡'))
await sql.end()
process.exit(0)
