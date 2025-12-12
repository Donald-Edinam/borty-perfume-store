"use client";

import { useState } from "react";
import { Category } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCategory } from "@/lib/actions/categories";
import { useRouter } from "next/navigation";
import { CategoryForm } from "./category-form";
import { AlertModal } from "@/components/modals/alert-modal";

interface CategoryClientProps {
    data: Category[];
}

export function CategoryClient({ data }: CategoryClientProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const onDelete = async () => {
        if (!deleteId) return;
        try {
            setLoading(true);
            await deleteCategory(deleteId);
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
                <h2 className="text-3xl font-bold tracking-tight">Categories ({data.length})</h2>
                <CategoryForm />
            </div>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell className="flex gap-2">
                                    <CategoryForm category={category} />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            setDeleteId(category.id);
                                            setOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
