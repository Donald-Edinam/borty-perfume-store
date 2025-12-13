import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface RecentSalesProps {
    data: any[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({ data }) => {
    return (
        <div className="space-y-4">
            {/* Simple Header Row (Hidden on mobile if needed, but good for table look) */}
            <div className="grid grid-cols-4 text-xs font-semibold text-slate-400 px-2 pb-2 border-b border-slate-100">
                <div className="col-span-2">CUSTOMER</div>
                <div>DATE</div>
                <div className="text-right">AMOUNT</div>
            </div>

            {data.map((order) => {
                const items = order.user;
                const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' }) : "Recently";

                return (
                    <div className="grid grid-cols-4 items-center p-2 rounded-lg hover:bg-slate-50 transition-colors group" key={order.id}>
                        <div className="col-span-2 flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-slate-100 border border-slate-200">
                                <AvatarFallback className="text-xs font-medium text-slate-600 bg-transparent">
                                    {items?.name?.[0].toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold text-slate-900 truncate">{items?.name || "Unknown"}</p>
                                <p className="text-xs text-slate-500 truncate">{items?.email}</p>
                            </div>
                        </div>

                        <div className="text-xs font-medium text-slate-500">
                            {date}
                        </div>

                        <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-bold text-slate-900">₵{order.totalAmount}</span>
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-[10px] font-medium px-1.5 py-0 h-5 border-none">
                                Paid
                            </Badge>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
