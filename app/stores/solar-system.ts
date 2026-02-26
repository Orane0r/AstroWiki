import { BodyType } from '~~/shared/enums/body-type'
import { defineStore } from 'pinia'

interface SolarSystemState {
  bodies: CelestialBody[]
  selectedRange: string
  selectedBodyType: BodyType
}

export const useSolarSystemStore = defineStore('solarSystem', {
  state: (): SolarSystemState => ({
    bodies: [],
    selectedRange: RANGES[0]!,
    selectedBodyType: BodyType.Planet
  }),
  getters: {},
  actions: {

  }
})
