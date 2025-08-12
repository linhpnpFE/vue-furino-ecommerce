// src/data/products.typed.ts
import type { Product } from "../types/product";
import { productsRaw } from "./products.raw";

const parseVNDString = (s: string) => {
    if (!s) return 0;
    return Number(s.replace(/\./g, "")); // "14.500.000" -> 14500000
};

export const products: readonly Product[] = productsRaw.map((p) => ({
    id: String(p.id),
    name: p.name,
    desc: p.desc,
    thumb: p.thumb,
    price: parseVNDString(p.price),
    sale: p.sale ? parseVNDString(p.sale) : null,
    tag: (p.tag ?? "") as Product["tag"]
})) as const;
