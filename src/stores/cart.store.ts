import { defineStore } from 'pinia'

export interface CartItem {
    id: string | number
    name: string
    price: number
    image?: string
    qty: number
    variantKey?: string // ví dụ: "size=M;color=Red"
    [key: string]: any
}
interface CartState { items: CartItem[] }

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({ items: [] }),
    getters: {
        count: s => s.items.reduce((a, i) => a + i.qty, 0),
        subtotal: s => s.items.reduce((a, i) => a + i.qty * i.price, 0),
    },
    actions: {
        hydrate() {
            try {
                const raw = localStorage.getItem('cart')
                if (raw) this.$patch(JSON.parse(raw))
            } catch {}
        },
        add(payload: Omit<CartItem, 'qty'> & { qty?: number }) {
            const qty = payload.qty ?? 1
            const key = payload.variantKey ?? ''
            const i = this.items.findIndex(x => x.id === payload.id && (x.variantKey ?? '') === key)
            if (i > -1) this.items[i].qty += qty
            else this.items.push({ ...payload, qty })
        },
        remove(id: CartItem['id'], variantKey?: string) {
            this.items = this.items.filter(x => !(x.id === id && (x.variantKey ?? '') === (variantKey ?? '')))
        },
        setQty(id: CartItem['id'], qty: number, variantKey?: string) {
            const item = this.items.find(x => x.id === id && (x.variantKey ?? '') === (variantKey ?? ''))
            if (item) item.qty = Math.max(1, qty)
        },
        clear() { this.items = [] },
    }
})
