import { BodyType } from '~~/shared/enums/body-type'
import { RANGES } from '~/utils/constants/options'
import { defineStore } from 'pinia'

interface SolarSystemState {
  bodies: CelestialBody[]
  selectedRange: string
  selectedBodyType: BodyType
  isImagesOnly: boolean
}

export const useSolarSystemStore = defineStore('solarSystem', {
  state: (): SolarSystemState => ({
    bodies: [],
    selectedRange: RANGES[0]!,
    selectedBodyType: BodyType.Planet,
    isImagesOnly: false
  }),
  getters: {},
  actions: {

  }
})
