<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const { data: planets } = await useFetch('/api/bodies', {
  query: {
    type: 'Planet'
  }
})

const items: TreeItem[] = planets.value!
  .map(planet => ({
    label: planet.name,
    icon: 'fluent-emoji-flat:ringed-planet',
    onToggle: async (event) => {
      console.log(event.detail.isExpanded)
      const { data: children } = await useFetch('/api/bodies', {
        query: {
          parentId: planet.id
        }
      })
      console.log(children.value)

      return children.value!.map(child => ({
        label: child.name,
        icon: 'fluent-emoji-flat:first-quarter-moon'
      }))
    }
  }))
</script>

<template>
  <UTree
    virtualize
    :items="items"
    class="h-80"
  />
</template>
