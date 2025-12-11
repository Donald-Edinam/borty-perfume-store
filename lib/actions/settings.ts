"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getStoreSettings() {
    let settings = await prisma.storeSettings.findFirst();

    if (!settings) {
        settings = await prisma.storeSettings.create({
            data: {
                storeName: "Borty Perfume Store",
                maintenanceMode: false,
            },
        });
    }

    return settings;
}

export async function updateStoreSettings(maintenanceMode: boolean) {
    try {
        const settings = await prisma.storeSettings.findFirst();

        if (settings) {
            await prisma.storeSettings.update({
                where: { id: settings.id },
                data: { maintenanceMode }
            });
        } else {
            await prisma.storeSettings.create({
                data: { maintenanceMode }
            });
        }

        revalidatePath("/"); // Update everywhere potentially
        revalidatePath("/dashboard/settings");
        return { message: "Settings updated successfully", success: true };
    } catch (error) {
        return { message: "Failed to update settings", success: false };
    }
}
