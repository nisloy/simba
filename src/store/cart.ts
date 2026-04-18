import { defineStore } from 'pinia'
import { Product } from './products'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false,
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  },
  actions: {
    toggleDrawer() {
      this.isOpen = !this.isOpen
    },
    addToCart(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.isOpen = true
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    updateQuantity(productId: number, delta: number) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity += delta
        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        }
      }
    },
    clearCart() {
      this.items = []
    }
  }
})
