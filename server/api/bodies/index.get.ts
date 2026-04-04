import { and, asc, desc, eq, inArray, isNotNull } from 'drizzle-orm'

import { BodyType } from './../../../shared/enums/body-type'
import { Sorting } from '~~/shared/enums/sorting'
import { z } from 'zod'

const SortField = z.enum(['distance'])
const SortOrder = z.nativeEnum(Sorting)

type SortField = z.infer<typeof SortField>

const sortFieldMap: Record<SortField, typeof schema.bodies.semimajorAxis> = {
  distance: schema.bodies.semimajorAxis
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const validationSchema = z.object({
    id: z.coerce.number().int().positive().optional(),
    type: z.nativeEnum(BodyType).optional(),
    parentId: z.coerce.number().int().positive().optional(),
    hasImage: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
    sortBy: SortField.optional(),
    sortOrder: SortOrder.optional()
  })

  const { id, type, parentId, hasImage, sortBy, sortOrder } = validationSchema.parse(query)

  const orderBy = () => {
    if (sortBy) {
      return sortOrder === Sorting.Ascending
        ? asc(sortFieldMap[sortBy])
        : desc(sortFieldMap[sortBy])
    }
  }

  if (!parentId) {
    return await db
      .select()
      .from(schema.bodies)
      .where(
        and(
          id ? eq(schema.bodies.id, id) : undefined,
          type ? eq(schema.bodies.type, type) : undefined,
          hasImage ? isNotNull(schema.bodies.imageUrl) : undefined
        )
      )
      .orderBy(orderBy() ?? schema.bodies.id)
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
