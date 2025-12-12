import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductNotes } from "@/components/store/product-notes";
import { AddToCart } from "@/components/store/add-to-cart";
import { RelatedProducts } from "@/components/store/related-products";
import { ProductPrice } from "@/components/store/product-price";
import { Product, ProductNotes as ProductNotesType } from "@/types/shop";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Force dynamic rendering since we are fetching specific product data based on ID
export const dynamic = "force-dynamic";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    const productData = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });

    if (!productData) {
        notFound();
    }

    // Transform Prisma data to match our frontend Product type
    // Specifically handling the JSON notes field
    const product: Product = {
        ...productData,
        price: productData.price,
        sizeML: productData.sizeML ?? 0, // Handle null
        notes: productData.notes as unknown as ProductNotesType,
        images: productData.images, // Array of strings is fine
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column: Gallery */}
                <div>
                    <ProductGallery images={product.images} name={product.name} />
                </div>

                {/* Right Column: Product Details */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                                {product.brand}
                            </span>
                            {product.isFeatured && (
                                <Badge variant="secondary" className="text-xs">
                                    Best Seller
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            {product.concentration && (
                                <span>{product.concentration}</span>
                            )}
                            {product.sizeML && (
                                <>
                                    <span>•</span>
                                    <span>{product.sizeML} ml</span>
                                </>
                            )}
                            {product.fragranceType && (
                                <>
                                    <span>•</span>
                                    <span className="capitalize">{product.fragranceType}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <ProductPrice price={product.price} className="text-2xl font-semibold text-gray-900" />

                    <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
                        <p>{product.description}</p>
                    </div>

                    <Separator />

                    {/* Add to Cart Section */}
                    <div className="py-2">
                        <AddToCart product={product} />
                    </div>

                    <Separator />

                    {/* Fragrance Notes */}
                    <ProductNotes notes={product.notes} />
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <RelatedProducts currentProductId={product.id} categoryId={product.category.id} />
            </div>
        </div>
    );
}
