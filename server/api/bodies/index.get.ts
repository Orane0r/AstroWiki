import { BodyType } from './../../../shared/enums/body-type'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const validationSchema = z.object({
    type: z.nativeEnum(BodyType)
  })

  const { type } = validationSchema.parse(query)

  const result = await db
    .select()
    .from(schema.bodies)
    .where(eq(schema.bodies.type, type))

  return result
})
