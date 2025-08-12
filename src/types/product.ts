// src/types/product.ts
export type ProductTag = "" | "New" | "-30%" | "-50%";

export interface Product {
    id: string;
    name: string;
    desc: string;
    thumb: string;           // image URL
    price: number;           // VND (number)
    sale?: number | null;    // VND (number) nếu có giảm giá
    tag?: ProductTag;
}

export const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    }).format(value);
