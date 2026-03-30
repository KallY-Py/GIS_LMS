<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span v-if="isDark" class="icon">🌙</span>
    <span v-else class="icon">☀️</span>
  </button>
</template>

<script setup>
import { inject } from 'vue'

const { toggleTheme, isDark } = inject('theme')
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

:root:not(.dark) .theme-toggle {
  background-color: #fff;
  color: #333333;
  border: 1px solid #e0e0e0;
}

.dark .theme-toggle {
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
}

.theme-toggle:hover {
  transform: scale(1.1);
}
</style>