"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { buildSearchParams } from "@/lib/utils/filters";
import { ProductFilters } from "@/types/shop";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl = "/shop" }: PaginationProps) {
    const searchParams = useSearchParams();

    // Build URL for a specific page
    const buildPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page > 1) {
            params.set("page", page.toString());
        } else {
            params.delete("page");
        }
        const queryString = params.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 7; // Maximum number of page buttons to show

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
        <nav
            role="navigation"
            aria-label="Pagination"
            className="flex items-center justify-center gap-2 mt-8"
        >
            {/* First Page */}
            <Button
                variant="outline"
                size="icon"
                asChild
                disabled={currentPage === 1}
                aria-label="Go to first page"
                className="hidden sm:inline-flex"
            >
                {currentPage === 1 ? (
                    <span aria-disabled="true">
                        <ChevronsLeft className="h-4 w-4" />
                    </span>
                ) : (
                    <Link href={buildPageUrl(1)}>
                        <ChevronsLeft className="h-4 w-4" />
                    </Link>
                )}
            </Button>

            {/* Previous Page */}
            <Button
                variant="outline"
                size="icon"
                asChild
                disabled={currentPage === 1}
                aria-label="Go to previous page"
            >
                {currentPage === 1 ? (
                    <span aria-disabled="true">
                        <ChevronLeft className="h-4 w-4" />
                    </span>
                ) : (
                    <Link href={buildPageUrl(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                )}
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 text-gray-500"
                                aria-hidden="true"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <Button
                            key={pageNum}
                            variant={isActive ? "default" : "outline"}
                            size="icon"
                            asChild={!isActive}
                            disabled={isActive}
                            aria-label={`${isActive ? "Current page, " : "Go to "}page ${pageNum}`}
                            aria-current={isActive ? "page" : undefined}
                            className="w-10 h-10"
                        >
                            {isActive ? (
                                <span>{pageNum}</span>
                            ) : (
                                <Link href={buildPageUrl(pageNum)}>{pageNum}</Link>
                            )}
                        </Button>
                    );
                })}
            </div>

            {/* Next Page */}
            <Button
                variant="outline"
                size="icon"
                asChild
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
            >
                {currentPage === totalPages ? (
                    <span aria-disabled="true">
                        <ChevronRight className="h-4 w-4" />
                    </span>
                ) : (
                    <Link href={buildPageUrl(currentPage + 1)}>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </Button>

            {/* Last Page */}
            <Button
                variant="outline"
                size="icon"
                asChild
                disabled={currentPage === totalPages}
                aria-label="Go to last page"
                className="hidden sm:inline-flex"
            >
                {currentPage === totalPages ? (
                    <span aria-disabled="true">
                        <ChevronsRight className="h-4 w-4" />
                    </span>
                ) : (
                    <Link href={buildPageUrl(totalPages)}>
                        <ChevronsRight className="h-4 w-4" />
                    </Link>
                )}
            </Button>
        </nav>
    );
}
