<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Product } from '../store/products'
import { useCartStore } from '../store/cart'
import { useSettingsStore } from '../store/settings'
import { categoryIcons } from '../data/categoryIcons'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const settingsStore = useSettingsStore()

const imageLoaded = ref(false)
const imageFailed = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
let loadTimer: ReturnType<typeof setTimeout> | null = null

// Immediate null check
if (!props.product.image) {
  imageFailed.value = true
}

onMounted(() => {
  // 1. Cache Catch: Check if image is already complete (cached)
  if (imgRef.value?.complete && imgRef.value.naturalWidth > 0) {
    imageLoaded.value = true
  }

  // 2. Fail-Safe Timer: Force fallback if image takes > 4s
  loadTimer = setTimeout(() => {
    if (!imageLoaded.value) {
      imageFailed.value = true
    }
  }, 4000)
})

onUnmounted(() => {
  if (loadTimer) clearTimeout(loadTimer)
})

const handleLoad = () => {
  imageLoaded.value = true
  if (loadTimer) clearTimeout(loadTimer)
}

const handleError = () => {
  imageFailed.value = true
  if (loadTimer) clearTimeout(loadTimer)
}

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' RWF'
}
</script>

<template>
  <div class="group bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full">
    <!-- Image Area - Real Photography with Robust Loading & Fallback -->
    <router-link 
      :to="'/product/' + product.id" 
      class="aspect-square w-full overflow-hidden bg-stone-100 dark:bg-zinc-950/50 rounded-2xl mb-4 relative block cursor-pointer"
    >
      <!-- Loading Spinner (iOS Style) -->
      <div v-if="!imageLoaded && !imageFailed" class="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-zinc-800/50">
        <svg class="w-8 h-8 animate-spin text-stone-400 dark:text-zinc-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M12 18V22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/>
          <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
          <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
          <path d="M2 12H6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
          <path d="M18 12H22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
          <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
          <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        </svg>
      </div>

      <!-- Main Product Image -->
      <img 
        v-if="product.image"
        v-show="imageLoaded && !imageFailed"
        ref="imgRef"
        :src="product.image" 
        :alt="product.name"
        @load="handleLoad"
        @error="handleError"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      >

      <!-- Category SVG Fallback -->
      <div v-if="imageFailed" class="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-zinc-950/50" v-html="categoryIcons[product.category] || categoryIcons['default']">
      </div>

      <!-- Stock Badge -->
      <div class="absolute top-2 right-2">
        <span v-if="!product.inStock" class="bg-zinc-900/80 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
          {{ settingsStore.t('sold_out') }}
        </span>
      </div>
    </router-link>
    
    <!-- Product Info -->
    <div class="flex-1 flex flex-col gap-2">
      <p class="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{{ product.category }}</p>
      <h3 class="text-sm font-bold line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors min-h-[2.5rem] dark:text-zinc-100">{{ product.name }}</h3>
      <div class="mt-auto pt-2">
        <span class="text-lg font-black dark:text-white">{{ formatPrice(product.price) }}</span>
      </div>
    </div>

    <!-- Add to Cart Button -->
    <button 
      @click="cartStore.addToCart(product)"
      :disabled="!product.inStock"
      class="mt-4 w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-stone-100 dark:disabled:bg-zinc-800 disabled:text-stone-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group/btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover/btn:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
      </svg>
      {{ product.inStock ? settingsStore.t('add_to_cart') : settingsStore.t('sold_out') }}
    </button>
  </div>
</template>
