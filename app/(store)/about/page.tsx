import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Heart } from "lucide-react";

export const metadata = {
    title: "About Us - Borty's Perfume Store",
    description: "Discover the story behind Borty's Perfume Store and our passion for premium fragrances.",
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-24 md:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    {/* Placeholder for Hero Image - In real app, use a real image */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="relative z-20 container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Story</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Crafting memories through the art of scent since 2023.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Elevating Your Senses</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At Borty's Perfume Store, we believe that fragrance is more than just a scent—it's an extension of your personality, a trigger for cherished memories, and a statement of style.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our journey began with a simple passion: to make premium, authentic fragrances accessible to everyone in Ghana. We curate a diverse collection of perfumes from world-renowned brands and hidden gems, ensuring there's a perfect match for every individual.
                        </p>
                        <div className="pt-4">
                            <Button asChild size="lg">
                                <Link href="/shop">
                                    Explore Our Collection <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2072&auto=format&fit=crop"
                            alt="Perfume Collection"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600">
                            We are driven by a commitment to quality, authenticity, and customer satisfaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">100% Authentic</h3>
                            <p className="text-gray-600">
                                We guarantee the authenticity of every product we sell. No imitations, just pure luxury.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                                <Leaf className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Curated Quality</h3>
                            <p className="text-gray-600">
                                Each fragrance is hand-picked for its unique character, longevity, and exceptional quality.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-6">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Customer First</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We're here to guide you to your perfect scent signature.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
