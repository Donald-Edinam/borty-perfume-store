import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface NavigationSheetProps {
  isTransparent?: boolean;
}

export const NavigationSheet = ({ isTransparent }: NavigationSheetProps) => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button
          variant={isTransparent ? "ghost" : "outline"}
          size="icon"
          className={cn(isTransparent && "!text-white hover:!text-white/90 hover:bg-white/10 border-white/30")}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Logo />
        <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />

        <div className="mt-8 border-t pt-6">
          <MobileAuthButtons />
        </div>
      </SheetContent>
    </Sheet>
  );
};

import { useSession } from "next-auth/react";
import Link from "next/link";

function MobileAuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {session.user.name?.[0].toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full justify-start mt-2">
          <Link href="/profile">My Profile</Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/orders">My Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Button asChild variant="outline" className="w-full">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild className="w-full">
        <Link href="/register">Sign Up</Link>
      </Button>
    </div>
  );
}
