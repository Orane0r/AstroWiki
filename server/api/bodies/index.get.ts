import { and, desc, eq, inArray } from 'drizzle-orm'

import { BodyType } from './../../../shared/enums/body-type'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const validationSchema = z.object({
    type: z.nativeEnum(BodyType).optional(),
    parentId: z.coerce.number().int().positive().optional()
  })

  const { type, parentId } = validationSchema.parse(query)

  if (!parentId) {
    return await db
      .select()
      .from(schema.bodies)
      .where(type ? eq(schema.bodies.type, type) : undefined)
      .orderBy(schema.bodies.semimajorAxis)
  }

  const childrenIds = await db
    .select({ id: schema.bodyRelations.childId })
    .from(schema.bodyRelations)
    .where(eq(schema.bodyRelations.parentId, parentId))

  if (childrenIds.length === 0) {
    return []
  }

  const ids = childrenIds.map(r => r.id)

  return await db
    .select()
    .from(schema.bodies)
    .where(
      and(
        inArray(schema.bodies.id, ids),
        type ? eq(schema.bodies.type, type) : undefined
      )
    )
    .orderBy(desc(schema.bodies.meanRadius))
})
