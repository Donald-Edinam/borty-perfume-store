"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { updateStoreSettings } from "@/lib/actions/settings";
import { StoreSettings } from "@prisma/client";
import { useRouter } from "next/navigation";
// import { toast } from "@/hooks/use-toast"; // Assuming toast hook exists or will need to create/use simple alert

interface SettingsFormProps {
    initialSettings: StoreSettings;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onMaintenanceChange = (checked: boolean) => {
        startTransition(() => {
            updateStoreSettings(checked)
                .then((data) => {
                    if (data.success) {
                        router.refresh();
                        // toast.success("Settings updated");
                    } else {
                        // toast.error("Something went wrong");
                    }
                });
        });
    };

    return (
        <div className="rounded-lg border p-4 bg-white shadow-sm mt-4">
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
    );
}
