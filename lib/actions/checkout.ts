"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { CartItem } from "@/types/shop";

export async function getUserProfile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                name: true,
                phone: true,
                email: true,
                // address: true // Intentionally not fetching address as requested
            }
        });
        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

interface CheckoutData {
    name: string;
    phone: string;
    address: string;
    paymentMethod: PaymentMethod;
    items: CartItem[];
    totalAmount: number;
}

export async function createOrder(data: CheckoutData) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return { success: false, error: "You must be logged in to place an order." };
        }

        if (session.user.role === "ADMIN") {
            return { success: false, error: "Administrators are not allowed to place orders." };
        }

        // Use email to find userId if needed, or rely on session.user.id if added to session type
        // Assuming session.user has id via callbacks, but if not we can query by email.
        // For safety, let's query user by email from DB to get ID.
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });

        if (!user) {
            return { success: false, error: "User not found." };
        }

        const userId = user.id;

        const { items, totalAmount, paymentMethod, phone, address } = data;

        if (!items.length) {
            return { success: false, error: "Your cart is empty." };
        }

        // Verify stock availability
        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.id },
                select: { stock: true, name: true }
            });

            if (!product) {
                return { success: false, error: `Product ${item.name} not found.` };
            }

            if (product.stock < item.quantity) {
                return {
                    success: false,
                    error: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                };
            }
        }

        // Create Order and OrderItems in a transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create the order
            const newOrder = await tx.order.create({
                data: {
                    userId: userId,
                    totalAmount,
                    paymentMethod,
                    paymentStatus: PaymentStatus.PENDING,
                    phone,
                    address,
                    items: {
                        create: items.map(item => ({
                            productId: item.id,
                            quantity: item.quantity,
                            priceAtPurchase: item.price
                        }))
                    }
                }
            });

            // Decrement stock
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.id },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            return newOrder;
        });

        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Order creation error:", error);
        return { success: false, error: "Failed to place order. Please try again." };
    }
}

export async function updateOrderStatus(orderId: string, status: "PAID" | "FAILED") {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Map simplified status to PaymentStatus Enum
        const paymentStatus = status === "PAID" ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return { success: false, error: "Order not found" };
        }

        // Update
        await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: paymentStatus
            }
        });

        return { success: true };

    } catch (error) {
        console.error("Update Order Status Error:", error);
        return { success: false, error: "Failed to update order status" };
    }
}
