import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const bodies = sqliteTable('bodies', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text({
    enum: ['Planet', 'Moon', 'Star', 'Asteroid', 'Comet', 'Dwarf planet']
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
  averageTemperature: int().notNull(),
  // days
  sideralOrbit: real().notNull(),
  // hours
  sideralRotation: real().notNull(),
  alternativeName: text(),
  discoveryYear: int(),
  discoveredBy: text(),
  imageUrl: text()
})

export const bodyRelations = sqliteTable('body_relations', {
  parentId: int()
    .notNull()
    .references(() => bodies.id),
  childId: int()
    .notNull()
    .references(() => bodies.id)
})
