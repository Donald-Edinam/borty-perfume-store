import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, MapPin, Phone, CreditCard } from "lucide-react";
import Image from "next/image";

interface OrderDetailsPageProps {
    params: {
        id: string;
    }
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);

    const { id } = await params;

    if (!session?.user?.email) {
        redirect(`/login?callbackUrl=/orders/${id}`);
    }

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) {
        return notFound();
    }

    // Security check: Ensure order belongs to user
    // First get user ID
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true }
    });

    if (!user || (order.userId !== user.id && user.role !== 'ADMIN')) {
        return notFound();
        // Or redirect to unauthorized? notFound is safer to not leak existence.
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-(--breakpoint-lg)">
            <Button variant="ghost" asChild className="mb-6 pl-0 hover:pl-2 transition-all">
                <Link href="/orders">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                </Link>
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        Order #{order.id.slice(-8)}
                        <span className={`text-sm px-3 py-1 rounded-full font-medium ${order.paymentStatus === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                            order.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            Payment: {order.paymentStatus}
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full font-medium ${order.orderStatus === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                            order.orderStatus === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                                order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-700'
                            }`}>
                            Delivery: {order.orderStatus}
                        </span>
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                </div>
                {/* Optional: Add Action buttons like 'Track Order' or 'Invoice' here */}
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    {/* Items List */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 px-6 py-4 border-b">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Order Items
                            </h2>
                        </div>
                        <div className="divide-y">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-6 flex gap-4">
                                    <div className="relative h-20 w-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                        {item.product.images[0] ? (
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                <Package className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.product.name}</h3>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        <p className="text-sm font-medium mt-1">GH₵{item.priceAtPurchase.toFixed(2)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">GH₵{(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="border rounded-lg p-6 space-y-4">
                        <h2 className="font-semibold text-lg">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>GH₵{order.totalAmount.toFixed(2)}</span>
                                {/* Note: totalAmount in DB includes shipping? 
                                    In checkout.ts: total = subtotal + shipping + tax.
                                    So this totalAmount is the final CHARGED amount.
                                    If we want breakdown, we need to store it or infer.
                                    For now just showing Total.
                                */}
                            </div>
                            <div className="flex justify-between font-medium pt-4 border-t text-base">
                                <span>Total</span>
                                <span>GH₵{order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="border rounded-lg p-6 space-y-4">
                        <h2 className="font-semibold text-lg">Customer Details</h2>

                        <div className="flex items-start gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-medium">Phone</p>
                                <p className="text-muted-foreground">{order.phone || "N/A"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-medium">Payment Method</p>
                                <p className="text-muted-foreground">{order.paymentMethod}</p>
                            </div>
                        </div>

                        {order.address && (
                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Delivery Address</p>
                                    <p className="text-muted-foreground">{order.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
