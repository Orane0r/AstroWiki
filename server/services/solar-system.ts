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

  const json = await result.json()
  return json.bodies as SolarSystemBodyApi[]
}
