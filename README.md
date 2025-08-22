# 🛒 Online Store - Technical Test

Este proyecto es una tienda online simple con carrito de compras e integración con una API RESTful. Está desarrollado con **Next.js**, **Tailwind CSS** y un backend en **NestJS**.

---

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone <repo-url>
cd <repo-name>
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:

```env
NEXT_PUBLIC_API_BASE=https://test-backend-production-724e.up.railway.app
```

> ⚠️ Si deseas correr el backend localmente, asegúrate de actualizar esta URL en el `.env`.

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

---

## 🧱 Estructura del frontend

- **Framework:** [Next.js](https://nextjs.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes principales:**
  - `ProductCard`: Componente reutilizable para mostrar productos.
  - `ShoppingCart`: Componente que muestra los productos añadidos al carrito.

---

## 🔌 Comunicación con el backend

Las llamadas a la API se encuentran centralizadas en `lib/api.ts`, donde se consumen los endpoints principales:

- `GET /products`: Obtener lista de productos.
- `POST /cart/:id`: Añadir producto al carrito.
- `GET /cart`: Obtener carrito actual.

El backend está construido con **NestJS** y desplegado en **Railway**.

---

## 🧠 Lógica de optimización

En `lib/findBestCombination.ts` se implementa un algoritmo de optimización basado en el clásico problema de la **mochila 0-1 (0/1 Knapsack Problem)**.

- El objetivo es encontrar la mejor combinación de productos sin exceder un presupuesto o límite.
- Se utiliza **programación dinámica** con una tabla `dp[i][w]` donde:
  - `i` es el índice del producto.
  - `w` es la capacidad (presupuesto) disponible.

---

## ✅ Features destacadas

- Añadir productos al carrito con estado sincronizado al backend.
- UI responsiva y modular.
- Lógica de optimización aplicable a escenarios de presupuesto.
