"use client";

import { createContext, useContext, ReactNode } from "react";

interface CurrencyContextType {
    currency: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "GH₵",
});

interface CurrencyProviderProps {
    currency: string;
    children: ReactNode;
}

export function CurrencyProvider({ currency, children }: CurrencyProviderProps) {
    return (
        <CurrencyContext.Provider value={{ currency }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
