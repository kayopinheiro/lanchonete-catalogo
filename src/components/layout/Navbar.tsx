"use client";

import { ShoppingCart, Bell } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>🍔 Lanchonete</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/promocoes" className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted transition-colors" aria-label="Combos e Promoções">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background"></span>
          </Link>
          <button onClick={() => setIsOpen(true)} className="relative hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted transition-colors" aria-label="Carrinho">
            <ShoppingCart className="h-5 w-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
