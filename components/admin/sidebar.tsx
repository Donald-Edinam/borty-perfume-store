"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    ShoppingCart,
    Image as ImageIcon,
    Settings,
    Users,
} from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Products",
        icon: ShoppingBag,
        href: "/dashboard/products",
        color: "text-violet-500",
    },
    {
        label: "Categories",
        icon: Layers,
        href: "/dashboard/categories",
        color: "text-pink-700",
    },
    {
        label: "Orders",
        icon: ShoppingCart,
        href: "/dashboard/orders",
        color: "text-orange-700",
    },
    {
        label: "Banners",
        icon: ImageIcon,
        href: "/dashboard/banners",
        color: "text-emerald-500",
    },
    {
        label: "Customers",
        icon: Users,
        href: "/dashboard/customers",
        color: "text-gray-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        color: "text-gray-500",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-white text-slate-800 border-r min-h-screen">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <h1 className="text-2xl font-bold">Admin</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                                pathname === route.href ? "text-primary bg-primary/10" : "text-zinc-600"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
