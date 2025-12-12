import { getStoreSettings } from "@/lib/actions/settings";

const currencyMap: Record<string, { symbol: string; name: string }> = {
    GHS: { symbol: "₵", name: "Ghana Cedi" },
    USD: { symbol: "$", name: "US Dollar" },
    EUR: { symbol: "€", name: "Euro" },
    GBP: { symbol: "£", name: "British Pound" },
    NGN: { symbol: "₦", name: "Nigerian Naira" },
};

/**
 * Format a price with the store's currency
 * @param amount - The price amount
 * @param currencyCode - Optional currency code (defaults to store settings)
 */
export async function formatPrice(amount: number, currencyCode?: string): Promise<string> {
    if (!currencyCode) {
        const settings = await getStoreSettings();
        currencyCode = settings.currency;
    }

    const currency = currencyMap[currencyCode] || currencyMap.GHS;
    return `${currency.symbol}${amount.toFixed(2)}`;
}

/**
 * Get currency symbol for the store
 */
export async function getCurrencySymbol(): Promise<string> {
    const settings = await getStoreSettings();
    return currencyMap[settings.currency]?.symbol || "₵";
}

/**
 * Client-side currency formatter (when you already have the currency code)
 */
export function formatPriceClient(amount: number, currencyCode: string = "GHS"): string {
    const currency = currencyMap[currencyCode] || currencyMap.GHS;
    return `${currency.symbol}${amount.toFixed(2)}`;
}
