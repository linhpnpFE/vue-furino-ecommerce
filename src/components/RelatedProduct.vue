<script setup>
import ProductCarousel from "@/components/ProductCarousel.vue";
</script>

<template>
  <section class="py-8 xl:py-14">
    <div class="container">
      <div class="text-center mb-6 xl:mb-14">
        <h2 class="text-3xl font-bold mb-3">Our Products</h2>
      </div>
      <div class="mb-8 xl:mb-10">
        <product-carousel :count="4" />
      </div>
      <router-link to="/shop" class="py-3 px-14 bg-white text-B88E2F border border-B88E2F rounded font-semibold block text-center lg:w-max mx-auto hover:text-white hover:bg-B88E2F">Show more</router-link>
    </div>
  </section>
</template>

<style scoped>

</style>