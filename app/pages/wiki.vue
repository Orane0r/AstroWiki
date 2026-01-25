<script setup lang="ts">
import { BodyType } from '~~/shared/enums/body-type'

const { data: planets, pending } = await useFetch('/api/bodies', {
  query: {
    type: BodyType.Planet
  }
})
</script>

<template>
  <UPage class="m-5">
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
  </UPage>
</template>
