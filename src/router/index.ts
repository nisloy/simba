import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProductDetailView from '../views/ProductDetail.vue'
import AboutView from '../views/About.vue'
import ContactView from '../views/Contact.vue'
import CheckoutView from '../views/Checkout.vue'
import BranchDashboardView from '../views/BranchDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: BranchDashboardView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
