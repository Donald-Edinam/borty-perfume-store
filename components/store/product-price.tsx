"use client";

import { useCurrency } from "@/components/providers/currency-provider";

interface ProductPriceProps {
    price: number;
    className?: string;
}

export function ProductPrice({ price, className }: ProductPriceProps) {
    const { currency } = useCurrency();
    return <div className={className}>{currency} {price.toFixed(2)}</div>;
}
