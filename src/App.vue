<template>
  <MainLayout>
    <router-view />
    <CartDrawer />
  </MainLayout>
</template>

<script setup>
import MainLayout from './layouts/MainLayout.vue'
import CartDrawer from "@/components/CartDrawer.vue";
</script>
