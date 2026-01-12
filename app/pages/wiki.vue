<script setup lang="ts">
import type { TreeItemWithLoading } from '~/types/tree'
import { BodyType } from '~~/shared/enums/body-type'
import type { TreeProps } from '#ui/types'

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
const onTogglePlanet: TreeProps<TreeItemWithLoading[]>['onToggle'] = async (
  event,
  item
): Promise<void> => {
  if (!event.detail.isExpanded && event.detail.value?.children?.length === 0) {
    if (event.detail.value) {
      event.detail.value.isLoading = true
    }

    const children = await $fetch('/api/bodies', {
      query: {
        type: BodyType.Moon,
        parentId: item.id
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
    id: planet.id,
    label: planet.name,
    icon: 'fluent-emoji-flat:ringed-planet',
    isLoading: false,
    children: []
  })))
</script>

<template>
  <UTree
    class="w-60"
    virtualize
    :items="items"
    @toggle="onTogglePlanet"
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
