import { prisma } from "@/lib/prisma";
import { CategoryClient } from "@/components/admin/category-client";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <CategoryClient data={categories} />
            </div>
        </div>
    );
}
