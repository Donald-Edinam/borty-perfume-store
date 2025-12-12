import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductGrid } from "@/components/shop/product-grid";
import { Pagination } from "@/components/shop/pagination";
import { SortSelect } from "@/components/shop/sort-select";
import {
    parseSearchParams,
    buildFilterQuery,
    getSortOrder,
    ITEMS_PER_PAGE,
} from "@/lib/utils/filters";
import { buildSearchQuery, rankSearchResults } from "@/lib/utils/search";
import { FilterOptions } from "@/types/shop";

interface ShopPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
    title: "Shop - Borty's Perfume Store",
    description: "Browse our collection of premium fragrances",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    // Await searchParams
    const resolvedParams = await searchParams;

    // Parse search params
    const params = new URLSearchParams();
    Object.entries(resolvedParams).forEach(([key, value]) => {
        if (value) params.set(key, String(value));
    });

    const filters = parseSearchParams(params);
    const page = filters.page || 1;

    // Fetch filter options
    const [categories, brandsData, fragranceTypesData, priceRangeData] = await Promise.all([
        prisma.category.findMany({
            where: {
                products: {
                    some: { isActive: true },
                },
            },
            orderBy: { name: "asc" },
        }),
        prisma.product.findMany({
            where: { isActive: true },
            select: { brand: true },
            distinct: ["brand"],
            orderBy: { brand: "asc" },
        }),
        prisma.product.findMany({
            where: {
                isActive: true,
                fragranceType: { not: null },
            },
            select: { fragranceType: true },
            distinct: ["fragranceType"],
        }),
        prisma.product.aggregate({
            where: { isActive: true },
            _min: { price: true },
            _max: { price: true },
        }),
    ]);

    const brands = brandsData.map((p) => p.brand);
    const fragranceTypes = fragranceTypesData
        .map((p) => p.fragranceType)
        .filter((t): t is string => t !== null);

    const priceRange = {
        min: priceRangeData._min.price || 0,
        max: priceRangeData._max.price || 1000,
    };

    const filterOptions: FilterOptions = {
        categories,
        brands,
        fragranceTypes,
        priceRange,
    };

    // Build query
    const filterQuery = buildFilterQuery(filters);
    const searchQuery = buildSearchQuery(filters.search || "");

    // Merge search and filter queries
    const where = filters.search
        ? {
            AND: [
                { isActive: true },
                searchQuery,
                filterQuery,
            ],
        }
        : { ...filterQuery, isActive: true };

    const orderBy = getSortOrder(filters.sort);

    // Fetch products and total count
    let [products, totalCount] = await Promise.all([
        prisma.product.findMany({
            where,
            include: { category: true },
            orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        prisma.product.count({ where }),
    ]);

    // Rank search results by relevance if searching
    if (filters.search) {
        products = rankSearchResults(products, filters.search);
    }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop</h1>
                    <p className="text-gray-600">
                        Showing {products.length} of {totalCount} products
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <ProductFilters options={filterOptions} />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sort & Results */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-gray-600">
                                {totalCount} {totalCount === 1 ? "product" : "products"}
                            </p>

                            <SortSelect currentSort={filters.sort || "newest"} />
                        </div>

                        {/* Product Grid */}
                        <Suspense fallback={<ProductGridSkeleton />}>
                            <ProductGrid products={products} currencySymbol="$" />
                        </Suspense>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination currentPage={page} totalPages={totalPages} />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}


// Loading Skeleton
function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                    <div className="bg-gray-200 h-64" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-6 bg-gray-200 rounded w-1/3" />
                        <div className="h-10 bg-gray-200 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

