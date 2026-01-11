<script setup lang="ts">
import type { TreeItemWithLoading, TreeToggleEvent } from '~/types/tree'
import { BodyType } from '~~/shared/enums/body-type'

const { data: planets } = await useFetch('/api/bodies', {
  query: {
    type: BodyType.Planet
  }
})

/**
 * Gets moons of the planet if not done already and add them to the tree while handling loading state.
 * @param event Toggle event.
 * @param planetId Id of the planet.
 */
async function onTogglePlanet(
  event: TreeToggleEvent<TreeItemWithLoading>,
  planetId: number
): Promise<void> {
  if (!event.detail.isExpanded && event.detail.value?.children?.length === 0) {
    if (event.detail.value) {
      event.detail.value.isLoading = true
    }

    const children = await $fetch('/api/bodies', {
      query: {
        type: BodyType.Moon,
        parentId: planetId
      }
    })

    if (event.detail.value) {
      event.detail.value.isLoading = false
      event.detail.value.children = children!.map(child => ({
        label: child.name,
        icon: 'fluent-emoji-flat:new-moon'
      }))
    }
  }
}

const items: Ref<TreeItemWithLoading[]> = ref(planets.value!
  .map(planet => ({
    label: planet.name,
    icon: 'fluent-emoji-flat:ringed-planet',
    isLoading: false,
    children: [],
    onToggle: event => onTogglePlanet(event, planet.id)
  })))
</script>

<template>
  <UTree
    virtualize
    :items="items"
    class="w-60"
  >
    <template #item-trailing="{ item, expanded }">
      <UIcon
        v-if="item.isLoading"
        name="line-md:loading-twotone-loop"
      />
      <UIcon
        v-else
        :name="expanded ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'"
      />
    </template>
  </UTree>
</template>
