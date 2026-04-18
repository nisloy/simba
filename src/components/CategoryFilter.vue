<script setup lang="ts">
import { useProductStore } from '../store/products'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { categories, selectedCategory } = storeToRefs(productStore)
</script>

<template>
  <div class="sticky top-16 z-10 bg-stone-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-zinc-800/50">
    <div class="flex overflow-x-auto no-scrollbar py-5 px-4 md:px-8 gap-3 max-w-7xl mx-auto">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="productStore.setCategory(category)"
        class="whitespace-nowrap px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border flex items-center justify-center min-h-[44px]"
        :class="[
          selectedCategory === category 
            ? 'bg-orange-500 text-white border-transparent shadow-md shadow-orange-500/20 scale-105' 
            : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-stone-600 dark:text-zinc-400 shadow-sm hover:border-orange-200 dark:hover:border-orange-900/30'
        ]"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
