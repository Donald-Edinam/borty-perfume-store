import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/product-card";

interface RelatedProductsProps {
    currentProductId: string;
    categoryId: string;
}

export async function RelatedProducts({ currentProductId, categoryId }: RelatedProductsProps) {
    const products = await prisma.product.findMany({
        where: {
            categoryId,
            id: {
                not: currentProductId,
            },
            isActive: true,
        },
        take: 4,
        include: {
            category: true,
        },
        orderBy: {
            isFeatured: 'desc', // Prioritize featured products
        }
    });

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
