<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'

const _props = defineProps<{
  tabs: Array<{ id: string; label: string }>
  initial?: string
  slotProps?: Record<string, any>
}>()

const { tabs, initial, slotProps } = toRefs(_props)

const activeId = ref(initial?.value || (tabs.value?.[0] && tabs.value[0].id))

watch(() => [tabs.value, initial?.value], () => {
  if (!tabs.value?.length) return
  if (!activeId.value || !tabs.value.some(t => t.id === activeId.value)) {
    activeId.value = initial?.value || tabs.value[0].id
  }
}, { immediate: true })
</script>

<template>
  <div v-if="tabs && tabs.length">
    <div role="tablist" class="flex flex-wrap gap-4 xl:gap-12 justify-center mb-8 xl:mb-10">
      <button
          v-for="t in tabs" :key="t.id"
          role="tab"
          :aria-selected="activeId === t.id"
          @click="activeId = t.id"
          class="text-lg xl:text-2xl data-[active=true]:font-semibold data-[active=true]:text-B88E2F"
          :data-active="activeId === t.id"
      >
        {{ t.label }}
      </button>
    </div>

    <section v-for="t in tabs" :key="t.id" v-show="activeId === t.id">
      <slot :name="t.id" v-bind="slotProps || {}">
        <div class="text-9F9F9F">No content for tab "{{ t.label }}".</div>
      </slot>
    </section>
  </div>

  <div v-else class="text-gray-500">No tabs.</div>
</template>
