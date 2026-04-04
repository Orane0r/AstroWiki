<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { RANGES } from '~/utils/constants/options'
import sortOrder from '~/utils/sort-order.ts'
import { BodyType } from '~~/shared/enums/body-type'
import { Sorting } from '~~/shared/enums/sorting'

const solarSystemStore = useSolarSystemStore()
const { bodies, selectedRange, selectedBodyType, isImagesOnly } = storeToRefs(solarSystemStore)

const sortingDistance: Ref<Sorting> = ref(Sorting.Ascending)

const { data: planets, pending } = await useFetch<CelestialBody[]>('/api/bodies', {
  query: {
    type: selectedBodyType,
    hasImage: isImagesOnly,
    sortBy: sortingDistance.value ? 'distance' : null,
    sortOrder: sortingDistance
  },
  watch: [selectedBodyType, isImagesOnly, sortingDistance]
})

watch(planets, (val) => {
  solarSystemStore.bodies = val || []
}, { immediate: true })

const bodyTypes: Ref<SelectItem[]> = ref(Object.values(BodyType))

function onClickSortDistance() {
  sortingDistance.value = sortOrder(sortingDistance.value)
}

function getSortingIcon(sorting: Sorting) {
  if (sorting === Sorting.Ascending) {
    return 'i-lucide-arrow-up'
  }

  if (sorting === Sorting.Descending) {
    return 'i-lucide-arrow-down'
  }
}
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

          <!-- TODO tri du plus petit au plus gros -->
          <!-- TODO tri du plus près au plus loin de son parent -->
          <!-- TODO tri du plus chaud au plus froid -->
          <UButton
            label="Distance"
            :icon="getSortingIcon(sortingDistance)"
            @click="onClickSortDistance()"
          />
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
