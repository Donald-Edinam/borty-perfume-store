import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome to Borty Perfume Store</h2>
                <p className="text-gray-600 mb-8">
                    Our store is being set up. Check back soon for amazing fragrances!
                </p>
                <Link href="/dashboard">
                    <Button>Go to Admin Dashboard</Button>
                </Link>
            </div>
        </div>
    );
}
