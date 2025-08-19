import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

export type Variant = Record<string, string | number | boolean | undefined>;

export interface AddToCartOptions {
    qty?: number;            // mặc định 1
    variant?: Variant;       // ví dụ: { size: "M", color: "Red" }
    redirect?: boolean;      // mặc định true: chuyển sang /cart
    replace?: boolean;       // dùng router.replace thay vì push
}

export interface AnyProduct {
    id: string | number;
    name?: string;
    title?: string;
    price: number | string;
    image?: string;
    thumbnail?: string;
    images?: string[];
    [k: string]: any;
}

function toVariantKey(v?: Variant) {
    if (!v) return "";
    const entries = Object.entries(v).filter(([, val]) => val !== undefined && val !== "");
    if (!entries.length) return "";
    // sắp xếp để key ổn định, tránh tạo 2 item giống nhau khác thứ tự
    return entries.sort(([a],[b]) => a.localeCompare(b))
        .map(([k, val]) => `${k}=${val}`)
        .join(";");
}

function normalize(p: AnyProduct) {
    return {
        id: p.id,
        name: p.name ?? p.title ?? "Sản phẩm",
        price: Number(p.price),
        image: p.image ?? p.thumbnail ?? (Array.isArray(p.images) ? p.images[0] : undefined),
    };
}

export function useAddToCart() {
    const cart = useCartStore();
    const router = useRouter();

    function addToCart(product: AnyProduct, opts: AddToCartOptions = {}) {
        const qty = Math.max(1, Number(opts.qty ?? 1));
        const variantKey = toVariantKey(opts.variant);
        const n = normalize(product);

        cart.add({ ...n, qty, variantKey });

        if (opts.redirect !== false) {
            const nav = { name: "Cart" }; // nhớ route name 'Cart' đã khai báo
            opts.replace ? router.replace(nav) : router.push(nav);
        }
    }

    return { addToCart };
}
