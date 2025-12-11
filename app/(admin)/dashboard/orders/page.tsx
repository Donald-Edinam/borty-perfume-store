import { prisma } from "@/lib/prisma";
import { OrderClient } from "@/components/admin/order-client";

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            user: true,
            orderItems: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <OrderClient data={orders} />
            </div>
        </div>
    );
}
