"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export function ConditionalFooter() {
    const pathname = usePathname();

    // Hide footer on admin dashboard pages
    const hideFooter = pathname?.startsWith("/dashboard");

    if (hideFooter) {
        return null;
    }

    return <Footer />;
}
