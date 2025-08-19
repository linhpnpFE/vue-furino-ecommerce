<script setup>
import BannerChild from "@/components/BannerChild.vue";
import ListProduct from "@/components/ListProduct.vue";

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { ref } from 'vue'

const selectedSort = ref('Default')
</script>

<template>
  <banner-child title="Cart"/>
  <section class="py-8 xl:py-10">
    <div class="container">
      <div class="flex gap-6">
        <div class="flex-1">
          <table>
            <thead class="bg-F9F1E7">
            <tr>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <img src="" alt="">
                <div class="name"></div>
              </td>
              <td>
                <div class="price"></div>
              </td>
              <td>
                <div class="quantity"></div>
              </td>
              <td>
                <div class="subtotal"></div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="w-full max-w-[390px] bg-F9F1E7 p-3">
          <h3>Cart Totals</h3>
          <div class="flex">
            <div>Subtotal</div>
            <div class="price"></div>
          </div>
          <div class="flex">
            <div>Total</div>
            <div class="price-total"></div>
          </div>
          <button class="py-3 px-14 bg-B88E2F text-white border border-B88E2F rounded font-semibold block text-center lg:w-max mx-auto hover:text-B88E2F hover:bg-white">Check Out</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>