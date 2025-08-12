// src/stores/products.store.ts
import { defineStore } from "pinia";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

export const useProductsStore = defineStore("products", {
    state: () => ({ items: products as readonly Product[] }),
    getters: {
        byId: (s) => (id: string) => s.items.find(p => p.id === id),
    }
});
