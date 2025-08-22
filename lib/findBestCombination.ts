import { Product } from "./types";

export function findBestCombination(
  products: Product[],
  budget: number
): Product[] {
  const n = products.length;
  const B = Math.max(0, Math.floor(budget));

  const dp = Array.from({ length: n + 1 }, () => Array(B + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const price = Math.floor(products[i - 1].price);
    for (let b = 0; b <= B; b++) {
      dp[i][b] = dp[i - 1][b];
      if (price <= b) {
        dp[i][b] = Math.max(dp[i][b], dp[i - 1][b - price] + price);
      }
    }
  }

  let b = B;
  const chosen: Product[] = [];
  for (let i = n; i >= 1; i--) {
    if (dp[i][b] !== dp[i - 1][b]) {
      chosen.push(products[i - 1]);
      b -= Math.floor(products[i - 1].price);
    }
  }

  return chosen.reverse();
}

export function sumPrices(items: Product[]): number {
  return items.reduce((s, p) => s + p.price, 0);
}
