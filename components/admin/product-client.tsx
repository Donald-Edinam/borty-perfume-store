"use client";

import { useState } from "react";
import { Product, Category } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { ProductForm } from "./product-form";
import { AlertModal } from "@/components/modals/alert-modal";
import Image from "next/image";

interface ProductWithCategory extends Product {
    category: Category;
}

interface ProductClientProps {
    data: ProductWithCategory[];
    categories: Category[];
}

export function ProductClient({ data, categories }: ProductClientProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const onDelete = async () => {
        if (!deleteId) return;
        try {
            setLoading(true);
            await deleteProduct(deleteId);
            router.refresh();
            setDeleteId(null);
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                    setDeleteId(null);
                }}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Products ({data.length})</h2>
                <ProductForm categories={categories} />
            </div>
            <div className="rounded-md border bg-white overflow-x-auto">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    {product.images?.[0] ? (
                                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                            <Image
                                                fill
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center text-xs">
                                            No Img
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.isActive ? "Active" : "Inactive"}</TableCell>
                                <TableCell className="flex gap-2 items-center h-full pt-4">
                                    <ProductForm product={product} categories={categories} />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            setDeleteId(product.id);
                                            setOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
