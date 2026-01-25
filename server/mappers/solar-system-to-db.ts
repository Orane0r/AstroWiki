import { BodyType, type SolarSystemBodyApi } from '../types/solar-system'
import type { NewBody } from '../../shared/types/db'

const BODY_TYPE_MAP: Record<BodyType, NewBody['type']> = {
  [BodyType.Planet]: 'Planet',
  [BodyType.Moon]: 'Moon',
  [BodyType.DwarfPlanet]: 'Dwarf planet',
  [BodyType.Asteroid]: 'Asteroid',
  [BodyType.Comet]: 'Comet',
  [BodyType.Star]: 'Star'
}

export function mapSolarSystemBodiesApiToDb(body: SolarSystemBodyApi, imageUrl: string | null): NewBody {
  const safeNumber = (value: unknown, defaultValue: number = 0): number => {
    const num = Number(value)
    return Number.isNaN(num) ? defaultValue : num
  }

  return {
    name: body.englishName,
    type: BODY_TYPE_MAP[body.bodyType],
    meanRadius: safeNumber(body.meanRadius),
    massValue: body.mass?.massValue ?? null,
    massExponent: body.mass?.massExponent ?? null,
    volumeValue: body.vol?.volValue ?? null,
    volumeExponent: body.vol?.volExponent ?? null,
    density: safeNumber(body.density),
    gravity: safeNumber(body.gravity),
    averageTemperature: safeNumber(body.avgTemp),
    sideralOrbit: safeNumber(body.sideralOrbit),
    sideralRotation: safeNumber(body.sideralRotation),
    semimajorAxis: safeNumber(body.semimajorAxis),
    alternativeName: body.alternativeName || null,
    discoveryYear:
      body.discoveryDate.length === 0
        ? null
        : safeNumber(Number.parseInt(body.discoveryDate.slice(-4))),
    discoveredBy: body.discoveredBy || null,
    imageUrl: imageUrl
  }
}
