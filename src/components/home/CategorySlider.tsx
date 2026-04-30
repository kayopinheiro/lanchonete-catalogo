"use client";

import { Category } from "@/lib/data";

interface CategorySliderProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function CategorySlider({ categories, activeCategoryId, onSelectCategory }: CategorySliderProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar mb-6 pb-2">
      <div className="flex gap-3 px-1 w-max">
        <button
          onClick={() => onSelectCategory(null)}
          className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
            activeCategoryId === null
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
              activeCategoryId === category.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
