import { defineStore } from 'pinia'
import productsData from '../data/simba_products.json'
import { searchProducts } from '../services/groqService'

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
    aiMessage: '',
    isAiLoading: false,
    aiMatchedIds: [] as number[],
  }),
  getters: {
    categories: (state) => {
      const cats = state.products.map(p => p.category)
      return ['All', ...new Set(cats)]
    },
    filteredProducts: (state) => {
      let filtered = state.products
      
      if (state.aiMatchedIds.length > 0) {
        return state.products.filter(p => state.aiMatchedIds.includes(p.id))
      }

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
      this.aiMatchedIds = []
      this.aiMessage = ''
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
      if (!query) {
        this.aiMatchedIds = []
        this.aiMessage = ''
      }
    },
    async executeAiSearch() {
      if (!this.searchQuery) return
      
      this.isAiLoading = true
      this.aiMessage = ''
      
      const response = await searchProducts(this.searchQuery, this.products)
      
      this.aiMessage = response.message
      this.aiMatchedIds = response.matched_product_ids
      this.isAiLoading = false
    }
  }
})
