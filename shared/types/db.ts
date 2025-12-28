import type { bodies, bodyRelations } from 'hub:db:schema'

export type Body = typeof bodies.$inferSelect
export type BodyRelation = typeof bodyRelations.$inferSelect

export type NewBody = typeof bodies.$inferInsert
export type NewBodyRelation = typeof bodyRelations.$inferInsert
