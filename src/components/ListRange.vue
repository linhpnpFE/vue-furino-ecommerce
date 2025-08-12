<script setup>
import {reactive} from "vue";

const myRange = reactive([
  {
    name: 'Dining',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url:'/product/123'
  },
  {
    name: 'Living',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url:'/product/345'
  },
  {
    name: 'Bedroom',
    image: 'https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?q=80&w=693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url:'/product/456'
  }
])
</script>

<template>
  <div class="grid gap-4 xl:grid-cols-3 xl:gap-8">
    <router-link :to="item.url"
                 v-for="item in myRange"
                  class="block group">
      <div class="h-[320px] xl:h-[480px] rounded-xl overflow-hidden mb-3 xl:mb-6">
        <img :src="item.image" :alt="item.name" class="size-full object-cover transition-all group-hover:scale-110">
      </div>
      <h3 class="text-center text-2xl font-semibold group-hover:text-B88E2F">{{ item.name }}</h3>
    </router-link>
  </div>
</template>

<style scoped>

</style>