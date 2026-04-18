<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { useSettingsStore } from '../store/settings'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const settingsStore = useSettingsStore()

const productId = parseInt(route.params.id as string)
const product = computed(() => productStore.getProductById(productId))

const placeholderImage = computed(() => {
  if (!product.value) return ''
  const categoryParam = encodeURIComponent(product.value.category.split(' & ')[0])
  return `https://source.unsplash.com/800x800/?${categoryParam}`
})

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' RWF'
}
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 py-12 md:py-20">
    <!-- Back Navigation -->
    <router-link to="/" class="group inline-flex items-center gap-2 mb-12 text-zinc-500 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l-7-7m7-7" />
      </svg>
      Back to Store
    </router-link>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
      <!-- Product Image -->
      <div class="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800">
        <img :src="placeholderImage" :alt="product.name" class="w-full h-full object-cover">
      </div>

      <!-- Product Info -->
      <div class="flex flex-col h-full py-4 space-y-10">
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="bg-orange-100 dark:bg-orange-500/10 text-orange-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">{{ product.category }}</span>
            <span v-if="!product.inStock" class="bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">{{ settingsStore.t('soldOut') }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black dark:text-white leading-tight tracking-tight">{{ product.name }}</h1>
        </div>

        <div class="space-y-4">
          <p class="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-xs tracking-widest">{{ settingsStore.t('total') }}</p>
          <p class="text-5xl font-black dark:text-white">{{ formatPrice(product.price) }}</p>
        </div>

        <div class="space-y-6 flex-1">
          <p class="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium max-w-lg">
            Experience premium quality with our {{ product.name }}. Sourced locally and handled with care to ensure the best value for your kitchen and home.
          </p>
          <div class="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4 max-w-md">
            <div class="flex items-center gap-3 text-sm font-bold text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              In stock and ready for delivery
            </div>
            <div class="flex items-center gap-3 text-sm font-bold text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Standard Delivery (24-48 hours)
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <button 
          @click="cartStore.addToCart(product)"
          :disabled="!product.inStock"
          class="w-full max-w-md py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {{ product.inStock ? settingsStore.t('addToCart') : settingsStore.t('soldOut') }}
        </button>
      </div>
    </div>
  </div>

  <!-- Loading/Error State -->
  <div v-else class="h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div class="w-16 h-16 border-4 border-zinc-100 dark:border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
    <p class="font-bold text-zinc-400 uppercase tracking-widest text-xs">Finding Product...</p>
  </div>
</template>
