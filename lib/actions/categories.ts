"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CategorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
});

export async function createCategory(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            imageUrl: formData.get("imageUrl") as string,
        };

        const validatedData = CategorySchema.parse(rawData);

        await prisma.category.create({
            data: validatedData,
        });

        revalidatePath("/dashboard/categories");
        return { message: "Category created successfully", success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { message: error.errors[0].message, success: false };
        }
        return { message: "Failed to create category", success: false };
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id },
        });
        revalidatePath("/dashboard/categories");
        return { message: "Category deleted successfully", success: true };
    } catch (error) {
        return { message: "Failed to delete category", success: false };
    }
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            imageUrl: formData.get("imageUrl") as string,
        };

        const validatedData = CategorySchema.parse(rawData);

        await prisma.category.update({
            where: { id },
            data: validatedData,
        });

        revalidatePath("/dashboard/categories");
        return { message: "Category updated successfully", success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { message: error.errors[0].message, success: false };
        }
        return { message: "Failed to update category", success: false };
    }
}
