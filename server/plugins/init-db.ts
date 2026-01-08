import { bodies } from 'hub:db:schema'
import { consola } from 'consola'
import { seedDatabase } from '../db/seed'
import { sql } from 'drizzle-orm/sql'

export default defineNitroPlugin(async () => {
  if (import.meta.dev) return

  const result = await db.select({ count: sql<number>`count(*)` }).from(bodies)
  if (result[0].count > 0) {
    consola.info('Database already initialized, skipping seeding.')
  } else {
    await seedDatabase()
  }
})
