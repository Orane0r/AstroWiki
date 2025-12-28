import { sqliteTable, text, int, real } from 'drizzle-orm/sqlite-core'

export const bodies = sqliteTable('bodies', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text({
    enum: ['Planet', 'Moon', 'Star', 'Asteroid', 'Comet', 'Dwarf  planet']
  }).notNull(),
  // km
  meanRadius: int().notNull(),
  // kg
  massValue: real(),
  massExponent: int(),
  // km**3
  volumeValue: real(),
  volumeExponent: int(),
  // m/s**-2
  density: real().notNull(),
  gravity: real().notNull(),
  // K
  averageTemperatureK: int().notNull(),
  // days
  sideralOrbit: real().notNull(),
  // hours
  sideralRotation: real().notNull(),
  alternativeName: text(),
  discoveryDate: int({ mode: 'timestamp' }),
  discoveredBy: text(),
  imageUrl: text()
})

export const bodyRelations = sqliteTable('body_relations', {
  parentId: text('parent_id')
    .notNull()
    .references(() => bodies.id),
  childId: text('child_id')
    .notNull()
    .references(() => bodies.id)
})
