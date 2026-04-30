import { Product } from "@/lib/data";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-1 text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
