<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const step = ref<'provider' | 'input' | 'processing' | 'success'>('provider')
const provider = ref<'mtn' | 'airtel' | null>(null)
const phoneNumber = ref('')

const selectProvider = (p: 'mtn' | 'airtel') => {
  provider.value = p
  phoneNumber.value = p === 'mtn' ? '078' : '073'
  step.value = 'input'
}

const isValidPhone = computed(() => {
  const mtnRegex = /^(078|079)\d{7}$/
  const airtelRegex = /^(072|073)\d{7}$/
  if (provider.value === 'mtn') return mtnRegex.test(phoneNumber.value)
  if (provider.value === 'airtel') return airtelRegex.test(phoneNumber.value)
  return false
})

const handlePayment = () => {
  if (!isValidPhone.value) return
  step.value = 'processing'
  
  setTimeout(() => {
    step.value = 'success'
    cartStore.clearCart()
  }, 3000)
}

const closeAndReset = () => {
  emit('close')
  setTimeout(() => {
    step.value = 'provider'
    provider.value = null
    phoneNumber.value = ''
  }, 500)
}
</script>

<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
      <transition
        enter-active-class="ease-out duration-500"
        enter-from-class="opacity-0 scale-90 translate-y-8"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        mode="out-in"
      >
        <div :key="step" class="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl border border-white dark:border-zinc-800">
          
          <!-- Step 1: Provider Selection -->
          <div v-if="step === 'provider'" class="p-10 space-y-8">
            <div class="text-center space-y-2">
              <h3 class="text-3xl font-black tracking-tight dark:text-white">Select Provider</h3>
              <p class="text-stone-500 text-sm font-bold uppercase tracking-widest">Choose your mobile network</p>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <button @click="selectProvider('mtn')" class="group relative flex items-center gap-6 p-6 bg-yellow-400 hover:bg-yellow-500 rounded-[2rem] transition-all active:scale-95 shadow-xl shadow-yellow-400/20 text-white overflow-hidden">
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl italic">MTN</div>
                <div class="text-left">
                  <p class="text-xl font-black">MTN Mobile Money</p>
                  <p class="text-xs font-bold opacity-80 uppercase tracking-widest">Fast & Reliable</p>
                </div>
                <div class="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button @click="selectProvider('airtel')" class="group relative flex items-center gap-6 p-6 bg-red-600 hover:bg-red-700 rounded-[2rem] transition-all active:scale-95 shadow-xl shadow-red-600/20 text-white overflow-hidden">
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl italic">AIR</div>
                <div class="text-left">
                  <p class="text-xl font-black">Airtel Money</p>
                  <p class="text-xs font-bold opacity-80 uppercase tracking-widest">Instant Pay</p>
                </div>
                <div class="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
            <button @click="emit('close')" class="w-full text-sm font-black text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-widest">Cancel Payment</button>
          </div>

          <!-- Step 2: Phone Input -->
          <div v-else-if="step === 'input'" class="p-10 space-y-8">
            <button @click="step = 'provider'" class="flex items-center gap-2 text-stone-400 hover:text-orange-600 transition-colors font-black uppercase text-[10px] tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
              </svg>
              Change Provider
            </button>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-3xl font-black tracking-tight dark:text-white">Payment Number</h3>
                <div :class="provider === 'mtn' ? 'bg-yellow-400' : 'bg-red-600'" class="px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                  {{ provider === 'mtn' ? 'MTN' : 'Airtel' }}
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Enter Mobile Number</label>
                <input 
                  v-model="phoneNumber"
                  type="tel" 
                  class="w-full bg-stone-50 dark:bg-zinc-800 border-none rounded-3xl py-5 px-8 text-2xl font-black tracking-[0.2em] focus:ring-4 focus:ring-orange-500/10 transition-all outline-none dark:text-white"
                  maxlength="10"
                >
              </div>

              <button 
                @click="handlePayment"
                :disabled="!isValidPhone"
                class="w-full py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-stone-100 dark:disabled:bg-zinc-800 disabled:text-stone-400 text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/30 transition-all active:scale-95 text-lg"
              >
                Confirm {{ cartStore.totalAmount.toLocaleString() }} RWF
              </button>
            </div>
          </div>

          <!-- Step 3: Processing (iOS Smart Loader) -->
          <div v-else-if="step === 'processing'" class="p-16 flex flex-col items-center text-center space-y-8">
            <div class="relative w-12 h-12">
              <svg class="w-full h-full animate-spin text-stone-200 dark:text-zinc-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M12 18V22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/>
                <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
                <path d="M2 12H6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
                <path d="M18 12H22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
                <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
                <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-2 h-2 bg-orange-500 rounded-full blur-[2px] animate-pulse"></div>
              </div>
            </div>
            <div class="space-y-3">
              <h3 class="text-xl font-black tracking-tight dark:text-white uppercase tracking-[0.1em]">Awaiting Authorization</h3>
              <p class="text-stone-500 text-sm leading-relaxed font-bold">Awaiting <span class="text-orange-600">USSD PIN</span> on your device...</p>
            </div>
          </div>

          <!-- Step 4: Success -->
          <div v-else-if="step === 'success'" class="p-16 flex flex-col items-center text-center space-y-8">
            <div class="w-24 h-24 bg-green-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-green-500/30 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="space-y-3">
              <h3 class="text-3xl font-black text-green-600 tracking-tight uppercase">Success!</h3>
              <p class="text-stone-500 text-sm font-bold">Your order is confirmed. Simba is on the way!</p>
            </div>
            <button @click="closeAndReset" class="w-full py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black rounded-[2rem] transition-all active:scale-95 shadow-xl">
              Done
            </button>
          </div>

        </div>
      </transition>
    </div>
  </transition>
</template>
