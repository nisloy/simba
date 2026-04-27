import { defineStore } from 'pinia'
import { Branch } from './inventory'

export interface Review {
  id: string
  branch: Branch
  rating: number
  comment: string
  userName: string
  createdAt: Date
}

export const useReviewStore = defineStore('reviews', {
  state: () => ({
    reviews: [
      { id: '1', branch: 'Remera', rating: 4.5, comment: 'Great service!', userName: 'Alice', createdAt: new Date() },
      { id: '2', branch: 'Kimironko', rating: 4.8, comment: 'Very fresh produce.', userName: 'Bob', createdAt: new Date() },
      { id: '3', branch: 'Kacyiru', rating: 4.2, comment: 'Quick pick-up.', userName: 'Charlie', createdAt: new Date() },
      { id: '4', branch: 'Nyamirambo', rating: 4.0, comment: 'Friendly staff.', userName: 'David', createdAt: new Date() },
      { id: '5', branch: 'Gikondo', rating: 4.6, comment: 'Clean and organized.', userName: 'Eve', createdAt: new Date() },
      { id: '6', branch: 'Kanombe', rating: 4.3, comment: 'Good variety.', userName: 'Frank', createdAt: new Date() },
      { id: '7', branch: 'Kinyinya', rating: 4.7, comment: 'Always helpful.', userName: 'Grace', createdAt: new Date() },
      { id: '8', branch: 'Kibagabaga', rating: 4.9, comment: 'Best branch in town!', userName: 'Henry', createdAt: new Date() },
      { id: '9', branch: 'Nyanza', rating: 4.1, comment: 'Reliable.', userName: 'Ivy', createdAt: new Date() },
    ] as Review[]
  }),
  getters: {
    getBranchRating: (state) => (branch: Branch) => {
      const branchReviews = state.reviews.filter(r => r.branch === branch)
      if (branchReviews.length === 0) return 0
      const sum = branchReviews.reduce((acc, r) => acc + r.rating, 0)
      return (sum / branchReviews.length).toFixed(1)
    }
  },
  actions: {
    addReview(branch: Branch, rating: number, comment: string, userName: string) {
      this.reviews.push({
        id: Math.random().toString(36).substr(2, 9),
        branch,
        rating,
        comment,
        userName,
        createdAt: new Date()
      })
    }
  }
})
