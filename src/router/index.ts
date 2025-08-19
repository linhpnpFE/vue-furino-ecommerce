import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Shop from "@/views/Shop.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Blog from "@/views/Blog.vue";
import ProductComparison from "@/views/ProductComparison.vue";
import Cart from "@/views/Cart.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/product-comparison', name: 'ProductComparison', component: ProductComparison },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/blog', component: Blog },
  { path: '/cart', component: Cart },
  { path: '/shop/:id', name: 'ProductDetail', component: ProductDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
