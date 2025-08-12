export type ProductTag = "" | "New" | "-30%" | "-50%";
export interface Product {
    id: string; name: string; desc: string; thumb: string;
    price: number; sale?: number | null; tag?: ProductTag;
}
export const formatVND = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
