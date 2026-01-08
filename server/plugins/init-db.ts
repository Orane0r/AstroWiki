import { bodies } from 'hub:db:schema'
import { consola } from 'consola'
import { seedDatabase } from '../db/seed'
import { sql } from 'drizzle-orm/sql'

let hasChecked = false

export default defineNitroPlugin(async () => {
  if (hasChecked || import.meta.dev) {
    return
  }

  hasChecked = true

  const result = await db.select({ count: sql<number>`count(*)` }).from(bodies)
  if (result[0].count > 0) {
    consola.info('Database already initialized, skipping seeding.')
  } else {
    await seedDatabase()
  }
})
