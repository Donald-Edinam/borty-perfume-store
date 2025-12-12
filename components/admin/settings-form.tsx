"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateStoreSettings } from "@/lib/actions/settings";
import { StoreSettings } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
    initialSettings: StoreSettings;
}

const currencies = [
    { code: "GHS", name: "Ghana Cedi", symbol: "₵" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
];

export function SettingsForm({ initialSettings }: SettingsFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [currency, setCurrency] = useState(initialSettings.currency);

    const onMaintenanceChange = (checked: boolean) => {
        setIsPending(true);
        updateStoreSettings({ maintenanceMode: checked })
            .then((data) => {
                if (data.success) {
                    router.refresh();
                }
            })
            .finally(() => setIsPending(false));
    };

    const onCurrencyChange = (value: string) => {
        setCurrency(value);
        setIsPending(true);
        updateStoreSettings({ currency: value })
            .then((data) => {
                if (data.success) {
                    router.refresh();
                }
            })
            .finally(() => setIsPending(false));
    };

    return (
        <div className="space-y-4">
            {/* Currency Setting */}
            <div className="rounded-lg border p-4 bg-white shadow-sm">
                <div className="flex flex-row items-center justify-between rounded-lg p-3">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">Store Currency</Label>
                        <div className="text-sm text-muted-foreground">
                            Select the currency for displaying product prices.
                        </div>
                    </div>
                    <Select value={currency} onValueChange={onCurrencyChange} disabled={isPending}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {currencies.map((curr) => (
                                <SelectItem key={curr.code} value={curr.code}>
                                    {curr.symbol} {curr.name} ({curr.code})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Maintenance Mode Setting */}
            <div className="rounded-lg border p-4 bg-white shadow-sm">
                <div className="flex flex-row items-center justify-between rounded-lg p-3">
                    <div className="space-y-0.5">
                        <Label className="text-base font-semibold">Maintenance Mode</Label>
                        <div className="text-sm text-muted-foreground">
                            Disable the public store and show a maintenance page.
                        </div>
                    </div>
                    <Switch
                        checked={initialSettings.maintenanceMode}
                        onCheckedChange={onMaintenanceChange}
                        disabled={isPending}
                    />
                </div>
            </div>
        </div>
    );
}
