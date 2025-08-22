'use client';

import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingCart } from "lucide-react";
interface ProductCardProps  {
  product: Product;
  onAddToCart?: (product: Product) => void; 
  isLoading?: boolean;                      
}

export function ProductCard({ product, onAddToCart, isLoading }: ProductCardProps){
  return (
    <div className="h-full flex flex-col rounded-xl shadow-sm p-4 transition-all duration-200 hover:shadow-lg bg-card">
      
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            width={400} 
            height={300} 
            className="object-cover w-full h-full" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

      <p className="text-sm text-gray-500 mb-4 flex-1">
        {product.description || `Descripción del ${product.name?.toLowerCase?.() || 'producto'}.`}
      </p>

      <div className="text-2xl font-bold text-blue-600 mb-3">
        ${Number(product.price).toLocaleString()}
      </div>

      {onAddToCart && (
      
      <Button
      onClick={() => onAddToCart(product)}
      className="w-full text-white"
      size="lg"
      disabled={isLoading}
    >
      <ShoppingCart className="mr-2" />
      {isLoading ? 'Agregando...' : 'Agregar al carrito'}
    </Button>
      )}
    </div>
  );
}
