<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInventoryStore, Order, Branch } from '../store/inventory'
import { useProductStore } from '../store/products'
import ReviewModal from '../components/ReviewModal.vue'

const inventoryStore = useInventoryStore()
const productStore = useProductStore()
const role = ref<'manager' | 'staff'>('manager')
const activeTab = ref<'orders' | 'inventory'>('orders')
const selectedBranchForInventory = ref<Branch>(inventoryStore.branches[0])

const isReviewModalOpen = ref(false)
const reviewTarget = ref<{branch: Branch, orderId: string} | null>(null)

const pendingOrders = computed(() => inventoryStore.orders.filter(o => o.status === 'pending'))
const assignedOrders = computed(() => inventoryStore.orders.filter(o => o.status === 'assigned'))
const readyOrders = computed(() => inventoryStore.orders.filter(o => o.status === 'ready'))

const staffOrders = computed(() => {
  // Staff sees assigned and ready orders
  return inventoryStore.orders.filter(o => o.status === 'assigned' || o.status === 'ready')
})

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' RWF'
}

const handleAssign = (orderId: string) => {
  const staffName = prompt('Enter staff member name to assign:')
  if (staffName) {
    inventoryStore.assignOrder(orderId, staffName)
  }
}

const handleMarkReady = (orderId: string) => {
  inventoryStore.markOrderReady(orderId)
}

const handleComplete = (order: Order) => {
  inventoryStore.completeOrder(order.id)
  reviewTarget.value = { branch: order.branch, orderId: order.id }
  isReviewModalOpen.value = true
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-zinc-950 p-4 md:p-8">
    <ReviewModal 
      v-if="reviewTarget"
      :is-open="isReviewModalOpen"
      :branch="reviewTarget.branch"
      :order-id="reviewTarget.orderId"
      @close="isReviewModalOpen = false"
    />
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Header & Role Toggle -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="space-y-1">
          <h1 class="text-3xl font-black dark:text-white tracking-tight uppercase">Branch Operations</h1>
          <p class="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Internal Management Portal</p>
        </div>

        <div class="bg-stone-200 dark:bg-zinc-900 p-1 rounded-2xl flex shadow-inner">
          <button 
            @click="role = 'manager'"
            class="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            :class="role === 'manager' ? 'bg-white dark:bg-zinc-800 dark:text-white shadow-sm' : 'text-stone-500'"
          >
            Manager
          </button>
          <button 
            @click="role = 'staff'"
            class="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            :class="role === 'staff' ? 'bg-white dark:bg-zinc-800 dark:text-white shadow-sm' : 'text-stone-500'"
          >
            Staff
          </button>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex gap-4 border-b border-stone-200 dark:border-zinc-800">
        <button 
          @click="activeTab = 'orders'"
          class="px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all"
          :class="activeTab === 'orders' ? 'border-orange-500 text-orange-600' : 'border-transparent text-stone-400'"
        >
          Orders
        </button>
        <button 
          @click="activeTab = 'inventory'"
          class="px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all"
          :class="activeTab === 'inventory' ? 'border-orange-500 text-orange-600' : 'border-transparent text-stone-400'"
        >
          Inventory
        </button>
      </div>

      <!-- Manager View -->
      <div v-if="activeTab === 'orders'">
        <div v-if="role === 'manager'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-stone-100 dark:border-zinc-800 shadow-xl space-y-2">
            <p class="text-4xl font-black text-orange-500">{{ pendingOrders.length }}</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Pending Assignment</p>
          </div>
          <div class="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-stone-100 dark:border-zinc-800 shadow-xl space-y-2">
            <p class="text-4xl font-black text-blue-500">{{ assignedOrders.length }}</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">In Preparation</p>
          </div>
          <div class="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-stone-100 dark:border-zinc-800 shadow-xl space-y-2">
            <p class="text-4xl font-black text-green-500">{{ readyOrders.length }}</p>
            <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Ready for Pick-up</p>
          </div>
        </div>

        <div class="bg-white dark:bg-zinc-900 rounded-[3rem] border border-stone-100 dark:border-zinc-800 shadow-2xl overflow-hidden">
          <div class="p-8 border-b border-stone-100 dark:border-zinc-800">
            <h2 class="text-xl font-black dark:text-white uppercase tracking-tight">Active Orders</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] bg-stone-50 dark:bg-zinc-800/50">
                  <th class="px-8 py-4">Order ID</th>
                  <th class="px-8 py-4">Branch</th>
                  <th class="px-8 py-4">Total</th>
                  <th class="px-8 py-4">Status</th>
                  <th class="px-8 py-4">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100 dark:divide-zinc-800">
                <tr v-for="order in inventoryStore.orders" :key="order.id" class="group hover:bg-stone-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td class="px-8 py-6">
                    <p class="font-black text-sm dark:text-white">#{{ order.id }}</p>
                    <p class="text-[10px] font-bold text-stone-400">{{ order.pickupTime }}</p>
                  </td>
                  <td class="px-8 py-6">
                    <span class="text-xs font-black dark:text-zinc-300 uppercase tracking-widest">{{ order.branch }}</span>
                  </td>
                  <td class="px-8 py-6">
                    <span class="text-sm font-black dark:text-white">{{ formatPrice(order.total) }}</span>
                  </td>
                  <td class="px-8 py-6">
                    <span 
                      class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                      :class="{
                        'bg-orange-100 text-orange-600': order.status === 'pending',
                        'bg-blue-100 text-blue-600': order.status === 'assigned',
                        'bg-green-100 text-green-600': order.status === 'ready',
                        'bg-stone-100 text-stone-500': order.status === 'completed'
                      }"
                    >
                      {{ order.status }}
                    </span>
                    <p v-if="order.assignedTo" class="text-[10px] font-bold text-stone-400 mt-1">Assigned: {{ order.assignedTo }}</p>
                  </td>
                  <td class="px-8 py-6">
                    <button 
                      v-if="order.status === 'pending'"
                      @click="handleAssign(order.id)"
                      class="px-4 py-2 bg-stone-900 dark:bg-zinc-100 dark:text-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all active:scale-95"
                    >
                      Assign Staff
                    </button>
                  </td>
                </tr>
                <tr v-if="inventoryStore.orders.length === 0">
                  <td colspan="5" class="px-8 py-12 text-center">
                    <p class="text-stone-400 font-bold uppercase tracking-widest text-xs">No orders found.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Staff View -->
      <div v-else class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div v-if="staffOrders.length === 0" class="h-64 bg-white dark:bg-zinc-900 rounded-[3rem] border border-stone-100 dark:border-zinc-800 flex items-center justify-center">
          <p class="text-stone-400 font-bold uppercase tracking-widest text-xs">No orders assigned to you yet.</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="order in staffOrders" 
            :key="order.id"
            class="bg-white dark:bg-zinc-900 rounded-[3rem] border border-stone-100 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
          >
            <div class="p-8 border-b border-stone-100 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h3 class="font-black text-xl dark:text-white uppercase tracking-tight">Order #{{ order.id }}</h3>
                <p class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Pick-up: {{ order.pickupTime }}</p>
              </div>
              <span 
                class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                :class="order.status === 'ready' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'"
              >
                {{ order.status }}
              </span>
            </div>
            
            <div class="p-8 flex-1 space-y-6">
              <div class="space-y-4">
                <p class="text-[10px] font-black text-orange-600 uppercase tracking-widest">Items to Pack</p>
                <div v-for="item in order.items" :key="item.id" class="flex justify-between items-center bg-stone-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 flex items-center justify-center bg-stone-900 text-white rounded-lg text-xs font-black">{{ item.quantity }}x</span>
                    <span class="font-black text-sm dark:text-zinc-200">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 bg-stone-50 dark:bg-zinc-800/30 border-t border-stone-100 dark:border-zinc-800">
              <button 
                v-if="order.status === 'assigned'"
                @click="handleMarkReady(order.id)"
                class="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Mark Ready for Pick-up
              </button>
              <button 
                v-else-if="order.status === 'ready'"
                @click="handleComplete(order)"
                class="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl shadow-xl shadow-green-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Complete & Rate (Simulate)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      <!-- Inventory Tab -->
      <div v-if="activeTab === 'inventory'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-stone-100 dark:border-zinc-800 shadow-2xl space-y-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 class="text-xl font-black dark:text-white uppercase tracking-tight">Branch Inventory</h2>
            <select 
              v-model="selectedBranchForInventory"
              class="bg-stone-50 dark:bg-zinc-800 border-2 border-stone-100 dark:border-zinc-700 rounded-2xl py-2 px-6 text-xs font-black uppercase tracking-widest focus:border-orange-500 focus:ring-0 transition-all outline-none dark:text-white"
            >
              <option v-for="branch in inventoryStore.branches" :key="branch" :value="branch">{{ branch }}</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="product in productStore.products.slice(0, 12)" 
              :key="product.id"
              class="p-6 bg-stone-50 dark:bg-zinc-800/50 rounded-2xl border border-stone-100 dark:border-zinc-800 flex justify-between items-center"
            >
              <div>
                <p class="font-black text-xs dark:text-white">{{ product.name }}</p>
                <p class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  Stock: 
                  <span :class="inventoryStore.branchStock[selectedBranchForInventory]?.[product.id] > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ inventoryStore.branchStock[selectedBranchForInventory]?.[product.id] || 0 }}
                  </span>
                </p>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="inventoryStore.setStock(selectedBranchForInventory, product.id, 0)"
                  class="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-200 transition-colors"
                >
                  Out
                </button>
                <button 
                  @click="inventoryStore.setStock(selectedBranchForInventory, product.id, 50)"
                  class="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-green-200 transition-colors"
                >
                  Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
