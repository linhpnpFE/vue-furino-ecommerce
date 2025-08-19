<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/cart-modal'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const ui = useUiStore()
const cart = useCartStore()
const router = useRouter()

const open = computed(() => ui.cartOpen)
const subtotal = computed(() => cart.items.reduce((a,i)=> a + (Number(i.price)||0)*(i.qty||0), 0))
const fmt = (n:number) => n.toLocaleString('vi-VN', { style:'currency', currency:'VND' })

function close(){ ui.closeCart() }
function go(path:string){ close(); router.push(path) }

function onKey(e: KeyboardEvent){ if (e.key === 'Escape') close() }
watch(open, v => {
  document.body.style.overflow = v ? 'hidden' : ''
  v ? window.addEventListener('keydown', onKey) : window.removeEventListener('keydown', onKey)
})
onUnmounted(()=> { document.body.style.overflow=''; window.removeEventListener('keydown', onKey) })
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[60]">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]" @click="close"></div>

        <transition name="slide">
          <aside class="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl p-4 flex flex-col"
                 :key="'drawer'">
            <div class="flex items-center justify-between pb-3 border-b">
              <h3 class="text-2xl font-semibold">Shopping Cart</h3>
              <button class="p-2 rounded hover:bg-gray-100" @click="close">✕</button>
            </div>

            <div class="mt-4 flex-1 overflow-auto space-y-4">
              <div v-if="cart.items.length===0" class="text-center text-gray-500 py-10">
                Giỏ hàng đang trống
              </div>

              <div v-for="item in cart.items"
                   :key="`${item.id}-${item.variantKey||''}`"
                   class="flex gap-3">
                <img v-if="item.image" :src="item.image" class="w-16 h-16 rounded object-cover bg-gray-100" />
                <div class="flex-1 min-w-0">
                  <div class="font-medium truncate">{{ item.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ item.qty }} × {{ fmt(Number(item.price||0)) }}
                  </div>
                </div>
                <button class="text-gray-400 hover:text-red-500"
                        @click="cart.remove(item.id, item.variantKey)">✕</button>
              </div>
            </div>

            <div class="border-t pt-3">
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span class="font-semibold text-black">{{ fmt(subtotal) }}</span>
              </div>

              <div class="mt-3 grid grid-cols-3 gap-2">
                <button class="rounded-full border py-2" @click="go('/cart')">Cart</button>
                <button class="rounded-full border py-2" @click="go('/checkout')">Checkout</button>
                <button class="rounded-full border py-2" @click="go('/comparison')">Comparison</button>
              </div>
            </div>
          </aside>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition:opacity .2s ease }
.fade-enter-from,.fade-leave-to{ opacity:0 }
.slide-enter-active,.slide-leave-active{ transition:transform .25s ease }
.slide-enter-from,.slide-leave-to{ transform:translateX(100%) }
</style>
