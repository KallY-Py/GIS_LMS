<template>
  <div>
    <!-- 
      Notification Preferences Component with Full Dark Mode Support
      - Uses CSS variables and dynamic classes for theme switching
      - All colors adapt based on current theme (light/dark)
      - Maintains original layout and functionality
    -->
    <div 
      class="rounded-xl shadow-sm p-6 mb-8 transition-all duration-300"
      :class="cardClass"
    >
      <!-- Header Section -->
      <h2 
        class="text-xl font-semibold mb-2 transition-colors duration-300"
        :class="titleClass"
      >
        Notification Preferences
      </h2>
      <p 
        class="text-sm mb-6 transition-colors duration-300"
        :class="subtitleClass"
      >
        Choose what notifications you want to receive
      </p>

      <!-- Email Notifications -->
      <div class="mb-6 pb-6 border-b transition-colors duration-300" :class="borderClass">
        <h3 
          class="text-lg font-medium mb-4 transition-colors duration-300"
          :class="sectionTitleClass"
        >
          Email Notifications
        </h3>
        <div class="space-y-4">
          <!-- Course Updates Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="font-medium transition-colors duration-300"
                :class="labelClass"
              >
                Course Updates
              </p>
              <p 
                class="text-sm transition-colors duration-300"
                :class="descriptionClass"
              >
                Get notified about new lessons and materials
              </p>
            </div>
            <button 
              @click="toggleNotification('courseUpdates')"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300',
                notifications.courseUpdates ? toggleActiveClass : toggleInactiveClass
              ]"
            >
              <span 
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300',
                  notifications.courseUpdates ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <!-- Affiliate Updates Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="font-medium transition-colors duration-300"
                :class="labelClass"
              >
                Affiliate Updates
              </p>
              <p 
                class="text-sm transition-colors duration-300"
                :class="descriptionClass"
              >
                Commission earnings and referral activity
              </p>
            </div>
            <button 
              @click="toggleNotification('affiliateUpdates')"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300',
                notifications.affiliateUpdates ? toggleActiveClass : toggleInactiveClass
              ]"
            >
              <span 
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300',
                  notifications.affiliateUpdates ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <!-- Event Reminders Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="font-medium transition-colors duration-300"
                :class="labelClass"
              >
                Event Reminders
              </p>
              <p 
                class="text-sm transition-colors duration-300"
                :class="descriptionClass"
              >
                Upcoming events and workshops
              </p>
            </div>
            <button 
              @click="toggleNotification('eventReminders')"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300',
                notifications.eventReminders ? toggleActiveClass : toggleInactiveClass
              ]"
            >
              <span 
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300',
                  notifications.eventReminders ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Push Notifications -->
      <div class="mb-6 pb-6 border-b transition-colors duration-300" :class="borderClass">
        <h3 
          class="text-lg font-medium mb-4 transition-colors duration-300"
          :class="sectionTitleClass"
        >
          Push Notifications
        </h3>
        <div class="space-y-4">
          <!-- Browser Notifications Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="font-medium transition-colors duration-300"
                :class="labelClass"
              >
                Browser Notifications
              </p>
              <p 
                class="text-sm transition-colors duration-300"
                :class="descriptionClass"
              >
                Receive notifications in your browser
              </p>
            </div>
            <button 
              @click="toggleNotification('browser')"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300',
                notifications.browser ? toggleActiveClass : toggleInactiveClass
              ]"
            >
              <span 
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300',
                  notifications.browser ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Digest Settings -->
      <div>
        <h3 
          class="text-lg font-medium mb-4 transition-colors duration-300"
          :class="sectionTitleClass"
        >
          Email Digest
        </h3>
        <div class="space-y-4">
          <div>
            <label 
              class="block text-sm font-medium mb-2 transition-colors duration-300"
              :class="labelClass"
            >
              Digest Frequency
            </label>
            <select 
              v-model="digestFrequency" 
              class="w-full md:w-64 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
              :class="selectClass"
            >
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
              <option value="monthly">Monthly Digest</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-8 flex justify-end">
        <button 
          @click="savePreferences"
          class="px-6 py-2 font-medium rounded-lg transition-all duration-300 shadow-sm"
          :class="buttonClass"
        >
          Save Preferences
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'NotificationsTab',
  setup() {
    // Inject the theme functionality from App.vue
    // This provides access to the current theme state
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Destructure to get current theme and isDark function
    const { currentTheme, isDark: isDarkFn } = theme
    
    // Computed property that determines if dark mode is active
    // This will automatically update when theme changes
    const isDark = computed(() => {
      return currentTheme?.value === 'dark' || isDarkFn?.()
    })
    
    // --- Theme-aware CSS Classes ---
    // These classes dynamically change based on the current theme
    
    // Main card container styling
    const cardClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-800': isDark.value,
      'shadow-sm': !isDark.value,
      'shadow-lg': isDark.value
    }))
    
    // Title text styling (main header)
    const titleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    // Subtitle/hint text styling
    const subtitleClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Section title styling (Email Notifications, Push Notifications, etc.)
    const sectionTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-gray-200': isDark.value
    }))
    
    // Label styling (form labels and toggle labels)
    const labelClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Description text styling (helper text under labels)
    const descriptionClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Border styling for dividers
    const borderClass = computed(() => ({
      'border-gray-200': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    // Toggle button active state (when notification is ON)
    const toggleActiveClass = computed(() => ({
      'bg-emerald-600': !isDark.value,
      'bg-emerald-500': isDark.value  // Slightly brighter for dark mode
    }))
    
    // Toggle button inactive state (when notification is OFF)
    const toggleInactiveClass = computed(() => ({
      'bg-gray-300': !isDark.value,
      'bg-gray-600': isDark.value
    }))
    
    // Select dropdown styling (digest frequency selector)
    const selectClass = computed(() => ({
      // Light mode styles
      'bg-white border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900': !isDark.value,
      // Dark mode styles
      'bg-gray-700 border-gray-600 focus:ring-emerald-400 focus:border-emerald-400 text-white': isDark.value
    }))
    
    // Save button styling
    const buttonClass = computed(() => ({
      // Light mode styles
      'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white': !isDark.value,
      // Dark mode styles (slightly brighter for better visibility)
      'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white': isDark.value
    }))
    
    return {
      // Theme state
      isDark,
      
      // Theme-aware classes
      cardClass,
      titleClass,
      subtitleClass,
      sectionTitleClass,
      labelClass,
      descriptionClass,
      borderClass,
      toggleActiveClass,
      toggleInactiveClass,
      selectClass,
      buttonClass
    }
  }
}
</script>

<script setup>
import { ref } from 'vue'

// Notification state
const notifications = ref({
  courseUpdates: true,
  affiliateUpdates: true,
  eventReminders: true,
  browser: false
})

const digestFrequency = ref('weekly')

// Toggle notification setting
const toggleNotification = (key) => {
  notifications.value[key] = !notifications.value[key]
}

// Save preferences to localStorage
const savePreferences = () => {
  // Save to localStorage
  localStorage.setItem('notification_preferences', JSON.stringify({
    notifications: notifications.value,
    digestFrequency: digestFrequency.value
  }))
  
  // Show success message (you can replace this with a toast notification)
  alert('Notification preferences saved!')
}

// Load saved preferences on mount
const loadPreferences = () => {
  const saved = localStorage.getItem('notification_preferences')
  if (saved) {
    const data = JSON.parse(saved)
    notifications.value = data.notifications
    digestFrequency.value = data.digestFrequency
  }
}

// Load on mount
loadPreferences()
</script>

<style scoped>
/* Smooth transitions for all theme changes */
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

/* Hover effects for interactive elements */
button {
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.98);
}

/* Custom focus styles for accessibility */
button:focus-visible,
select:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Select dropdown custom styling for dark mode */
.dark select option {
  background-color: #1f2937;
  color: white;
}

/* Custom toggle switch animation */
.relative.inline-flex {
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.relative.inline-flex:active span {
  transform: scale(1.05);
}

/* Smooth card hover effect (optional) */
.rounded-xl {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rounded-xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Dark mode hover adjustment */
.dark .rounded-xl:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Ensure proper spacing and alignment */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}

.space-y-3 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 0.75rem;
}

/* Improve readability for disabled states */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>