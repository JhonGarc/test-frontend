// ShoppingCart.tsx
'use client';

import { Product } from "@/lib/types";
import { Trash2, ShoppingCartIcon } from "lucide-react";

interface ShoppingCartProps {
  products: Product[];
  onClearCart?: () => void;
  isClearingCart?: boolean;
}

export function ShoppingCart({ products, onClearCart, isClearingCart = false }: ShoppingCartProps) {
  const total = products.reduce((sum, item) => sum + item.price, 0);
  const count = products.length;

  if (products.length === 0) {
    return (
      <div className="rounded-lg shadow-sm bg-card">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <ShoppingCartIcon className="w-5 h-5" />
            Carrito de Compras
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80">
              0
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCartIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Tu carrito está vacío</p>
            <p className="text-sm">Agrega algunos productos para comenzar</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <ShoppingCartIcon className="w-5 h-5" />
            Carrito de Compras
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary hover:bg-secondary/80">
              {count}
            </div>
          </div>
          {onClearCart && (
            <button
              onClick={onClearCart}
              disabled={isClearingCart}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-2 m-2"
            >
              <Trash2 className="w-4 h-4 mr-2 " />
              {isClearingCart ? 'Limpiando...' : 'Limpiar Carrito' }
            </button>
          )}
        </div>
      </div>
      <div className="p-6 pt-0 space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-muted-foreground">${product.price.toLocaleString()} c/u</p>
            </div>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center  text-lg font-semibold">
            <span>Total:</span>
            <span className="text-primary">${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}