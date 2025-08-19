<script setup lang="ts">
import { computed } from 'vue'
import FullStar from "@/icon/FullStar.vue";
import HalfStar from "@/icon/HalfStar.vue";

const props = defineProps<{
  rating: number
  reviewCount?: number
  size?: number
  color?: string
}>()

const rounded = computed(() => {
  const clamped = Math.max(0, Math.min(5, props.rating ?? 0))
  return Math.round(clamped * 2) / 2
})

const fullCount = computed(() => Math.floor(rounded.value))
const hasHalf   = computed(() => rounded.value % 1 !== 0)

const stars = computed(() => {
  const arr: ('full'|'half'|'empty')[] = []
  for (let i = 0; i < 5; i++) {
    if (i < fullCount.value) arr.push('full')
    else if (i === fullCount.value && hasHalf.value) arr.push('half')
    else arr.push('empty')
  }
  return arr
})

const sizeStyle = computed(() => ({ width: `${props.size ?? 20}px`, height: `${props.size ?? 20}px` }))
const colorClass = computed(() => props.color ?? 'text-yellow-400')
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-1">
      <template v-for="(t, i) in stars" :key="i">
        <FullStar v-if="t==='full'"  :style="sizeStyle" :class="colorClass" />
        <HalfStar v-else-if="t==='half'" :style="sizeStyle" :class="colorClass" />
        <FullStar v-else :style="sizeStyle" class="text-gray-300" />
      </template>
    </div>

    <span class="h-4 w-px bg-gray-300"></span>

    <span v-if="reviewCount != null" class="text-gray-500 text-sm">
      {{ reviewCount }}
    </span>
  </div>
</template>
