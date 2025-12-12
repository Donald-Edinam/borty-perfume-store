"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const BannerSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    imageUrl: z.string().min(1, "Image is required"),
    isActive: z.boolean().default(true).optional(),
});

export async function createBanner(prevState: any, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title") as string,
            subtitle: formData.get("subtitle") as string,
            imageUrl: formData.get("imageUrl") as string,
            isActive: formData.get("isActive") === "true",
        };

        const validatedData = BannerSchema.parse(rawData);

        await prisma.banner.create({
            data: validatedData,
        });

        revalidatePath("/dashboard/banners");
        return { message: "Banner created successfully", success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { message: error.issues[0].message, success: false };
        }
        return { message: "Failed to create banner", success: false };
    }
}

export async function updateBanner(id: string, prevState: any, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title") as string,
            subtitle: formData.get("subtitle") as string,
            imageUrl: formData.get("imageUrl") as string,
            isActive: formData.get("isActive") === "true",
        };

        const validatedData = BannerSchema.parse(rawData);

        await prisma.banner.update({
            where: { id },
            data: validatedData,
        });

        revalidatePath("/dashboard/banners");
        return { message: "Banner updated successfully", success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { message: error.issues[0].message, success: false };
        }
        return { message: "Failed to update banner", success: false };
    }
}

export async function deleteBanner(id: string) {
    try {
        await prisma.banner.delete({
            where: { id },
        });
        revalidatePath("/dashboard/banners");
        return { message: "Banner deleted successfully", success: true };
    } catch (error) {
        return { message: "Failed to delete banner", success: false };
    }
}
