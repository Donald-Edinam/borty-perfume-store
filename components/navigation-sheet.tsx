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
      </SheetContent>
    </Sheet>
  );
};
