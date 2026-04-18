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
  // Navigation & General
  about_us: { en: 'About Us', fr: 'À propos', rw: 'About Us' },
  contact_us: { en: 'Contact Us', fr: 'Contactez-nous', rw: 'Twandikire' },
  promotions: { en: 'Promotions', fr: 'Promotions', rw: 'Anuansyi' },
  shop_now: { en: 'Shop Now', fr: 'Acheter maintenant', rw: 'Gura ubu' },
  search_placeholder: { en: 'Search products...', fr: 'Rechercher des produits...', rw: 'Shaka ibicuruzwa...' },
  dark_mode: { en: 'Dark Mode', fr: 'Mode sombre', rw: 'Dark Mode' },
  
  // Hero Section
  hero_title: {
    en: "RWANDA'S PREMIER FRESH MARKET.",
    fr: "LE PREMIER MARCHÉ DE PRODUITS FRAIS DU RWANDA.",
    rw: "ISOKO RYA MBERE RY'IMBUTO N'IMBOGA MU RWANDA."
  },
  hero_desc: {
    en: "Experience the finest local produce and global essentials delivered with Rwandan warmth. We bring the harvest directly to your doorstep.",
    fr: "Découvrez les meilleurs produits locaux et les essentiels mondiaux livrés avec la chaleur rwandaise. Nous apportons la récolte directement à votre porte.",
    rw: "Mugire ibyiza by'umusaruro w'imbere mu gihugu n'ibikenerwa ku rwego mpuzamahanga bigezweho n'urugwiro rw'abanyarwanda. Tugeza umusaruro ku muryango wanyu."
  },
  
  // Product & Grid
  add_to_cart: { en: 'Add to Cart', fr: 'Ajouter au panier', rw: 'Ongeramo' },
  sold_out: { en: 'Sold Out', fr: 'Épuisé', rw: 'Byashize' },
  featured: { en: 'FEATURED', fr: 'SPÉCIAL', rw: 'BYATORANYIJWE' },
  spotlight: { en: 'SPOTLIGHT', fr: 'EN VEDETTE', rw: "IBY'IBANZE" },
  price: { en: 'Price', fr: 'Prix', rw: 'Igiciro' },
  
  // Cart & Checkout
  cart: { en: 'Your Cart', fr: 'Votre panier', rw: 'Isakoshi yawe' },
  checkout: { en: 'Proceed to Checkout', fr: 'Passer à la caisse', rw: 'Ishyura' },
  total: { en: 'Total Amount', fr: 'Montant Total', rw: 'Igiteranyo' },
  empty_cart: { en: 'Your cart is empty', fr: 'Votre panier est vide', rw: 'Isakoshi irimo ubusa' },
  continue_shopping: { en: 'Continue Shopping', fr: 'Continuer vos achats', rw: 'Komeza guhaha' },
  
  // MoMo & Auth
  select_provider: { en: 'Select Provider', fr: 'Choisir le fournisseur', rw: 'Hitamo uburyo' },
  payment_number: { en: 'Payment Number', fr: 'Numéro de paiement', rw: 'Nimero yishyura' },
  confirm_payment: { en: 'Confirm Payment', fr: 'Confirmer le paiement', rw: 'Emeza kwishyura' },
  success: { en: 'Success!', fr: 'Succès!', rw: 'Byakunze!' },
  order_confirmed: { en: 'Your order is confirmed', fr: 'Votre commande est confirmée', rw: 'Guhaha kwanyu kwemejwe' },
  account: { en: 'Account', fr: 'Compte', rw: 'Konti' },
  login: { en: 'Login', fr: 'Connexion', rw: 'Injira' },
  signup: { en: 'Sign Up', fr: 'S’inscrire', rw: 'Kwiyandikisha' }
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: (localStorage.getItem('theme') as Theme) || 'light',
    locale: (localStorage.getItem('locale') as Locale) || 'en'
  }),
  getters: {
    t: (state) => (key: string) => {
      const translation = translations[key]
      if (!translation) return key
      return translation[state.locale] || translation['en']
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
