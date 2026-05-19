<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Astro Wiki'
const description = 'Explore celestial bodies.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})

const items: Ref<NavigationMenuItem[]> = ref([
  {
    label: 'Wiki',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Solar system',
        to: '/'
      },
      {
        label: 'Stars',
        to: '/'
      },
      {
        label: 'Galaxies',
        to: '/'
      }
    ]
  },
  {
    label: '3D View',
    icon: 'i-lucide-box',
    to: '/'
  }
])
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <!-- <AppLogo class="w-auto h-6 shrink-0" /> -->
          <NuxtImg
            src="/logo.png"
            alt="Logo"
            fit="contain"
            class="w-auto h-14"
          />
        </NuxtLink>

        <UNavigationMenu :items="items" />
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Developed by Orane Orveillon
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/Orane0r"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
