'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, addToCart, fetchCart, clearCart } from '@/lib/api';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart } from '@/components/ShoppingCart';
import { findBestCombination } from '@/lib/findBestCombination';

const formatUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [clearingCart, setClearingCart] = useState(false);

  const [budget, setBudget] = useState<number>(150);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const items = await fetchCart();
      setCart(items);
    } catch (err) {
      console.error('Error loading cart', err);
    }
  };

  const handleAddToCart = async (prod: Product) => {
    try {
      setAddingId(prod.id);
      await addToCart(prod.id);
      await loadCart();
    } catch (err) {
      console.error('Error adding to cart', err);
    } finally {
      setAddingId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      setClearingCart(true);
      await clearCart();
      await loadCart();
    } catch (err) {
      console.error('Error clearing cart', err);
    } finally {
      setClearingCart(false);
    }
  };

  const bestCombo = useMemo(
    () => findBestCombination(products, Math.max(0, Math.floor(budget))),
    [products, budget]
  );

  const bestTotal = useMemo(
    () => bestCombo.reduce((acc, p) => acc + p.price, 0),
    [bestCombo]
  );

  if (loading) {
    return <p className="p-6">Cargando productos...</p>;
    }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tienda Online - Prueba Técnica
        </h1>
        <p className="mt-2 text-gray-600">
          Sistema de carrito de compras con API RESTful y optimización de presupuesto
        </p>
      </header>
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Productos Disponibles</h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={handleAddToCart}
                isLoading={addingId === p.id}
              />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="space-y-6 lg:sticky lg:top-24">     
                <ShoppingCart
                  products={cart}
                  onClearCart={handleClearCart}
                  isClearingCart={clearingCart}
                />
            <div className="rounded-lg border-gray-200 shadow-sm bg-card">
              <div className="p-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <span role="img" aria-label="calc">🧮</span>
                  Optimizador de Presupuesto
                </div>

                <label className="mt-4 block">
                  <span className="text-sm text-gray-600">Presupuesto Máximo</span>
                  <input
                    type="number"
                    min={0}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="mt-1 w-full rounded border px-3 py-2"
                    placeholder="Ej: 150"
                  />
                </label>

                <div className="mt-4 space-y-2">
                  {bestCombo.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay combinación que cumpla el presupuesto.
                    </p>
                  ) : (
                    <>
                      <ul className="space-y-1 text-sm">
                        {bestCombo.map((p) => (
                          <li key={p.id} className="flex justify-between">
                            <span>{p.name}</span>
                            <span className="font-medium">{formatUSD(p.price)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{formatUSD(bestTotal)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
