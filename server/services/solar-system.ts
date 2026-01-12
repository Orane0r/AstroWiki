import type { SolarSystemBodyApi } from '../types/solar-system'

const BASE_URL = 'https://api.le-systeme-solaire.net/rest'

export async function fetchSolarSystemBodies(): Promise<SolarSystemBodyApi[]> {
  const config = useRuntimeConfig()

  const result = await fetch(`${BASE_URL}/bodies/`, {
    headers: {
      Authorization: `Bearer ${config.solarSystemApiToken}`
    }
  })

  if (!result.ok) {
    throw new Error('Failed to fetch solar system bodies.')
  }

  const text = await result.text()

  // Because the API sometimes returns invalid JSON with control characters..
  // eslint-disable-next-line no-control-regex
  const json = text.replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replaceAll(/\s+/g, ' ')
    .trim()
  return JSON.parse(json).bodies as SolarSystemBodyApi[]
}
