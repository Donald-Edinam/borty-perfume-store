import { prisma } from "@/lib/prisma";
import { ProductClient } from "@/components/admin/product-client";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc",
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <ProductClient data={products} categories={categories} />
            </div>
        </div>
    );
}
