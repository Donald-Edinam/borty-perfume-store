import { prisma } from "@/lib/prisma";
import { OrderClient } from "@/components/admin/order-client";
import { getStoreCurrency } from "@/lib/actions/store";

export default async function OrdersPage() {
    const currency = await getStoreCurrency();

    const orders = await prisma.order.findMany({
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <OrderClient data={orders} currency={currency} />
            </div>
        </div>
    );
}
