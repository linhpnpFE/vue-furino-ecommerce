<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  // [{ id:'desc', label:'Description' }, ...]
  tabs: { type: Array, required: true },
  initial: String, // id tab mở đầu
})

const activeId = ref(props.initial || (props.tabs[0] && props.tabs[0].id))

// nếu thay props.tabs/initial sau khi mount
watch(() => [props.tabs, props.initial], () => {
  if (!props.tabs?.length) return
  if (!activeId.value || !props.tabs.some(t => t.id === activeId.value)) {
    activeId.value = props.initial || props.tabs[0].id
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

    <section
        v-for="t in tabs" :key="t.id"
        v-show="activeId === t.id"
    >
      <slot :name="t.id">
        <div class="text-9F9F9F">No content for tab "{{ t.label }}".</div>
      </slot>
    </section>
  </div>

  <div v-else class="text-gray-500">No tabs.</div>
</template>
