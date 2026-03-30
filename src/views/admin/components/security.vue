<template>
  <!-- 
    Security Settings Component with Full Theme Support
    - Automatically responds to theme changes from MainNav
    - Uses CSS variables and dynamic classes for theming
    - All UI elements adapt to light/dark mode seamlessly
  -->
  <div>
    <!-- Main container with theme-aware background and text -->
    <div 
      class="rounded-xl shadow-sm p-6 mb-8 transition-colors duration-300"
      :class="mainCardClass"
    >
      <!-- Header section with theme-aware text colors -->
      <h2 class="text-xl font-semibold mb-2 transition-colors duration-300" :class="headingClass">
        Security Settings
      </h2>
      <p class="text-sm mb-6 transition-colors duration-300" :class="subheadingClass">
        Manage your password and security preferences
      </p>

      <!-- Change Password Section -->
      <div class="mb-8 pb-6 transition-colors duration-300" :class="borderClass">
        <h3 class="text-lg font-medium mb-4 transition-colors duration-300" :class="sectionTitleClass">
          Change Password
        </h3>
        <form @submit.prevent="changePassword" class="space-y-4">
          <!-- Current Password Field -->
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
              Current Password
            </label>
            <input 
              type="password" 
              v-model="passwordForm.currentPassword"
              class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-300"
              :class="inputClass"
              placeholder="Enter current password"
            />
          </div>
          
          <!-- New Password Field -->
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
              New Password
            </label>
            <input 
              type="password" 
              v-model="passwordForm.newPassword"
              class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-300"
              :class="inputClass"
              placeholder="Enter new password"
            />
            <!-- Password strength indicator with theme support -->
            <div class="mt-2">
              <div class="flex gap-2 text-xs">
                <span :class="passwordStrength >= 1 ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'">
                  ✓ 8+ characters
                </span>
                <span :class="passwordStrength >= 2 ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'">
                  ✓ 1 uppercase
                </span>
                <span :class="passwordStrength >= 3 ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'">
                  ✓ 1 number
                </span>
              </div>
            </div>
          </div>
          
          <!-- Confirm New Password Field -->
          <div>
            <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
              Confirm New Password
            </label>
            <input 
              type="password" 
              v-model="passwordForm.confirmPassword"
              class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-300"
              :class="inputClass"
              placeholder="Confirm new password"
            />
          </div>
          
          <!-- Update Password Button -->
          <div class="flex justify-end">
            <button 
              type="submit"
              class="px-6 py-2 rounded-lg transition-all duration-300"
              :class="buttonClass"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      <!-- Two-Factor Authentication Section -->
      <div class="mb-8 pb-6 transition-colors duration-300" :class="borderClass">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-medium transition-colors duration-300" :class="sectionTitleClass">
              Two-Factor Authentication
            </h3>
            <p class="text-sm transition-colors duration-300" :class="subheadingClass">
              Add an extra layer of security to your account
            </p>
          </div>
          <!-- Toggle Switch with theme support -->
          <button 
            @click="toggle2FA"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300',
              twoFAEnabled ? 'bg-emerald-600' : (isDark ? 'bg-gray-600' : 'bg-gray-300')
            ]"
          >
            <span 
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300',
                twoFAEnabled ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>
        <!-- 2FA Info Alert with theme support -->
        <div v-if="twoFAEnabled" class="rounded-lg p-4 transition-colors duration-300" :class="infoAlertClass">
          <p class="text-sm transition-colors duration-300" :class="infoAlertTextClass">
            Two-factor authentication is enabled. Your account is more secure.
          </p>
        </div>
      </div>

      <!-- Login History Section -->
      <div>
        <h3 class="text-lg font-medium mb-4 transition-colors duration-300" :class="sectionTitleClass">
          Recent Login Activity
        </h3>
        <div class="space-y-3">
          <!-- Login history items with theme support -->
          <div 
            v-for="login in loginHistory" 
            :key="login.id" 
            class="flex items-center justify-between p-3 rounded-lg transition-colors duration-300"
            :class="historyItemClass"
          >
            <div>
              <p class="text-sm font-medium transition-colors duration-300" :class="historyDeviceClass">
                {{ login.device }}
              </p>
              <p class="text-xs transition-colors duration-300" :class="historyDetailsClass">
                {{ login.location }} • {{ login.ip }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs transition-colors duration-300" :class="historyDateClass">
                {{ login.date }}
              </p>
              <p class="text-xs transition-colors duration-300" :class="historyDetailsClass">
                {{ login.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import necessary Vue functions
import { ref, inject, computed } from 'vue'

export default {
  name: 'SecurityTab',
  setup() {
    // --- Theme Injection ---
    // Inject the theme object from App.vue to access theme state
    // This makes the component reactive to theme changes globally
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      toggleTheme: () => {},
      isDark: () => false
    })
    
    // Destructure theme properties for easier access
    const { currentTheme, isDark: isDarkFn } = theme
    
    // Computed property for checking if dark mode is active
    // This will automatically update when the theme changes (e.g., when user clicks toggle button in MainNav)
    const isDark = computed(() => {
      return currentTheme?.value === 'dark' || isDarkFn?.()
    })
    
    // --- Component State ---
    // State for two-factor authentication toggle
    const twoFAEnabled = ref(false)
    
    // State for password change form
    const passwordForm = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    
    // Mock login history data (this would come from your backend in production)
    const loginHistory = ref([
      { id: 1, device: 'Chrome on Windows', location: 'Manila, Philippines', ip: '192.168.1.1', date: 'Today', time: '08:32 AM' },
      { id: 2, device: 'Safari on iPhone', location: 'Manila, Philippines', ip: '192.168.1.2', date: 'Yesterday', time: '19:15 PM' },
      { id: 3, device: 'Firefox on Mac', location: 'Cebu, Philippines', ip: '192.168.1.3', date: 'Mar 25, 2026', time: '10:45 AM' }
    ])
    
    // --- Computed Properties ---
    // Calculate password strength based on complexity rules
    const passwordStrength = computed(() => {
      let strength = 0
      if (passwordForm.value.newPassword.length >= 8) strength++
      if (/[A-Z]/.test(passwordForm.value.newPassword)) strength++
      if (/[0-9]/.test(passwordForm.value.newPassword)) strength++
      return strength
    })
    
    // --- Theme-aware CSS Classes ---
    // These classes change dynamically based on the current theme (light/dark)
    // All classes use transition-colors for smooth theme switching
    
    // Main card background class
    const mainCardClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-800': isDark.value
    }))
    
    // Main heading text color
    const headingClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    // Subheading and secondary text color
    const subheadingClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Section title color
    const sectionTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-gray-200': isDark.value
    }))
    
    // Label text color
    const labelClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Input field styling
    const inputClass = computed(() => ({
      'border border-gray-300 bg-white text-gray-900 focus:ring-emerald-500': !isDark.value,
      'border border-gray-600 bg-gray-700 text-white focus:ring-emerald-400 placeholder-gray-400': isDark.value
    }))
    
    // Button styling
    const buttonClass = computed(() => ({
      'bg-emerald-600 text-white hover:bg-emerald-700': !isDark.value,
      'bg-emerald-500 text-white hover:bg-emerald-600': isDark.value
    }))
    
    // Border color for sections
    const borderClass = computed(() => ({
      'border-gray-200': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    // Info alert background (for 2FA)
    const infoAlertClass = computed(() => ({
      'bg-blue-50': !isDark.value,
      'bg-blue-900/30': isDark.value
    }))
    
    // Info alert text color
    const infoAlertTextClass = computed(() => ({
      'text-blue-800': !isDark.value,
      'text-blue-300': isDark.value
    }))
    
    // Login history item background
    const historyItemClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    // Device name text color
    const historyDeviceClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-gray-200': isDark.value
    }))
    
    // Details text color (location, IP, time)
    const historyDetailsClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Date text color
    const historyDateClass = computed(() => ({
      'text-gray-600': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // --- Methods ---
    // Handle password change submission
    const changePassword = () => {
      // Validate that new password and confirm password match
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        alert('New passwords do not match!')
        return
      }
      // Validate password strength
      if (passwordStrength.value < 3) {
        alert('Please use a stronger password! It needs at least 8 characters, 1 uppercase letter, and 1 number.')
        return
      }
      // In a real application, you would make an API call here
      alert('Password updated successfully!')
      // Clear the form
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
    
    // Handle two-factor authentication toggle
    const toggle2FA = () => {
      twoFAEnabled.value = !twoFAEnabled.value
      const status = twoFAEnabled.value ? 'enabled' : 'disabled'
      // In a real application, you would make an API call here
      alert(`Two-factor authentication ${status}!`)
    }
    
    return {
      // Theme
      isDark,
      
      // State
      twoFAEnabled,
      passwordForm,
      loginHistory,
      passwordStrength,
      
      // Theme-aware classes
      mainCardClass,
      headingClass,
      subheadingClass,
      sectionTitleClass,
      labelClass,
      inputClass,
      buttonClass,
      borderClass,
      infoAlertClass,
      infoAlertTextClass,
      historyItemClass,
      historyDeviceClass,
      historyDetailsClass,
      historyDateClass,
      
      // Methods
      changePassword,
      toggle2FA
    }
  }
}
</script>

<style scoped>
/* Additional styles for smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom focus styles for better accessibility */
input:focus {
  outline: none;
  ring: 2px solid;
}

/* Smooth hover effects */
button {
  transition: all 0.3s ease;
}

/* Animation for password strength indicators */
.text-green-600, .text-gray-400 {
  transition: color 0.2s ease;
}
</style>