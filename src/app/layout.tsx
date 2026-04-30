import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartSheet } from "@/components/cart/CartSheet";
import { SplashScreen } from "@/components/layout/SplashScreen";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo Lanchonete",
  description: "Catálogo digital para lanchonete",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} min-h-screen flex flex-col antialiased bg-background font-sans`}>
        <SplashScreen />
        <Navbar />
        <main className="flex-1 pb-16 md:pb-24">{children}</main>
        <BottomNav />
        <CartSheet />
      </body>
    </html>
  );
}
