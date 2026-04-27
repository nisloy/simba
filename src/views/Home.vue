<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductGrid from '../components/ProductGrid.vue'
import { useProductStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { useSettingsStore } from '../store/settings'
import { categoryIcons } from '../data/categoryIcons'
import spotlightImg from '@/assets/adidas.jpg'

const { t } = useI18n()
const productStore = useProductStore()
const cartStore = useCartStore()
const settingsStore = useSettingsStore()

const gridSection = ref<HTMLElement | null>(null)
const featuredImageFailed = ref(false)

const featuredProduct = computed(() => {
  return productStore.products.find(p => p.name.includes('Tea') || p.id === 10701) || productStore.products[0]
})

const featuredImageUrl = computed(() => {
  if (!featuredProduct.value) return ''
  return `https://source.unsplash.com/400x400/?${encodeURIComponent(featuredProduct.value.category)},grocery`
})

const scrollToGrid = () => {
  gridSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' RWF'
}
</script>

<template>
  <div class="bg-stone-50 dark:bg-zinc-950 transition-colors duration-300">
    <transition name="hero-fade">
      <section v-if="!productStore.searchQuery" class="relative min-h-[80vh] flex items-center pt-16 pb-24 md:py-32 bg-gradient-to-br from-stone-50 to-orange-50/30 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
        <div class="absolute top-20 -right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>

        <div class="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div class="space-y-10 text-center lg:text-left">
              <div class="space-y-6">
                <div class="flex flex-wrap justify-center lg:justify-start gap-3">
                  <span class="bg-orange-100 dark:bg-orange-500/10 text-orange-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">45-Min Delivery</span>
                  <span class="bg-green-100 dark:bg-green-500/10 text-green-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">MoMo Accepted</span>
                  <span class="bg-blue-100 dark:bg-blue-500/10 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">9 Kigali Branches</span>
                </div>
                <h1 class="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-stone-900 dark:text-zinc-100 uppercase">
                  {{ t('hero.title') }}
                </h1>
                <p class="text-lg md:text-xl text-stone-500 dark:text-zinc-400 font-bold leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {{ t('hero.desc') }}
                </p>
              </div>
              
              <button 
                @click="scrollToGrid"
                class="group px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/40 transition-all active:scale-95 flex items-center gap-4 mx-auto lg:mx-0 text-lg uppercase tracking-widest"
              >
                {{ t('hero.shop_now') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div v-if="featuredProduct" class="relative group spotlight-container">
              <div class="absolute -inset-6 bg-white dark:bg-zinc-800/50 backdrop-blur-xl rounded-[4rem] border border-transparent dark:border-zinc-700/50 shadow-2xl scale-105 group-hover:scale-110 group-hover:bg-orange-500/5 transition-all duration-700"></div>

              <div class="relative bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-stone-100 dark:border-zinc-800 space-y-8 animate-float group-hover:rotate-1 transition-all duration-700 ease-out">
                <div class="flex items-center justify-between">
                  <span class="bg-stone-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] group-hover:bg-orange-600 transition-colors">
                    {{ t('product.spotlight') }}
                  </span>
                  <span class="text-orange-600 font-black text-xs uppercase tracking-widest animate-pulse">
                    {{ t('product.featured') }}
                  </span>
                </div>

                <div class="aspect-square bg-stone-100 dark:bg-zinc-800 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div class="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>

                  <img 
                    v-if="!featuredImageFailed"
                    :src="spotlightImg" 
                    alt="Adidas Featured Product" 
                    @error="featuredImageFailed = true"
                    class="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" 
                  />
                  <div v-else class="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-zinc-950/50" v-html="categoryIcons[featuredProduct.category] || categoryIcons['default']"></div>

                  <div class="absolute bottom-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-stone-100 dark:border-zinc-800 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">{{ t('product.price') }}</p>
                    <p class="text-xl font-black text-stone-900 dark:text-white">{{ formatPrice(featuredProduct.price) }}</p>
                  </div>
                </div>

                <div class="space-y-2 transform group-hover:translate-x-2 transition-transform duration-500">
                  <h2 class="text-3xl font-black tracking-tight group-hover:text-orange-600 transition-colors">{{ featuredProduct.name }}</h2>
                  <p class="text-stone-400 font-bold uppercase text-xs tracking-[0.2em]">{{ featuredProduct.category }}</p>
                </div>

                <button 
                  @click="cartStore.addToCart(featuredProduct)"
                  class="w-full py-5 bg-stone-900 hover:bg-orange-600 text-white font-black rounded-[1.8rem] transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  {{ t('product.add_to_cart') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </transition>

    <div ref="gridSection" class="scroll-mt-20">
      <CategoryFilter />
      <main class="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <ProductGrid />
      </main>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px;
  overflow: hidden;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-20px);
}
</style>
