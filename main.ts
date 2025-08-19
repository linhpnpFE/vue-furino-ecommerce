// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useCartStore } from '@/stores/cart'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia).use(router)

// nạp từ localStorage TRƯỚC khi mount
useCartStore(pinia).hydrate()

app.mount('#app')
