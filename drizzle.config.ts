import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './.data/db',
  dialect: 'sqlite',
  schema: './server/db/schema.ts',

  dbCredentials: {
    url: './.data/sqlite.db'
  }
})
