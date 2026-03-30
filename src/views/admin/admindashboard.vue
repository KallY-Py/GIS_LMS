<template>
  <!-- 
    Admin Dashboard with Full Theme Support
    - Uses CSS variables for dynamic theming
    - All colors adapt to light/dark mode automatically
    - Maintains all original functionality with enhanced theme awareness
  -->
  <div 
    class="min-h-screen transition-colors duration-300"
    :class="dashboardBgClass"
  >
    <!-- Main Content -->
    <main class="ml-64 p-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <!-- Dynamic text colors based on theme -->
            <h1 
              class="text-3xl font-bold transition-colors duration-300"
              :class="headingClass"
            >
              Dashboard
            </h1>
            <p 
              class="mt-1 transition-colors duration-300"
              :class="subheadingClass"
            >
              Overview of your System Analytics
            </p>
          </div>
          <div class="text-right">
            <p 
              class="text-sm font-medium transition-colors duration-300"
              :class="dateTextClass"
            >
              {{ currentDate }}
            </p>
            <p 
              class="text-xs transition-colors duration-300"
              :class="timeTextClass"
            >
              {{ currentTime }}
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Course Card -->
        <div 
          class="rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
          :class="cardClass"
        >
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="text-sm transition-colors duration-300"
                :class="cardLabelClass"
              >
                TOTAL COURSE
              </p>
              <p 
                class="text-2xl font-bold transition-colors duration-300"
                :class="cardValueClass"
              >
                240
              </p>
              <p class="text-green-500 text-xs mt-1">↑ 12% vs last month</p>
            </div>
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              :class="iconBgClass('emerald')"
            >
              <svg 
                class="w-6 h-6 transition-colors duration-300"
                :class="iconColorClass('emerald')"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Total Student Card -->
        <div 
          class="rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
          :class="cardClass"
        >
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="text-sm transition-colors duration-300"
                :class="cardLabelClass"
              >
                TOTAL STUDENT
              </p>
              <p 
                class="text-2xl font-bold transition-colors duration-300"
                :class="cardValueClass"
              >
                1,841
              </p>
              <p class="text-green-500 text-xs mt-1">↑ 8.2% vs last month</p>
            </div>
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              :class="iconBgClass('blue')"
            >
              <svg 
                class="w-6 h-6 transition-colors duration-300"
                :class="iconColorClass('blue')"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Commissions Card -->
        <div 
          class="rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
          :class="cardClass"
        >
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="text-sm transition-colors duration-300"
                :class="cardLabelClass"
              >
                COMMISSIONS
              </p>
              <p 
                class="text-2xl font-bold transition-colors duration-300"
                :class="cardValueClass"
              >
                ₱1,841
              </p>
              <p class="text-green-500 text-xs mt-1">↑ 18.5% vs last month</p>
            </div>
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              :class="iconBgClass('purple')"
            >
              <svg 
                class="w-6 h-6 transition-colors duration-300"
                :class="iconColorClass('purple')"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Growth Rate Card -->
        <div 
          class="rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
          :class="cardClass"
        >
          <div class="flex items-center justify-between">
            <div>
              <p 
                class="text-sm transition-colors duration-300"
                :class="cardLabelClass"
              >
                GROWTH RATE
              </p>
              <p 
                class="text-2xl font-bold transition-colors duration-300"
                :class="cardValueClass"
              >
                32.8%
              </p>
              <p class="text-red-500 text-xs mt-1">↓ 2.1% vs last month</p>
            </div>
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              :class="iconBgClass('orange')"
            >
              <svg 
                class="w-6 h-6 transition-colors duration-300"
                :class="iconColorClass('orange')"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Earnings Growth Section with Chart -->
      <div 
        class="rounded-xl shadow-sm p-6 mb-8 transition-all duration-300"
        :class="cardClass"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 
            class="text-lg font-semibold transition-colors duration-300"
            :class="headingClass"
          >
            Earnings Growth
          </h2>
          <p 
            class="text-sm transition-colors duration-300"
            :class="subheadingClass"
          >
            Revenue and commission trends
          </p>
        </div>
        
        <!-- Chart -->
        <div class="mb-6">
          <div class="flex items-end space-x-4 h-64">
            <div v-for="(item, index) in chartData" :key="index" class="flex-1 flex flex-col items-center">
              <div 
                class="w-full rounded-t-lg relative transition-all duration-300"
                :class="chartBarBgClass"
                :style="{ height: item.height + 'px' }"
              >
                <div 
                  class="absolute bottom-0 w-full rounded-t-lg transition-all duration-300"
                  :class="chartFillClass"
                  :style="{ height: item.value + '%' }"
                ></div>
              </div>
              <span 
                class="text-xs mt-2 transition-colors duration-300"
                :class="chartLabelClass"
              >
                {{ item.month }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Last 7 months indicator -->
        <div 
          class="flex justify-between items-center pt-4 transition-colors duration-300"
          :class="borderClass"
        >
          <p 
            class="text-sm transition-colors duration-300"
            :class="subheadingClass"
          >
            Last 7 months
          </p>
          <div class="flex space-x-4">
            <span 
              class="text-xl font-bold transition-colors duration-300"
              :class="valueClass"
            >
              10000+
            </span>
            <span 
              class="text-xl font-bold transition-colors duration-300"
              :class="valueClass"
            >
              7500+
            </span>
            <span 
              class="text-xl font-bold transition-colors duration-300"
              :class="valueClass"
            >
              5000+
            </span>
            <span 
              class="text-xl font-bold transition-colors duration-300"
              :class="valueClass"
            >
              2500+
            </span>
          </div>
        </div>
      </div>
      
      <!-- Report Generator Section -->
      <div 
        class="rounded-xl shadow-sm p-6 transition-all duration-300"
        :class="cardClass"
      >
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 
              class="text-lg font-semibold transition-colors duration-300"
              :class="headingClass"
            >
              Report Generator
            </h2>
            <p 
              class="text-sm transition-colors duration-300"
              :class="subheadingClass"
            >
              Generate and download system reports
            </p>
          </div>
          <button 
            @click="generateReport" 
            class="px-4 py-2 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2"
            :class="buttonClass"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Generate Report</span>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Monthly Revenue Report Card -->
          <div 
            class="rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-md"
            :class="reportCardClass"
            @click="downloadReport('Monthly Revenue Report')"
          >
            <div class="flex justify-between items-start mb-3">
              <h3 
                class="font-semibold transition-colors duration-300"
                :class="headingClass"
              >
                Monthly Revenue Report
              </h3>
              <svg 
                class="w-5 h-5 transition-colors duration-300 hover:text-emerald-600 cursor-pointer"
                :class="downloadIconClass"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
            <p 
              class="text-sm transition-colors duration-300"
              :class="subheadingClass"
            >
              Mar 20, 2026
            </p>
          </div>
          
          <!-- Staff Performance Report Card -->
          <div 
            class="rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-md"
            :class="reportCardClass"
            @click="downloadReport('Staff Performance Q1')"
          >
            <div class="flex justify-between items-start mb-3">
              <h3 
                class="font-semibold transition-colors duration-300"
                :class="headingClass"
              >
                Staff Performance Q1
              </h3>
              <svg 
                class="w-5 h-5 transition-colors duration-300 hover:text-emerald-600 cursor-pointer"
                :class="downloadIconClass"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
            <p 
              class="text-sm transition-colors duration-300"
              :class="subheadingClass"
            >
              Mar 18, 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { inject, computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()
    
    // Inject theme from parent (App.vue)
    // This provides reactive theme state to the dashboard
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Reactive dark mode check - updates automatically when theme changes
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })
    
    // Date and time state
    const currentDate = ref('')
    const currentTime = ref('')
    let timeInterval = null
    
    // Chart data - can be made dynamic based on theme if needed
    const chartData = ref([
      { month: 'Jan', value: 45, height: 180 },
      { month: 'Feb', value: 62, height: 200 },
      { month: 'Mar', value: 78, height: 220 },
      { month: 'Apr', value: 55, height: 190 },
      { month: 'May', value: 85, height: 240 },
      { month: 'Jun', value: 92, height: 260 },
      { month: 'Jul', value: 88, height: 250 },
      { month: 'Aug', value: 75, height: 210 }
    ])
    
    // --- Theme-aware CSS Classes ---
    // These classes dynamically change based on isDark.value
    
    // Main dashboard background
    const dashboardBgClass = computed(() => ({
      'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
      'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
    }))
    
    // Card background and border
    const cardClass = computed(() => ({
      'bg-white shadow-sm': !isDark.value,
      'bg-gray-800 shadow-lg': isDark.value
    }))
    
    // Card label text
    const cardLabelClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Card value text
    const cardValueClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    // Main heading text
    const headingClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    // Subheading text
    const subheadingClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Date text
    const dateTextClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Time text
    const timeTextClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Value text (for numbers)
    const valueClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-gray-200': isDark.value
    }))
    
    // Border color
    const borderClass = computed(() => ({
      'border-gray-200': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    // Icon background color based on theme and color type
    const iconBgClass = (color) => {
      return computed(() => {
        if (!isDark.value) {
          // Light mode icon backgrounds
          switch(color) {
            case 'emerald': return 'bg-emerald-100'
            case 'blue': return 'bg-blue-100'
            case 'purple': return 'bg-purple-100'
            case 'orange': return 'bg-orange-100'
            default: return 'bg-gray-100'
          }
        } else {
          // Dark mode icon backgrounds
          switch(color) {
            case 'emerald': return 'bg-emerald-900/50'
            case 'blue': return 'bg-blue-900/50'
            case 'purple': return 'bg-purple-900/50'
            case 'orange': return 'bg-orange-900/50'
            default: return 'bg-gray-700'
          }
        }
      })
    }
    
    // Icon color based on theme and color type
    const iconColorClass = (color) => {
      return computed(() => {
        if (!isDark.value) {
          // Light mode icon colors
          switch(color) {
            case 'emerald': return 'text-emerald-600'
            case 'blue': return 'text-blue-600'
            case 'purple': return 'text-purple-600'
            case 'orange': return 'text-orange-600'
            default: return 'text-gray-600'
          }
        } else {
          // Dark mode icon colors
          switch(color) {
            case 'emerald': return 'text-emerald-400'
            case 'blue': return 'text-blue-400'
            case 'purple': return 'text-purple-400'
            case 'orange': return 'text-orange-400'
            default: return 'text-gray-400'
          }
        }
      })
    }
    
    // Chart bar background
    const chartBarBgClass = computed(() => ({
      'bg-emerald-100': !isDark.value,
      'bg-emerald-900/30': isDark.value
    }))
    
    // Chart fill color
    const chartFillClass = computed(() => ({
      'bg-emerald-500': !isDark.value,
      'bg-emerald-400': isDark.value
    }))
    
    // Chart label color
    const chartLabelClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Button gradient and colors
    const buttonClass = computed(() => ({
      'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700': !isDark.value,
      'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800': isDark.value
    }))
    
    // Report card background
    const reportCardClass = computed(() => ({
      'border border-gray-200 hover:shadow-md': !isDark.value,
      'border border-gray-700 hover:shadow-lg bg-gray-800/50': isDark.value
    }))
    
    // Download icon color
    const downloadIconClass = computed(() => ({
      'text-gray-400': !isDark.value,
      'text-gray-500': isDark.value
    }))
    
    // Update date and time
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
    
    // Generate report function
    const generateReport = () => {
      alert('Generate new report functionality will be implemented here')
    }
    
    // Download report function
    const downloadReport = (reportName) => {
      alert(`Downloading ${reportName}...`)
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
    
    // Clean up interval
    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })
    
    return {
      // Theme state
      isDark,
      
      // Data
      currentDate,
      currentTime,
      chartData,
      
      // Theme-aware classes
      dashboardBgClass,
      cardClass,
      cardLabelClass,
      cardValueClass,
      headingClass,
      subheadingClass,
      dateTextClass,
      timeTextClass,
      valueClass,
      borderClass,
      iconBgClass,
      iconColorClass,
      chartBarBgClass,
      chartFillClass,
      chartLabelClass,
      buttonClass,
      reportCardClass,
      downloadIconClass,
      
      // Methods
      generateReport,
      downloadReport
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar with theme support */
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
  background: #374151;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Chart bar animations */
.bg-emerald-500, .bg-emerald-400 {
  transition: height 0.3s ease;
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease, 
              box-shadow 0.3s ease;
}

/* Card hover effects */
.hover\:shadow-lg:hover {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

/* Button active state */
button:active {
  transform: scale(0.98);
}
</style>