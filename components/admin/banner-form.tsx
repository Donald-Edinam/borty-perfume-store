"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { createBanner, updateBanner } from "@/lib/actions/banners";
import { useRouter } from "next/navigation";
import { Banner } from "@prisma/client";
import { Plus, Pencil } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    imageUrl: z.string().min(1, "Image is required"),
    isActive: z.boolean().default(true).optional(),
});

interface BannerFormProps {
    banner?: Banner;
}

export function BannerForm({ banner }: BannerFormProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: banner?.title || "",
            subtitle: banner?.subtitle || "",
            imageUrl: banner?.imageUrl || "",
            isActive: banner?.isActive ?? true,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const formData = new FormData();
        if (values.title) formData.append("title", values.title);
        if (values.subtitle) formData.append("subtitle", values.subtitle);
        formData.append("imageUrl", values.imageUrl);
        formData.append("isActive", String(values.isActive));

        try {
            let result;
            if (banner) {
                result = await updateBanner(banner.id, null, formData);
            } else {
                result = await createBanner(null, formData);
            }

            if (result.success) {
                setOpen(false);
                form.reset();
                router.refresh();
            } else {
                console.error("Banner action failed:", result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {banner ? (
                    <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Banner
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{banner ? "Edit Banner" : "Add New Banner"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value ? [field.value] : []}
                                            disabled={isLoading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Banner Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subtitle (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Banner Subtitle" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Active</FormLabel>
                                        <FormDescription>
                                            This banner will appear on the home page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Saving..." : "Save Banner"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
