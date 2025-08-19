// src/types/product.ts
export type ProductTag = "" | "New" | "-30%" | "-50%";
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface Product {
    id: string;
    name: string;
    category: string;
    desc: string;
    thumb: string;
    images: string[];
    size: Size[];
    color: string[];
    price: number;
    sale?: number | null;
    tag?: ProductTag;
    rating: number;
    reviewCount: number;
}

export const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    }).format(value);
