"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    stock: z.coerce.number().int().min(0, "Stock must be a positive integer"),
    categoryId: z.string().min(1, "Category is required"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

export async function createProduct(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: formData.get("price"),
            stock: formData.get("stock"),
            categoryId: formData.get("categoryId") as string,
            // Handle images: we expect them to be passed as JSON string or handle multiple fields?
            // For simplicity in FormData with server actions, we might append them individually or as JSON.
            // Let's assume the form handles sending a JSON string of URLs for "images"
            images: JSON.parse(formData.get("images") as string || "[]"),
            isFeatured: formData.get("isFeatured") === "true",
            isArchived: formData.get("isArchived") === "true",
        };

        const validatedData = ProductSchema.parse(rawData);

        await prisma.product.create({
            data: {
                name: validatedData.name,
                description: validatedData.description || "",
                price: validatedData.price,
                stock: validatedData.stock,
                categoryId: validatedData.categoryId,
                isFeatured: validatedData.isFeatured || false,
                isActive: !validatedData.isArchived,
                images: validatedData.images, // Storing as string[] in Postgres (Prisma supports scalar lists)
            },
        });

        revalidatePath("/dashboard/products");
        return { message: "Product created successfully", success: true };
    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            return { message: error.issues[0].message, success: false };
        }
        return { message: "Failed to create product", success: false };
    }
}

export async function updateProduct(id: string, prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: formData.get("price"),
            stock: formData.get("stock"),
            categoryId: formData.get("categoryId") as string,
            images: JSON.parse(formData.get("images") as string || "[]"),
            isFeatured: formData.get("isFeatured") === "true",
            isArchived: formData.get("isArchived") === "true",
        };

        const validatedData = ProductSchema.parse(rawData);

        await prisma.product.update({
            where: { id },
            data: {
                name: validatedData.name,
                description: validatedData.description || "",
                price: validatedData.price,
                stock: validatedData.stock,
                categoryId: validatedData.categoryId,
                isFeatured: validatedData.isFeatured || false,
                isActive: !validatedData.isArchived,
                images: validatedData.images,
            },
        });

        revalidatePath("/dashboard/products");
        return { message: "Product updated successfully", success: true };
    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            return { message: error.issues[0].message, success: false };
        }
        return { message: "Failed to update product", success: false };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/dashboard/products");
        return { message: "Product deleted successfully", success: true };
    } catch (error) {
        return { message: "Failed to delete product", success: false };
    }
}
