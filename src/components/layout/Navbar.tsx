"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/home/SearchBar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary whitespace-nowrap">
          <span>🍔 Lanchonete</span>
        </Link>
        
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <SearchBar className="mb-0" />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/promocoes" className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted transition-colors" aria-label="Combos e Promoções">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
