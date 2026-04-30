"use client";

import { Search, X } from "lucide-react";
import { useSearchStore } from "@/store/searchStore";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "mb-6" }: SearchBarProps) {
  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-muted overflow-hidden border border-border transition-shadow">
        <div className="grid place-items-center h-full w-12 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-foreground pr-10 bg-transparent"
          type="text"
          id="search"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={handleChange}
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-0 grid place-items-center h-full w-12 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Limpar busca"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
