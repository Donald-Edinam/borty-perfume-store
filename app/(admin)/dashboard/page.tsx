import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats, getGraphRevenue, getRecentSales } from "@/lib/actions/dashboard";
import { CreditCard, DollarSign, Package, Users, Search, Bell, Mail } from "lucide-react";
import { Overview } from "@/components/admin/overview";
import { RecentSales } from "@/components/admin/recent-sales";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
    const stats = await getDashboardStats();
    const graphRevenue = await getGraphRevenue();
    const recentSales = await getRecentSales();

    return (
        <div className="flex-1 space-y-8 p-0 bg-slate-50/50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Hello, Administrator
                    </h2>
                    <p className="text-slate-500">
                        Here's what's happening with your store today.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* <div className="relative hidden md:block w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="Search anything..."
                            className="pl-9 bg-white border-slate-200 rounded-full focus-visible:ring-purple-500"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full border-slate-200 bg-white">
                        <Bell className="h-4 w-4 text-slate-600" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full border-slate-200 bg-white">
                        <Mail className="h-4 w-4 text-slate-600" />
                    </Button> */}
                    {/* <div className="pl-2 border-l border-slate-200">
                        <div className="flex items-center gap-3 pl-2">
                             <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium leading-none">Admin User</p>
                                <p className="text-xs text-slate-500">Super Admin</p>
                            </div>
                            <Avatar className="h-9 w-9 border-2 border-white shadow-sm cursor-pointer">
                                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                                <AvatarFallback className="bg-purple-600 text-white">AD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-sm bg-white rounded-md hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100/50 rounded-xl">
                                <DollarSign className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-slate-900">₵{stats.totalRevenue.toLocaleString()}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white rounded-md hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100/50 rounded-xl">
                                <CreditCard className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Orders</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stats.salesCount}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white rounded-md hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100/50 rounded-xl">
                                <Package className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Products</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stats.productsCount}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white rounded-md hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100/50 rounded-xl">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Customers</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stats.customersCount}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-7">
                {/* Sales Trend Chart */}
                <Card className="xl:col-span-4 border-none shadow-sm bg-white rounded-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Sales Trend</h3>
                                <p className="text-sm text-slate-500">Revenue over the last 12 months</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-purple-600"></span>
                                    <span className="text-xs font-medium text-slate-600">Current Year</span>
                                </div>
                            </div>
                        </div>
                        <div className="pl-0">
                            <Overview data={graphRevenue} />
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders List */}
                <Card className="xl:col-span-3 border-none shadow-sm bg-white rounded-md">
                    <CardContent className="p-6 max-w-full">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
                                <p className="text-sm text-slate-500">Latest transactions</p>
                            </div>
                            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs font-medium h-8">
                                See All
                            </Button>
                        </div>
                        <RecentSales data={recentSales} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


export default DashboardPage;
