"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "./sidebar";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MobileNav = () => {
    const pathname = usePathname();

    // Specific main tabs requested by user
    const mainTabs = ["Dashboard", "Products", "Orders", "Customers"];

    // Filter routes for the main bar
    const mainRoutes = routes.filter((route) => mainTabs.includes(route.label));

    // Filter routes for the "More" menu (everything else)
    const moreRoutes = routes.filter((route) => !mainTabs.includes(route.label));

    // Helper to determine if a route is active
    const isActive = (href: string) => {
        // Dashboard should only be active on exact match
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        // Other routes can use startsWith for sub-pages
        return pathname === href || pathname?.startsWith(`${href}/`);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden px-4 py-2">
            <div className="flex justify-between items-center">
                {mainRoutes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "flex flex-col items-center justify-center space-y-1 min-w-[64px]",
                            isActive(route.href) ? "text-primary" : "text-gray-500"
                        )}
                    >
                        <route.icon className="h-5 w-5" />
                        <span className="text-[10px] font-medium">{route.label}</span>
                    </Link>
                ))}

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-col items-center justify-center space-y-1 min-w-[64px] outline-none text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                        <span className="text-[10px] font-medium">More</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mb-2">
                        {moreRoutes.map((route) => (
                            <DropdownMenuItem key={route.href} asChild>
                                <Link
                                    href={route.href}
                                    className={cn(
                                        "flex items-center w-full cursor-pointer",
                                        isActive(route.href) ? "text-primary bg-primary/10" : "text-zinc-600"
                                    )}
                                >
                                    <route.icon className={cn("h-4 w-4 mr-2", route.color)} />
                                    <span>{route.label}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem asChild>
                            <Link
                                href="/"
                                className="flex items-center w-full cursor-pointer text-zinc-600 mt-2 border-t pt-2"
                            >
                                <span className="text-[10px] font-medium ml-6">Return to Store</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
