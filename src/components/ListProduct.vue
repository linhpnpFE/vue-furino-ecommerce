<script setup>
import { computed, ref, watch} from "vue";
import {products} from "@/data/products.typed.ts";
import { useAddToCart } from "@/composables/useAddToCart";
const { addToCart } = useAddToCart();

const props = defineProps({
  limit: Number,
  perPage: {
    type: Number,
    default: 16
  },
  sort: {
    type: String,
    default: 'Default'
  }
})

const likedItems = ref(new Set())

function toggleClick(index) {
  if (likedItems.value.has(index)) {
    likedItems.value.delete(index)
  } else {
    likedItems.value.add(index)
  }
}

const currentPage = ref(1)

const toNumber = (str) => parseFloat(str.replace(/\./g, '')) || 0

const sortedProduct = computed(() => {
  let items = [...products]

  switch (props.sort) {
    case 'PriceAsc':
      return items.sort((a, b) => toNumber(a.sale || a.price) - toNumber(b.sale || b.price))
    case 'PriceDesc':
      return items.sort((a, b) => toNumber(b.sale || b.price) - toNumber(a.sale || a.price))
    case 'NameAsc':
      return items.sort((a, b) => a.name.localeCompare(b.name))
    case 'NameDesc':
      return items.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return items
  }
})

const paginatedProducts = computed(() => {
  const source = sortedProduct.value

  if (props.limit) {
    return source.slice(0, props.limit)
  }

  const start = (currentPage.value - 1) * props.perPage
  return source.slice(start, start + props.perPage)
})

const totalPages = computed(() => {
  if (props.limit && props.limit > 0) return 1
  return Math.ceil(sortedProduct.value.length / props.perPage)
})

watch([sortedProduct, props.perPage], () => {
  const max = totalPages.value
  if (currentPage.value > max) {
    currentPage.value = max
  }
})

function onAdd(p) {
  addToCart(p)
}

</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 2xl:gap-8">
    <div v-for="(item, index) in paginatedProducts"
         :key="item.id"
         class="group relative flex flex-col">
      <div class="h-[220px] lg:h-[300px]">
        <img :src="item.thumb" :alt="item.name" class="size-full object-cover">
      </div>
      <div class="flex-1 p-4 bg-F4F5F7 space-y-3">
        <h3 class="text-2xl font-semibold line-clamp-1">{{ item.name }}</h3>
        <p class="text-898989 line-clamp-2">{{item.desc}}</p>
        <div class="flex items-center justify-between space-x-2">
          <template v-if="item.sale">
            <div class="text-lg 2xl:text-xl font-semibold">Rp {{ item.sale }}</div>
            <div class="line-through text-B0B0B0">Rp {{ item.price }}</div>
          </template>
          <template v-else>
            <div class="text-lg 2xl:text-xl font-semibold">Rp {{ item.price }}</div>
          </template>
        </div>
        <div class="xl:hidden flex items-center gap-6">
          <button @click="onAdd(item)" class="py-3 px-8 text-white bg-B88E2F font-semibold rounded">Add to cart</button>
          <div class="flex items-center justify-center gap-4">
            <a href="#" class="flex items-center gap-1 text-white font-semibold">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.6667C11.4747 10.6667 11 10.8734 10.644 11.2047L5.94 8.46671C5.97333 8.31337 6 8.16004 6 8.00004C6 7.84004 5.97333 7.68671 5.94 7.53337L10.64 4.79337C11 5.12671 11.4733 5.33337 12 5.33337C13.1067 5.33337 14 4.44004 14 3.33337C14 2.22671 13.1067 1.33337 12 1.33337C10.8933 1.33337 10 2.22671 10 3.33337C10 3.49337 10.0267 3.64671 10.06 3.80004L5.36 6.54004C5 6.20671 4.52667 6.00004 4 6.00004C2.89333 6.00004 2 6.89337 2 8.00004C2 9.10671 2.89333 10 4 10C4.52667 10 5 9.79337 5.36 9.46004L10.0587 12.2054C10.0211 12.3563 10.0014 12.5112 10 12.6667C10 13.0623 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5145C11.6001 14.6658 12.0022 14.7054 12.3902 14.6283C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0569C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5359 13.44 11.2235 13.1111 11.0038C12.7822 10.784 12.3956 10.6667 12 10.6667Z" fill="black"/>
              </svg>
            </a>
            <RouterLink :to="{ name:'ProductDetail', params:{ id:item.id }, state:{ product:item } }" class="flex items-center gap-1 text-white font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </RouterLink>
            <a href="#" class="flex items-center gap-1 text-white font-semibold" @click.prevent="toggleClick(index)">
              <svg :class="likedItems.has(index) ? 'stroke-[#E97171] fill-[#E97171]' : 'stroke-black'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z" stroke="" stroke-width="1.8"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div v-if="item.tag"
           class="absolute top-6 right-6 size-12 rounded-full flex items-center justify-center text-white"
           :class="item.tag === 'New' ? 'bg-2EC1AC' : 'bg-E97171'">
        {{item.tag}}
      </div>
      <div class="hidden xl:flex flex-col items-center justify-center bg-3A3A3A/50 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible absolute inset-0 gap-6">
        <button @click="onAdd(item)" class="py-3 px-14 bg-white text-B88E2F font-semibold">Add to cart</button>
        <div class="flex items-center justify-center gap-4">
          <a href="#" class="flex items-center gap-1 text-white font-semibold">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 10.6667C11.4747 10.6667 11 10.8734 10.644 11.2047L5.94 8.46671C5.97333 8.31337 6 8.16004 6 8.00004C6 7.84004 5.97333 7.68671 5.94 7.53337L10.64 4.79337C11 5.12671 11.4733 5.33337 12 5.33337C13.1067 5.33337 14 4.44004 14 3.33337C14 2.22671 13.1067 1.33337 12 1.33337C10.8933 1.33337 10 2.22671 10 3.33337C10 3.49337 10.0267 3.64671 10.06 3.80004L5.36 6.54004C5 6.20671 4.52667 6.00004 4 6.00004C2.89333 6.00004 2 6.89337 2 8.00004C2 9.10671 2.89333 10 4 10C4.52667 10 5 9.79337 5.36 9.46004L10.0587 12.2054C10.0211 12.3563 10.0014 12.5112 10 12.6667C10 13.0623 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5145C11.6001 14.6658 12.0022 14.7054 12.3902 14.6283C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0569C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5359 13.44 11.2235 13.1111 11.0038C12.7822 10.784 12.3956 10.6667 12 10.6667Z" fill="white"/>
            </svg>
            Share
          </a>
          <RouterLink
              :to="{ name:'ProductDetail', params:{ id:item.id }, state:{ product:item } }" class="flex items-center gap-1 text-white font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            Info
          </RouterLink>
          <a href="#" class="flex items-center gap-1 text-white font-semibold" @click.prevent="toggleClick(index)">
            <svg :class="likedItems.has(index) ? 'stroke-[#E97171] fill-[#E97171]' : 'stroke-white'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z" stroke="" stroke-width="1.8"/>
            </svg>
            Like
          </a>
        </div>
      </div>

    </div>
  </div>
  <div v-if="!props.limit" class="flex justify-center mt-8 gap-2 items-center">
    <!-- Prev Button -->
    <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
      'px-4 py-2 border rounded',
      currentPage === page ? 'bg-B88E2F text-white' : 'bg-white text-gray-700 border-gray-300'
    ]"
    >
      {{ page }}
    </button>

    <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>

</template>

<style scoped>

</style>