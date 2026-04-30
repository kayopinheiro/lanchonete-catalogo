"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/home/SearchBar";
import { CategorySlider } from "@/components/home/CategorySlider";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductSkeleton } from "@/components/home/ProductSkeleton";
import { MOCK_CATEGORIES, MOCK_PRODUCTS, Product } from "@/lib/data";
import { useCartStore } from "@/store/cartStore";
import { useSearchStore } from "@/store/searchStore";

export default function Home() {
  const { searchTerm } = useSearchStore();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  // Simula o tempo de rede (carregamento fantasma)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms de skeleton loading

    return () => clearTimeout(timer);
  }, [searchTerm, activeCategoryId]);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategoryId === null || product.categoryId === activeCategoryId;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="md:hidden">
        <SearchBar className="mb-6" />
      </div>
      <CategorySlider 
        categories={MOCK_CATEGORIES} 
        activeCategoryId={activeCategoryId} 
        onSelectCategory={setActiveCategoryId} 
      />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {activeCategoryId 
              ? MOCK_CATEGORIES.find(c => c.id === activeCategoryId)?.name 
              : "Catálogo Completo"}
          </h2>
          {!activeCategoryId && (
            <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
              {filteredProducts.length} produtos
            </span>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {activeCategoryId ? (
              <ProductGrid products={filteredProducts} onAddProduct={handleAddProduct} />
            ) : (
              <div className="space-y-10">
                {MOCK_CATEGORIES.map(category => {
                  const categoryProducts = filteredProducts.filter(p => p.categoryId === category.id);
                  
                  if (categoryProducts.length === 0) return null;

                  return (
                    <div key={category.id}>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        {category.name}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({categoryProducts.length})
                        </span>
                      </h3>
                      <ProductGrid products={categoryProducts} onAddProduct={handleAddProduct} />
                    </div>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    Nenhum produto encontrado.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
