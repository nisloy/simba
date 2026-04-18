import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProductDetailView from '../views/ProductDetail.vue'
import AboutView from '../views/About.vue'
import ContactView from '../views/Contact.vue'

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
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
