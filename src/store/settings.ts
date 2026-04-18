import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'
export type Locale = 'en' | 'fr' | 'rw'

interface Translations {
  [key: string]: {
    en: string
    fr: string
    rw: string
  }
}

export const translations: Translations = {
  addToCart: {
    en: 'Add to Cart',
    fr: 'Ajouter au panier',
    rw: 'Ongeramo'
  },
  searchPlaceholder: {
    en: 'Find groceries, electronics...',
    fr: 'Trouver des produits...',
    rw: 'Shaka ibiribwa...'
  },
  cart: {
    en: 'Your Cart',
    fr: 'Votre panier',
    rw: 'Isakoshi yawe'
  },
  checkout: {
    en: 'Proceed to Checkout',
    fr: 'Passer à la caisse',
    rw: 'Ishyura'
  },
  total: {
    en: 'Total Amount',
    fr: 'Montant Total',
    rw: 'Igiteranyo'
  },
  soldOut: {
    en: 'Sold Out',
    fr: 'Épuisé',
    rw: 'Byashize'
  },
  emptyCart: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
    rw: 'Isakoshi irimo ubusa'
  }
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: (localStorage.getItem('theme') as Theme) || 'light',
    locale: (localStorage.getItem('locale') as Locale) || 'en'
  }),
  getters: {
    t: (state) => (key: keyof typeof translations) => {
      return translations[key]?.[state.locale] || key
    },
    isDark: (state) => state.theme === 'dark'
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.applyTheme()
    },
    setLocale(locale: Locale) {
      this.locale = locale
      localStorage.setItem('locale', locale)
    },
    applyTheme() {
      localStorage.setItem('theme', this.theme)
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
})
