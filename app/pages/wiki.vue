<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { BodyType } from '~~/shared/enums/body-type'

const selectedBodyType = ref<BodyType>(BodyType.Planet)

const { data: planets, pending } = await useFetch('/api/bodies', {
  query: {
    type: selectedBodyType.value
  }
})

const items: Ref<SelectItem[]> = ref(Object.values(BodyType))
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <div class="px-5">
          <div class="h3">
            Explore
          </div>

          <USelect
            v-model="selectedBodyType"
            :items="items"
          />
        </div>
      </UPageAside>
    </template>

    <UPageBody>
      <template v-if="pending">
        <div
          class="w-full grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
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
          v-for="(planet, index) in planets"
          :key="index"
          variant="subtle"
          :title="planet.name"
        >
          <template #footer>
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
