import { prisma } from "@/lib/prisma";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { HeroBanner } from "@/components/store/hero-banner";
import { FeaturedProducts } from "@/components/store/featured-products";
import { EmptyState } from "@/components/store/empty-state";

export default async function HomePage() {
    // Fetch active banners
    const banners = await prisma.banner.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    // Fetch featured products
    const featuredProducts = await prisma.product.findMany({
        where: {
            isFeatured: true,
            isActive: true,
        },
        include: {
            category: true,
        },
        orderBy: { createdAt: "desc" },
        take: 8,
    });

    const currencySymbol = await getCurrencySymbol();

    const hasContent = banners.length > 0 || featuredProducts.length > 0;

    return (
        <div className="min-h-screen">
            <HeroBanner banners={banners} />
            <FeaturedProducts products={featuredProducts} currencySymbol={currencySymbol} />
            {!hasContent && <EmptyState />}
        </div>
    );
}
