<template>
  <section class="bg-[url('/images/banner-hero.jpg')] bg-cover bg-center py-20 px-4 xl:py-[150px] xl:px-[58px] flex justify-end">
    <div class="bg-FFF3E3 pt-9 xl:pt-[62px] pb-9 px-8 xl:px-10 w-max rounded-xl max-w-[643px]">
      <p class="text-base tracking-[3px] mb-1">New Arrival</p>
      <h1 class="text-B88E2F text-4xl xl:text-5xl font-bold mb-2">Discover Our <br>New Collection</h1>
      <p class="mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
      <a href="#" class="btn btn-B88E2F">BUY NOW</a>
    </div>
  </section>
  <section class="py-8 xl:py-14">
    <div class="container">
      <div class="text-center mb-6 xl:mb-14">
        <h2 class="text-3xl font-bold mb-3">Browse The Range</h2>
        <p class="text-666666">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <list-range/>
    </div>
  </section>
  <section class="py-8 xl:py-14">
    <div class="container">
      <div class="text-center mb-6 xl:mb-14">
        <h2 class="text-3xl font-bold mb-3">Our Products</h2>
      </div>
      <div class="mb-8 xl:mb-10">
        <list-product :limit="8"/>
      </div>
      <router-link to="/shop" class="py-3 px-14 bg-white text-B88E2F border border-B88E2F rounded font-semibold block text-center lg:w-max mx-auto hover:text-white hover:bg-B88E2F">Show more</router-link>
    </div>
  </section>
  <section class="bg-FCF8F3 py-12">
    <div class="xl:flex items-center gap-12">
      <div class="xl:max-w-[426px] flex-shrink-0 px-4 xl:pl-20 mb-6 xl:mb-0">
        <h2 class="text-3xl font-bold mb-3">50+ Beautiful rooms inspiration</h2>
        <p class="text-666666 mb-4">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
        <router-link to="/shop" class="py-3 px-14 bg-B88E2F text-white border border-B88E2F rounded font-semibold block text-center lg:w-max hover:text-B88E2F hover:bg-white">Show more</router-link>
      </div>
      <div class="flex-1 min-w-0">
        <list-inspiration :limit="5"/>
      </div>
    </div>
  </section>
  <section class="py-8 xl:py-14">
    <div class="container">
      <div class="text-center mb-6 xl:mb-0">
        <p class="text-666666 mb-3">Share your setup with</p>
        <h2 class="text-3xl font-bold">#FuniroFurniture</h2>
      </div>
    </div>
    <list-furniture/>
  </section>
</template>

<script setup>

import ListRange from "@/components/ListRange.vue";
import ListProduct from "@/components/ListProduct.vue";
import ListFurniture from "@/components/ListFurniture.vue";
import ListInspiration from "@/components/ListInspiration.vue";
</script>
