const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error fetching cart");
  return res.json();
}

export async function addToCart(id: number) {
  const res = await fetch(`${API_BASE}/cart/${id}`, { method: "POST" });
  if (!res.ok) throw new Error("Error adding product to cart");
  return res.json();
}

export async function clearCart() {
  const res = await fetch(`${API_BASE}/cart/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error clear cart");
  return res.json();
}
