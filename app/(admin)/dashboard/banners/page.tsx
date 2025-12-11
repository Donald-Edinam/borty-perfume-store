import { prisma } from "@/lib/prisma";
import { BannerClient } from "@/components/admin/banner-client";

export default async function BannersPage() {
    const banners = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <BannerClient data={banners} />
            </div>
        </div>
    );
}
