import { getStoreSettings } from "@/lib/actions/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
    const settings = await getStoreSettings();

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <SettingsForm initialSettings={settings} />
            </div>
        </div>
    );
}
