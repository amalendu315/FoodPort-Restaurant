export interface MenuVariant {
    name: "Half" | "Full" | string;
    price: number;
}

export interface MenuItem {
    id: string;
    category_id: string;
    name: string;
    is_veg: boolean;
    description: string;
    image_url: string;
    variants: MenuVariant[];
    is_available: boolean;
    // Derived fields for filtering/sorting
    category_slug: string;
    base_price: number;
    name_lc: string;
    veg_type: 'veg' | 'egg' | 'chicken' | 'fish';
    popularity_score?: number;
    created_at?: string;
}

export interface MenuCategory {
    id: string;
    name: string;
    sort_order: number;
}

export interface CartItem {
    id: string;
    itemId: string;
    itemName: string;
    variantName: string;
    unitPrice: number;
    quantity: number;
    isVeg: boolean;
}
