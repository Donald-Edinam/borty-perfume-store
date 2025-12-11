import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-muted/40">
            {/* Admin dashboard layout wrapper */}
            <div className="flex">
                {/* Sidebar can go here */}
                <aside className="hidden lg:block w-64 border-r bg-background">
                    {/* Sidebar content */}
                </aside>

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
