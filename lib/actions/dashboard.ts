import { prisma } from "@/lib/prisma";
import { PaymentStatus, Role } from "@prisma/client";

export async function getDashboardStats() {
    const totalRevenue = await prisma.order.aggregate({
        where: { paymentStatus: PaymentStatus.SUCCESS },
        _sum: { totalAmount: true },
    });

    const salesCount = await prisma.order.count({
        where: { paymentStatus: PaymentStatus.SUCCESS },
    });

    const productsCount = await prisma.product.count({
        where: { isActive: true },
    });

    const customersCount = await prisma.user.count({
        where: { role: Role.CUSTOMER },
    });

    return {
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        salesCount,
        productsCount,
        customersCount,
    };
}

export async function getGraphRevenue() {
    const paidOrders = await prisma.order.findMany({
        where: { paymentStatus: PaymentStatus.SUCCESS },
        orderBy: { createdAt: "asc" },
    });

    const monthlyRevenue: { [key: string]: number } = {};

    for (const order of paidOrders) {
        const month = order.createdAt.toLocaleString("default", { month: "short" });
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalAmount;
    }

    const graphData = Object.entries(monthlyRevenue).map(([name, total]) => ({
        name,
        total,
    }));

    return graphData;
}

export async function getRecentSales() {
    return await prisma.order.findMany({
        where: { paymentStatus: PaymentStatus.SUCCESS },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                }
            }
        }
    });
}
