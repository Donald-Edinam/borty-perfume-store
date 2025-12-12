"use client";

import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CartIndicatorProps {
    isTransparent?: boolean;
}

export function CartIndicator({ isTransparent }: CartIndicatorProps) {
    const { totalItems } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const count = isMounted ? totalItems() : 0;

    return (
        <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
                "relative",
                isTransparent && "!text-white hover:bg-white/10 hover:!text-white"
            )}
        >
            <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                        {count > 9 ? "9+" : count}
                    </span>
                )}
            </Link>
        </Button>
    );
}
