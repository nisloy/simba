import { defineStore } from 'pinia'

export type Branch = 'Remera' | 'Kimironko' | 'Kacyiru' | 'Nyamirambo' | 'Gikondo' | 'Kanombe' | 'Kinyinya' | 'Kibagabaga' | 'Nyanza'

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  branch: Branch
  pickupTime: string
  status: 'pending' | 'assigned' | 'ready' | 'completed'
  assignedTo?: string
  createdAt: Date
}

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    branches: [
      'Remera', 'Kimironko', 'Kacyiru', 'Nyamirambo', 
      'Gikondo', 'Kanombe', 'Kinyinya', 'Kibagabaga', 'Nyanza'
    ] as Branch[],
    orders: [] as Order[],
    // Mock stock counts per branch (product ID -> count)
    branchStock: {} as Record<Branch, Record<number, number>>
  }),
  actions: {
    initStock(productIds: number[]) {
      this.branches.forEach(branch => {
        if (!this.branchStock[branch]) {
          this.branchStock[branch] = {}
        }
        productIds.forEach(id => {
          this.branchStock[branch][id] = Math.floor(Math.random() * 50) + 10
        })
      })
    },
    placeOrder(items: OrderItem[], branch: Branch, pickupTime: string) {
      const order: Order = {
        id: 'SMB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: [...items],
        total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        branch,
        pickupTime,
        status: 'pending',
        createdAt: new Date()
      }
      
      this.orders.push(order)
      
      // Decrease stock
      items.forEach(item => {
        if (this.branchStock[branch] && this.branchStock[branch][item.id]) {
          this.branchStock[branch][item.id] -= item.quantity
        }
      })
      
      return order.id
    },
    assignOrder(orderId: string, staffName: string) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = 'assigned'
        order.assignedTo = staffName
      }
    },
    markOrderReady(orderId: string) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = 'ready'
      }
    },
    completeOrder(orderId: string) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = 'completed'
      }
    },
    setStock(branch: Branch, productId: number, count: number) {
      if (this.branchStock[branch]) {
        this.branchStock[branch][productId] = count
      }
    }
  }
})
