import { consola } from 'consola'
import { fetchSolarSystemBodies } from '../services/solar-system'
import { mapSolarSystemBodiesApiToDb } from '../mappers/solar-system-to-db'

export async function seedDatabase() {
  consola.start('Seeding database...')
  // const oldBodies = await db.select().from(schema.bodies)
  // TODO puis try catch pour remettre les anciennes valeurs s'il y a un fail

  await db.delete(schema.bodies)

  const bodies = await fetchSolarSystemBodies()

  for (const body of bodies) {
    await db.insert(schema.bodies).values(mapSolarSystemBodiesApiToDb(body))
  }

  // TODO ajouter les relations

  consola.success('Database seeded successfully !')
}
