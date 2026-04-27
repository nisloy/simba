<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../store/cart'
import { useSettingsStore } from '../store/settings'
import { storeToRefs } from 'pinia'
import MoMoModal from './MoMoModal.vue'

const { t } = useI18n()
const cartStore = useCartStore()
const router = useRouter()
const settingsStore = useSettingsStore()
const { items, totalAmount, isOpen } = storeToRefs(cartStore)

const isMoMoModalOpen = ref(false)

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' RWF'
}

const handleCheckout = () => {
  cartStore.toggleDrawer()
  router.push('/checkout')
}
</script>

<template>
  <div>
    <div class="fixed inset-0 z-50 overflow-hidden pointer-events-none" :class="{ 'pointer-events-auto': isOpen }">
      <!-- Backdrop -->
      <transition
        enter-active-class="ease-in-out duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isOpen" @click="cartStore.toggleDrawer()" class="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" />
      </transition>

      <!-- Floating Panel -->
      <div class="absolute inset-y-0 right-0 max-w-full flex p-4">
        <transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-from-class="translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-full opacity-0"
        >
          <div v-if="isOpen" class="w-screen max-w-md pointer-events-auto">
            <div class="h-full flex flex-col bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white dark:border-zinc-800 overflow-hidden">
              <!-- Header -->
              <div class="px-8 py-8 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
                <h2 class="text-2xl font-black flex items-center gap-3 dark:text-white">
                  {{ t('cart.title') }}
                  <span class="text-xs bg-orange-500 text-white px-2.5 py-1 rounded-full shadow-lg shadow-orange-500/20">{{ items.length }}</span>
                </h2>
                <button @click="cartStore.toggleDrawer()" class="p-3 hover:bg-stone-100 dark:hover:bg-zinc-900 rounded-2xl transition-all active:scale-90">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Items List -->
              <div class="flex-1 overflow-y-auto px-8 py-8 space-y-8 no-scrollbar">
                <div v-if="items.length === 0" class="h-full flex flex-col items-center justify-center text-stone-400 space-y-6">
                  <div class="w-24 h-24 bg-stone-50 dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p class="font-bold text-lg tracking-tight">{{ t('cart.empty') }}</p>
                  <button @click="cartStore.toggleDrawer()" class="text-orange-600 font-black hover:underline underline-offset-8">{{ t('cart.continue') }}</button>
                </div>

                <div v-for="item in items" :key="item.id" class="flex gap-5 group">
                  <div class="w-24 h-24 bg-orange-50 dark:bg-zinc-900 rounded-3xl overflow-hidden flex-shrink-0 border border-white dark:border-zinc-800 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-orange-200 dark:text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 class="text-base font-black truncate group-hover:text-orange-600 transition-colors dark:text-zinc-100">{{ item.name }}</h4>
                    <p class="text-xs text-stone-500 dark:text-zinc-400 font-bold uppercase tracking-widest mt-1">{{ item.category }}</p>
                    <div class="flex items-center justify-between mt-4">
                      <p class="font-black text-lg dark:text-white">{{ formatPrice(item.price) }}</p>
                      <!-- Quantity Controls -->
                      <div class="flex items-center bg-stone-100 dark:bg-zinc-900 rounded-xl p-1 shadow-inner border border-stone-200/50 dark:border-zinc-800">
                        <button @click="cartStore.updateQuantity(item.id, -1)" class="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 rounded-lg shadow-sm transition-all text-stone-600 dark:text-zinc-400 active:scale-90">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4" />
                          </svg>
                        </button>
                        <span class="w-10 text-center text-sm font-black dark:text-white">{{ item.quantity }}</span>
                        <button @click="cartStore.updateQuantity(item.id, 1)" class="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 rounded-lg shadow-sm transition-all text-stone-600 dark:text-zinc-400 active:scale-90">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer - Sticky & Massive -->
              <div v-if="items.length > 0" class="px-8 py-10 border-t border-stone-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 space-y-8">
                <div class="flex justify-between items-end">
                  <div class="space-y-1">
                    <p class="text-stone-400 dark:text-zinc-500 font-black uppercase text-[10px] tracking-widest">{{ t('cart.total') }}</p>
                    <p class="text-3xl font-black dark:text-white tracking-tighter">{{ formatPrice(totalAmount) }}</p>
                  </div>
                </div>
                <button 
                  @click="handleCheckout"
                  class="w-full py-6 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/40 transition-all active:scale-95 flex items-center justify-center gap-4 text-xl group"
                >
                  {{ t('cart.checkout') }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- MoMo Payment Modal -->
    <MoMoModal 
      :is-open="isMoMoModalOpen" 
      @close="isMoMoModalOpen = false" 
    />
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
