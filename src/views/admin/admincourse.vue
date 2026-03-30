<template>
  <!-- 
    Admin Course Management Page with Full Theme Support
    - Uses CSS variables for dynamic theming
    - All colors adapt to light/dark mode automatically
    - Maintains original layout with theme-aware styling
  -->
  <div class="min-h-screen transition-colors duration-300" :class="mainBgClass">
    <!-- Main Content -->
    <main class="ml-64 p-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <!-- Dynamic header text colors based on theme -->
            <h1 class="text-3xl font-bold transition-colors duration-300" :class="headerTextClass">
              Course Management
            </h1>
            <p class="mt-1 transition-colors duration-300" :class="subheaderTextClass">
              Upload lessons, materials and manage exams
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium transition-colors duration-300" :class="dateTextClass">
              {{ currentDate }}
            </p>
            <p class="text-xs transition-colors duration-300" :class="timeTextClass">
              {{ currentTime }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Stats Cards - Theme-aware cards that adapt to light/dark mode -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Lessons Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="statLabelClass">Total Lessons</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="statValueClass">24</p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="statsIconBgClass('emerald')">
              <svg class="w-6 h-6 transition-colors duration-300" :class="statsIconClass('emerald')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Materials Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="statLabelClass">Materials</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="statValueClass">18</p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="statsIconBgClass('blue')">
              <svg class="w-6 h-6 transition-colors duration-300" :class="statsIconClass('blue')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Exams Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="statLabelClass">Exams</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="statValueClass">6</p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="statsIconBgClass('purple')">
              <svg class="w-6 h-6 transition-colors duration-300" :class="statsIconClass('purple')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Enrolled Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="statLabelClass">Enrolled</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="statValueClass">156</p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="statsIconBgClass('orange')">
              <svg class="w-6 h-6 transition-colors duration-300" :class="statsIconClass('orange')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tabs Navigation - Theme-aware tabs -->
      <div class="mb-8 border-b transition-colors duration-300" :class="borderClass">
        <div class="flex space-x-8">
          <button 
            @click="activeTab = 'lessons'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              activeTab === 'lessons' 
                ? getActiveTabClass() 
                : getInactiveTabClass()
            ]"
          >
            Lessons
          </button>
          <button 
            @click="activeTab = 'materials'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              activeTab === 'materials' 
                ? getActiveTabClass() 
                : getInactiveTabClass()
            ]"
          >
            Materials
          </button>
          <button 
            @click="activeTab = 'exams'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              activeTab === 'exams' 
                ? getActiveTabClass() 
                : getInactiveTabClass()
            ]"
          >
            Exams
          </button>
        </div>
      </div>
      
      <!-- Dynamic Component for Tab Content -->
      <!-- These child components will also automatically inherit the theme -->
      <component :is="currentTabComponent" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminCourse'
}
</script>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

// Import child components
import LessonsTab from './components/lessonstab.vue'
import MaterialsTab from './components/materials.vue'
import ExamsTab from './components/exams.vue'

const router = useRouter()

// Inject the theme functionality from App.vue
// This gives this component access to the current theme state
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  isDark: () => false
})

// Computed property to check if dark mode is active
// Makes the component reactive to theme changes
const isDark = computed(() => {
  return theme.currentTheme?.value === 'dark' || theme.isDark?.()
})

// Active tab state
const activeTab = ref('lessons')

// Date and time states
const currentDate = ref('')
const currentTime = ref('')
let timeInterval = null

// Computed property to return the correct component based on active tab
const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'lessons':
      return LessonsTab
    case 'materials':
      return MaterialsTab
    case 'exams':
      return ExamsTab
    default:
      return LessonsTab
  }
})

// --- Theme-aware CSS Classes ---
// These classes dynamically change based on the current theme

// Main background gradient classes
const mainBgClass = computed(() => ({
  // Light mode: Light gray gradient
  'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
  // Dark mode: Dark gradient with green undertones to match sidebar
  'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
}))

// Header text color classes
const headerTextClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Subheader text color classes
const subheaderTextClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Date text color classes
const dateTextClass = computed(() => ({
  'text-gray-700': !isDark.value,
  'text-gray-300': isDark.value
}))

// Time text color classes
const timeTextClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Card background classes
const cardClass = computed(() => ({
  // Light mode: White card with gray shadow
  'bg-white': !isDark.value,
  // Dark mode: Dark card with subtle border
  'bg-gray-800 border border-gray-700': isDark.value
}))

// Stat label text color classes
const statLabelClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Stat value text color classes
const statValueClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Border color classes for tabs container
const borderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

// Function to get stat icon background color based on theme
const statsIconBgClass = (color) => {
  return computed(() => {
    if (!isDark.value) {
      // Light mode colors
      const colors = {
        emerald: 'bg-emerald-100',
        blue: 'bg-blue-100',
        purple: 'bg-purple-100',
        orange: 'bg-orange-100'
      }
      return colors[color] || 'bg-gray-100'
    } else {
      // Dark mode colors - darker backgrounds with opacity
      const colors = {
        emerald: 'bg-emerald-900/30',
        blue: 'bg-blue-900/30',
        purple: 'bg-purple-900/30',
        orange: 'bg-orange-900/30'
      }
      return colors[color] || 'bg-gray-700'
    }
  }).value
}

// Function to get stat icon color based on theme
const statsIconClass = (color) => {
  return computed(() => {
    if (!isDark.value) {
      // Light mode colors
      const colors = {
        emerald: 'text-emerald-600',
        blue: 'text-blue-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600'
      }
      return colors[color] || 'text-gray-600'
    } else {
      // Dark mode colors - brighter but not too bright
      const colors = {
        emerald: 'text-emerald-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        orange: 'text-orange-400'
      }
      return colors[color] || 'text-gray-400'
    }
  }).value
}

// Function to get active tab classes
const getActiveTabClass = () => {
  return computed(() => ({
    // Light mode: Emerald green
    'text-emerald-600 border-b-2 border-emerald-600': !isDark.value,
    // Dark mode: Brighter emerald for better visibility
    'text-emerald-400 border-b-2 border-emerald-400': isDark.value
  })).value
}

// Function to get inactive tab classes
const getInactiveTabClass = () => {
  return computed(() => ({
    // Light mode: Gray with hover effect
    'text-gray-500 hover:text-gray-700': !isDark.value,
    // Dark mode: Light gray with hover effect
    'text-gray-400 hover:text-gray-200': isDark.value
  })).value
}

// Update date and time function
const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

// Check authentication on mount
onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user || JSON.parse(user).role !== 'admin') {
    router.push('/')
  }
  updateDateTime()
  timeInterval = setInterval(updateDateTime, 1000)
})

// Clean up interval on unmount
onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
/* Custom scrollbar with theme awareness */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Light mode scrollbar */
:root:not(.dark) ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

:root:not(.dark) ::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

:root:not(.dark) ::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}

/* Smooth transitions for all interactive elements */
button, 
.card,
.stats-card {
  transition: all 0.3s ease;
}

/* Optional: Add a subtle animation when theme changes */
@keyframes themeTransition {
  0% {
    opacity: 0.95;
  }
  100% {
    opacity: 1;
  }
}

/* Apply animation when theme changes */
.theme-transition {
  animation: themeTransition 0.3s ease;
}
</style>