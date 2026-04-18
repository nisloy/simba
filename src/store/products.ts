import { defineStore } from 'pinia'
import productsData from '../data/simba_products.json'

export interface Product {
  id: number
  name: string
  price: number
  category: string
  subcategoryId: number
  inStock: boolean
  image: string
  unit: string
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: productsData.products as Product[],
    selectedCategory: 'All',
    searchQuery: '',
  }),
  getters: {
    categories: (state) => {
      const cats = state.products.map(p => p.category)
      return ['All', ...new Set(cats)]
    },
    filteredProducts: (state) => {
      let filtered = state.products
      if (state.selectedCategory !== 'All') {
        filtered = filtered.filter(p => p.category === state.selectedCategory)
      }
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        )
      }
      return filtered
    },
    getProductById: (state) => (id: number) => {
      return state.products.find(p => p.id === id)
    }
  },
  actions: {
    setCategory(category: string) {
      this.selectedCategory = category
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  }
})
