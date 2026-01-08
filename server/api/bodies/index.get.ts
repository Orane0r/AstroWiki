import { eq } from 'drizzle-orm'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Validation du paramètre
  const validationSchema = z.object({
    type: z.enum([
      'Planet',
      'Moon',
      'Star',
      'Asteroid',
      'Comet',
      'Dwarf planet'
    ])
  })

  const { type } = validationSchema.parse(query)

  const result = await db
    .select()
    .from(schema.bodies)
    .where(eq(schema.bodies.type, type))

  return result
})
