"use client";

import { useState } from "react";
import { Banner } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteBanner } from "@/lib/actions/banners";
import { useRouter } from "next/navigation";
import { BannerForm } from "./banner-form";
import { AlertModal } from "@/components/modals/alert-modal";
import Image from "next/image";

interface BannerClientProps {
    data: Banner[];
}

export function BannerClient({ data }: BannerClientProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const onDelete = async () => {
        if (!deleteId) return;
        try {
            setLoading(true);
            await deleteBanner(deleteId);
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
                <h2 className="text-3xl font-bold tracking-tight">Banners ({data.length})</h2>
                <BannerForm />
            </div>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((banner) => (
                            <TableRow key={banner.id}>
                                <TableCell>
                                    {banner.imageUrl ? (
                                        <div className="relative h-12 w-24 rounded-md overflow-hidden">
                                            <Image
                                                fill
                                                src={banner.imageUrl}
                                                alt={banner.title || "Banner"}
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-12 w-24 bg-muted rounded-md flex items-center justify-center text-xs">
                                            No Img
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{banner.title || "Untitled"}</TableCell>
                                <TableCell>{banner.isActive ? "Yes" : "No"}</TableCell>
                                <TableCell className="flex gap-2 items-center h-full pt-4">
                                    <BannerForm banner={banner} />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            setDeleteId(banner.id);
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
                                <TableCell colSpan={4} className="text-center h-24">
                                    No banners found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
