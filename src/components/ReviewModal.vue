<script setup lang="ts">
import { ref } from 'vue'
import { Branch } from '../store/inventory'
import { useReviewStore } from '../store/reviews'
import { useAuthStore } from '../store/auth'

const props = defineProps<{
  isOpen: boolean
  branch: Branch
  orderId: string
}>()

const emit = defineEmits(['close'])

const reviewStore = useReviewStore()
const authStore = useAuthStore()

const rating = ref(5)
const comment = ref('')

const submitReview = () => {
  reviewStore.addReview(
    props.branch,
    rating.value,
    comment.value,
    authStore.user?.name || 'Anonymous'
  )
  emit('close')
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
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[3rem] shadow-2xl border border-stone-100 dark:border-zinc-800 p-10 space-y-8 animate-in zoom-in duration-300">
        <div class="text-center space-y-2">
          <h2 class="text-3xl font-black dark:text-white tracking-tight uppercase">Rate Your Experience</h2>
          <p class="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Branch: {{ branch }} (Order #{{ orderId }})</p>
        </div>

        <div class="flex justify-center gap-2">
          <button 
            v-for="i in 5" 
            :key="i"
            @click="rating = i"
            class="transition-transform active:scale-90"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-10 w-10" 
              :class="i <= rating ? 'text-orange-500 fill-current' : 'text-stone-200 dark:text-zinc-800'"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Any comments?</label>
          <textarea 
            v-model="comment"
            rows="3"
            placeholder="Tell us about the pick-up process..."
            class="w-full bg-stone-50 dark:bg-zinc-800 border-none rounded-3xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none dark:text-white"
          ></textarea>
        </div>

        <div class="flex gap-4">
          <button @click="$emit('close')" class="flex-1 py-4 bg-stone-100 dark:bg-zinc-800 text-stone-500 font-black rounded-2xl uppercase tracking-widest text-[10px] transition-all">Skip</button>
          <button @click="submitReview" class="flex-2 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 uppercase tracking-widest text-[10px] transition-all px-8">Submit Review</button>
        </div>
      </div>
    </div>
  </transition>
</template>
