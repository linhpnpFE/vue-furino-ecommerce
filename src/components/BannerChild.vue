<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
<section class="bg-[url('/images/bg-2.jpg')] bg-cover bg-center">
  <div class="container flex flex-col items-center justify-center min-h-[316px]">
    <h1 class="text-5xl font-medium mb-3">{{ title }}</h1>
    <breadcrumb/>
  </div>
</section>
</template>

<style scoped>

</style>