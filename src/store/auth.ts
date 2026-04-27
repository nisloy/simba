import { defineStore } from 'pinia'

export interface User {
  email: string
  name: string
  role: 'customer' | 'staff' | 'manager'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(email: string, password: string) {
      // Mock login logic
      this.token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
      this.user = {
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'manager' : email.includes('staff') ? 'staff' : 'customer'
      }
      
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    register(email: string, password: string, name: string) {
      // Mock register logic
      this.login(email, password)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
