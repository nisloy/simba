<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const authStore = useAuthStore()
const activeTab = ref<'login' | 'signup' | 'forgot'>('login')
const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')
const isSuccess = ref(false)

const handleAuth = async () => {
  errorMessage.value = ''
  isSuccess.value = false
  
  try {
    if (activeTab.value === 'login') {
      if (!email.value.includes('@')) throw new Error('Please enter a valid email address')
      if (password.value.length < 4) throw new Error('Password is too short')
      authStore.login(email.value, password.value)
      emit('close')
    } else if (activeTab.value === 'signup') {
      if (!name.value) throw new Error('Full name is required')
      authStore.register(email.value, password.value, name.value)
      emit('close')
    } else if (activeTab.value === 'forgot') {
      if (!email.value.includes('@')) throw new Error('Enter your registered email')
      isSuccess.value = true
      setTimeout(() => {
        activeTab.value = 'login'
        isSuccess.value = false
      }, 3000)
    }
  } catch (e: any) {
    errorMessage.value = e.message
  }
}

const handleSocialLogin = (provider: string) => {
  authStore.login(`${provider.toLowerCase()}@example.com`, 'social-pass')
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
    <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
      <transition
        enter-active-class="ease-out duration-500"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="ease-in duration-300"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div class="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl border border-white dark:border-zinc-800 flex flex-col md:flex-row min-h-[600px]">
          <!-- Left: Brand Side (50%) -->
          <div class="md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-400 p-12 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
            <div class="relative z-10 space-y-8">
              <div class="flex items-center gap-3">
                <span class="text-3xl font-black tracking-tighter">SIMBA</span>
                <span class="text-xs font-black bg-white text-orange-500 px-2 py-1 rounded-full uppercase">2.0</span>
              </div>
              <div class="space-y-4">
                <h4 class="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">Kigali's Premium Marketplace.</h4>
                <p class="text-sm md:text-base font-bold text-white/80 max-w-xs leading-relaxed">
                  Join thousands of happy customers shopping fresh every single day.
                </p>
              </div>
            </div>
            
            <div class="relative z-10 pt-12">
               <div class="flex items-center gap-4">
                 <div class="flex -space-x-3">
                   <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full border-2 border-orange-500 bg-orange-100 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                   </div>
                 </div>
                 <p class="text-[10px] font-black uppercase tracking-widest text-white/90">Trusted by 5k+ locals</p>
               </div>
            </div>

            <!-- Decorative Circles -->
            <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute top-10 -right-10 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>
          </div>

          <!-- Right: Form Side (50%) -->
          <div class="md:w-1/2 p-10 md:p-16 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl flex flex-col justify-center relative">
            <button @click="emit('close')" class="absolute top-8 right-8 p-3 text-stone-300 hover:text-stone-500 dark:hover:text-stone-100 transition-colors bg-stone-50 dark:bg-zinc-800 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="space-y-10 w-full max-w-sm mx-auto">
              <!-- Tabs -->
              <div class="flex p-1.5 bg-stone-100 dark:bg-zinc-800 rounded-[1.2rem] relative w-full">
                <div 
                  class="absolute inset-y-1.5 w-[calc(33.33%-6px)] bg-white dark:bg-zinc-700 rounded-xl shadow-md transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
                  :class="{
                    'left-1.5': activeTab === 'login',
                    'left-[33.33%]': activeTab === 'signup',
                    'left-[66.66%]': activeTab === 'forgot'
                  }"
                ></div>
                <button @click="activeTab = 'login'" class="flex-1 relative z-10 py-3 text-[10px] font-black uppercase tracking-widest transition-colors" :class="activeTab === 'login' ? 'text-orange-600' : 'text-stone-400'">Login</button>
                <button @click="activeTab = 'signup'" class="flex-1 relative z-10 py-3 text-[10px] font-black uppercase tracking-widest transition-colors" :class="activeTab === 'signup' ? 'text-orange-600' : 'text-stone-400'">Sign Up</button>
                <button @click="activeTab = 'forgot'" class="flex-1 relative z-10 py-3 text-[10px] font-black uppercase tracking-widest transition-colors" :class="activeTab === 'forgot' ? 'text-orange-600' : 'text-stone-400'">Reset</button>
              </div>

              <!-- Message Display -->
              <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl text-red-600 text-[10px] font-black uppercase tracking-widest animate-in fade-in zoom-in duration-300">
                {{ errorMessage }}
              </div>
              <div v-if="isSuccess" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50 rounded-2xl text-green-600 text-[10px] font-black uppercase tracking-widest animate-in fade-in zoom-in duration-300">
                Reset link sent! Redirecting...
              </div>

              <!-- Inputs with Floating Labels -->
              <div class="space-y-6">
                <div v-if="activeTab === 'signup'" class="relative">
                  <input 
                    v-model="name"
                    type="text" 
                    id="name"
                    class="peer w-full bg-stone-50 dark:bg-zinc-800/50 border-none rounded-2xl py-5 px-8 text-base font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none placeholder-transparent dark:text-white"
                    placeholder="Full Name"
                  >
                  <label for="name" class="absolute left-8 top-5 text-stone-400 text-xs font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-orange-600 peer-focus:bg-white dark:peer-focus:bg-zinc-900 px-2 rounded-lg">Full Name</label>
                </div>

                <div class="relative">
                  <input 
                    v-model="email"
                    type="text" 
                    id="email"
                    class="peer w-full bg-stone-50 dark:bg-zinc-800/50 border-none rounded-2xl py-5 px-8 text-base font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none placeholder-transparent dark:text-white"
                    placeholder="Email"
                  >
                  <label for="email" class="absolute left-8 top-5 text-stone-400 text-xs font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-orange-600 peer-focus:bg-white dark:peer-focus:bg-zinc-900 px-2 rounded-lg">Email or Phone</label>
                </div>

                <div v-if="activeTab !== 'forgot'" class="relative">
                  <input 
                    v-model="password"
                    type="password" 
                    id="password"
                    class="peer w-full bg-stone-50 dark:bg-zinc-800/50 border-none rounded-2xl py-5 px-8 text-base font-bold focus:ring-4 focus:ring-orange-500/10 transition-all outline-none placeholder-transparent dark:text-white"
                    placeholder="Password"
                  >
                  <label for="password" class="absolute left-8 top-5 text-stone-400 text-xs font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-orange-600 peer-focus:bg-white dark:peer-focus:bg-zinc-900 px-2 rounded-lg">Password</label>
                </div>

                <button 
                  @click="handleAuth"
                  class="w-full py-5 bg-stone-900 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-500 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-sm uppercase tracking-[0.2em]"
                >
                  <span v-if="activeTab === 'login'">Continue Shopping</span>
                  <span v-else-if="activeTab === 'signup'">Create My Account</span>
                  <span v-else>Send Reset Link</span>
                </button>
              </div>

              <!-- Social Logins -->
              <div class="space-y-4">
                <div class="relative py-2">
                  <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-stone-100 dark:border-zinc-800"></div></div>
                  <div class="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em] text-stone-300"><span class="bg-white dark:bg-zinc-900 px-4">Instant Access</span></div>
                </div>

                <div class="grid grid-cols-1 gap-3">
                  <button @click="handleSocialLogin('Google')" class="w-full py-4 border-2 border-stone-100 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 text-stone-900 dark:text-stone-100 font-black rounded-2xl transition-all active:scale-95 text-[11px] uppercase tracking-widest flex items-center justify-center gap-4">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.76 1.85-1.61 2.42v2.85h2.61c1.53-1.41 2.41-3.5 2.41-5.28z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.47-2.69c-.97.65-2.23 1.03-3.81 1.03-2.85 0-5.27-1.92-6.13-4.51H2.18v2.79C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.87 14.17c-.22-.65-.35-1.35-.35-2.07s.13-1.42.35-2.07V7.24H2.18C1.4 8.87 1 10.38 1 12s.4 3.13 1.18 4.76l3.69-2.59z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.24l3.69 2.59c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335"/></svg>
                    Continue with Google
                  </button>
                  <button @click="handleSocialLogin('Apple')" class="w-full py-4 bg-black text-white hover:bg-zinc-800 font-black rounded-2xl transition-all active:scale-95 text-[11px] uppercase tracking-widest flex items-center justify-center gap-4">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 170 170"><path d="M150.37,130.25c-2.45,5.66-5.35,10.87-8.71,15.66c-8.58,12.27-17.41,24.47-30.91,24.69c-13.27,0.22-17.54-7.85-32.72-7.85 c-15.17,0-19.89,7.64-32.5,8.07c-12.82,0.43-22.99-13.35-31.64-25.78C11.12,127.35,0,96.4,0,67.11c0-47.38,30.82-72.33,61.12-72.33 c15.82,0,30.7,10.99,40.45,10.99c9.76,0,27.78-13.35,46.73-11.42c8.01,0.34,30.47,3.22,44.87,36.1c-1.2,0.74-26.85,15.66-26.58,47.16 c0.27,38.16,33.5,50.8,33.91,51.01C159.2,121.11,154.54,128.18,150.37,130.25L150.37,130.25z M118.99,35.14 c8.47-10.24,14.18-24.47,12.62-38.64c-12.18,0.5-26.89,8.12-35.63,18.36c-7.82,9.03-14.67,23.51-12.82,37.35 C95.34,53.25,110.51,45.38,118.99,35.14L118.99,35.14z"/></svg>
                    Continue with Apple
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
