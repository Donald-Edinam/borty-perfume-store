import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <h1 className={cn("text-xl font-bold", className)}>Borty&apos;s Perfume Store</h1>
);
