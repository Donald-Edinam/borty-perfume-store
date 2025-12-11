import { ReactNode } from "react";
import { getStoreSettings } from "@/lib/actions/settings";
import { AlertCircle, Wrench } from "lucide-react";

interface StoreLayoutProps {
    children: ReactNode;
}

const StoreLayout = async ({ children }: StoreLayoutProps) => {
    const settings = await getStoreSettings();

    if (settings?.maintenanceMode) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full flex flex-col items-center">
                    <div className="h-24 w-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                        <Wrench className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Under Maintenance</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Our store is currently undergoing scheduled maintenance to improve your experience.
                        We'll be back shortly!
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span>Borty Perfume Store</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
};

export default StoreLayout;
