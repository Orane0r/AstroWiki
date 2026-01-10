<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

// TODO mettre l'url dans un fichier des constantes ?
const { data: planets } = await useFetch('/api/bodies', {
  query: {
    type: 'Planet'
  }
})

const items: TreeItem[] = planets.value!
  .map(planet => ({
    label: planet.name,
    icon: 'fluent-emoji-flat:ringed-planet',
    children: [],
    onToggle: async (event) => {
      if (!event.detail.isExpanded && event.detail.value?.children?.length === 0) {
        const children = await $fetch('/api/bodies', {
          query: {
            parentId: planet.id
          }
        })

        if (event.detail.value) {
          event.detail.value.children = children!.map(child => ({
            label: child.name,
            icon: 'fluent-emoji-flat:new-moon'
          }))
        }
      }
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
