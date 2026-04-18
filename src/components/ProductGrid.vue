<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProductStore } from '../store/products'
import ProductCard from './ProductCard.vue'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { filteredProducts, selectedCategory } = storeToRefs(productStore)

const isLoading = ref(false)

// Implementation of Skeleton Loader on Category Change
watch(selectedCategory, () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}, { immediate: true })

</script>

<template>
  <div class="relative min-h-[400px]">
    <!-- Skeleton Grid -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-100 dark:border-zinc-800 space-y-4">
        <div class="aspect-[4/3] bg-stone-200 dark:bg-zinc-800 rounded-2xl animate-pulse"></div>
        <div class="space-y-2">
          <div class="h-3 w-1/3 bg-stone-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div class="h-4 w-3/4 bg-stone-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div class="flex justify-between items-center pt-4">
            <div class="h-6 w-1/3 bg-stone-200 dark:bg-zinc-900 rounded animate-pulse"></div>
            <div class="h-10 w-10 bg-stone-200 dark:bg-zinc-800 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <transition-group 
      v-else
      name="grid-anim" 
      tag="div" 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="transition-all duration-500 ease-in-out"
      >
        <ProductCard :product="product" />
      </div>
    </transition-group>

    <!-- Empty State -->
    <div v-if="!isLoading && filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 text-zinc-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-lg font-medium">No items found in this category.</p>
    </div>
  </div>
</template>

<style scoped>
.grid-anim-move,
.grid-anim-enter-active,
.grid-anim-leave-active {
  transition: all 0.5s ease;
}

.grid-anim-enter-from,
.grid-anim-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.grid-anim-leave-active {
  position: absolute;
}
</style>
