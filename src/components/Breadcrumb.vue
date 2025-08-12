<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const crumbs = route.path.split('/').filter(Boolean)
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center">
      <li class="inline-flex items-center">
        <a href="#" class="inline-flex items-center text-sm font-medium hover:text-white">
          Home
        </a>
      </li>
      <template v-for="(crumb, index) in crumbs" :key="index">
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-666666 mx-2" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 9 4-4-4-4"/>
            </svg>
            <span class="text-sm font-medium text-666666 capitalize">
                {{ decodeURIComponent(crumb) }}
              </span>
          </div>
        </li>
      </template>
    </ol>
  </nav>
</template>

<style scoped>

</style>