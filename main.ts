import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useCartStore } from '@/stores/cart'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia).use(router)

const cart = useCartStore(pinia)
// nạp từ localStorage và tự lưu lại khi có thay đổi
cart.hydrate()
cart.$subscribe((_m, state) => localStorage.setItem('cart', JSON.stringify(state)))

app.mount('#app')
