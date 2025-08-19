<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/** Swiper config */
const modules = [Navigation, Pagination, A11y]
const spaceBetween = 16
const slidesPerView = 1
const breakpoints = {
  1024: { slidesPerView: 2, spaceBetween: 24 }
}

/** Navigation chỉ bật >=1024, có cleanup listener */
const showNavigation = ref(false)
const updateNav = () => { showNavigation.value = window.innerWidth >= 1024 }
onMounted(() => {
  updateNav()
  window.addEventListener('resize', updateNav)
})
onBeforeUnmount(() => window.removeEventListener('resize', updateNav))

/** Props */
const props = defineProps({ limit: { type: Number, default: 5 } })

/** Data demo */
const myProduct = [
  { id:'1',  name:'Syltherine', image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop', category:'Bedroom' },
  { id:'2',  name:'Syltherine', image:'https://images.unsplash.com/photo-1648077793611-1ddf7341fe14?q=80&w=645&auto=format&fit=crop', category:'Bedroom' },
  { id:'3',  name:'Syltherine', image:'https://images.unsplash.com/photo-1656751886015-92f26043f98a?q=80&w=687&auto=format&fit=crop', category:'Bedroom' },
  { id:'4',  name:'Syltherine', image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop', category:'Bedroom' },
  { id:'5',  name:'Syltherine', image:'https://images.unsplash.com/photo-1700234937116-bd0479b91ec3?q=80&w=765&auto=format&fit=crop', category:'Bedroom' },
  { id:'6',  name:'Syltherine', image:'https://images.unsplash.com/photo-1566097127353-0f282701b26a?q=80&w=740&auto=format&fit=crop', category:'Bedroom' },
  { id:'7',  name:'Syltherine', image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop', category:'Bedroom' },
  { id:'8',  name:'Syltherine', image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop', category:'Bedroom' },
  { id:'9',  name:'Syltherine', image:'https://plus.unsplash.com/premium_photo-1664048712492-9d395c204e37?q=80&w=715&auto=format&fit=crop', category:'Bedroom' },
  { id:'10', name:'Syltherine', image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop', category:'Bedroom' },
  { id:'11', name:'Syltherine', image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop', category:'Bedroom' },
  { id:'12', name:'Syltherine', image:'https://plus.unsplash.com/premium_photo-1664048712492-9d395c204e37?q=80&w=715&auto=format&fit=crop', category:'Bedroom' },
  { id:'13', name:'Syltherine', image:'https://plus.unsplash.com/premium_photo-1661319060841-26c509bd1012?q=80&w=1121&auto=format&fit=crop', category:'Bedroom' },
  { id:'14', name:'Syltherine', image:'https://plus.unsplash.com/premium_photo-1661319060841-26c509bd1012?q=80&w=1121&auto=format&fit=crop', category:'Bedroom' },
  { id:'15', name:'Syltherine', image:'https://plus.unsplash.com/premium_photo-1661319060841-26c509bd1012?q=80&w=1121&auto=format&fit=crop', category:'Bedroom' },
]

/** List giới hạn theo props */
const limitedProducts = computed(() => myProduct.slice(0, props.limit))

/** Item đang active */
const activeItem = ref(limitedProducts.value[0] ?? null)
const setActiveByIndex = (idx) => {
  activeItem.value = limitedProducts.value[idx] ?? null
}
const onSwiper = (swiper) => setActiveByIndex(swiper.realIndex)
const onSlideChange = (swiper) => setActiveByIndex(swiper.realIndex)
</script>

<template>
  <swiper
      :modules="modules"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      :breakpoints="breakpoints"
      :navigation="showNavigation"
      :loop="true"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="lg:min-h-[582px]"
  >
    <swiper-slide
        v-for="item in limitedProducts"
        :key="item.id"
        class="mb-10 lg:mb-0"
    >
      <div class="content relative h-[486px] transition-all">
        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover absolute inset-0">
        <div class="absolute bottom-6 left-6" v-show="item === activeItem">
          <div class="bg-white/80 p-8">
            <div class="flex gap-3 items-center text-616161 text-xl font-medium mb-2">
              {{ Number(item.id) }}
              <span class="h-[1px] w-6 bg-616161"></span>
              <span>{{ item.category }}</span>
            </div>
            <h3 class="text-3xl font-semibold">{{ item.name }}</h3>
          </div>

          <RouterLink
              :to="{ name: 'ProductDetail', params: { id: String(item.id) }, state: { product: item } }"
              class="inline-flex items-center justify-center p-2 bg-B88E2F"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12H3M21 12L15 6M21 12L15 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper-slide-active .content {
  /* chỉ áp dụng ở >=1024px */
}
@media (min-width: 1024px) {
  .swiper-slide-active .content { height: 582px; }
}
/* căn lại pagination ở desktop */
:deep(.swiper-pagination) {
  @media (min-width: 1024px) {
    width: calc((100% - 24px) / 2);
    left: auto;
    right: 0;
    text-align: left;
    justify-content: start;
    bottom: 32px;
  }
}
</style>
