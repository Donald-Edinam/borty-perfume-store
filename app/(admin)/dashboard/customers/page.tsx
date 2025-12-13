import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function CustomersPage() {
    const customers = await prisma.user.findMany({
        where: {
            role: "CUSTOMER",
        },
        include: {
            _count: {
                select: { orders: true },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold tracking-tight">Customers ({customers.length})</h2>
                </div>
                <div className="rounded-md border bg-white overflow-x-auto">
                    <Table className="min-w-[700px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Orders</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="" />
                                            <AvatarFallback>{user.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{user._count.orders} orders</TableCell>
                                </TableRow>
                            ))}
                            {customers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
