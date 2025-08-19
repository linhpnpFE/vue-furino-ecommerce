// src/data/products.typed.ts
import type { Product, Size } from "@/types/product";
import type { RawProduct } from "./products.raw";
import { productsRaw } from "./products.raw";

const toNumberVND = (val: unknown): number => {
    if (val == null) return 0;
    if (typeof val === "number" && Number.isFinite(val)) return val;
    if (typeof val === "string") {
        const digits = val.trim().replace(/[^\d]/g, "");
        return digits ? Number(digits) : 0;
    }
    return 0;
};
const toNullableNumberVND = (val: unknown): number | null => {
    const n = toNumberVND(val);
    return n > 0 ? n : null;
};

// gom ảnh: ưu tiên images[], rồi image, rồi thumb
const toImages = (p: RawProduct): string[] => {
    if (Array.isArray(p.images) && p.images.length) return p.images;
    if (typeof p.image === "string" && p.image) return [p.image];
    if (typeof p.thumb === "string" && p.thumb) return [p.thumb];
    return [];
};

export const products: ReadonlyArray<Product> = productsRaw.map((p: RawProduct): Product => {
    const imgs = toImages(p);

    const base: Product = {
        id: String(p.id),
        name: p.name,
        category: p.category,
        desc: p.desc,
        // nếu có thumb thì dùng, nếu không lấy ảnh đầu tiên từ imgs
        thumb: p.thumb ?? imgs[0] ?? "",
        // images đã được gom theo đúng ưu tiên
        images: imgs,
        size: Array.isArray(p.size) ? (p.size as Size[]) : [],
        color: Array.isArray(p.color) ? p.color : [],
        // GIỮ logic cũ: parse số kiểu VND
        price: toNumberVND(p.price),
        sale: toNullableNumberVND(p.sale),
        tag: (p.tag ?? "") as Product["tag"],
        rating: Math.max(0, Math.min(5, Number(p.rating ?? 0))),
        reviewCount: Number(p.reviewCount ?? 0),
    };

    // Nếu raw có specs thì giữ lại (không phá vỡ type hiện tại nếu Product chưa khai báo specs)
    if ((p as any).specs) {
        (base as any).specs = (p as any).specs;
    }

    return base;
});
