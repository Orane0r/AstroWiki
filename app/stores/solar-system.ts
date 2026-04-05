import { BodyType } from '~~/shared/enums/body-type'
import { RANGES } from '~/utils/constants/options'
import { SORTS } from '~~/shared/constants/options'
import { Sorting } from '~~/shared/enums/sorting'
import { defineStore } from 'pinia'

interface SolarSystemState {
  bodies: CelestialBody[]
  selectedRange: string
  selectedBodyType: BodyType
  selectedSortBy: string
  selectedSortOrder: Sorting
  isImagesOnly: boolean
}

export const useSolarSystemStore = defineStore('solarSystem', {
  state: (): SolarSystemState => ({
    bodies: [],
    selectedRange: RANGES[0]!,
    selectedBodyType: BodyType.Planet,
    selectedSortBy: SORTS[0]!,
    selectedSortOrder: Sorting.Ascending,
    isImagesOnly: false
  }),
  getters: {},
  actions: {

  }
})
