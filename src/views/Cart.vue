<script setup>
import BannerChild from "@/components/BannerChild.vue";
import { computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

// đảm bảo nạp lại từ localStorage nếu store có hydrate()
onMounted(() => {
  if (typeof cart.hydrate === "function") cart.hydrate();
});

const items = computed(() => cart.items);
const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.qty || 0), 0)
);
// hiện tại Total = Subtotal (chưa tính phí/voucher)
const total = subtotal;

const fmt = (n) =>
    (Number(n) || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

function dec(item) {
  cart.setQty(item.id, (item.qty || 1) - 1, item.variantKey);
}
function inc(item) {
  cart.setQty(item.id, (item.qty || 1) + 1, item.variantKey);
}
function changeQty(item, e) {
  const q = Math.max(1, Number(e.target.value) || 1);
  cart.setQty(item.id, q, item.variantKey);
}
function removeItem(item) {
  cart.remove(item.id, item.variantKey);
}
function goCheckout() {
  router.push("/checkout"); // thay bằng route checkout của bạn nếu khác
}
</script>

<template>
  <banner-child title="Cart" />
  <section class="py-8 xl:py-10">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Bảng giỏ hàng -->
        <div class="flex-1 overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-0">
            <thead class="bg-F9F1E7 text-left">
            <tr>
              <th class="py-4 px-4 font-semibold">Product</th>
              <th class="py-4 px-4 font-semibold">Price</th>
              <th class="py-4 px-4 font-semibold">Quantity</th>
              <th class="py-4 px-4 font-semibold">Subtotal</th>
            </tr>
            </thead>

            <tbody>
            <tr v-if="items.length === 0">
              <td colspan="4" class="py-6 px-4 text-center text-gray-500">
                Giỏ hàng đang trống.
              </td>
            </tr>

            <tr
                v-for="item in items"
                :key="`${item.id}-${item.variantKey || ''}`"
                class="border-b last:border-b-0"
            >
              <!-- Product -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-4">
                  <div
                      class="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center"
                  >
                    <img
                        v-if="item.image"
                        :src="item.image"
                        :alt="item.name"
                        class="w-full h-full object-cover"
                    />
                    <span v-else class="text-xs text-gray-400">No Image</span>
                  </div>
                  <div class="min-w-0">
                    <div class="font-medium truncate">{{ item.name }}</div>
                    <div
                        v-if="item.variantKey"
                        class="text-xs text-gray-500 mt-0.5"
                    >
                      {{ item.variantKey }}
                    </div>

                    <!-- nút xoá nằm trong cột Product để đúng 4 cột như yêu cầu -->
                    <button
                        class="mt-2 text-red-600 text-sm hover:underline"
                        @click="removeItem(item)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </td>

              <!-- Price -->
              <td class="py-4 px-4 align-top">
                <div class="price font-medium">
                  {{ fmt(item.price) }}
                </div>
              </td>

              <!-- Quantity -->
              <td class="py-4 px-4 align-top">
                <div class="quantity inline-flex items-center border rounded-lg overflow-hidden">
                  <button class="px-3 py-2 select-none" @click="dec(item)">−</button>
                  <input
                      class="w-14 text-center py-2 border-l border-r outline-none"
                      type="number"
                      min="1"
                      :value="item.qty"
                      @input="changeQty(item, $event)"
                  />
                  <button class="px-3 py-2 select-none" @click="inc(item)">+</button>
                </div>
              </td>

              <!-- Subtotal -->
              <td class="py-4 px-4 align-top">
                <div class="subtotal font-semibold">
                  {{ fmt((Number(item.price) || 0) * (item.qty || 0)) }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Cart Totals -->
        <div class="w-full max-w-[390px] bg-F9F1E7 p-5 rounded-xl h-max">
          <h3 class="text-xl font-semibold mb-4">Cart Totals</h3>

          <div class="flex items-center justify-between py-2">
            <div class="text-gray-600">Subtotal</div>
            <div class="price font-medium">{{ fmt(subtotal) }}</div>
          </div>

          <div class="flex items-center justify-between py-2 border-t mt-2 pt-3">
            <div class="font-semibold">Total</div>
            <div class="price-total text-lg font-semibold">
              {{ fmt(total) }}
            </div>
          </div>

          <button
              class="mt-5 py-3 px-14 bg-B88E2F text-white border border-B88E2F rounded font-semibold block text-center lg:w-max mx-auto hover:text-B88E2F hover:bg-white"
              @click="goCheckout"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* tuỳ chọn: loại bỏ khoảng cách bảng trên mobile */
table {
  border-collapse: separate;
}
</style>
