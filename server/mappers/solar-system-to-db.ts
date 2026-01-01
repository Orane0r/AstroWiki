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
  return {
    name: body.englishName,
    type: BODY_TYPE_MAP[body.bodyType],
    meanRadius: body.meanRadius,
    massValue: body.mass ? body.mass.massValue : null,
    massExponent: body.mass ? body.mass.massExponent : null,
    volumeValue: body.vol ? body.vol.volValue : null,
    volumeExponent: body.vol ? body.vol.volExponent : null,
    density: body.density,
    gravity: body.gravity,
    averageTemperature: body.avgTemp,
    sideralOrbit: body.sideralOrbit,
    sideralRotation: body.sideralRotation,
    alternativeName: body.alternativeName || null,
    discoveryYear:
      body.discoveryDate.length === 0
        ? null
        : Number.parseInt(body.discoveryDate.slice(-4)),
    discoveredBy: body.discoveredBy || null,
    imageUrl: imageUrl
  }
}
