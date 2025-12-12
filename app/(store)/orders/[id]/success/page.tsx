import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getStoreCurrency } from "@/lib/actions/store";

interface OrderSuccessPageProps {
    params: {
        id: string;
    };
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
    const { id } = await params;
    const currency = await getStoreCurrency();

    const order = await prisma.order.findUnique({
        where: { id },
    });

    if (!order) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. We have received your order and will contact you shortly regarding delivery.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg w-full max-w-md mb-8 text-left border">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Order Details</h2>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-mono font-medium">{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{order.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 mt-3">
                        <span className="font-bold text-gray-900">Total Amount:</span>
                        {/* Note: Store currency symbol would be ideal here but is client-context dependent. 
                            Using generic display or fetching settings again. For simplicity, just number or generic symbol if context not available easily in server component without props.
                            Actually we can use the helper we created getStoreCurrency()! 
                        */}
                        <span className="font-bold text-gray-900">{currency} {order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/orders">View My Orders</Link>
                </Button>
            </div>
        </div>
    );
}
