<template>
  <router-link :to="'/product/' + product.id" class="block border p-4 rounded hover:shadow">
    <img :src="product.thumb" alt="" class="w-full h-40 object-cover mb-2" />
    <h3 class="font-semibold">{{ product.title }}</h3>
    <p class="text-sm text-gray-600">{{ product.price }}</p>
  </router-link>
</template>

<script setup>
defineProps({ product: Object })
</script>
