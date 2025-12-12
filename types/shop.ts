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

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}
