"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface NavMenuProps extends ComponentProps<typeof NavigationMenu> {
  isTransparent?: boolean;
}

export const NavMenu = ({ isTransparent, ...props }: NavMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={cn(
            navigationMenuTriggerStyle(),
            isTransparent && "!bg-transparent !text-white hover:!text-white/90 hover:!bg-white/10"
          )}
        >
          <Link href="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={cn(
            navigationMenuTriggerStyle(),
            isTransparent && "!bg-transparent !text-white hover:!text-white/90 hover:!bg-white/10"
          )}
        >
          <Link href="/shop">Shop</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={cn(
            navigationMenuTriggerStyle(),
            isTransparent && "!bg-transparent !text-white hover:!text-white/90 hover:!bg-white/10"
          )}
        >
          <Link href="/about">About</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={cn(
            navigationMenuTriggerStyle(),
            isTransparent && "!bg-transparent !text-white hover:!text-white/90 hover:!bg-white/10"
          )}
        >
          <Link href="/contact">Contact Us</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
