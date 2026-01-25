<script setup lang="ts">
import { BodyType } from '~~/shared/enums/body-type'

const { data: planets } = await useFetch('/api/bodies', {
  query: {
    type: BodyType.Planet
  }
})
</script>

<template>
  <UPage class="m-5">
    <UPageColumns
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
