"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-white overflow-hidden border border-border transition-shadow">
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
