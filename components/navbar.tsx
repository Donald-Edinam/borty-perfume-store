"use client";

import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { UserNav } from "@/components/user-nav";
import { CartIndicator } from "@/components/store/cart-indicator";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAdmin = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isTransparent = isHomePage && !isScrolled;

  return (
    <nav
      className={cn(
        "h-16 z-50 transition-all duration-300",
        isTransparent
          ? "absolute top-0 left-0 right-0 bg-transparent !text-white"
          : "sticky top-0 bg-background/95 backdrop-blur-sm border-b shadow-sm"
      )}
    >
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <Logo className={isTransparent ? "!text-white" : ""} />

        {/* Desktop Menu */}
        {!isAdmin && <NavMenu className="hidden md:block" isTransparent={isTransparent} />}

        <div className="flex items-center gap-3">
          {!isAdmin && <CartIndicator isTransparent={isTransparent} />}
          <UserNav isTransparent={isTransparent} />

          {/* Mobile Menu */}
          {!isAdmin && (
            <div className="md:hidden">
              <NavigationSheet isTransparent={isTransparent} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
