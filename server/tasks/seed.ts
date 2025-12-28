// TODO Initialisation de la base de données avec des données de planètes
// TODO voir si besoin de run la task automatiquement au démarrage
import { db, schema } from 'hub:db'
import { fetchSolarSystemBodies } from '../services/solar-system'
import { mapSolarSystemBodiesApiToDb } from '../mappers/solar-system-to-db'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed database with initial data'
  },
  async run() {
    console.log('Seeding database...')

    // const oldBodies = await db.select().from(schema.bodies)
    // TODO puis try catch pour remettre les anciennes valeurs s'il y a un fail

    // TODO marche pas
    db.delete(schema.bodies)

    const bodies = await fetchSolarSystemBodies()

    for (const body of bodies) {
      await db.insert(schema.bodies).values(mapSolarSystemBodiesApiToDb(body))
    }

    return { result: 'Database seeded successfully' }
  }
})

// TODO ajouter les relations
