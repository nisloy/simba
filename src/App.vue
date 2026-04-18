<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from './store/products'
import { useCartStore } from './store/cart'
import { useSettingsStore, Locale } from './store/settings'
import CartDrawer from './components/CartDrawer.vue'
import AuthModal from './components/AuthModal.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const settingsStore = useSettingsStore()

const searchQuery = ref('')
const isLangMenuOpen = ref(false)
const isAuthModalOpen = ref(false)

const locales: { label: string, value: Locale }[] = [
  { label: 'EN', value: 'en' },
  { label: 'FR', value: 'fr' },
  { label: 'RW', value: 'rw' }
]

onMounted(() => {
  settingsStore.applyTheme()
})

const handleSearch = () => {
  productStore.setSearchQuery(searchQuery.value)
}

const changeLocale = (loc: Locale) => {
  settingsStore.setLocale(loc)
  isLangMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-stone-50 dark:bg-zinc-950 font-sans text-stone-900 dark:text-zinc-100 transition-colors duration-300">
    <!-- Sticky Navigation Bar -->
    <header class="sticky top-0 z-20 bg-stone-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-zinc-800/50 h-16 flex items-center px-4 md:px-8">
      <div class="flex items-center justify-between w-full max-w-7xl mx-auto">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 select-none group">
          <span class="text-2xl font-black text-orange-600 tracking-tighter group-hover:scale-105 transition-transform">SIMBA</span>
          <span class="text-[10px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-500/20">2.0</span>
        </router-link>

        <!-- Desktop Search Bar -->
        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <div class="relative w-full group">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-300 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              v-model="searchQuery"
              @input="handleSearch"
              type="text" 
              :placeholder="settingsStore.t('searchPlaceholder')" 
              class="w-full bg-stone-100/50 dark:bg-zinc-900 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none shadow-inner"
            >
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1.5 md:gap-3">
          <!-- Language Selector -->
          <div class="relative">
            <button @click="isLangMenuOpen = !isLangMenuOpen" class="h-10 px-3 flex items-center gap-2 rounded-xl hover:bg-stone-100 dark:hover:bg-zinc-900 text-xs font-black uppercase tracking-widest transition-all">
              {{ settingsStore.locale }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform" :class="{ 'rotate-180': isLangMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-if="isLangMenuOpen" class="absolute right-0 mt-2 w-32 origin-top-right rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl border border-stone-100 dark:border-zinc-800 overflow-hidden py-2 z-50">
                <button 
                  v-for="loc in locales" 
                  :key="loc.value" 
                  @click="changeLocale(loc.value)"
                  class="w-full px-4 py-2 text-left text-xs font-black hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors"
                  :class="{ 'text-orange-600': settingsStore.locale === loc.value }"
                >
                  {{ loc.label }}
                </button>
              </div>
            </transition>
          </div>

          <!-- Theme Toggle -->
          <button @click="settingsStore.toggleTheme" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 dark:hover:bg-zinc-900 text-stone-400 transition-all active:scale-90">
            <svg v-if="!settingsStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- Account Toggle -->
          <button @click="isAuthModalOpen = true" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 dark:hover:bg-zinc-900 text-stone-400 transition-all active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          
          <!-- Cart Icon -->
          <button @click="cartStore.toggleDrawer()" class="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 dark:hover:bg-zinc-900 text-stone-400 transition-all active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-stone-50 dark:border-zinc-950 animate-in zoom-in">
              {{ cartStore.totalItems }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Search Bar -->
    <div class="md:hidden px-4 py-3 bg-stone-50 dark:bg-zinc-950 border-b border-stone-200/50 dark:border-zinc-800/50">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery"
          @input="handleSearch"
          type="text" 
          :placeholder="settingsStore.t('searchPlaceholder')" 
          class="w-full bg-stone-100 dark:bg-zinc-900 border-none rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
        >
      </div>
    </div>

    <!-- Router View -->
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer -->
    <footer class="mt-auto border-t border-stone-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 py-12 px-4">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex flex-col items-center md:items-start gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xl font-black text-orange-600 tracking-tighter">SIMBA</span>
            <span class="text-[10px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">2.0</span>
          </div>
          <p class="text-xs font-bold text-stone-400 uppercase tracking-widest">Rwanda's Premier Online Supermarket</p>
        </div>
        
        <nav class="flex gap-8">
          <router-link to="/about" class="text-sm font-black text-stone-400 hover:text-orange-600 uppercase tracking-widest transition-colors">About Us</router-link>
          <router-link to="/contact" class="text-sm font-black text-stone-400 hover:text-orange-600 uppercase tracking-widest transition-colors">Contact</router-link>
          <a href="#" class="text-sm font-black text-stone-400 hover:text-orange-600 uppercase tracking-widest transition-colors">Promotions</a>
        </nav>
        
        <p class="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em]">&copy; 2026 Simba Supermarket Ltd.</p>
      </div>
    </footer>

    <!-- Modals & Overlays -->
    <CartDrawer />
    <AuthModal :is-open="isAuthModalOpen" @close="isAuthModalOpen = false" />
  </div>
</template>

<style>
/* Custom transitions for dark mode */
.dark {
  color-scheme: dark;
}

::selection {
  background-color: rgba(249, 115, 22, 0.2);
  color: #ea580c;
}

@keyframes zoom-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-in {
  animation: zoom-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Base styles for outfit font */
body {
  @apply antialiased subpixel-antialiased;
}
</style>
