imba 2.0 - Development Rules & Guidelines

## Design System (Strict Constraints)
- **Primary Color Palette:** You MUST ONLY use Orange as the accent/brand color (Tailwind `orange-400` to `orange-600`). No blues, greens, or reds. 
- **Neutral Palette:** Use pure white, dark greys (Tailwind `zinc-800`, `zinc-900`), and pure black for backgrounds and text.
- **Typography:** DO NOT use default fonts. Integrate 'Plus Jakarta Sans' or 'Inter' via Google Fonts for a premium, modern feel.
- **Dark Mode:** Support `dark:` variants in Tailwind for bonus points. Dark mode backgrounds should be deep zinc (`bg-zinc-950`), with bright orange accents.

## UX & UI Quality
- **Mobile-First:** Ensure all tap targets (Add to Cart, Category pills) are at least 44px tall. Use a slide-over `CartDrawer` instead of a separate page.
- **Imagery:** Use Unsplash source URLs for generic category banners (e.g., `https://source.unsplash.com/featured/?groceries`).
- **MoMo Integration:** Do not build a real backend. Build a high-fidelity modal simulating the MTN/Airtel Mobile Money USSD push prompt.

## Code Standards
- **Strong Typing:** Define strict TypeScript interfaces for `Product` and `CartItem`.
- **Components:** Keep components under 150 lines. Extract complex logic into composables (`useMoMoCheckout.ts`).
- **Prices:** All integer prices must be formatted with commas and the RWF suffix (e.g., `5,500 RWF`).
