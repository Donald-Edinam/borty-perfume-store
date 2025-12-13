import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login?callbackUrl=/orders");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
    });

    if (!user) {
        redirect("/login?callbackUrl=/orders");
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    return (
        <div className="container mx-auto px-4 py-10 max-w-(--breakpoint-xl)">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 border rounded-lg bg-gray-50/50">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                    <p className="text-muted-foreground mb-6">Looks like you haven't bought anything yet.</p>
                    <Button asChild>
                        <Link href="/shop">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/50 hover:bg-card/80 transition-colors">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-semibold font-mono">#{order.id.slice(-8)}</span>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                        order.paymentStatus === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                                        order.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        Payment: {order.paymentStatus}
                                    </span>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                        order.orderStatus === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                        order.orderStatus === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                                        order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        Delivery: {order.orderStatus}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm font-medium">
                                    {order.items.length} item(s) • Total: GH₵{Number(order.totalAmount).toFixed(2)}
                                </p>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/orders/${order.id}`}>View Details</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
