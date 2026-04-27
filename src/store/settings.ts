import { defineStore } from 'pinia'
import { i18n } from '../main' // This might not work if i18n is not exported. I'll export it.

export type Theme = 'light' | 'dark'
export type Locale = 'en' | 'fr' | 'rw'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: (localStorage.getItem('theme') as Theme) || 'light',
    locale: (localStorage.getItem('locale') as Locale) || 'en'
  }),
  getters: {
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
      if (i18n.mode === 'legacy') {
        (i18n.global.locale as any) = locale
      } else {
        (i18n.global.locale as any).value = locale
      }
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
