"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { verifyTransaction } from "@/lib/actions/paystack";
import { updateOrderStatus } from "@/lib/actions/checkout";
import { useCartStore } from "@/lib/store/cart";
import { Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderVerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams<{ id: string }>();
    const { clearCart } = useCartStore();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Verifying payment...");

    const orderId = params.id;


    const reference = searchParams.get("reference");
    const trxref = searchParams.get("trxref");

    useEffect(() => {
        async function verify() {
            if (!reference && !trxref) {
                setStatus("error");
                setMessage("No payment reference found.");
                return;
            }

            const ref = reference || trxref;
            if (!ref) return;

            try {
                // 1. Verify with Paystack
                const verification = await verifyTransaction(ref);

                if (verification.success) {
                    // Update Order Status in DB
                    const update = await updateOrderStatus(orderId, "PAID");

                    if (update.success) {
                        setStatus("success");
                        setMessage("Payment confirmed!");
                        clearCart();
                        // Redirect to success page
                        router.push(`/orders/${orderId}/success`);
                    } else {
                        setStatus("error");
                        setMessage("Payment verified but failed to update order: " + update.error);
                    }
                } else {
                    setStatus("error");
                    setMessage(verification.message || "Payment verification failed.");
                }
            } catch (err) {
                console.error(err);
                setStatus("error");
                setMessage("An error occurred during verification.");
            }
        }

        verify();
    }, [reference, trxref, orderId, clearCart, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-medium">{message}</h2>
                <p className="text-gray-500 text-sm">Please do not close this window.</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
                <div className="bg-red-100 p-4 rounded-full">
                    <XCircle className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
                <p className="text-gray-600 max-w-md">{message}</p>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/checkout">Try Again</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return null; // Should redirect on success
}
