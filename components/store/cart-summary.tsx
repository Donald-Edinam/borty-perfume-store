"use client";

import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CartSummary() {
    const { totalPrice, totalItems } = useCartStore();
    const subtotal = totalPrice();
    const shipping = 10.00; // Flat rate for now
    const tax = subtotal * 0.05; // 5% tax example
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-gray-50 rounded-lg p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems()} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                </Link>
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout provided by Paystack
            </p>
        </div>
    );
}
