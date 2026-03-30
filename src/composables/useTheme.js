import { ref, watch } from 'vue'

const THEME_KEY = 'app-theme'

export function useTheme() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme) {
      return savedTheme
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const currentTheme = ref(getInitialTheme())

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(THEME_KEY, theme)
  }

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (theme) => {
    if (theme === 'light' || theme === 'dark') {
      currentTheme.value = theme
    }
  }

  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        currentTheme.value = e.matches ? 'dark' : 'light'
      }
    })
  }

  return {
    currentTheme,
    toggleTheme,
    setTheme,
    isDark: () => currentTheme.value === 'dark'
  }
}