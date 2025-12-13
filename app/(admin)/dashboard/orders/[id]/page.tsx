import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getStoreCurrency } from "@/lib/actions/store";

interface AdminOrderDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailsPage({ params }: AdminOrderDetailsPageProps) {
    const { id } = await params;
    const currency = await getStoreCurrency();

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) {
        notFound();
    }

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "SUCCESS":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "FAILED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getOrderStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-100 text-green-800";
            case "PROCESSING":
                return "bg-blue-100 text-blue-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/orders">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Order Details</h1>
                    <p className="text-muted-foreground">Order ID: {order.id}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Order Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Order Date</p>
                                <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="font-medium">{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Status</p>
                                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                                    {order.paymentStatus}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Delivery Status</p>
                                <Badge className={getOrderStatusColor(order.orderStatus)}>
                                    {order.orderStatus}
                                </Badge>
                            </div>
                        </div>
                        {order.momoReference && (
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Reference</p>
                                <p className="font-mono text-sm">{order.momoReference}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Customer Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-medium">{order.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{order.user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{order.phone}</p>
                        </div>
                        {order.address && (
                            <div>
                                <p className="text-sm text-muted-foreground">Delivery Address</p>
                                <p className="font-medium">{order.address}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Order Items */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table className="min-w-[600px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead className="text-right">Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {item.product.images?.[0] && (
                                                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                                        <Image
                                                            fill
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <span className="font-medium">{item.product.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{currency}{Number(item.priceAtPurchase).toFixed(2)}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className="text-right font-medium">
                                            {currency}{(Number(item.priceAtPurchase) * item.quantity).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-end">
                        <div className="space-y-2 w-64">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{currency}{Number(order.totalAmount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
