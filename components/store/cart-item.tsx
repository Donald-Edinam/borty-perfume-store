"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { CartItem as CartItemType } from "@/types/shop";

interface CartItemProps {
    item: CartItemType;
}

import { useCurrency } from "@/components/providers/currency-provider";

export function CartItem({ item }: CartItemProps) {
    const { currency } = useCurrency();
    const { updateQuantity, removeItem } = useCartStore();

    const handleIncrement = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        removeItem(item.id);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-0">
            {/* Product Image */}
            <Link href={`/products/${item.id}`} className="shrink-0">
                <div className="relative h-24 w-24 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                    {item.images[0] ? (
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="object-contain h-full w-full p-2"
                        />
                    ) : (
                        <div className="text-xs text-gray-400">No Image</div>
                    )}
                </div>
            </Link>

            {/* Product Details */}
            <div className="flex-1 text-center sm:text-left">
                <Link href={`/products/${item.id}`} className="hover:underline">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                {item.fragranceType && (
                    <p className="text-xs text-gray-400 capitalize">{item.fragranceType}</p>
                )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border rounded-md">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600"
                    onClick={handleDecrement}
                    disabled={item.quantity <= 1}
                >
                    <Minus className="h-3 w-3" />
                </Button>
                <div className="w-10 text-center text-sm font-medium">{item.quantity}</div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600"
                    onClick={handleIncrement}
                    disabled={item.quantity >= item.stock}
                >
                    <Plus className="h-3 w-3" />
                </Button>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end gap-2 ml-4">
                <span className="font-bold text-gray-900">
                    {currency} {(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 px-2 h-8"
                    onClick={handleRemove}
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                </Button>
            </div>
        </div>
    );
}
