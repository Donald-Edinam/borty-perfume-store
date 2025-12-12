"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
    currentSort: string;
}

export function SortSelect({ currentSort }: SortSelectProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "newest") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        // Reset to page 1 when sort changes
        params.delete("page");

        const queryString = params.toString();
        router.push(queryString ? `/shop?${queryString}` : "/shop");
    };

    return (
        <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]" aria-label="Sort products">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
        </Select>
    );
}
