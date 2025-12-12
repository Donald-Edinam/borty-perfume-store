import { Category } from "@prisma/client";

export interface ProductFilters {
    search?: string;
    categories?: string[];
    brands?: string[];
    fragranceTypes?: string[];
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    sort?: "price-asc" | "price-desc" | "newest";
}

export interface FilterOptions {
    categories: Category[];
    brands: string[];
    fragranceTypes: string[];
    priceRange: { min: number; max: number };
}

export interface ProductNotes {
    top: string[];
    middle: string[];
    base: string[];
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string | null;
    images: string[];
    stock: number;
    fragranceType: string | null;
    concentration: string | null;
    sizeML: number | null;
    notes: ProductNotes | null;
    category: Category;
    isFeatured: boolean;
    isActive: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}
