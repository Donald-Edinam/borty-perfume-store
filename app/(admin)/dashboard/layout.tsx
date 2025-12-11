import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-muted/40">
            {/* Admin dashboard layout wrapper */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 border-r bg-background fixed h-full z-10">
                    <Sidebar />
                </aside>

                <main className="flex-1 lg:pl-64">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

