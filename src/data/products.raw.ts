// src/data/products.raw.ts
export type RawProduct = {
    id: string;
    name: string;
    category: string;
    desc: string;
    thumb: string;
    image?: string;
    images?: string[];
    size?: string[];
    color?: string[];
    price: number
    sale: number | null
    tag?: "" | "New" | "-30%" | "-50%";
    rating?: number;
    reviewCount?: number;
    specs: {
        general: {
            salesPackage: string;
            modelNumber: string;
            secondaryMaterial: string;
            configuration: string;
            upholsteryMaterial: string;
            upholsteryColor: string;
        };
        product: {
            fillingMaterial: string;
            finishType: string;
            adjustableHeadrest: boolean;
            maxLoad: number; // kg
            origin: string;
        };
        dimensions: {
            width: number;    // cm
            height: number;   // cm
            depth: number;    // cm
            weight: number;   // kg
            legHeight: number;// cm
        };
        warranty: {
            summary: string;
            serviceType: "On-site" | "Carry-in" | "Doorstep Pickup";
            covered: string[];
            notCovered: string[];
            domesticWarrantyMonths: number;
        };
    };
};

// ====== RANDOM, BUT REPRODUCIBLE (seeded) ======
const SEED = 42;
function createSeededRng(seed: number) {
    let t = seed >>> 0;
    return () => {
        t = (t * 1664525 + 1013904223) >>> 0;
        return t / 2 ** 32;
    };
}
const rand = createSeededRng(SEED);
const rint = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
const choice = <T,>(arr: T[]) => arr[rint(0, arr.length - 1)];
const sample = <T,>(arr: T[], n: number) => {
    const copy = [...arr];
    const out: T[] = [];
    for (let i = 0; i < Math.min(n, arr.length); i++) {
        out.push(copy.splice(rint(0, copy.length - 1), 1)[0] as T);
    }
    return out;
};

const names = [
    "Aurora Sofa","Gravita Chair","Luna Table","Kairo Lamp","Nimbus Bed","Orion Shelf","Helio Desk","Mellow Sofa",
    "Velvet Chair","Pebble Table","Nova Lamp","Atlas Bed","Cedar Cabinet","Echo Stool","Plush Sofa","Quill Chair",
    "Flint Table","Iris Lamp","Breeze Bed","Delta Shelf","Solace Desk","Mono Sofa","Alto Chair","Canto Table",
    "Prism Lamp","Harbor Bed","Mica Cabinet","Tide Stool","Tundra Sofa","Ripple Chair",
];

const categories = ["sofa","chair","table","lamp","bed","cabinet","desk","stool","shelf"] as const;
const descByCat: Record<string, string> = {
    sofa: "Luxury big sofa with soft fabric and deep seats.",
    chair: "Stylish cafe chair with ergonomic back support.",
    table: "Minimal wooden table for living rooms or studios.",
    lamp: "Warm ambient lamp with matte finish.",
    bed: "Cozy modern bed frame with storage.",
    cabinet: "Solid oak cabinet with soft-close doors.",
    desk: "Clean workstation desk with cable management.",
    stool: "Compact bar stool with footrest.",
    shelf: "Floating shelf set for books and decor.",
};

const imagesPool = [
    "https://images.unsplash.com/photo-1600876266943-17a581d54b61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1742137189039-230ac903324f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1616504132588-0eeeb5213fc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1732730224385-bb6cbe79fbf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1648077793611-1ddf7341fe14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1556556343-bcc053861694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1673468196407-da3947a15040?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1518554246264-0147f8d2d464?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1677178631515-77bac21c6e7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1746695387076-77644bf7ba8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1746695387381-772d106b6e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1732721750870-1be1be92299b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1648632218188-6571ec0a1d96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1558810438-8c90249e9985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1663056796821-aedc8918012a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1720785609292-f1c6f5ec2e54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8",
];

const colorPool = [
    "#816DFA","#000000","#B88E2F","#E97171","#2EC1AC","#1179E0","#32878A","#FC593C","#B66E2F",
    "#C9ADA7","#303030","#777777","#F5A623","#D35400",
];
const colorNames = [
    "Beige","Charcoal","Olive","Tan","Black","Blue","Aqua","Coral","Walnut","Oak","Sand","Brick","Mustard","Teak",
];

const sizePool: string[][] = [
    ["S","M","L"],
    ["S","M"],
    ["M","L"],
    ["XS","S","M","L"],
    ["One Size"],
];

const pricePool = [350000, 500000, 1500000, 1990000, 3500000, 6500000, 8900000, 11990000, 14500000, 73500000];

function inferCategory(name: string) {
    const map: [string, string][] = [
        ["Sofa","sofa"],["Chair","chair"],["Table","table"],["Lamp","lamp"],["Bed","bed"],
        ["Cabinet","cabinet"],["Desk","desk"],["Stool","stool"],["Shelf","shelf"],
    ];
    for (const [token, cat] of map) if (name.includes(token)) return cat;
    return choice(categories as unknown as string[]);
}

// ---- Spec helpers ----
const secondaryMaterials = [
    "Solid Oak","Engineered Wood (MDF)","Teak","Plywood","Steel","Aluminium","Tempered Glass","Rattan",
];
const upholsteryMaterials = ["Fabric","Velvet","Leatherette","Linen","None"];
const finishTypes = ["Matte","Gloss","Natural","Walnut Stain","Oak Stain","Powder-coated"];
const fillingMaterials = ["Foam","Memory Foam","Feather","Polyfill","Latex"];
const origins = ["Vietnam","Thailand","China","Indonesia","Malaysia","India","Italy","Germany","Poland","Turkey"];
const serviceTypes = ["On-site","Carry-in","Doorstep Pickup"] as const;
const coveredPool = [
    "Manufacturing defects","Mechanism issues","Loose joints","Electrical driver defects","Weld failures",
];
const notCoveredPool = [
    "Physical damage","Water damage","Burns","Commercial use","Improper installation","Normal wear & tear",
];

const configByCat: Record<string, string[]> = {
    sofa: ["2-Seater","3-Seater","L-Shape","Sectional","Recliner"],
    chair: ["Standard","Armchair","Swivel","Dining"],
    table: ["Coffee","Side","Dining (4-Seater)","Dining (6-Seater)"],
    lamp: ["Desk","Floor","Pendant","Wall"],
    bed: ["Single","Queen","King","Storage"],
    cabinet: ["2-Door","3-Door","Sideboard","Tall"],
    desk: ["120×60 cm","140×70 cm","Corner","Standing"],
    stool: ["Bar","Counter","Step Stool"],
    shelf: ["2-Tier","3-Tier","Wall-mounted","Modular"],
};

type Range = [number, number];
const dimsRange: Record<string, { w: Range; h: Range; d: Range; wt: Range; leg: Range }> = {
    sofa:    { w:[160,260], h:[70,110], d:[75,110], wt:[30,80],  leg:[10,20] },
    chair:   { w:[45,60],   h:[80,110], d:[45,70],  wt:[5,12],   leg:[0,8]   },
    table:   { w:[100,220], h:[70,78],  d:[60,110], wt:[15,50],  leg:[5,15]  },
    lamp:    { w:[15,40],   h:[30,170], d:[15,40],  wt:[1,8],    leg:[0,5]   },
    bed:     { w:[140,200], h:[80,120], d:[200,220],wt:[30,90],  leg:[5,20]  },
    cabinet: { w:[60,180],  h:[80,200], d:[35,60],  wt:[20,80],  leg:[5,15]  },
    desk:    { w:[100,180], h:[70,90],  d:[50,80],  wt:[15,40],  leg:[5,12]  },
    stool:   { w:[30,45],   h:[45,80],  d:[30,45],  wt:[3,8],    leg:[0,5]   },
    shelf:   { w:[60,180],  h:[30,80],  d:[20,35],  wt:[5,20],   leg:[0,5]   },
};

function genDimensions(cat: string) {
    const r = dimsRange[cat] ?? dimsRange["sofa"];
    return {
        width: rint(r.w[0], r.w[1]),
        height: rint(r.h[0], r.h[1]),
        depth: rint(r.d[0], r.d[1]),
        weight: rint(r.wt[0], r.wt[1]),
        legHeight: rint(r.leg[0], r.leg[1]),
    };
}

function salesPackageFor(cat: string) {
    switch (cat) {
        case "sofa":    return "1 Sofa, 2 Cushions, User Manual, Warranty Card";
        case "chair":   return "1 Chair, User Manual, Warranty Card";
        case "table":   return "1 Table, Hardware Kit, User Manual";
        case "lamp":    return "1 Lamp, 1 Bulb, User Manual";
        case "bed":     return "1 Bed Frame, Slats, Hardware Kit, User Manual";
        case "cabinet": return "1 Cabinet, Hardware Kit, User Manual";
        case "desk":    return "1 Desk, Cable Grommet, Hardware Kit, User Manual";
        case "stool":   return "1 Stool, User Manual";
        case "shelf":   return "2 Shelves, Brackets, Hardware Kit, User Manual";
        default:        return "1 Unit, User Manual, Warranty Card";
    }
}

function modelNumberFor(name: string, cat: string) {
    const prefix = name.split(" ")[0].toUpperCase().slice(0, 4);
    const catCode = (cat[0] || "X").toUpperCase();
    return `${prefix}-${catCode}${rint(1000, 9999)}`;
}

function upholsteryFor(cat: string) {
    const needs = ["sofa","chair","stool","bed"].includes(cat);
    return {
        material: needs ? choice(upholsteryMaterials.slice(0, -1)) : "—",
        color: needs ? choice(colorNames) : "—",
    };
}

function fillingFor(cat: string) {
    return ["sofa","chair","stool","bed"].includes(cat) ? choice(fillingMaterials) : "—";
}

function adjustableHeadrestFor(cat: string) {
    return ["sofa","bed"].includes(cat) ? rand() < 0.4 : false;
}

function maxLoadFor(cat: string) {
    switch (cat) {
        case "chair": return rint(100, 150);
        case "stool": return rint(100, 130);
        case "table": return rint(40, 120);
        case "desk":  return rint(40, 120);
        case "sofa":  return rint(200, 350);
        case "bed":   return rint(250, 400);
        case "cabinet": return rint(60, 200);
        case "shelf": return rint(20, 80);
        case "lamp":  return rint(2, 5);
        default: return rint(20, 100);
    }
}

function genSpecs(name: string, cat: string) {
    const dims = genDimensions(cat);
    const up = upholsteryFor(cat);
    const conf = choice(configByCat[cat] ?? ["Standard"]);
    const wMonths = choice([6, 12, 24, 36]) as number;
    return {
        general: {
            salesPackage: salesPackageFor(cat),
            modelNumber: modelNumberFor(name, cat),
            secondaryMaterial: choice(secondaryMaterials),
            configuration: conf,
            upholsteryMaterial: up.material,
            upholsteryColor: up.color,
        },
        product: {
            fillingMaterial: fillingFor(cat),
            finishType: choice(finishTypes),
            adjustableHeadrest: adjustableHeadrestFor(cat),
            maxLoad: maxLoadFor(cat),
            origin: choice(origins),
        },
        dimensions: dims,
        warranty: {
            summary: `${wMonths}-Month Domestic Warranty`,
            serviceType: choice(serviceTypes),
            covered: sample(coveredPool, rint(1, 3)),
            notCovered: sample(notCoveredPool, rint(2, 4)),
            domesticWarrantyMonths: wMonths,
        },
    };
}

// ---- Product generator ----
function genItem(i: number): RawProduct {
    const name = names[i % names.length];
    const category = inferCategory(name);
    const desc = descByCat[category];

    const images = sample(imagesPool, rint(1, 3));
    const thumb = choice(images);

    const size = sizePool[rint(0, sizePool.length - 1)];
    const color = sample(colorPool, rint(3, 5));

    const price = choice(pricePool);
    const tag = choice(["", "New", "-30%", "-50%"] as const);
    let sale: number | null = null;
    if (tag === "-30%") sale = Math.round(price * 0.7);
    if (tag === "-50%") sale = Math.round(price * 0.5);
    if ((tag === "" || tag === "New") && rand() < 0.25) {
        sale = rand() < 0.5 ? null : Math.round(price * 0.9);
    }

    const rating = Math.round((3.7 + rand() * 1.2) * 10) / 10;
    const reviewCount = rint(0, 220);

    return {
        id: String(i + 1),
        name,
        category,
        desc,
        thumb,
        images,
        size,
        color,
        price,
        sale,
        tag,
        rating,
        reviewCount,
        specs: genSpecs(name, category),
    };
}

export const productsRaw: readonly RawProduct[] = Array.from({ length: 30 }, (_, i) => genItem(i));
