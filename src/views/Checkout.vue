<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { useInventoryStore, Branch } from '../store/inventory'
import { useReviewStore } from '../store/reviews'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const cartStore = useCartStore()
const inventoryStore = useInventoryStore()
const reviewStore = useReviewStore()
const router = useRouter()

const selectedBranch = ref<Branch | ''>('')
const selectedTime = ref('')
const phoneNumber = ref('')
const isProcessing = ref(false)
const orderCompleted = ref(false)
const lastOrderId = ref('')

const times = [
  'In 30 mins',
  'In 1 hour',
  'In 2 hours',
  'Later today',
  'Tomorrow morning'
]

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' RWF'
}

const handleCheckout = async () => {
  if (!selectedBranch.value || !selectedTime.value || !phoneNumber.value) {
    alert('Please fill in all pick-up and payment details.')
    return
  }

  isProcessing.value = true
  
  // Simulate payment and order processing
  setTimeout(() => {
    const orderId = inventoryStore.placeOrder(
      cartStore.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      selectedBranch.value as Branch,
      selectedTime.value
    )
    
    lastOrderId.value = orderId
    cartStore.$reset() // This might not be the right way if cartStore doesn't have reset, check cart.ts
    // Looking at common pinia usage, cartStore.items = [] or similar
    cartStore.items = []
    
    isProcessing.value = false
    orderCompleted.value = true
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-zinc-950 py-12 md:py-20 px-4">
    <div class="max-w-7xl mx-auto">
      
      <!-- Success State -->
      <div v-if="orderCompleted" class="max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in duration-500">
        <div class="w-24 h-24 bg-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="space-y-4">
          <h1 class="text-4xl font-black dark:text-white uppercase tracking-tight">Order Confirmed!</h1>
          <p class="text-stone-500 dark:text-zinc-400 font-bold text-lg">
            Your Order ID is <span class="text-orange-600 font-black">#{{ lastOrderId }}</span>
          </p>
          <p class="text-sm text-stone-400 max-w-md mx-auto">
            Please arrive at the <span class="text-zinc-900 dark:text-white font-black">{{ selectedBranch }}</span> branch 
            <span class="text-zinc-900 dark:text-white font-black">{{ selectedTime.toLowerCase() }}</span>.
          </p>
        </div>
        <router-link to="/" class="inline-block px-10 py-5 bg-stone-900 dark:bg-zinc-100 dark:text-zinc-900 text-white font-black rounded-3xl transition-all active:scale-95 uppercase tracking-widest text-sm shadow-xl">
          Back to Store
        </router-link>
      </div>

      <!-- Checkout Flow -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left: Form -->
        <div class="lg:col-span-7 space-y-8">
          <div class="space-y-2">
            <h1 class="text-4xl font-black dark:text-white tracking-tight">CHECKOUT</h1>
            <p class="text-stone-400 font-bold uppercase tracking-widest text-xs">Pick-up & Payment Details</p>
          </div>

          <div class="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[3rem] shadow-2xl border border-stone-100 dark:border-zinc-800 space-y-10">
            <!-- Branch Selection -->
            <div class="space-y-4">
              <label class="text-[10px] font-black uppercase tracking-widest text-orange-600 ml-2">1. Select Pick-up Branch</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button 
                  v-for="branch in inventoryStore.branches" 
                  :key="branch"
                  @click="selectedBranch = branch"
                  class="px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex flex-col items-center gap-1"
                  :class="selectedBranch === branch 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105' 
                    : 'bg-stone-50 dark:bg-zinc-800 border-stone-100 dark:border-zinc-700 text-stone-500 dark:text-zinc-400 hover:border-orange-200'"
                >
                  {{ branch }}
                  <span class="flex items-center gap-1 opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {{ reviewStore.getBranchRating(branch) }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Time Selection -->
            <div class="space-y-4">
              <label class="text-[10px] font-black uppercase tracking-widest text-orange-600 ml-2">2. Pick-up Time</label>
              <select 
                v-model="selectedTime"
                class="w-full bg-stone-50 dark:bg-zinc-800 border-2 border-stone-100 dark:border-zinc-700 rounded-2xl py-4 px-6 text-sm font-black focus:border-orange-500 focus:ring-0 transition-all outline-none dark:text-white"
              >
                <option value="" disabled>Choose a time</option>
                <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>

            <!-- Payment Simulation -->
            <div class="space-y-6">
              <label class="text-[10px] font-black uppercase tracking-widest text-orange-600 ml-2">3. MoMo Deposit (500 RWF)</label>
              
              <div class="p-6 bg-orange-50 dark:bg-orange-500/5 rounded-3xl border border-orange-200/50 dark:border-orange-500/20 space-y-3">
                <div class="flex items-center gap-3 text-orange-600 font-black text-xs uppercase tracking-widest">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Deposit Required
                </div>
                <p class="text-sm text-stone-600 dark:text-zinc-400 leading-relaxed font-bold">
                  Your order requires a <span class="text-orange-600 font-black">500 RWF non-refundable deposit</span> via MoMo to confirm and protect branch staff time. This will be deducted from your total.
                </p>
              </div>

              <div class="relative group">
                <span class="absolute inset-y-0 left-0 flex items-center pl-6">
                  <span class="text-stone-400 font-black text-sm">RW</span>
                </span>
                <input 
                  v-model="phoneNumber"
                  type="tel" 
                  placeholder="078... or 079..."
                  class="w-full bg-stone-50 dark:bg-zinc-800 border-2 border-stone-100 dark:border-zinc-700 rounded-2xl py-4 pl-14 pr-6 text-sm font-black focus:border-orange-500 focus:ring-0 transition-all outline-none dark:text-white"
                >
              </div>
            </div>

            <button 
              @click="handleCheckout"
              :disabled="isProcessing"
              class="w-full py-6 bg-orange-500 hover:bg-orange-600 disabled:bg-stone-100 dark:disabled:bg-zinc-800 disabled:text-stone-400 text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/40 transition-all active:scale-95 text-xl uppercase tracking-widest flex items-center justify-center gap-4"
            >
              <span v-if="!isProcessing">Pay Deposit & Confirm</span>
              <div v-else class="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </button>
          </div>
        </div>

        <!-- Right: Summary -->
        <div class="lg:col-span-5 space-y-8">
          <div class="space-y-2">
            <h2 class="text-2xl font-black dark:text-white tracking-tight">ORDER SUMMARY</h2>
            <p class="text-stone-400 font-bold uppercase tracking-widest text-xs">Items in your cart</p>
          </div>

          <div class="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-xl border border-stone-100 dark:border-zinc-800 overflow-hidden">
            <div class="p-8 space-y-6 max-h-[500px] overflow-y-auto no-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between items-center gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-stone-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center font-black text-stone-400 text-xs">
                    {{ item.quantity }}x
                  </div>
                  <div>
                    <p class="font-black text-sm dark:text-white">{{ item.name }}</p>
                    <p class="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{{ item.category }}</p>
                  </div>
                </div>
                <p class="font-black text-sm dark:text-white">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <div class="p-8 bg-stone-50 dark:bg-zinc-800/50 border-t border-stone-100 dark:border-zinc-800 space-y-4">
              <div class="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartStore.totalAmount) }}</span>
              </div>
              <div class="flex justify-between text-xs font-bold text-orange-600 uppercase tracking-widest">
                <span>MoMo Deposit</span>
                <span>- 500 RWF</span>
              </div>
              <div class="flex justify-between items-end pt-4">
                <p class="text-stone-400 font-black uppercase text-[10px] tracking-widest">Balance at Pick-up</p>
                <p class="text-3xl font-black dark:text-white tracking-tighter">{{ formatPrice(cartStore.totalAmount - 500) }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
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
