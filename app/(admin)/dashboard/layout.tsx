import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { MobileNav } from "@/components/admin/mobile-nav";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-muted/40">
            {/* Admin dashboard layout wrapper */}
            <div className="flex">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 border-r bg-background fixed h-full z-10">
                    <Sidebar />
                </aside>

                <main className="flex-1 lg:pl-64">
                    <div className="p-8 pb-20 lg:pb-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    );
};

export default DashboardLayout;

