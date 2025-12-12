import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/components/auth-provider";
import { ConditionalFooter } from "@/components/conditional-footer";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { getStoreCurrency } from "@/lib/actions/store";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borty Perfume Store",
  description: "Borty Perfume Store - The best place to buy perfumes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currency = await getStoreCurrency();
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased`}
      >
        <AuthProvider>
          <CurrencyProvider currency={currency}>
            <Navbar />
            {children}
            <ConditionalFooter />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
