import { seedDatabase } from '~~/server/db/seed'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed the database with initial data'
  },
  async run() {
    await seedDatabase()

    return { result: 'Database seeded successfully.' }
  }
})
