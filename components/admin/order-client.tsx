"use client";

import { useState } from "react";
import { Order, OrderItem, User, OrderStatus } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/lib/actions/orders";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type OrderWithDetails = Order & {
    user: User;
    items: OrderItem[];
};

interface OrderClientProps {
    data: OrderWithDetails[];
}

export function OrderClient({ data }: OrderClientProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const onStatusChange = async (id: string, status: OrderStatus) => {
        try {
            setLoadingId(id);
            await updateOrderStatus(id, status);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Orders ({data.length})</h2>
            </div>
            <div className="rounded-md border bg-white overflow-x-auto">
                <Table className="min-w-[900px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs">{order.id.slice(-8)}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.user.name}</span>
                                        <span className="text-xs text-muted-foreground">{order.user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>${Number(order.totalAmount).toFixed(2)}</TableCell>
                                <TableCell>{order.paymentStatus}</TableCell>
                                <TableCell>
                                    <Select
                                        disabled={loadingId === order.id}
                                        onValueChange={(value) => onStatusChange(order.id, value as OrderStatus)}
                                        defaultValue={order.orderStatus}
                                    >
                                        <SelectTrigger className="w-[130px] h-8">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(OrderStatus).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {/* Placeholder for View Details - for now just listed */}
                                    <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4 mr-2" /> Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
