import { STORAGE_BASE, STORAGE_KEYS } from '../constants/storage'

import { consola } from 'consola'
import { seedDatabase } from '../db/seed'

export default defineNitroPlugin(async () => {
  const storage = useStorage(STORAGE_BASE)
  if (await storage.getItem<boolean>(STORAGE_KEYS.dbInitialized)) {
    consola.info('Database already initialized, skipping seeding.')
    return
  }

  await seedDatabase()
  await storage.setItem(STORAGE_KEYS.dbInitialized, true)
})
