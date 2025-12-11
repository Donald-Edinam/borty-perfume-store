"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(id: string, status: OrderStatus) {
    try {
        await prisma.order.update({
            where: { id },
            data: { status },
        });

        revalidatePath("/dashboard/orders");
        return { message: "Order status updated successfully", success: true };
    } catch (error) {
        return { message: "Failed to update order status", success: false };
    }
}

export async function deleteOrder(id: string) {
    try {
        await prisma.order.delete({
            where: { id }
        });
        revalidatePath("/dashboard/orders");
        return { message: "Order deleted successfully", success: true };
    } catch (error) {
        return { message: "Failed to delete order", success: false };
    }
}
