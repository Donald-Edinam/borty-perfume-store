"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Need to check if this exists or use Input for now
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Need to install form component if not present
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { createCategory, updateCategory } from "@/lib/actions/categories";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { Plus, Pencil } from "lucide-react";

// Need to ensure "textarea", "form" components are installed. 
// Assuming Shadcn form pattern. 
// I'll create the form assuming standard shadcn components. 
// If they are missing, I'll need to install them.
// I'll create a basic version first.

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
});

interface CategoryFormProps {
    category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name || "",
            description: category?.description || "",
            imageUrl: category?.imageUrl || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        if (values.description) formData.append("description", values.description);
        if (values.imageUrl) formData.append("imageUrl", values.imageUrl);

        try {
            if (category) {
                await updateCategory(category.id, null, formData);
            } else {
                await createCategory(null, formData);
            }
            setOpen(false);
            form.reset();
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {category ? (
                    <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Image upload will be handled later properly with Cloudinary, keeping as input for now */}
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
