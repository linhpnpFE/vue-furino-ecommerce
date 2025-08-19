import { defineStore } from 'pinia'

// ==== Cấu hình lưu trữ ====
const STORAGE_KEY = 'cart' // đổi tên nếu bạn muốn tách version

// Kiểu "thô" tương thích với products.raw.ts (khỏi cần import type)
type RawLike = {
    id: string | number
    name: string
    price: number | string
    sale?: number | null
    thumb?: string
    image?: string
    images?: string[]
    variant?: Record<string, string | number | boolean | undefined> // optional
}

export interface CartItem {
    id: string | number
    name: string
    price: number
    image?: string
    qty: number
    variantKey?: string // "size=M;color=Red"
    [key: string]: any
}
interface CartState { items: CartItem[] }

// helper: "size=M;color=Red"
function toVariantKey(v?: Record<string, any>) {
    if (!v) return ''
    const entries = Object.entries(v).filter(([, val]) => val !== undefined && val !== '')
    if (!entries.length) return ''
    return entries
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, val]) => `${k}=${val}`)
        .join(';')
}

// chuẩn hoá mọi payload về CartItem (trừ qty)
function normalize(payload: (Omit<CartItem, 'qty'> & { variant?: any }) | RawLike) {
    const priceRaw =
        (typeof (payload as any).sale === 'number' && (payload as any).sale)
            ? (payload as any).sale
            : (payload as any).price

    const image =
        (payload as any).image ??
        (payload as any).thumb ??
        ((payload as any).images && (payload as any).images[0]) ??
        undefined

    const variantKey =
        (payload as any).variantKey ??
        toVariantKey((payload as any).variant)

    return {
        id: (payload as any).id,
        name: (payload as any).name ?? 'Sản phẩm',
        price: Number(priceRaw) || 0,
        image,
        variantKey,
    } as Omit<CartItem, 'qty'>
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({ items: [] }),
    getters: {
        count: s => s.items.reduce((a, i) => a + i.qty, 0),
        subtotal: s => s.items.reduce((a, i) => a + i.qty * i.price, 0),
    },
    actions: {
        // Nạp state từ localStorage
        hydrate() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY)
                if (raw) this.$patch(JSON.parse(raw))
            } catch {}
        },
        // Lưu state vào localStorage
        persist() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
            } catch {}
        },

        // ✅ nhận RawProduct hoặc CartItem đều được
        add(payload: (Omit<CartItem, 'qty'> & { qty?: number, variant?: any }) | (RawLike & { qty?: number })) {
            const qty = Math.max(1, Number((payload as any).qty ?? 1))
            const base = normalize(payload)
            const key = base.variantKey ?? ''

            const i = this.items.findIndex(x => x.id === base.id && (x.variantKey ?? '') === key)
            if (i > -1) this.items[i].qty += qty
            else this.items.push({ ...base, qty })

            this.persist()
        },
        remove(id: CartItem['id'], variantKey?: string) {
            this.items = this.items.filter(x => !(x.id === id && (x.variantKey ?? '') === (variantKey ?? '')))
            this.persist()
        },
        setQty(id: CartItem['id'], qty: number, variantKey?: string) {
            const item = this.items.find(x => x.id === id && (x.variantKey ?? '') === (variantKey ?? ''))
            if (item) item.qty = Math.max(1, qty)
            this.persist()
        },
        clear() {
            this.items = []
            this.persist()
        },
    }
})
