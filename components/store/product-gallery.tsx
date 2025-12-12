"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const handleThumbnailClick = (index: number) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    // Fallback if no images
    if (!images || images.length === 0) {
        return (
            <div className="bg-gray-50 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-4">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-8">
                                <img
                                    src={image}
                                    alt={`${name} - Image ${index + 1}`}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {images.length > 1 && (
                    <>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </>
                )}
            </Carousel>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto py-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "relative w-20 h-20 bg-gray-50 rounded-md overflow-hidden border-2 flex-shrink-0",
                                current === index
                                    ? "border-black"
                                    : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <img
                                src={image}
                                alt={`${name} - Thumbnail ${index + 1}`}
                                className="object-contain w-full h-full p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
