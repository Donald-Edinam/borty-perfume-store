"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Category } from "@prisma/client";

interface ProductWithCategory extends Product {
    category: Category;
}

interface ProductGridProps {
    products: ProductWithCategory[];
    currencySymbol?: string;
}

export function ProductGrid({ products, currencySymbol = "$" }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="text-gray-400 mb-4">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more results
                </p>
                <Button asChild variant="outline">
                    <Link href="/shop">Clear all filters</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} currencySymbol={currencySymbol} />
            ))}
        </div>
    );
}

// Reusable ProductCard component (DRY - same as featured-products)
interface ProductCardProps {
    product: ProductWithCategory;
    currencySymbol: string;
}

function ProductCard({ product, currencySymbol }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className="group block">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {/* Product Image */}
                <div className="relative bg-gray-50 p-8 flex items-center justify-center min-h-[280px]">
                    {product.images[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-48 w-auto object-contain"
                        />
                    ) : (
                        <div className="h-48 flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-5 text-center">
                    {/* Brand */}
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                        {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-base font-medium text-gray-900 mb-3 line-clamp-1">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-900 mb-4">
                        {currencySymbol}{product.price.toFixed(2)}
                    </p>

                    {/* Add to Cart Button */}
                    <Button
                        size="sm"
                        className="w-full"
                        disabled={product.stock === 0}
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic here
                        }}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    );
}
