import { ref } from 'vue'
import { defineStore } from 'pinia'

const THEME_STORAGE_KEY = 'lm-theme'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(localStorage.getItem(THEME_STORAGE_KEY) === 'dark')

    function applyTheme() {
        document.documentElement.classList.toggle('dark', isDark.value)
    }

    function setDark(value) {
        isDark.value = value
        localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light')
        applyTheme()
    }

    function toggleTheme() {
        setDark(!isDark.value)
    }

    function initTheme() {
        applyTheme()
    }

    return { isDark, toggleTheme, initTheme }
})
