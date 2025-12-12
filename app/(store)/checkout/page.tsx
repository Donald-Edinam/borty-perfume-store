"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useCurrency } from "@/components/providers/currency-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createOrder, getUserProfile } from "@/lib/actions/checkout";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const { currency } = useCurrency();
    const router = useRouter();
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        paymentMethod: "CASH" as "CASH" | "MOMO"
    });

    // Fetch user profile to pre-fill data
    useEffect(() => {
        async function loadProfile() {
            if (session?.user) {
                const profile = await getUserProfile();
                if (profile) {
                    setFormData(prev => ({
                        ...prev,
                        name: profile.name || session.user.name || "",
                        phone: profile.phone || "",
                        // Address not pre-filled as requested
                    }));
                }
            }
        }
        loadProfile();
    }, [session]);
    const [error, setError] = useState("");

    const subtotal = totalPrice();
    const shipping = 10.00;
    const tax = 0; // Disabled
    const total = subtotal + shipping + tax;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await createOrder({
                ...formData,
                items,
                totalAmount: total,
                paymentMethod: formData.paymentMethod
            });

            if (result.success) {
                clearCart();
                router.push(`/orders/${result.orderId}/success`);
            } else {
                setError(result.error || "Failed to place order");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column: Form */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Customer Info */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        required
                                        type="tel"
                                        placeholder="020 xxxx xxx"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Delivery Address</Label>
                                    <Textarea
                                        id="address"
                                        required
                                        placeholder="Street name, House number, GPS Address..."
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <RadioGroup
                                value={formData.paymentMethod}
                                onValueChange={(value: "CASH" | "MOMO") => setFormData({ ...formData, paymentMethod: value })}
                                className="space-y-4"
                            >
                                <div className="flex items-center space-x-3 border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <RadioGroupItem value="CASH" id="cash" />
                                    <Label htmlFor="cash" className="flex-1 cursor-pointer font-medium">
                                        Cash on Delivery
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <RadioGroupItem value="MOMO" id="momo" />
                                    <div className="flex-1 cursor-pointer">
                                        <Label htmlFor="momo" className="font-medium">Pay with Mobile Money</Label>
                                        <p className="text-xs text-gray-500 mt-1">Paystack (MTN, Vodafone, SRT)</p>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Pay ${currency} ${total.toFixed(2)}`
                            )}
                        </Button>
                        {error && (
                            <p className="text-red-500 text-sm text-center font-medium mt-2">{error}</p>
                        )}
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="order-1 lg:order-2">
                    <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4 mb-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-16 w-16 bg-white rounded-md border shrink-0 flex items-center justify-center">
                                        {item.images[0] ? (
                                            <img src={item.images[0]} alt={item.name} className="h-full w-full object-contain p-1" />
                                        ) : (
                                            <div className="text-[10px] text-gray-400">No Img</div>
                                        )}
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.brand}</p>
                                    </div>
                                    <div className="font-medium text-sm">
                                        {currency} {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span>{currency} {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span>{currency} {shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                                <span>Total</span>
                                <span>{currency} {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
