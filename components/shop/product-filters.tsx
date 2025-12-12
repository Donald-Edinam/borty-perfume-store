"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { FilterOptions } from "@/types/shop";
import { buildSearchParams } from "@/lib/utils/filters";
import { Separator } from "@/components/ui/separator";
import { useDebouncedCallback } from "use-debounce";

interface ProductFiltersProps {
    options: FilterOptions;
}

export function ProductFilters({ options }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Parse current filters from URL
    const currentSearch = searchParams.get("search") || "";
    const currentCategories = searchParams.get("categories")?.split(",") || [];
    const currentBrands = searchParams.get("brands")?.split(",") || [];
    const currentFragranceTypes = searchParams.get("fragranceTypes")?.split(",") || [];
    const currentMinPrice = parseFloat(searchParams.get("minPrice") || String(options.priceRange.min));
    const currentMaxPrice = parseFloat(searchParams.get("maxPrice") || String(options.priceRange.max));

    // Local state for price range and search
    const [priceRange, setPriceRange] = useState([currentMinPrice, currentMaxPrice]);
    const [searchQuery, setSearchQuery] = useState(currentSearch);

    // Debounced search update
    const debouncedSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("search", value.trim());
        } else {
            params.delete("search");
        }

        // Reset to page 1 when search changes
        params.delete("page");

        const queryString = params.toString();
        router.push(queryString ? `/shop?${queryString}` : "/shop");
    }, 300);

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        params.delete("page");
        const queryString = params.toString();
        router.push(queryString ? `/shop?${queryString}` : "/shop");
    };

    // Update filters in URL
    const updateFilter = (key: string, value: string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.length > 0) {
            params.set(key, value.join(","));
        } else {
            params.delete(key);
        }

        // Reset to page 1 when filters change
        params.delete("page");

        const queryString = params.toString();
        router.push(queryString ? `/shop?${queryString}` : "/shop");
    };

    // Toggle array filter
    const toggleArrayFilter = (key: string, value: string, currentValues: string[]) => {
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
        updateFilter(key, newValues);
    };

    // Apply price range
    const applyPriceRange = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (priceRange[0] > options.priceRange.min) {
            params.set("minPrice", priceRange[0].toString());
        } else {
            params.delete("minPrice");
        }

        if (priceRange[1] < options.priceRange.max) {
            params.set("maxPrice", priceRange[1].toString());
        } else {
            params.delete("maxPrice");
        }

        params.delete("page");

        const queryString = params.toString();
        router.push(queryString ? `/shop?${queryString}` : "/shop");
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setPriceRange([options.priceRange.min, options.priceRange.max]);
        router.push("/shop");
        setIsOpen(false);
    };

    // Count active filters (including search)
    const activeFilterCount =
        (searchQuery ? 1 : 0) +
        currentCategories.length +
        currentBrands.length +
        currentFragranceTypes.length +
        (currentMinPrice > options.priceRange.min ? 1 : 0) +
        (currentMaxPrice < options.priceRange.max ? 1 : 0);

    const FiltersContent = () => (
        <div className="space-y-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10">
            {/* Search Input */}
            <div>
                <Label htmlFor="search-input" className="text-sm font-semibold mb-2 block">
                    Search Products
                </Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="search-input"
                        type="text"
                        placeholder="Search by name, brand, fragrance..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 pr-10"
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearSearch}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <Separator />

            {/* Active Filters Count */}
            {activeFilterCount > 0 && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-sm"
                    >
                        Clear all
                    </Button>
                </div>
            )}

            {/* Categories */}
            {options.categories.length > 0 && (
                <div>
                    <h3 className="font-semibold text-sm mb-3">Categories</h3>
                    <div className="space-y-2">
                        {options.categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category.id}`}
                                    checked={currentCategories.includes(category.id)}
                                    onCheckedChange={() =>
                                        toggleArrayFilter("categories", category.id, currentCategories)
                                    }
                                />
                                <Label
                                    htmlFor={`category-${category.id}`}
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    {category.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Separator />

            {/* Brands */}
            {options.brands.length > 0 && (
                <div>
                    <h3 className="font-semibold text-sm mb-3">Brands</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {options.brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`brand-${brand}`}
                                    checked={currentBrands.includes(brand)}
                                    onCheckedChange={() =>
                                        toggleArrayFilter("brands", brand, currentBrands)
                                    }
                                />
                                <Label
                                    htmlFor={`brand-${brand}`}
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    {brand}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Separator />

            {/* Fragrance Types */}
            {options.fragranceTypes.length > 0 && (
                <div>
                    <h3 className="font-semibold text-sm mb-3">Fragrance Type</h3>
                    <div className="space-y-2">
                        {options.fragranceTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`fragrance-${type}`}
                                    checked={currentFragranceTypes.includes(type)}
                                    onCheckedChange={() =>
                                        toggleArrayFilter("fragranceTypes", type, currentFragranceTypes)
                                    }
                                />
                                <Label
                                    htmlFor={`fragrance-${type}`}
                                    className="text-sm font-normal cursor-pointer capitalize"
                                >
                                    {type}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Separator />

            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                <div className="space-y-4">
                    <Slider
                        min={options.priceRange.min}
                        max={options.priceRange.max}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        onValueCommit={applyPriceRange}
                        className="w-full"
                        aria-label="Price range"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>${priceRange[0].toFixed(0)}</span>
                        <span>${priceRange[1].toFixed(0)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                                    {activeFilterCount}
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <FiltersContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <div className="sticky top-20">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        {activeFilterCount > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                    <FiltersContent />
                </div>
            </div>
        </>
    );
}
