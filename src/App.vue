<template>
  <div id="app" :class="themeClass">
    <router-view />
    
    <ThemeToggle />
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'
import { useTheme } from './composables/useTheme'
import ThemeToggle from './components/ThemeToggle.vue'

const { currentTheme, toggleTheme, setTheme, isDark } = useTheme()

provide('theme', {
  currentTheme,
  toggleTheme,
  setTheme,
  isDark
})

const themeClass = computed(() => ({
  'light-theme': currentTheme.value === 'light',
  'dark-theme': currentTheme.value === 'dark'
}))
</script>

<style>
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

#app {
  min-height: 100vh;
}
</style>