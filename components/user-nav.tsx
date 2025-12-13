"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User, LogOut, ShoppingBag, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserNavProps {
    isTransparent?: boolean;
}

export function UserNav({ isTransparent }: UserNavProps) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
    }

    if (!session?.user) {
        return (
            <div className="hidden md:flex items-center gap-2">
                <Button
                    variant={isTransparent ? "ghost" : "ghost"}
                    asChild
                    className={cn(isTransparent && "!text-white hover:!text-white/90 hover:bg-white/10")}
                >
                    <Link href="/login">Login</Link>
                </Button>
                <Button
                    asChild
                    className={cn(
                        isTransparent && "bg-white !text-black hover:bg-white/90"
                    )}
                >
                    <Link href="/register">Sign Up</Link>
                </Button>
            </div>
        );
    }

    const initials = session.user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "relative h-8 w-8 rounded-full",
                        isTransparent && "hover:bg-white/10"
                    )}
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn(isTransparent && "bg-white text-black")}>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                {session.user.role !== "ADMIN" && (
                    <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            My Orders
                        </Link>
                    </DropdownMenuItem>
                )}
                {session.user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-destructive"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
