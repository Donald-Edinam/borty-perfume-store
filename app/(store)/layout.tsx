import { ReactNode } from "react";

interface StoreLayoutProps {
    children: ReactNode;
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
    return (
        <div className="min-h-screen">
            {/* Store-specific layout wrapper */}
            {children}
        </div>
    );
};

export default StoreLayout;
