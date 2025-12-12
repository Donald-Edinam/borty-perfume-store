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
        <Link href={`/products/${product.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100">
                    {product.images[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                            {currencySymbol}
                            {product.price.toFixed(2)}
                        </span>
                        <Button
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={product.stock === 0}
                        >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
