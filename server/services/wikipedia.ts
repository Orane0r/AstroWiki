import type { BodyType } from './../types/solar-system'
import type { WikipediaPageSummaryApi } from '../types/wikipedia-page-summary'

const BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary'

export async function fetchWikipediaImageUrl(
  bodyName: string,
  bodyType: BodyType
): Promise<string | null> {
  const searchVariants = [
    `${bodyName} (${bodyType.toLowerCase()})`,
    `${bodyType} ${bodyName}`,
    bodyName
  ]

  for (const variant of searchVariants) {
    if (!bodyName.startsWith('S/')) {
      try {
        const response = await fetch(`${BASE_URL}/${encodeURIComponent(variant)}`, {
          headers: {
            'User-Agent': 'AstroWiki/1.0'
          }
        })

        const json = await response.json() as WikipediaPageSummaryApi

        if (json.originalimage?.source) {
          return json.originalimage.source
        }
      } catch {
        continue
      }
    }
  }

  return null
}
