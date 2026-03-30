<template>
  <div>
    <div 
      class="rounded-xl shadow-sm p-6 mb-8 transition-all duration-300"
      :class="cardClass"
    >
      <h2 
        class="text-xl font-semibold mb-2 transition-colors duration-300"
        :class="titleClass"
      >
        Account Settings
      </h2>
      <p 
        class="text-sm mb-6 transition-colors duration-300"
        :class="subtitleClass"
      >
        Manage your account preferences
      </p>

      <div class="mb-6 pb-6 border-b transition-colors duration-300" :class="borderClass">
        <label 
          class="block text-sm font-medium mb-2 transition-colors duration-300"
          :class="labelClass"
        >
          Account Type
        </label>
        <div class="flex items-center gap-4">
          <span 
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300"
            :class="badgeClass"
          >
            Administrator
          </span>
          <span 
            class="text-sm transition-colors duration-300"
            :class="hintClass"
          >
            Full access to all features
          </span>
        </div>
      </div>

      <div class="mb-6 pb-6 border-b transition-colors duration-300" :class="borderClass">
        <label 
          class="block text-sm font-medium mb-2 transition-colors duration-300"
          :class="labelClass"
        >
          Account Status
        </label>
        <div class="flex items-center gap-3">
          <div 
            class="w-2 h-2 rounded-full transition-colors duration-300"
            :class="statusDotClass"
          ></div>
          <span 
            class="transition-colors duration-300"
            :class="textPrimaryClass"
          >
            Active
          </span>
          <button 
            class="ml-4 text-sm transition-colors duration-300"
            :class="deactivateButtonClass"
          >
            Deactivate Account
          </button>
        </div>
      </div>

      <div class="mb-6 pb-6 border-b transition-colors duration-300" :class="borderClass">
        <label 
          class="block text-sm font-medium mb-3 transition-colors duration-300"
          :class="labelClass"
        >
          Connected Accounts
        </label>
        <div class="space-y-3">
          <div 
            class="flex items-center justify-between p-3 rounded-lg transition-all duration-300"
            :class="connectedAccountClass"
          >
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 transition-colors duration-300" :class="googleIconClass" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              <span 
                class="transition-colors duration-300"
                :class="textPrimaryClass"
              >
                Facebook
              </span>
            </div>
            <button 
              class="text-sm transition-colors duration-300"
              :class="connectButtonClass"
            >
              Connect
            </button>
          </div>
          
          <div 
            class="flex items-center justify-between p-3 rounded-lg transition-all duration-300"
            :class="connectedAccountClass"
          >
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 transition-colors duration-300" :class="twitterIconClass" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.74-12.137c0-.213-.005-.425-.015-.636A9.936 9.936 0 0024 4.59z"/>
              </svg>
              <span 
                class="transition-colors duration-300"
                :class="textPrimaryClass"
              >
                Twitter
              </span>
            </div>
            <button 
              class="text-sm transition-colors duration-300"
              :class="connectButtonClass"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
      <div>
        <label 
          class="block text-sm font-medium mb-3 transition-colors duration-300"
          :class="labelClass"
        >
          Active Sessions
        </label>
        <div class="space-y-3">
          <div 
            class="flex items-center justify-between p-3 rounded-lg transition-all duration-300"
            :class="sessionItemClass"
          >
            <div>
              <p 
                class="text-sm font-medium transition-colors duration-300"
                :class="textPrimaryClass"
              >
                Chrome on Windows
              </p>
              <p 
                class="text-xs transition-colors duration-300"
                :class="hintClass"
              >
                Last active: 2 minutes ago
              </p>
            </div>
            <span 
              class="text-xs transition-colors duration-300"
              :class="currentSessionClass"
            >
              Current session
            </span>
          </div>
          <div 
            class="flex items-center justify-between p-3 rounded-lg transition-all duration-300"
            :class="sessionItemClass"
          >
            <div>
              <p 
                class="text-sm font-medium transition-colors duration-300"
                :class="textPrimaryClass"
              >
                Safari on Mac
              </p>
              <p 
                class="text-xs transition-colors duration-300"
                :class="hintClass"
              >
                Last active: 2 days ago
              </p>
            </div>
            <button 
              class="text-sm transition-colors duration-300"
              :class="signOutButtonClass"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'AccountTab',
  setup() {
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    const { currentTheme, isDark: isDarkFn } = theme
    
    const isDark = computed(() => {
      return currentTheme?.value === 'dark' || isDarkFn?.()
    })
    
    const cardClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-800': isDark.value,
      'shadow-sm': !isDark.value,
      'shadow-lg': isDark.value
    }))
    
    const titleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    const subtitleClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    const hintClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    const textPrimaryClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    const labelClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    const borderClass = computed(() => ({
      'border-gray-200': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    const badgeClass = computed(() => ({
      'bg-emerald-100 text-emerald-700': !isDark.value,
      'bg-emerald-900 text-emerald-300': isDark.value
    }))
    
    const statusDotClass = computed(() => ({
      'bg-green-500': !isDark.value,
      'bg-green-400': isDark.value
    }))
    
    const deactivateButtonClass = computed(() => ({
      'text-red-600 hover:text-red-700': !isDark.value,
      'text-red-400 hover:text-red-300': isDark.value
    }))
    
    const connectedAccountClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    const sessionItemClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    const connectButtonClass = computed(() => ({
      'text-gray-500 hover:text-gray-700': !isDark.value,
      'text-gray-400 hover:text-gray-300': isDark.value
    }))
    
    const signOutButtonClass = computed(() => ({
      'text-red-600 hover:text-red-700': !isDark.value,
      'text-red-400 hover:text-red-300': isDark.value
    }))
    
    const currentSessionClass = computed(() => ({
      'text-green-600': !isDark.value,
      'text-green-400': isDark.value
    }))
    
    const googleIconClass = computed(() => ({
      'text-blue-600': !isDark.value,
      'text-blue-400': isDark.value
    }))
    
    const twitterIconClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    return {
      isDark,
      
      cardClass,
      titleClass,
      subtitleClass,
      hintClass,
      textPrimaryClass,
      labelClass,
      borderClass,
      badgeClass,
      statusDotClass,
      deactivateButtonClass,
      connectedAccountClass,
      sessionItemClass,
      connectButtonClass,
      signOutButtonClass,
      currentSessionClass,
      googleIconClass,
      twitterIconClass
    }
  }
}
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

button {
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.98);
}

button:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.rounded-xl {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rounded-xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.dark .rounded-xl:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}
</style>