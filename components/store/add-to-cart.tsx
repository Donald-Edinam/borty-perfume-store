"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { Product } from "@/types/shop";
import { cn } from "@/lib/utils";

interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { addItem, items } = useCartStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartItem = isMounted ? items.find(item => item.id === product.id) : null;
    const isInCart = !!cartItem;

    const handleIncrement = () => {
        setQuantity((prev) => Math.min(prev + 1, product.stock));
    };

    const handleDecrement = () => {
        setQuantity((prev) => Math.max(prev - 1, 1));
    };

    const handleAddToCart = () => {
        addItem(product, quantity);
        setIsAdded(true);

        // Reset added state after 2 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    if (product.stock === 0) {
        return (
            <Button disabled className="w-full bg-gray-200 text-gray-500 hover:bg-gray-200">
                Out of Stock
            </Button>
        );
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
                {/* Quantity Selector */}
                <div className="flex items-center border rounded-md">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-gray-600 hover:text-black hover:bg-gray-100"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center font-medium">{quantity}</div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-gray-600 hover:text-black hover:bg-gray-100"
                        onClick={handleIncrement}
                        disabled={quantity >= product.stock}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Main Add Button */}
                <Button
                    className={cn(
                        "flex-1 h-10 transition-all duration-300",
                        isAdded || isInCart ? "bg-green-600 hover:bg-green-700" : ""
                    )}
                    onClick={handleAddToCart}
                    disabled={isAdded}
                >
                    {isAdded ? (
                        <>
                            <Check className="h-5 w-5 mr-2" />
                            Added to Cart
                        </>
                    ) : isInCart ? (
                        <>
                            <Check className="h-5 w-5 mr-2" />
                            In Cart ({cartItem?.quantity}) - Add More
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </div>

            {/* Stock Level Indicator */}
            {product.stock < 10 && (
                <p className="text-sm text-red-600 font-medium">
                    Only {product.stock} items left in stock
                </p>
            )}
        </div>
    );
}
