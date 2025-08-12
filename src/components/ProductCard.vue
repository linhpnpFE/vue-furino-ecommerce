<!-- src/components/ProductCard.vue -->
<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "../types/product";
import { formatVND } from "../types/product";

const props = defineProps<{ product: Product }>();
const displayPrice = computed(() => props.product.sale ?? props.product.price);
</script>

<template>
  <article class="group rounded-xl border p-3">
    <img
        :src="product.thumb"
        :alt="product.name"
        loading="lazy"
        class="w-full rounded-lg object-cover"
    />
    <h3 class="mt-2 font-semibold">{{ product.name }}</h3>
    <p class="text-sm text-gray-500">{{ product.desc }}</p>

    <div class="mt-1 flex items-center gap-2">
      <strong>{{ formatVND(displayPrice) }}</strong>
      <span v-if="product.sale" class="text-gray-400 line-through text-sm">
        {{ formatVND(product.price) }}
      </span>
      <span v-if="product.tag" class="ml-auto text-xs rounded px-2 py-0.5 border">
        {{ product.tag }}
      </span>
    </div>

    <button class="mt-3 w-full border rounded-lg py-2 hover:bg-gray-50">
      Add to cart
    </button>
  </article>
</template>
