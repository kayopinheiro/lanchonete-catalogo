"use client";

import { Home, Tag, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { icon: Home, label: "Início", href: "/" },
    { icon: Tag, label: "Combos", href: "/combos" },
    { icon: Search, label: "Buscar", href: "/buscar" },
    { icon: ShoppingBag, label: "Pedido", href: "/pedido", showBadge: true },
  ];

  return (
    <div className="fixed bottom-0 md:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-0 md:px-4">
      <nav className="flex items-center justify-around w-full h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border md:border md:max-w-md md:rounded-full shadow-[0_-4px_20px_rgb(0,0,0,0.05)] md:shadow-lg pointer-events-auto overflow-hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        if (item.href === "/pedido") {
          return (
            <button
              key={item.href}
              onClick={() => setIsOpen(true)}
              className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors text-muted-foreground hover:text-foreground"
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.showBadge && mounted && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="relative">
              <Icon className={`h-5 w-5 ${isActive ? "fill-primary/20" : ""}`} />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
      </nav>
    </div>
  );
}
