"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Category } from "@prisma/client";
import { useCartStore } from "@/lib/store/cart";
import { Product as ShopProduct } from "@/types/shop";

export interface ProductWithCategory extends Product {
    category: Category;
}

interface ProductCardProps {
    product: ProductWithCategory;
    currencySymbol?: string;
}

export function ProductCard({ product, currencySymbol = "$" }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Convert Prisma product to ShopProduct for cart
        const shopProduct: ShopProduct = {
            ...product,
            images: product.images,
            notes: product.notes as any, // Type assertion for notes JSON
            // Ensure stock is treated as number
            stock: product.stock,
            sizeML: product.sizeML ?? 0
        };

        addItem(shopProduct, 1);
    };

    return (
        <Link href={`/products/${product.id}`} className="group block h-full">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                {/* Product Image */}
                <div className="relative bg-gray-50 p-8 flex items-center justify-center min-h-[280px]">
                    {product.images[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
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
                <div className="p-5 text-center flex flex-col flex-1">
                    {/* Brand */}
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                        {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-base font-medium text-gray-900 mb-3 line-clamp-1">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-900 mb-4 mt-auto">
                        {currencySymbol}{product.price.toFixed(2)}
                    </p>

                    {/* Add to Cart Button */}
                    <Button
                        size="sm"
                        className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        disabled={product.stock === 0}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    );
}
