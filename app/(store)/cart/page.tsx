"use client";

import { useCartStore } from "@/lib/store/cart";
import { CartItem } from "@/components/store/cart-item";
import { CartSummary } from "@/components/store/cart-summary";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, clearCart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch for persistent store
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Or a loading skeleton
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Looks like you haven't added anything to your cart yet. Explore our collection of premium fragrances.
                </p>
                <Button asChild size="lg">
                    <Link href="/shop">
                        Start Shopping
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-lg">Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearCart}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                                Clear Cart
                            </Button>
                        </div>

                        <div className="divide-y">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <Link href="/shop" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black hover:underline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <CartSummary />
                    <div className="mt-6 lg:hidden text-center">
                        <Link href="/shop" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
