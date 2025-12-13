import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login?callbackUrl=/profile");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            _count: {
                select: { orders: true }
            }
        }
    });

    if (!user) {
        redirect("/login?callbackUrl=/profile");
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Card */}
                <div className="md:col-span-2 space-y-8">
                    <div className="border rounded-xl p-8 shadow-sm bg-white">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                                {user.name?.[0].toUpperCase() || "U"}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <p className="text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Personal Information</h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <User className="h-4 w-4" /> Full Name
                                    </Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-gray-900 font-medium">
                                        {user.name}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Mail className="h-4 w-4" /> Email
                                    </Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-gray-900 font-medium">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Phone className="h-4 w-4" /> Phone
                                    </Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-gray-900 font-medium">
                                        {user.phone || "Not set"}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Address
                                    </Label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-gray-900 font-medium">
                                        {user.address || "Not provided"}
                                    </div>
                                </div>
                            </div>

                            {/* Edit Button Placeholder */}
                            {/* <div className="pt-4 flex justify-end">
                                <Button variant="outline">Edit Profile</Button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Account Summary / Quick Links */}
                <div className="space-y-6">
                    <div className="border rounded-xl p-6 shadow-sm bg-white">
                        <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                                <span className="font-medium">Total Orders</span>
                            </div>
                            <span className="text-lg font-bold">{user._count.orders}</span>
                        </div>

                        <Button className="w-full" asChild>
                            <Link href="/orders">View Order History</Link>
                        </Button>
                    </div>

                    <div className="border rounded-xl p-6 shadow-sm bg-white">
                        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Have questions about your account or orders?
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/contact">Contact Support</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
