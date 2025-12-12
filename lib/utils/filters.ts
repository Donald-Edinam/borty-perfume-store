import { ProductFilters } from "@/types/shop";

export const ITEMS_PER_PAGE = 12;

/**
 * Parse URL search params into ProductFilters object
 */
export function parseSearchParams(searchParams: URLSearchParams): ProductFilters {
    const filters: ProductFilters = {
        page: parseInt(searchParams.get("page") || "1"),
        sort: (searchParams.get("sort") as ProductFilters["sort"]) || "newest",
    };

    // Parse array filters
    const categories = searchParams.get("categories");
    if (categories) filters.categories = categories.split(",");

    const brands = searchParams.get("brands");
    if (brands) filters.brands = brands.split(",");

    const fragranceTypes = searchParams.get("fragranceTypes");
    if (fragranceTypes) filters.fragranceTypes = fragranceTypes.split(",");

    // Parse price range
    const minPrice = searchParams.get("minPrice");
    if (minPrice) filters.minPrice = parseFloat(minPrice);

    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);

    return filters;
}

/**
 * Build Prisma where clause from filters
 */
export function buildFilterQuery(filters: ProductFilters) {
    const where: any = {
        isActive: true,
    };

    if (filters.categories?.length) {
        where.categoryId = { in: filters.categories };
    }

    if (filters.brands?.length) {
        where.brand = { in: filters.brands };
    }

    if (filters.fragranceTypes?.length) {
        where.fragranceType = { in: filters.fragranceTypes };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        where.price = {};
        if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
        if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    return where;
}

/**
 * Get sort order from filter
 */
export function getSortOrder(sort: ProductFilters["sort"]) {
    switch (sort) {
        case "price-asc":
            return { price: "asc" as const };
        case "price-desc":
            return { price: "desc" as const };
        case "newest":
        default:
            return { createdAt: "desc" as const };
    }
}

/**
 * Build URL search params from filters
 */
export function buildSearchParams(filters: Partial<ProductFilters>): string {
    const params = new URLSearchParams();

    if (filters.categories?.length) {
        params.set("categories", filters.categories.join(","));
    }

    if (filters.brands?.length) {
        params.set("brands", filters.brands.join(","));
    }

    if (filters.fragranceTypes?.length) {
        params.set("fragranceTypes", filters.fragranceTypes.join(","));
    }

    if (filters.minPrice !== undefined) {
        params.set("minPrice", filters.minPrice.toString());
    }

    if (filters.maxPrice !== undefined) {
        params.set("maxPrice", filters.maxPrice.toString());
    }

    if (filters.page && filters.page > 1) {
        params.set("page", filters.page.toString());
    }

    if (filters.sort && filters.sort !== "newest") {
        params.set("sort", filters.sort);
    }

    return params.toString();
}
