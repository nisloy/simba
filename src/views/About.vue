<script setup lang="ts">
import { useSettingsStore } from '../store/settings'
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="bg-stone-50 dark:bg-zinc-950 font-sans">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 py-24 md:py-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <div class="space-y-4">
            <span class="bg-orange-100 dark:bg-orange-500/10 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">Simba Story</span>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] dark:text-white">
              FRESHNESS <br />
              <span class="text-orange-600">REDEFINED</span> <br />
              FOR KIGALI.
            </h1>
          </div>
          <p class="text-xl text-stone-500 dark:text-zinc-400 font-bold leading-relaxed max-w-lg">
            Since our inception, Simba Supermarket has been the cornerstone of quality in Rwanda. Simba 2.0 brings that legacy to your fingertips, delivering the freshest local produce and premium international brands right to your door.
          </p>
          <div class="flex gap-4">
            <router-link to="/" class="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-2xl shadow-orange-500/30 transition-all active:scale-95 uppercase tracking-widest text-sm">Shop Now</router-link>
            <button class="px-8 py-4 border-2 border-stone-200 dark:border-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-900 font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-sm dark:text-zinc-300">Our History</button>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute -inset-4 bg-orange-500/10 rounded-[4rem] blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
          <div class="relative aspect-[4/5] bg-stone-100 dark:bg-zinc-900 rounded-[3.5rem] overflow-hidden shadow-2xl border border-white dark:border-zinc-800">
             <div class="absolute inset-0 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 text-orange-200 dark:text-zinc-800 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
             </div>
             <div class="absolute bottom-8 left-8 right-8 p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 text-white space-y-2">
               <p class="text-2xl font-black tracking-tight">Kigali City Tower Branch</p>
               <p class="text-xs font-bold uppercase tracking-widest opacity-80">Our Flagship Experience</p>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Stats -->
    <section class="bg-stone-900 py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div class="space-y-2">
            <p class="text-4xl font-black text-orange-500">10k+</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Daily Deliveries</p>
          </div>
          <div class="space-y-2">
            <p class="text-4xl font-black text-orange-500">15</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Store Locations</p>
          </div>
          <div class="space-y-2">
            <p class="text-4xl font-black text-orange-500">100%</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Freshness Guarantee</p>
          </div>
          <div class="space-y-2">
            <p class="text-4xl font-black text-orange-500">24/7</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
