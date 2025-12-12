"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Banner } from "@prisma/client";

interface HeroBannerProps {
    banners: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000); // Change banner every 5 seconds

        return () => clearInterval(interval);
    }, [banners.length]);

    if (banners.length === 0) return null;

    return (
        <section className="relative w-full">
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={banner.imageUrl}
                            alt={banner.title || "Banner"}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                            <div className="container mx-auto px-4 md:px-6">
                                <div className="max-w-2xl text-white">
                                    {banner.title && (
                                        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                                            {banner.title}
                                        </h1>
                                    )}
                                    {banner.subtitle && (
                                        <p className="text-lg md:text-xl mb-8 animate-fade-in">
                                            {banner.subtitle}
                                        </p>
                                    )}
                                    <Link href="/shop">
                                        <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                                            Shop Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Dots */}
                {banners.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                        ? "bg-white w-8"
                                        : "bg-white/50 hover:bg-white/75"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
