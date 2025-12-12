"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Category } from "@prisma/client";
import { ProductCard, type ProductWithCategory } from "./product-card";

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
