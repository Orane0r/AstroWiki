import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core'

export const planets = sqliteTable('planets', {
  id: text('id').primaryKey(),
  name: text('name'),
  type: text('type'),
  radius: real('radius'),
  wikipediaTitle: text('wikipedia_title'),
  imageUrl: text('image_url')
})
