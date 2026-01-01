import type { BodyType } from './../types/solar-system'
import type { WikipediaPageSummaryApi } from '../types/wikipedia-page-summary'

const BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary'

export async function fetchWikipediaImageUrl(bodyName: string, bodyType: BodyType): Promise<string | null> {
  const searchVariants = [
    bodyName,
    `${bodyName} (${bodyType.toLowerCase()})`,
    `${bodyType} ${bodyName}`
  ]

  for (const variant of searchVariants) {
    try {
      const response = await fetch(`${BASE_URL}/${variant}`)

      const json = await response.json() as WikipediaPageSummaryApi

      if (json.originalimage?.source) {
        return json.originalimage.source
      }
    } catch {
      continue
    }
  }

  return null
}
