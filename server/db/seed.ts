import _ from 'lodash'
import { consola } from 'consola'
import { fetchSolarSystemBodies } from '../services/solar-system'
import { mapSolarSystemBodiesApiToDb } from '../mappers/solar-system-to-db'

export async function seedDatabase() {
  consola.start('Seeding database...')

  await db.delete(schema.bodyRelations)
  await db.delete(schema.bodies)

  const bodies = await fetchSolarSystemBodies()

  const cachedIds: { idDb: number, idApi: string }[] = []

  const cachedRelations: {
    idDb: number
    idApi: string
    parentIdApi: string
  }[] = []

  for (const body of bodies) {
    const result = await db
      .insert(schema.bodies)
      .values(mapSolarSystemBodiesApiToDb(body))

    const id = Number(result.lastInsertRowid)

    if (id) {
      cachedIds.push({ idDb: id, idApi: body.id })
      if (body.aroundPlanet) {
        cachedRelations.push({
          idDb: id,
          idApi: body.id,
          parentIdApi: body.aroundPlanet.planet
        })
      }
    }
  }

  for (const relation of cachedRelations) {
    const parentId = _.find(cachedIds, id => id.idApi === relation.parentIdApi)?.idDb

    if (parentId) {
      const bodyRelation: NewBodyRelation = {
        parentId: parentId,
        childId: relation.idDb
      }

      await db
        .insert(schema.bodyRelations)
        .values(bodyRelation)
    }
  }

  consola.success('Database seeded successfully !')
}
