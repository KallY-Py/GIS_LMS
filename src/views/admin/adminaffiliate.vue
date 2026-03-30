<template>
  <!-- 
    Affiliate Management Page with Theme Support
    - Fully responsive to light/dark mode changes
    - Uses CSS variables and dynamic classes for theming
    - Maintains all original functionality with theme-aware styling
  -->
  <div class="min-h-screen transition-colors duration-300" :class="mainBgClass">
    <!-- Main Content -->
    <main class="ml-64 p-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold transition-colors duration-300" :class="titleClass">Affiliate Management</h1>
            <p class="mt-1 transition-colors duration-300" :class="subtitleClass">Manage referral codes and track affiliates</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium transition-colors duration-300" :class="dateTextClass">{{ currentDate }}</p>
            <p class="text-xs transition-colors duration-300" :class="timeTextClass">{{ currentTime }}</p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Referrals Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="cardLabelClass">Total Referrals</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="cardValueClass">{{ formatNumber(stats.totalReferrals) }}</p>
              <div class="flex items-center mt-1">
                <span class="text-green-500 text-xs font-medium">+{{ stats.totalReferralsGrowth }}%</span>
                <span class="text-xs ml-1 transition-colors duration-300" :class="cardMetaClass">from last month</span>
              </div>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="iconBgClass('emerald')">
              <svg class="w-6 h-6" :class="iconColorClass('emerald')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Active Referrals Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="cardLabelClass">Active Referrals</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="cardValueClass">{{ formatNumber(stats.activeReferrals) }}</p>
              <div class="flex items-center mt-1">
                <span class="text-green-500 text-xs font-medium">+{{ stats.activeReferralsGrowth }}%</span>
                <span class="text-xs ml-1 transition-colors duration-300" :class="cardMetaClass">from last month</span>
              </div>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="iconBgClass('blue')">
              <svg class="w-6 h-6" :class="iconColorClass('blue')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Commission Card -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm transition-colors duration-300" :class="cardLabelClass">Total Commission</p>
              <p class="text-2xl font-bold transition-colors duration-300" :class="cardValueClass">{{ formatCurrency(stats.totalCommission) }}</p>
              <div class="flex items-center mt-1">
                <span class="text-green-500 text-xs font-medium">+{{ stats.totalCommissionGrowth }}%</span>
                <span class="text-xs ml-1 transition-colors duration-300" :class="cardMetaClass">from last month</span>
              </div>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="iconBgClass('purple')">
              <svg class="w-6 h-6" :class="iconColorClass('purple')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Referral Code Section -->
      <div class="rounded-xl shadow-sm p-6 mb-8 hover:shadow-lg transition-all duration-300" :class="cardClass">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-lg font-semibold mb-1 transition-colors duration-300" :class="sectionTitleClass">Your Referral Code</h2>
            <p class="text-sm transition-colors duration-300" :class="subtitleClass">Share this code to earn commissions</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-lg px-4 py-2 transition-colors duration-300" :class="codeBgClass">
              <code class="text-lg font-mono font-bold transition-colors duration-300" :class="codeTextClass">{{ referralCode }}</code>
            </div>
            <button 
              @click="copyReferralCode"
              class="px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
              :class="buttonClass('emerald')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy Code
            </button>
          </div>
        </div>
        <div v-if="copySuccess" class="mt-3 text-sm text-green-600">
          ✓ Referral code copied to clipboard!
        </div>
      </div>

      <!-- Staff Affiliates and Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Staff Affiliates Table -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <h2 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="sectionTitleClass">Staff Affiliates</h2>
          <p class="text-sm mb-4 transition-colors duration-300" :class="subtitleClass">Performance analytics per user</p>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b transition-colors duration-300" :class="borderClass">
                  <th class="text-left py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">User</th>
                  <th class="text-left py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">Earnings</th>
                  <th class="text-left py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">Conversion</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="affiliate in affiliates" 
                  :key="affiliate.id"
                  class="border-b transition-all duration-300 hover:bg-opacity-50"
                  :class="[borderClass, tableRowHoverClass]"
                >
                  <td class="py-3 px-2">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm" :class="avatarClass(affiliate.name)">
                        {{ getInitials(affiliate.name) }}
                      </div>
                      <span class="font-medium transition-colors duration-300" :class="tableTextClass">{{ affiliate.name }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-2">
                    <span class="transition-colors duration-300" :class="tableTextClass">{{ formatCurrency(affiliate.earnings) }}</span>
                  </td>
                  <td class="py-3 px-2">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 rounded-full overflow-hidden transition-colors duration-300" :class="progressBarBgClass">
                        <div 
                          class="h-full rounded-full transition-all duration-500"
                          :class="progressBarFillClass"
                          :style="{ width: affiliate.conversionRate + '%' }"
                        ></div>
                      </div>
                      <span class="text-sm font-medium transition-colors duration-300" :class="tableMetaClass">{{ affiliate.conversionRate }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Commission Chart -->
        <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
          <h2 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="sectionTitleClass">Commission Trends</h2>
          <p class="text-sm mb-6 transition-colors duration-300" :class="subtitleClass">Monthly commission earnings</p>
          
          <!-- Bar Chart -->
          <div class="relative h-64">
            <div class="flex items-end justify-between h-full gap-2">
              <div 
                v-for="(data, index) in chartData" 
                :key="index"
                class="flex-1 flex flex-col items-center gap-2"
              >
                <div class="relative w-full group">
                  <div 
                    class="rounded-t-lg transition-all duration-500 cursor-pointer"
                    :class="chartBarClass"
                    :style="{ height: (data.value / maxChartValue) * 200 + 'px' }"
                  >
                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10" :class="tooltipClass">
                      {{ formatCurrency(data.value) }}
                    </div>
                  </div>
                </div>
                <span class="text-xs transition-colors duration-300" :class="chartLabelClass">{{ data.month }}</span>
              </div>
            </div>
          </div>
          
          <!-- Chart Legend -->
          <div class="mt-6 pt-4 border-t transition-colors duration-300" :class="borderClass">
            <div class="flex items-center justify-center gap-6">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded" :class="legendColorClass"></div>
                <span class="text-xs transition-colors duration-300" :class="chartLabelClass">Commission (₱)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Referrals Table -->
      <div class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300" :class="cardClass">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold transition-colors duration-300" :class="sectionTitleClass">Recent Referrals</h2>
          <button class="text-sm transition-colors duration-300 hover:opacity-80" :class="linkClass">
            View All →
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b transition-colors duration-300" :class="borderClass">
                <th class="text-left py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">Referral</th>
                <th class="text-left py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">Date</th>
                <th class="text-left py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">Status</th>
                <th class="text-right py-3 px-2 text-sm font-semibold transition-colors duration-300" :class="tableHeaderClass">Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="referral in recentReferrals" 
                :key="referral.id"
                class="border-b transition-all duration-300 hover:bg-opacity-50"
                :class="[borderClass, tableRowHoverClass]"
              >
                <td class="py-3 px-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" :class="avatarClass(referral.name)">
                      {{ getInitials(referral.name) }}
                    </div>
                    <span class="transition-colors duration-300" :class="tableTextClass">{{ referral.name }}</span>
                  </div>
                </td>
                <td class="py-3 px-2 transition-colors duration-300" :class="tableMetaClass">{{ formatDate(referral.date) }}</td>
                <td class="py-3 px-2">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      referral.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      referral.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ referral.status }}
                  </span>
                </td>
                <td class="py-3 px-2 text-right font-medium transition-colors duration-300" :class="tableTextClass">
                  {{ formatCurrency(referral.commission) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminAffiliate'
}
</script>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ============ THEME INTEGRATION ============
// Inject theme from parent (App.vue) for global theme support
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  isDark: () => false
})

// Computed property to detect if dark mode is active
// This will automatically update when theme changes
const isDark = computed(() => {
  return theme.currentTheme?.value === 'dark' || theme.isDark?.()
})

// ============ THEME-AWARE CSS CLASSES ============
// These classes dynamically change based on the current theme

// Main background class (changes with theme)
const mainBgClass = computed(() => ({
  'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
  'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
}))

// Title text class
const titleClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Subtitle/text class
const subtitleClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Date text class
const dateTextClass = computed(() => ({
  'text-gray-700': !isDark.value,
  'text-gray-300': isDark.value
}))

// Time text class
const timeTextClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Card background class
const cardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Card label class
const cardLabelClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Card value class
const cardValueClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Card meta text class
const cardMetaClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// Icon background color based on theme and color type
const iconBgClass = (color) => computed(() => {
  const lightColors = {
    emerald: 'bg-emerald-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100'
  }
  const darkColors = {
    emerald: 'bg-emerald-900/30',
    blue: 'bg-blue-900/30',
    purple: 'bg-purple-900/30'
  }
  return isDark.value ? darkColors[color] : lightColors[color]
})

// Icon color based on theme and color type
const iconColorClass = (color) => computed(() => {
  const lightColors = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600'
  }
  const darkColors = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  }
  return isDark.value ? darkColors[color] : lightColors[color]
})

// Section title class
const sectionTitleClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Code background class
const codeBgClass = computed(() => ({
  'bg-gray-100': !isDark.value,
  'bg-gray-700': isDark.value
}))

// Code text class
const codeTextClass = computed(() => ({
  'text-emerald-600': !isDark.value,
  'text-emerald-400': isDark.value
}))

// Button class with theme support
const buttonClass = (color) => computed(() => {
  const lightColors = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white'
  }
  const darkColors = {
    emerald: 'bg-emerald-500 hover:bg-emerald-600 text-white'
  }
  return isDark.value ? darkColors[color] : lightColors[color]
})

// Border class
const borderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

// Table header class
const tableHeaderClass = computed(() => ({
  'text-gray-600': !isDark.value,
  'text-gray-400': isDark.value
}))

// Table text class
const tableTextClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-gray-200': isDark.value
}))

// Table meta text class
const tableMetaClass = computed(() => ({
  'text-gray-600': !isDark.value,
  'text-gray-400': isDark.value
}))

// Table row hover class
const tableRowHoverClass = computed(() => ({
  'hover:bg-gray-50': !isDark.value,
  'hover:bg-gray-700': isDark.value
}))

// Progress bar background class
const progressBarBgClass = computed(() => ({
  'bg-gray-200': !isDark.value,
  'bg-gray-600': isDark.value
}))

// Progress bar fill class
const progressBarFillClass = computed(() => ({
  'bg-emerald-500': !isDark.value,
  'bg-emerald-400': isDark.value
}))

// Chart bar class
const chartBarClass = computed(() => ({
  'bg-emerald-500 hover:bg-emerald-600': !isDark.value,
  'bg-emerald-400 hover:bg-emerald-500': isDark.value
}))

// Tooltip class
const tooltipClass = computed(() => ({
  'bg-gray-800': !isDark.value,
  'bg-gray-900': isDark.value
}))

// Chart label class
const chartLabelClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Legend color class
const legendColorClass = computed(() => ({
  'bg-emerald-500': !isDark.value,
  'bg-emerald-400': isDark.value
}))

// Link class
const linkClass = computed(() => ({
  'text-emerald-600': !isDark.value,
  'text-emerald-400': isDark.value
}))

// Avatar class based on name (consistent colors)
const avatarClass = (name) => {
  const colors = ['emerald', 'blue', 'purple', 'pink', 'indigo', 'orange']
  const index = name.length % colors.length
  const color = colors[index]
  
  return computed(() => ({
    [`bg-gradient-to-br from-${color}-400 to-${color}-600`]: true
  }))
}

// ============ ORIGINAL DATA AND FUNCTIONS ============
// (All original functionality remains unchanged)

// Date and time
const currentDate = ref('')
const currentTime = ref('')
let timeInterval = null

// Stats data
const stats = ref({
  totalReferrals: 1284,
  totalReferralsGrowth: 24,
  activeReferrals: 86,
  activeReferralsGrowth: 12,
  totalCommission: 18654,
  totalCommissionGrowth: 32
})

// Referral code
const referralCode = ref('GRIDS2024')
const copySuccess = ref(false)

// Affiliates data
const affiliates = ref([
  { id: 1, name: 'Sarah Johnson', earnings: 12500, conversionRate: 82 },
  { id: 2, name: 'MJC Chen', earnings: 8900, conversionRate: 70 },
  { id: 3, name: 'Emily Davis', earnings: 7200, conversionRate: 65 },
  { id: 4, name: 'James Wilson', earnings: 4300, conversionRate: 32 },
  { id: 5, name: 'Maria Garcia', earnings: 5600, conversionRate: 48 },
  { id: 6, name: 'David Kim', earnings: 9800, conversionRate: 75 }
])

// Chart data
const chartData = ref([
  { month: 'Jan', value: 12500 },
  { month: 'Feb', value: 14800 },
  { month: 'Mar', value: 16200 },
  { month: 'Apr', value: 18654 },
  { month: 'May', value: 21200 },
  { month: 'Jun', value: 23500 }
])

// Recent referrals
const recentReferrals = ref([
  { id: 1, name: 'Michael Brown', date: '2026-03-25', status: 'completed', commission: 250 },
  { id: 2, name: 'Jessica Lee', date: '2026-03-24', status: 'completed', commission: 180 },
  { id: 3, name: 'Ryan Taylor', date: '2026-03-23', status: 'pending', commission: 320 },
  { id: 4, name: 'Amanda White', date: '2026-03-22', status: 'completed', commission: 210 },
  { id: 5, name: 'Kevin Martinez', date: '2026-03-21', status: 'pending', commission: 150 }
])

// Computed: Max chart value for scaling
const maxChartValue = computed(() => {
  return Math.max(...chartData.value.map(d => d.value))
})

// Helper: Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Helper: Format currency (Philippine Peso)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Helper: Get initials from name
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Helper: Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Copy referral code to clipboard
const copyReferralCode = async () => {
  try {
    await navigator.clipboard.writeText(referralCode.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

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
</script>

<style scoped>
/* Custom scrollbar - theme-aware */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}

/* CSS Variables for scrollbar - these will be overridden by theme */
:root {
  --scrollbar-track: #f1f1f1;
  --scrollbar-thumb: #c1c1c1;
  --scrollbar-thumb-hover: #a8a8a8;
}

.dark {
  --scrollbar-track: #2d2d2d;
  --scrollbar-thumb: #555;
  --scrollbar-thumb-hover: #666;
}

/* Apply scrollbar variables */
::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}

/* Transitions */
button {
  transition: all 0.2s ease;
}

/* Table hover effects */
tbody tr {
  transition: all 0.2s ease;
}

/* Chart bar animations */
.bg-emerald-500, .bg-emerald-400 {
  transition: all 0.3s ease;
}

/* Smooth theme transitions for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>