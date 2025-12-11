"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            formData.append("folder", "borty-store");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                onChange(data.secure_url);
                setPreviewUrl(null); // Clear preview after successful upload
            } else {
                console.error("Upload failed:", data);
                alert("Upload failed. Please try again.");
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please check your internet connection.");
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {/* Preview image while uploading */}
                {previewUrl && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border-2 border-dashed border-primary">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-sm">Uploading...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Uploaded images */}
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img src={url} alt="Product" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onUploadFile}
                    disabled={disabled || isUploading}
                    className="hidden"
                    id="image-upload"
                />
                <label htmlFor="image-upload">
                    <Button
                        type="button"
                        disabled={disabled || isUploading}
                        variant="secondary"
                        onClick={() => document.getElementById("image-upload")?.click()}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        {isUploading ? "Uploading..." : "Upload an Image"}
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default ImageUpload;
