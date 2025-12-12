"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getStoreSettings() {
    let settings = await prisma.storeSettings.findFirst();

    if (!settings) {
        settings = await prisma.storeSettings.create({
            data: {
                storeName: "Borty Perfume Store",
                currency: "GHS",
                maintenanceMode: false,
            },
        });
    }

    return settings;
}

export async function updateStoreSettings(data: { maintenanceMode?: boolean; currency?: string }) {
    try {
        const settings = await prisma.storeSettings.findFirst();

        if (settings) {
            await prisma.storeSettings.update({
                where: { id: settings.id },
                data: {
                    ...(data.maintenanceMode !== undefined && { maintenanceMode: data.maintenanceMode }),
                    ...(data.currency && { currency: data.currency }),
                }
            });
        } else {
            await prisma.storeSettings.create({
                data: {
                    maintenanceMode: data.maintenanceMode ?? false,
                    currency: data.currency ?? "GHS",
                }
            });
        }

        revalidatePath("/"); // Update everywhere potentially
        revalidatePath("/dashboard/settings");
        return { message: "Settings updated successfully", success: true };
    } catch (error) {
        return { message: "Failed to update settings", success: false };
    }
}
