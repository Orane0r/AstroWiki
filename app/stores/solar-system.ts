import { BodyType } from '~~/shared/enums/body-type'
import { defineStore } from 'pinia'

interface SolarSystemState {
  bodies: CelestialBody[]
  selectedBodyType: BodyType
}

export const useSolarSystemStore = defineStore('solarSystem', {
  state: (): SolarSystemState => ({
    bodies: [],
    selectedBodyType: BodyType.Planet
  }),
  getters: {},
  actions: {

  }
})
