import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/components/auth-provider";
import { ConditionalFooter } from "@/components/conditional-footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borty Perfume Store",
  description: "Borty Perfume Store - The best place to buy perfumes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
