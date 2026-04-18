imba 2.0 - Modern E-Commerce Rebuild

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFCC00?style=for-the-badge&logo=databricks&logoColor=black)

A lightning-fast, mobile-first rebuild of Rwanda's premier online supermarket. Built to solve real UX problems with a focus on localized functionality, clean architecture, and modern aesthetics.

🌍 **Live Demo:** [Insert GitHub Pages URL Here]

---

## 🎯 Project Overview

Simba 2.0 modernizes the e-commerce experience by eliminating friction. It leverages a static dataset of 552 real Rwandan products to deliver instant client-side searching, seamless filtering, and a high-fidelity checkout simulation tailored to local payment habits.

### 🏆 Hackathon Objectives Completed
- **Core Requirements:** 100% completed (Dynamic rendering, search/filter, cart logic, responsive design, public deployment).
- **Bonus Features Secured:**
  - [x] MoMo (Mobile Money) USSD Payment Simulation
    - [x] Full Dark Mode Support
      - [x] 3-Language i18n (English, Français, Kinyarwanda)
        - [x] Dedicated Product Detail Pages (Vue Router)
          - [x] Enhanced Imagery (Dynamic Unsplash category placeholders)

          ---

## ✨ Key Features & Product Thinking

1. **Frictionless Mobile Money (MoMo) Checkout:** Traditional credit card forms drop conversion rates in East Africa. Simba 2.0 implements a simulated MTN/Airtel MoMo USSD push modal, validating local prefixes (078, 079, 072, 073) to mirror real-world user habits.
2. **Instant Search & Filtering:** Utilizing Pinia for global state management, product filtering and fuzzy searching happen entirely on the client side, ensuring zero-latency transitions between categories.
3. **Adaptive UI/UX:** A strict "Orange & Zinc" design system powered by Tailwind CSS ensures brand consistency. The slide-over Cart Drawer keeps users engaged with the product catalog without forcing page reloads.

---

## 🛠️ Architecture & Tech Stack

This project strictly adheres to modern frontend engineering principles, maintaining separation of concerns and type safety.

* **Framework:** Vue.js 3 (Composition API) built with Vite
* **Styling:** Tailwind CSS (Mobile-first, heavily utilizing CSS Grid and Flexbox)
* **State Management:** Pinia (Modular stores for `cart`, `products`, and `settings`)
* **Routing:** Vue Router (Dynamic routes for `ProductDetail`)
* **Language:** TypeScript (Strict interfaces for state and data models)
* **Font:** Plus Jakarta Sans

---

## 🚀 Local Development Setup

To run this project locally, ensure you have Node.js installed, then execute the following commands in your terminal:

```bash
# 1. Clone the repository
git clone [https://github.com/yourusername/simba-2.0.git](https://github.com/yourusername/simba-2.0.git)

# 2. Navigate into the directory
cd simba-2.0

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
