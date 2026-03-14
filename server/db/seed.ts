import _ from 'lodash'
import { consola } from 'consola'
import { fetchSolarSystemBodies } from '../services/solar-system'
import { fetchWikipediaImageUrl } from '../services/wikipedia'
import fs from 'node:fs'
import { mapSolarSystemBodiesApiToDb } from '../mappers/solar-system-to-db'

export async function seedDatabase() {
  consola.start('Seeding database...')

  await db.transaction(async (tx) => {
    await tx.delete(schema.bodyRelations)
    await tx.delete(schema.bodies)

    const bodies = await fetchSolarSystemBodies()

    const cachedIds: { idDb: number, idApi: string }[] = []
    const cachedRelations: {
      idDb: number
      idApi: string
      parentIdApi: string
    }[] = []

    const wikipediaUrls = JSON.parse(
      fs.readFileSync('./server/data/wikipedia.json', 'utf-8')
    ) as { name: string, url: string }[]

    for (const body of bodies) {
      const url = _.find(wikipediaUrls, item => item.name === body.englishName)?.url

      let imageUrl = null
      if (url) {
        imageUrl = await fetchWikipediaImageUrl(url)
      }

      const result = await tx
        .insert(schema.bodies)
        .values(mapSolarSystemBodiesApiToDb(body, imageUrl))

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

    const relationValues = cachedRelations
      .map((relation) => {
        const parentId = _.find(cachedIds, id => id.idApi === relation.parentIdApi)?.idDb
        return parentId ? { parentId, childId: relation.idDb } : null
      })
      .filter((v): v is NewBodyRelation => v !== null)

    if (relationValues.length > 0) {
      await tx.insert(schema.bodyRelations).values(relationValues)
    }
  })

  consola.success('Database seeded successfully.')
}
