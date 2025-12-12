"use server";

import { prisma } from "@/lib/prisma";

export async function getStoreCurrency() {
    try {
        const settings = await prisma.storeSettings.findFirst();
        return settings?.currency || "GH₵";
    } catch (error) {
        console.error("Error fetching store currency:", error);
        return "GHS"; // Default fallback
    }
}
