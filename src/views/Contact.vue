<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const showToast = ref(false)
const isSubmitting = ref(false)

const handleSubmit = () => {
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    showToast.value = true
    name.value = ''
    email.value = ''
    message.value = ''
    
    // Auto-hide toast
    setTimeout(() => {
      showToast.value = false
    }, 5000)
  }, 1500)
}
</script>

<template>
  <div class="bg-stone-50 dark:bg-zinc-950 min-h-[80vh] py-20 px-4">
    <div class="max-w-3xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center space-y-4">
        <span class="bg-orange-100 dark:bg-orange-500/10 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Get in Touch</span>
        <h1 class="text-5xl font-black tracking-tight dark:text-white">Contact Simba Support</h1>
        <p class="text-lg text-stone-500 font-bold max-w-lg mx-auto leading-relaxed">
          Have a question about your order or our products? We're here to help you 24/7.
        </p>
      </div>

      <!-- Contact Form -->
      <div class="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-stone-100 dark:border-zinc-800">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Full Name</label>
              <input 
                v-model="name"
                required
                type="text" 
                placeholder="John Doe"
                class="w-full bg-stone-50 dark:bg-zinc-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
              >
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Email Address</label>
              <input 
                v-model="email"
                required
                type="email" 
                placeholder="john@example.rw"
                class="w-full bg-stone-50 dark:bg-zinc-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
              >
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Your Message</label>
            <textarea 
              v-model="message"
              required
              rows="5"
              placeholder="How can we help you today?"
              class="w-full bg-stone-50 dark:bg-zinc-800 border-none rounded-3xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-stone-100 dark:disabled:bg-zinc-800 disabled:text-stone-400 text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/40 transition-all active:scale-95 text-lg uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <span v-if="!isSubmitting">Send Message</span>
            <div v-else class="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </button>
        </form>
      </div>

      <!-- Contact Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-stone-100 dark:border-zinc-800 text-center space-y-2">
          <p class="text-[10px] font-black text-orange-600 uppercase tracking-widest">Phone</p>
          <p class="font-black">+250 788 000 000</p>
        </div>
        <div class="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-stone-100 dark:border-zinc-800 text-center space-y-2">
          <p class="text-[10px] font-black text-orange-600 uppercase tracking-widest">Email</p>
          <p class="font-black">support@simba.rw</p>
        </div>
        <div class="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-stone-100 dark:border-zinc-800 text-center space-y-2">
          <p class="text-[10px] font-black text-orange-600 uppercase tracking-widest">Office</p>
          <p class="font-black">Kigali City Tower</p>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <transition
      enter-active-class="transform transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showToast" class="fixed bottom-8 right-8 z-[100] max-w-sm w-full bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-green-500/30 p-6 flex items-center gap-6">
        <div class="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-black dark:text-white uppercase tracking-tight">Message Sent!</p>
          <p class="text-xs font-bold text-stone-400">We'll get back to you within 24 hours.</p>
        </div>
        <button @click="showToast = false" class="ml-auto text-stone-300 hover:text-stone-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>
