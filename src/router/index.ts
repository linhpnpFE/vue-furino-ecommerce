import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Shop from "@/views/Shop.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/shop/:id', name: 'ProductDetail', component: ProductDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
