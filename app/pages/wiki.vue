<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { RANGES } from '~/utils/constants/options'
import { SORTS } from '~~/shared/constants/options'
import { BodyType } from '~~/shared/enums/body-type'
import { Sorting } from '~~/shared/enums/sorting'

const solarSystemStore = useSolarSystemStore()
const { bodies, selectedRange, selectedBodyType, selectedSortBy, selectedSortOrder, isImagesOnly } = storeToRefs(solarSystemStore)

const { data: planets, pending } = await useFetch<CelestialBody[]>('/api/bodies', {
  query: {
    type: selectedBodyType,
    hasImage: isImagesOnly,
    sortBy: selectedSortBy,
    sortOrder: selectedSortOrder
  },
  watch: [selectedBodyType, isImagesOnly, selectedSortBy, selectedSortOrder]
})

watch(planets, (val) => {
  solarSystemStore.bodies = val || []
}, { immediate: true })

const bodyTypes: Ref<SelectItem[]> = ref(Object.values(BodyType))
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <div class="px-5 grid grid-cols-1 gap-4">
          <div class="text-2xl">
            Explore
          </div>
          <div class="text-lg">
            Filter
          </div>

          <UFormField label="Range">
            <USelect
              v-model="selectedRange"
              class="w-50"
              :items="RANGES"
            />
          </UFormField>
          <UFormField label="Type">
            <USelect
              v-model="selectedBodyType"
              class="w-50"
              :items="bodyTypes"
            />
          </UFormField>
          <USwitch
            v-model="isImagesOnly"
            label="Images Only"
          />

          <div class="text-lg">
            Sort
          </div>

          <div class="grid grid-cols-2 gap-2">
            <URadioGroup
              v-model="selectedSortBy"
              :items="SORTS"
            />

            <URadioGroup
              v-model="selectedSortOrder"
              :items="Object.values(Sorting)"
            />
          </div>
        </div>
      </UPageAside>
    </template>

    <UPageBody>
      <template v-if="pending">
        <div
          class="w-full grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <!-- TODO padding tout à droite -->
          <USkeleton
            v-for="n in 20"
            :key="n"
            class="h-64"
          />
        </div>
      </template>
      <UPageColumns
        v-else
        class="column-1 md:columns-3 lg:columns-4 xl:columns-5 gap-5"
      >
        <UPageCard
          v-for="(planet, index) in bodies"
          :key="index"
          variant="subtle"
          :title="planet.name"
        >
          <template #footer>
            <!-- TODO afficher l'image en gros dans un dialog quand on clique dessus -->
            <NuxtImg
              v-if="planet.imageUrl"
              class="rounded-lg"
              :src="planet.imageUrl"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageBody>
  </UPage>
</template>
