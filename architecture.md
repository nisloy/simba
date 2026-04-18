# Simba 2.0 - System Architecture

## Core Stack
- **Framework:** Vue.js 3 (Composition API) via Vite
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Language:** TypeScript

## Data Strategy
- **Database:** None. 
- **Source:** Direct import of `simba_products.json`.
- **State Flow:** A Pinia `useProductStore` handles parsing the JSON, executing client-side fuzzy search, category filtering, and language translation mapping. A separate `useCartStore` manages the basket.

## Project Structure
- `/src/components`: Granular UI (Button, ProductCard, CartDrawer, MoMoModal)
- `/src/store`: `cart.ts`, `products.ts`, `settings.ts` (for Dark Mode & i18n)
- `/src/views`: `Home.vue`, `Category.vue`, `ProductDetail.vue`
- `/src/data`: `simba_products.json`
- `/src/utils`: RWF currency formatter

## Deployment: GitHub Pages
- Use `vite-plugin-gh-pages` or a standard GitHub Action.
- **CRITICAL:** The `vite.config.ts` must have the `base` property set to the repository name (e.g., `/simba-2.0/`) to prevent broken asset paths in production.
