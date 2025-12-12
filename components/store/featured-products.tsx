"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Category } from "@prisma/client";

interface ProductWithCategory extends Product {
    category: Category;
}

interface FeaturedProductsProps {
    products: ProductWithCategory[];
    currencySymbol: string;
}

export function FeaturedProducts({ products, currencySymbol }: FeaturedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of premium fragrances
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            currencySymbol={currencySymbol}
                        />
                    ))}
                </div>

                {products.length >= 8 && (
                    <div className="text-center mt-12">
                        <Link href="/shop">
                            <Button size="lg" variant="outline">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

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
